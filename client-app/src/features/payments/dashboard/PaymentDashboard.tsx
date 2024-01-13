import { Grid } from 'semantic-ui-react';
import PaymentList from './PaymentList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import PaymentFilters from './PaymentFilters';

export default observer(function PaymentDashboard() {
  const {paymentStore} = useStore();
  const {loadPayments, paymentRegistry} = paymentStore;

  useEffect(() => {
    if (paymentRegistry.size <= 1) loadPayments();
  }, [loadPayments, paymentRegistry.size]);

  if (paymentStore.loadingInitial) return <LoadingComponent content={'Loading app...'} />

  return (
    <Grid>
      <Grid.Column width='10'>
        <PaymentList />
      </Grid.Column>
      <Grid.Column width='6'>
        <PaymentFilters />
      </Grid.Column>
    </Grid>
  );
})
