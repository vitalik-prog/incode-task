import { createReducer } from '@reduxjs/toolkit';
import { open, close } from './actions';

const initialState = {
  name: false,
  params: null,
};

const reducer = createReducer(initialState, builder => {
  builder.addCase(open, (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  });
  builder.addCase(close, (state, action) => {
    state.name = false;
  });
});

export { reducer };
