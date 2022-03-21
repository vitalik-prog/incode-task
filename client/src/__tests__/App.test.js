import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import ContentHeader from '../components/elements/content-header';
import {Provider} from 'react-redux';
import store from '../store/store';
import TickersList from '../components/elements/tickers-list';

const tickersList = [
  {
    "ticker": {
      "name": "AAPL",
      "id": 1
    },
    "exchange": "NASDAQ",
    "price": "237.01",
    "change": "139.19",
    "change_percent": "0.56",
    "dividend": "0.50",
    "yield": "0.83",
    "last_trade_time": "2022-03-20T16:36:50.000Z"
  },
  {
    "ticker": {
      "name": "GOOGL",
      "id": 2
    },
    "exchange": "NASDAQ",
    "price": "290.36",
    "change": "52.80",
    "change_percent": "0.42",
    "dividend": "0.68",
    "yield": "1.39",
    "last_trade_time": "2022-03-20T16:36:50.000Z"
  },
  {
    "ticker": {
      "name": "MSFT",
      "id": 3
    },
    "exchange": "NASDAQ",
    "price": "117.04",
    "change": "182.11",
    "change_percent": "0.23",
    "dividend": "0.96",
    "yield": "0.05",
    "last_trade_time": "2022-03-20T16:36:50.000Z"
  },
  {
    "ticker": {
      "name": "AMZN",
      "id": 4
    },
    "exchange": "NASDAQ",
    "price": "169.63",
    "change": "1.41",
    "change_percent": "-0.66",
    "dividend": "0.75",
    "yield": "0.33",
    "last_trade_time": "2022-03-20T16:36:50.000Z"
  },
  {
    "ticker": {
      "name": "FB",
      "id": 5
    },
    "exchange": "NASDAQ",
    "price": "286.74",
    "change": "132.87",
    "change_percent": "-0.39",
    "dividend": "0.63",
    "yield": "1.71",
    "last_trade_time": "2022-03-20T16:36:50.000Z"
  },
  {
    "ticker": {
      "name": "TSLA",
      "id": 6
    },
    "exchange": "NASDAQ",
    "price": "147.69",
    "change": "164.43",
    "change_percent": "-0.74",
    "dividend": "0.72",
    "yield": "1.75",
    "last_trade_time": "2022-03-20T16:36:50.000Z"
  }
]

describe('TEST APP', () => {
  test('renders Seconds (uptime) word', () => {
    render(<ContentHeader interval={2000} />);
    const input = screen.getByPlaceholderText(/Change uptime/i);
    expect(input).toBeInTheDocument();
  });

  test('renders App', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
      );
    const text = screen.getByText('Seconds (uptime)');
    expect(text).toBeInTheDocument();
  });

  test('should change input value', () => {
    render(
      <Provider store={store}>
        <ContentHeader interval={5} />
      </Provider>
    );

    const nameInputEl = screen.getByPlaceholderText('Change uptime');
    fireEvent.change(nameInputEl, {
      target: { value: 10 },
    });
    expect(nameInputEl.value).toBe('10');
  });

  test('should Watching all button clicking', () => {
    const selectAllTickers = jest.fn();
    render(
      <Provider store={store}>
        <TickersList list={tickersList} selectAllTickers={selectAllTickers} />
      </Provider>
      );
    fireEvent.click(screen.getByText(/Watching all/i));
    expect(selectAllTickers).toHaveBeenCalled();
  });

  test('should tickers selecting with checkbox', () => {
    render(
      <Provider store={store}>
        <TickersList list={tickersList} />
      </Provider>
    );
  });

  test('should modal add-watching-list open', () => {
    render(
      <Provider store={store}>
        <TickersList list={tickersList} />
      </Provider>
    );
  });

})
