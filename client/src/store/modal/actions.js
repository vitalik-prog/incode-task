import { createAction } from '@reduxjs/toolkit';

const ActionType = {
  OPEN: 'modal/open',
  CLOSE: 'modal/close',
};

const open = createAction(ActionType.OPEN, (name, params) => ({
  payload: {
    name,
    params,
  }
}));

const close = createAction(ActionType.CLOSE, () => ({
  payload: {
    name: false,
  }
}));

export {
  open,
  close,
};
