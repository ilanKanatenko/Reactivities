import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

function Navbar() {
  const { activityStore } = useStore();
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header>
          <img src='/assets/logo.png' alt='logo' />
          Reactivities
        </Menu.Item>
        <Menu.Item name='Activities'></Menu.Item>
        <Menu.Item>
          <Button
            onClick={() => activityStore.openForm()}
            positive
            content='Create Activity'
          ></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default Navbar;
