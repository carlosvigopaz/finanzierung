import { Button, Container, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} to='/' header>
          <img src='/assets/logo.png' alt='Logo' style={{ marginRight: '10px' }}
          />
          Finanzierung
        </Menu.Item>
        <Menu.Item as={NavLink} to='/payments' name='Payments' />
        <Menu.Item>
          <Button as={NavLink} to='/createPayment' positive content='Create payment' />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
