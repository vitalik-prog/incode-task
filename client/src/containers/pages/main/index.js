import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuTop from 'src/components/menus/menu-top';
import LayoutMain from 'src/components/layouts/layout-main';
import TickersList from 'src/components/elements/tickers-list';
import ContentHeader from 'src/components/elements/content-header';
import { tickerActionCreator } from 'src/store/actions';

const MainContainer = () => {
  const dispatch = useDispatch();

  const { tickers, interval, watchLists } = useSelector(state => ({
    tickers: state.ticker.list,
    interval: state.ticker.interval,
    watchLists: state.ticker.watchLists,
  }));

  const handleSetInterval = useCallback( (value) => {
    dispatch(tickerActionCreator.setUptime(value));
  }, [dispatch]);

  const selectList = useCallback(id => {
    if (typeof id !== 'string') {
      dispatch(tickerActionCreator.selectAllTickers(interval));
      return;
    }

    dispatch(tickerActionCreator.selectList(id, interval));
  }, [interval, dispatch]);

  const deleteList = useCallback(id => {
    dispatch(tickerActionCreator.deleteList(id, interval));
  }, [interval, dispatch]);

  return (
    <>
      <MenuTop
        selectList={selectList}
        watchLists={watchLists}
        deleteList={deleteList}
      />
      <LayoutMain>
        <ContentHeader
          interval={interval}
          setInterval={handleSetInterval}
        />
        <TickersList
          list={tickers}
          selectAllTickers={selectList}
          interval={interval}
        />
      </LayoutMain>
    </>
  );
};

export default React.memo(MainContainer);
