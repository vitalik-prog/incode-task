import { configureStore } from '@reduxjs/toolkit';
import { socket as socketMiddleware } from 'src/middlewares/socket/index';
import { tickerReducer, modalReducer } from './root-reducer';

const store = configureStore({
  reducer: {
    ticker: tickerReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware),
});

export default store;
