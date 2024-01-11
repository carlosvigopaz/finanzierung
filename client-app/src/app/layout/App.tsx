import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Payment } from '../models/payment';
import NavBar from './NavBar';
import PaymentDashboard from '../../features/payments/dashboard/PaymentDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<Payment | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Payments.list().then(response => {
      const payments: Payment[] = [];
      response.forEach(payment => {
        payment.date = payment.date.split('T')[0];
        payments.push(payment);
      });
      setPayments(payments);
      setLoading(false);
    });
  }, []);

  function handleSelectPayment(id: string) {
    setSelectedPayment(payments.find(payment => payment.id == id));
  }

  function handleCancelSelectPayment() {
    setSelectedPayment(undefined);
  }

  function handleOpenForm(id?: string) {
    id ? handleSelectPayment(id) : handleCancelSelectPayment();
    setEditMode(true);
  }

  function handleCloseForm() {
    setEditMode(false);
  }

  function handleCreateOrEditPayment(payment: Payment) {
    setSubmitting(true);
    if (payment.id) {
      agent.Payments.update(payment).then(() => {
        setPayments([...payments.filter(p => p.id !== payment.id), payment]);
        setSelectedPayment(payment);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      payment.id = uuid();
      agent.Payments.create(payment).then(() => {
        setPayments([...payments, payment]);
        setSelectedPayment(payment);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }

  function handleDeletePayment(id: string) {
    setSubmitting(true);
    agent.Payments.delete(id).then(() => {
      setPayments([...payments.filter(p => p.id !== id)]);
      setSubmitting(false);
    });
  }

  if (loading) return <LoadingComponent content={'Loading app...'} />

  return (
    <>
      <NavBar openForm={handleOpenForm} />
      <Container style={{marginTop: '7em'}}>
        <PaymentDashboard
          payments={payments}
          selectedPayment={selectedPayment}
          selectPayment={handleSelectPayment}
          cancelSelectPayment={handleCancelSelectPayment}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleCloseForm}
          createOrEdit={handleCreateOrEditPayment}
          deletePayment={handleDeletePayment}
          submitting={submitting} />
      </Container>
    </>
  );
}

export default App;
