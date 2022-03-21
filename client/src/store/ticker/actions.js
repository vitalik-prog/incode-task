import { createAction } from '@reduxjs/toolkit';
import { comment as commentService, post as postService } from 'src/services/services';

const ActionType = {
  ADD_POST: 'thread/add-post',
  LOAD_MORE_POSTS: 'thread/load-more-posts',
  SET_ALL_POSTS: 'thread/set-all-posts',
  SET_EXPANDED_POST: 'thread/set-expanded-post'
};

const setPosts = createAction(ActionType.SET_ALL_POSTS, posts => ({
  payload: {
    posts
  }
}));

const addMorePosts = createAction(ActionType.LOAD_MORE_POSTS, posts => ({
  payload: {
    posts
  }
}));

const addPost = createAction(ActionType.ADD_POST, post => ({
  payload: {
    post
  }
}));

const setExpandedPost = createAction(ActionType.SET_EXPANDED_POST, post => ({
  payload: {
    post
  }
}));

const loadPosts = filter => async dispatch => {
  const posts = await postService.getAllPosts(filter);
  dispatch(setPosts(posts));
};

const loadMorePosts = filter => async (dispatch, getRootState) => {
  const {
    posts: { posts }
  } = getRootState();
  const loadedPosts = await postService.getAllPosts(filter);
  const filteredPosts = loadedPosts.filter(
    post => !(posts && posts.some(loadedPost => post.id === loadedPost.id))
  );
  dispatch(addMorePosts(filteredPosts));
};

const applyPost = postId => async dispatch => {
  const post = await postService.getPost(postId);
  dispatch(addPost(post));
};

const createPost = post => async dispatch => {
  const { id } = await postService.addPost(post);
  const newPost = await postService.getPost(id);
  dispatch(addPost(newPost));
};

const setCommentLikesForExpandedPost = post => (
  {
    ...post,
    comments: post.comments.map(comment => {
      const likesCount = {
        commentLikesCount: 0,
        commentDislikesCount: 0
      };

      if (comment.commentReactions.length > 0) {
        comment.commentReactions.map(reaction => {
          if (reaction.isLike) {
            likesCount.commentLikesCount += 1;
          } else {
            likesCount.commentDislikesCount += 1;
          }
          return likesCount;
        });
      }

      const { commentLikesCount, commentDislikesCount } = { ...likesCount };
      comment.commentLikesCount = String(commentLikesCount);
      comment.commentDislikesCount = String(commentDislikesCount);
      return comment;
    })
  }
);

const toggleExpandedPost = postId => async dispatch => {
  const post = postId ? await postService.getPost(postId) : undefined;

  let updatedPost;
  if (!post) {
    updatedPost = undefined;
  } else if (post.comments.length > 0) {
    updatedPost = setCommentLikesForExpandedPost(post);
  } else {
    updatedPost = post;
  }
  dispatch(setExpandedPost(updatedPost));
};

const updatePost = post => async (dispatch, getRootState) => {
  await postService.updatePost(post);
  const posts = await postService.getAllPosts();
  dispatch(setPosts(posts));

  const {
    posts: { expandedPost }
  } = getRootState();
  if (expandedPost) {
    dispatch(toggleExpandedPost(post.id));
  }
};

const deletePost = postId => async (dispatch, getRootState) => {
  await postService.deletePost(postId);
  const {
    posts: { posts }
  } = getRootState();
  const updated = posts.filter(post => (post.id !== postId));
  dispatch(setPosts(updated));
};

const likePost = (postId, likeOrDislike) => async (dispatch, getRootState) => {
  await postService.likePost(postId, likeOrDislike);
  const changedPost = await postService.getPost(postId);
  const {
    posts: { posts, expandedPost }
  } = getRootState();
  const updated = posts.map(post => {
    if (post.id === postId) {
      post = changedPost;
    }
    return post;
  });
  dispatch(setPosts(updated));

  if (expandedPost && expandedPost.id === postId) {
    dispatch(toggleExpandedPost(postId));
  }
};

const changedLikeCount = postId => async (dispatch, getRootState) => {
  const changedPost = await postService.getPost(postId);

  const {
    posts: { posts }
  } = getRootState();
  const updated = posts.map(post => {
    if (post.id === postId) {
      post = changedPost;
    }
    return post;
  });
  dispatch(setPosts(updated));
};

const displayListOfLikes = (postId, listOfLikesOrDis) => async (dispatch, getRootState) => {
  const filter = { postId, listOfLikesOrDis };
  const result = await postService.getAllLikes(filter);
  if (result.length > 0) {
    const listOfReactions = {
      postId,
      likeOrDis: listOfLikesOrDis,
      userList: result.map(item => item.user)
    };
    const {
      posts: { posts, expandedPost }
    } = getRootState();
    const updatedPosts = posts.map(post => {
      if (post.id === listOfReactions.postId) {
        if (listOfLikesOrDis === 'like') {
          post = { ...post, reactionListOfLikes: listOfReactions };
        } else {
          post = { ...post, reactionListOfDislikes: listOfReactions };
        }
      }
      return post;
    });
    dispatch(setPosts(updatedPosts));
    if (expandedPost && expandedPost.id === listOfReactions.postId) {
      const updatedExpandedPost = {
        ...expandedPost,
        reactionListOfLikes: listOfLikesOrDis === 'like' ? listOfReactions : null,
        reactionListOfDislikes: listOfLikesOrDis === 'dislike' ? listOfReactions : null
      };
      dispatch(setExpandedPost(updatedExpandedPost));
    }
  }
};

const addComment = request => async (dispatch, getRootState) => {
  const { id } = await commentService.addComment(request);
  const comment = await commentService.getComment(id);

  const mapComments = post => ({
    ...post,
    commentCount: String(Number(post.commentCount) + 1),
    comments: [...(post.comments || []), comment] // comment is taken from the current closure
  });

  const {
    posts: { posts, expandedPost }
  } = getRootState();
  const updated = posts.map(post => (post.id !== comment.postId ? post : mapComments(post)));
  dispatch(setPosts(updated));

  if (expandedPost && expandedPost.id === comment.postId) {
    dispatch(setExpandedPost(mapComments(expandedPost)));
  }
};

const updateComment = data => async dispatch => {
  const { postId, ...other } = data;
  await commentService.updateComment(other);
  dispatch(toggleExpandedPost(postId));
};

const likeComment = (commentId, likeOrDislike) => async (dispatch, getState) => {
  await commentService.likeComment(commentId, likeOrDislike);
  const changedComment = await commentService.getComment(commentId);
  const {
    posts: { expandedPost }
  } = getState();

  const updatedExpandedPost = {
    ...expandedPost,
    comments: expandedPost.comments.map(comment => {
      if (comment.id === changedComment.id) {
        comment = changedComment;
      }
      return comment;
    })
  };
  dispatch(setExpandedPost(updatedExpandedPost));
};

const changedCommentLikesCount = commentId => async (dispatch, getState) => {
  const changedComment = await commentService.getComment(commentId);
  const {
    posts: { expandedPost }
  } = getState();
  if (expandedPost) {
    if (expandedPost.comments.some(comment => comment.id === changedComment.id)) {
      const updatedExpandedPost = await postService.getPost(expandedPost.id);
      dispatch(setExpandedPost(setCommentLikesForExpandedPost(updatedExpandedPost)));
    }
  }
};

const deleteComment = commentId => async (dispatch, getRootState) => {
  await commentService.deleteComment(commentId);
  const {
    posts: { posts, expandedPost }
  } = getRootState();

  const updatedPosts = posts.map(post => (post.id === expandedPost.id
    ? ({ ...post, commentCount: String(Number(post.commentCount) - 1) })
    : post));
  dispatch(setPosts(updatedPosts));

  const updatedCommentsInExpandedPost = expandedPost.comments.filter(comment => (comment.id !== commentId));
  const updatedExpandedPost = ({
    ...expandedPost,
    comments: updatedCommentsInExpandedPost,
    commentCount: String(updatedCommentsInExpandedPost.length)
  });
  dispatch(setExpandedPost(updatedExpandedPost));
};

const displayCommentListOfLikes = (commentId, listOfLikesOrDis) => async (dispatch, getRootState) => {
  const filter = { commentId, listOfLikesOrDis };
  const result = await commentService.getAllLikes(filter);
  if (result.length > 0) {
    const listOfReactions = {
      commentId,
      likeOrDis: listOfLikesOrDis,
      userList: result.map(item => item.user)
    };
    const {
      posts: { expandedPost }
    } = getRootState();

    const updatedExpandedPost = {
      ...expandedPost,
      comments: expandedPost.comments.map(item => {
        if (item.id === commentId) {
          item = {
            ...item,
            reactionListOfLikes: listOfLikesOrDis === 'like' ? listOfReactions : null,
            reactionListOfDislikes: listOfLikesOrDis === 'dislike' ? listOfReactions : null
          };
        }
        return item;
      })
    };
    dispatch(setExpandedPost(updatedExpandedPost));
  }
};

export {
  setPosts,
  addMorePosts,
  addPost,
  setExpandedPost,
  loadPosts,
  loadMorePosts,
  applyPost,
  createPost,
  updatePost,
  deletePost,
  toggleExpandedPost,
  likePost,
  changedLikeCount,
  displayListOfLikes,
  addComment,
  updateComment,
  likeComment,
  changedCommentLikesCount,
  deleteComment,
  displayCommentListOfLikes
};
