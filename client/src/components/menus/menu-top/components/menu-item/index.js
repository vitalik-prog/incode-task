import React, { useCallback } from 'react';
import { Dropdown } from 'semantic-ui-react';

const MenuItem = ({ item, selectList, deleteList }) => {

  const onSelectList = useCallback(() => {
    selectList(item.id);
  }, [item, selectList]);

  const onDeleteList = useCallback(() => {
    deleteList(item.id);
  }, [item, deleteList]);

  return (
    <Dropdown.Item>
      <i className='dropdown icon' />
      <span className='text'>{item.name}</span>
      <Dropdown.Menu>
        <Dropdown.Item onClick={onSelectList}>Watch</Dropdown.Item>
        <Dropdown.Item onClick={onDeleteList}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Item>
  );
};

export default React.memo(MenuItem);
