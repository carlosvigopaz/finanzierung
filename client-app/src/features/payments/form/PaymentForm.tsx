import { Button, Form, Segment } from 'semantic-ui-react';
import { Payment } from '../../../app/models/payment';
import { ChangeEvent, useEffect, useState } from 'react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { v4 as uuid } from 'uuid';

export default observer(function PaymentForm() {
  const {paymentStore} = useStore();
  const {createPayment, updatePayment,
    loading, loadPayment, loadingInitial} = paymentStore;
  const {id} = useParams();
  const navigate = useNavigate();

  const [payment, setPayment] = useState<Payment>({
    id: '',
    reference: '',
    amount: 0,
    date: '',
    from: '',
    to: '',
  });

  useEffect(() => {
    if (id) {
      loadPayment(id).then(payment => setPayment(payment!));
    }
  }, [id, loadPayment]);

  function handleSubmit() {
    if (!payment.id) {
      payment.id = uuid();
      createPayment(payment).then(() => navigate(`/payments/${payment.id}`));
    } else {
      updatePayment(payment).then(() => navigate(`/payments/${payment.id}`));
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const {name, value} = event.target;
    setPayment({...payment, [name]: value});
  }

  if (loadingInitial) return <LoadingComponent content='Loading payment...' />

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Input placeholder='Reference' value={payment.reference} name='reference' onChange={handleInputChange} />
        <Form.Input placeholder='Amount' value={payment.amount} name='amount' onChange={handleInputChange} />
        <Form.Input type='date' placeholder='Date' value={payment.date} name='date' onChange={handleInputChange} />
        <Form.Input placeholder='From' value={payment.from} name='from' onChange={handleInputChange} />
        <Form.Input placeholder='To' value={payment.to} name='to' onChange={handleInputChange} />
        <Button loading={loading} floated='right' positive type='submit' content='Submit' />
        <Button as={Link} to='/payments' floated='right' type='button' content='Cancel' />
      </Form>
    </Segment>
  );
})