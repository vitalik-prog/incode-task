import React, { useCallback } from 'react';
import dayjs from 'dayjs';
import { Table, Checkbox, Icon } from 'semantic-ui-react';

const TickerItem = ({ ticker, onSelectTicker, checked }) => {

  const handleSelectTicker = useCallback((e, data) => {
    onSelectTicker(ticker, data.checked);
  }, [onSelectTicker, ticker])

  return (
    <Table.Row>
      <Table.Cell width={1} collapsing>
        <Checkbox
          checked={checked}
          onClick={handleSelectTicker}
          type='checkbox'
          data-testid='checkbox-el'
        />
      </Table.Cell>
      <Table.Cell width={4}>{ticker.ticker.name}</Table.Cell>
      <Table.Cell width={2}>{ticker.price}</Table.Cell>
      <Table.Cell width={2}>{ticker.change}</Table.Cell>
      <Table.Cell width={2} warning={ticker.change_percent <= 0}>
        {ticker.change_percent <= 0
          ? (
            <>
              <Icon name='attention' />
              {ticker.change_percent} %
            </>
          ) : (
            `${ticker.change_percent} %`
          )}
      </Table.Cell>
      <Table.Cell width={5}>
        {dayjs(ticker.last_trade_time).format('MMM D, YYYY h:mm:ss A')}
      </Table.Cell>
    </Table.Row>
  );
};

export default React.memo(TickerItem);
