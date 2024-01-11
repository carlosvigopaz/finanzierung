import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Payment } from '../models/payment';
import NavBar from './NavBar';
import PaymentDashboard from '../../features/payments/dashboard/PaymentDashboard';
import { v4 as uuid } from 'uuid';

function App() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<Payment | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Payment[]>('http://localhost:5000/api/payments')
      .then((response) => {
        setPayments(response.data);
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
    payment.id
      ? setPayments([...payments.filter(p => p.id !== payment.id), payment])
      : setPayments([...payments, {...payment, id: uuid()}]);
    setEditMode(false);
    setSelectedPayment(payment);
  }

  function handleDeletePayment(id: string) {
    setPayments([...payments.filter(p => p.id !== id)]);
  }

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
          deletePayment={handleDeletePayment} />
      </Container>
    </>
  );
}

export default App;
