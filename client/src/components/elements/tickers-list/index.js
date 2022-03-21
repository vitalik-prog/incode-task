import React, { useCallback, useState } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { modalsActionCreator } from 'src/store/actions';
import TickerItem from 'src/components/elements/ticker-item';

const TickersList = ({ list, selectAllTickers, interval }) => {
  const [selectedTickers, setSelectedTickers] = useState([]);
  const dispatch = useDispatch();

  const openModal = useCallback(() => {
    dispatch(modalsActionCreator.open('createWatchingList', { selectedTickers, interval }));
    setSelectedTickers([]);
  }, [dispatch, selectedTickers, interval]);

  const selectTicker = useCallback((ticker, isChecked)=> {
    if (isChecked) {
      return setSelectedTickers([...selectedTickers, ticker]);
    }

    const changedTickers = selectedTickers.filter(item => item.ticker.id !== ticker.ticker.id);
    setSelectedTickers(changedTickers);
  }, [selectedTickers]);

  return (
    <Table celled compact definition textAlign='center'>
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Change</Table.HeaderCell>
          <Table.HeaderCell>Change percent</Table.HeaderCell>
          <Table.HeaderCell>Time</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {list.map(ticker =>
          <TickerItem
            checked={!!selectedTickers.find(selectedTicker => selectedTicker.ticker.id === ticker.ticker.id)}
            key={ticker.ticker.id}
            ticker={ticker}
            onSelectTicker={selectTicker}
          />
        )}
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell textAlign='left' colSpan='15'>
            <Button
              disabled={selectedTickers.length === 0}
              size='small'
              onClick={openModal}
              data-testid='create-new-list-btn'
            >
              Watching
            </Button>
            <Button
              disabled={selectedTickers.length !== 0}
              size='small'
              onClick={selectAllTickers}
            >
              Watching all
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default React.memo(TickersList);
