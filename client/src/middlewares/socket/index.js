import io from 'socket.io-client';
import { ENV } from 'src/common/enums/env.enum';
import { SocketEvent } from 'src/common/enums/socket-event.enum'
import { tickerActionCreator } from 'src/store/actions';
import { ActionType } from 'src/store/ticker/actions';

const socket = ({ dispatch }) => next => {
  const socket = io.connect(ENV.SOCKET_URL);
  socket.emit('start');

  socket.on(SocketEvent.INIT, function(response) {
    dispatch(tickerActionCreator.initialize(response));
  });

  socket.on(SocketEvent.TICKER, function(response) {
    dispatch(tickerActionCreator.setTickers(response));
  });

  return action => {
    switch (action.type) {
      case ActionType.CHANGE_UPTIME:
        socket.emit(SocketEvent.CHANGE_UPTIME, action.payload);
        break;

      case ActionType.CREATE_WATCHING_LIST:
        socket.emit(SocketEvent.CREATE_WATCHING_LIST, action.payload);
        break;

      case ActionType.SELECT_WATCHING_LIST:
        socket.emit(SocketEvent.SELECT_WATCHING_LIST, action.payload);
        break;

      case ActionType.SELECT_ALL_TICKERS:
        socket.emit(SocketEvent.SELECT_ALL_TICKERS, action.payload);
        break;

      case ActionType.DELETE_LIST:
        socket.emit(SocketEvent.DELETE_WATCHING_LIST, action.payload);
        break;

      default: next(action);
    }
  }
}

export { socket };
