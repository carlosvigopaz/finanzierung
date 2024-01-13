import { Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import PaymentListItem from './PaymentListItem';
import { Fragment } from 'react';

export default observer(function PaymentList() {
  const {paymentStore} = useStore();
  const {groupedPayments} = paymentStore;

  return (
    <>
      {groupedPayments.map(([group, payments]) => (
        <Fragment key={group}>
          <Header sub color='teal'>
            {group}
          </Header>
          {payments.map((payment) => (
            <PaymentListItem key={payment.id} payment={payment} />
          ))}
        </Fragment>
      ))}
    </>
  );
})