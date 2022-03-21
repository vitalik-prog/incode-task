import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

const ActionType = {
  INIT: 'init',
  SET_TICKERS: 'set-tickers',
  CHANGE_UPTIME: 'change-uptime',
};

const initialize = createAction(ActionType.INIT, data => ({
  payload: {
    data,
  }
}));

const setTickers = createAction(ActionType.SET_TICKERS, tickers => ({
  payload: {
    tickers,
  }
}));

const setUptime = createAction(ActionType.CHANGE_UPTIME, uptime => ({
  payload: {
    uptime,
  }
}));

export {
  initialize,
  setTickers,
  setUptime,
};
