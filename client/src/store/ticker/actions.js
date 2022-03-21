import { createAction } from '@reduxjs/toolkit';

export const ActionType = {
  INIT: 'init',
  SET_TICKERS: 'set-tickers',
  CHANGE_UPTIME: 'change-uptime',
  CREATE_WATCHING_LIST: 'create-watching-list',
  SELECT_WATCHING_LIST: 'select-watching-list',
  SELECT_ALL_TICKERS: 'select-all-tickers',
  DELETE_LIST: 'delete-list',
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

const createWatchingList = createAction(ActionType.CREATE_WATCHING_LIST, (id, name, selectedTickers, interval) => ({
  payload: {
    id,
    name,
    selectedTickers,
    interval,
  }
}));

const selectList = createAction(ActionType.SELECT_WATCHING_LIST, (id, interval) => ({
  payload: {
    id,
    interval,
  }
}));

const selectAllTickers = createAction(ActionType.SELECT_ALL_TICKERS, interval => ({
  payload: {
    interval,
  }
}));

const deleteList = createAction(ActionType.DELETE_LIST, (id, interval) => ({
  payload: {
    id,
    interval,
  }
}));


export {
  initialize,
  setTickers,
  setUptime,
  createWatchingList,
  selectList,
  selectAllTickers,
  deleteList,
};
