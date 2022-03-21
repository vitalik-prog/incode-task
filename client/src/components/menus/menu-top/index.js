import React from 'react';
import { Container, Dropdown, Icon, Menu } from 'semantic-ui-react'
import MenuItem from 'src/components/menus/menu-top/components/menu-item';

const MenuTop = ({ selectList, watchLists, deleteList }) => {
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header>
          <Icon color='teal' name='tasks' />
          Incode Task
        </Menu.Item>

        <Dropdown item simple text='watching lists'>
          <Dropdown.Menu>
            <Dropdown.Item onClick={selectList}>
              All tickers
            </Dropdown.Item>
            {(watchLists || []).map(item =>
              <MenuItem
                key={item.id}
                item={item}
                selectList={selectList}
                deleteList={deleteList}
              />
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Menu>
  );
};

export default React.memo(MenuTop);
