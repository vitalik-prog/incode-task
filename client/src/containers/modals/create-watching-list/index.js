import React, { useCallback, useState } from 'react';
import { Divider, Input, Label, Message, Modal } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { tickerActionCreator } from 'src/store/actions';

const CreateWatchingList = (props) => {
  const dispatch = useDispatch();
  const [listName, setListName] = useState('');
  const [isShowWarning, setIsShowWarning] = useState(false);

  const clickHandler = useCallback((e, data) => {
    if (data.content === 'Dismiss') {
      return props.close();
    }

    if (listName === '') {
      setIsShowWarning(true);
      return;
    }

    dispatch(tickerActionCreator.createWatchingList(
      uuidv4(),  listName, props.selectedTickers.map(ticker => ticker.ticker.id), props.interval)
    );
    props.close();
  }, [listName, dispatch, props]);

  const onChangeHandler = useCallback((e) => {
    setListName(e.target.value);
    setIsShowWarning(false);
  }, [setListName]);

  return (
    <Modal
      style={{ zIndex: 999 }}
      onClose={props.close}
      closeOnEscape
      dimmer='blurring'
      open={true}
    >
      <Modal.Header content='Create watching list' />
      <Modal.Content>
        <Message>
          <Message.Header>Selected tickers</Message.Header>
          <Message.List>
            {(props.selectedTickers || []).map(ticker =>
              <Message.Item key={ticker.ticker.id}>{ticker.ticker.name}</Message.Item>
            )}
          </Message.List>
        </Message>
        <Divider />
        <Input
          fluid
          icon='list'
          placeholder='List name'
          type='text'
          value={listName}
          onChange={onChangeHandler}
        />
        {isShowWarning && <Label basic color='red' pointing>
          Please enter a list name
        </Label>}
      </Modal.Content>
      <Modal.Actions
        actions={[{ key: 'dismiss', content: 'Dismiss', positive: false }, { key: 'ok', content: 'OK', positive: true }]}
        onActionClick={clickHandler}
      />
    </Modal>
  );
};

export default React.memo(CreateWatchingList);
