import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalsActionCreator } from 'src/store/actions';
import * as modals from './config.js';

function Modals() {
  const dispatch = useDispatch();
  const { name, params } = useSelector(state => ({
    name: state.modal.name,
    params: state.modal.params,
  }));

  const getModal = useCallback(() => {
    const props = {
      ...params,
      close: result => dispatch(modalsActionCreator.close(result)),
    };

    if (modals[name]) {
      const Component = modals[name];
      return <Component {...props} />;
    } else {
      return null;
    }

  }, [name, dispatch, params]);

  return (
      getModal()
  );
}

export default React.memo(Modals);
