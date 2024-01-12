import { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import PaymentDashboard from '../../features/payments/dashboard/PaymentDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {paymentStore} = useStore();

  useEffect(() => {
    paymentStore.loadPayments();
  }, [paymentStore]);

  if (paymentStore.loadingInitial) return <LoadingComponent content={'Loading app...'} />

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <PaymentDashboard />
      </Container>
    </>
  );
}

export default observer(App);
