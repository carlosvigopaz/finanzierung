import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import PaymentDetailedHeader from './PaymentDetailedHeader';
import PaymentDetailedInfo from './PaymentDetailedInfo';
import PaymentDetailedChat from './PaymentDetailedChat';
import PaymentDetailedSidebar from './PaymentDetailedSidebar';

export default observer(function PaymentDetails() {
  const {paymentStore} = useStore();
  const {selectedPayment: payment, loadPayment, loadingInitial} = paymentStore;
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      loadPayment(id);
    }
  }, [id, loadPayment]);

  if (loadingInitial || !payment) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <PaymentDetailedHeader payment={payment} />
        <PaymentDetailedInfo payment={payment} />
        <PaymentDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <PaymentDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
})