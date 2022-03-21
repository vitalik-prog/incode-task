import { createReducer } from '@reduxjs/toolkit';
import { setTickers, initialize } from './actions';

const initialState = {
  list: [],
  interval: null,
};

const reducer = createReducer(initialState, builder => {
  builder.addCase(initialize, (state, action) => {
    const { data } = action.payload;
    state.interval = data.interval;
  });
  builder.addCase(setTickers, (state, action) => {
    const { tickers } = action.payload;
    state.list = tickers;
  });
});

export { reducer };
