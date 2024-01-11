import { Grid } from 'semantic-ui-react';
import { Payment } from '../../../app/models/payment';
import PaymentList from './PaymentList';
import PaymentDetails from '../details/PaymentDetails';
import PaymentForm from '../form/PaymentForm';

interface Props {
  payments: Payment[];
  selectedPayment: Payment | undefined;
  selectPayment: (id: string) => void;
  cancelSelectPayment: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (payment: Payment) => void;
  deletePayment: (id: string) => void;
  submitting: boolean;
}

export default function PaymentDashboard({payments, selectedPayment, selectPayment, cancelSelectPayment,
  editMode, openForm, closeForm, createOrEdit, deletePayment, submitting}: Props) {
  return (
    <Grid>
      <Grid.Column width='10'>
        <PaymentList
          payments={payments}
          selectPayment={selectPayment}
          deletePayment={deletePayment}
          submitting={submitting} />
      </Grid.Column>
      <Grid.Column width='6'>
        {selectedPayment && !editMode &&
        <PaymentDetails
          payment={selectedPayment}
          cancelSelectPayment={cancelSelectPayment}
          openForm={openForm} />}
        {editMode &&
        <PaymentForm
          closeForm={closeForm}
          payment={selectedPayment}
          createOrEdit={createOrEdit}
          submitting={submitting} />}
      </Grid.Column>
    </Grid>
  );
}
