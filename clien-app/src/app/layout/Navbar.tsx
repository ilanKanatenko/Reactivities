import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface Props {
  openForm: () => void;
}

function Navbar({ openForm }: Props) {
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
            onClick={openForm}
            positive
            content='Create Activity'
          ></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default Navbar;
