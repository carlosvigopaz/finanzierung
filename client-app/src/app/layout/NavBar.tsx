import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default function NavBar() {
  const {paymentStore} = useStore();

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header>
          <img src='/assets/logo.png' alt='Logo' style={{ marginRight: '10px' }}
          />
          Finanzierung
        </Menu.Item>
        <Menu.Item name='Payments' />
        <Menu.Item>
          <Button onClick={() => paymentStore.openForm()} positive content='Create payment' />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
