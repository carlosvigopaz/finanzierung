import { Grid } from 'semantic-ui-react';
import PaymentList from './PaymentList';
import PaymentDetails from '../details/PaymentDetails';
import PaymentForm from '../form/PaymentForm';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function PaymentDashboard() {
  const {paymentStore} = useStore();
  const {selectedPayment, editMode} = paymentStore;

  return (
    <Grid>
      <Grid.Column width='10'>
        <PaymentList />
      </Grid.Column>
      <Grid.Column width='6'>
        {selectedPayment && !editMode &&
        <PaymentDetails />}
        {editMode &&
        <PaymentForm />}
      </Grid.Column>
    </Grid>
  );
})
