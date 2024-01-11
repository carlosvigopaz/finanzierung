import { Button, Form, Segment } from 'semantic-ui-react';
import { Payment } from '../../../app/models/payment';
import { ChangeEvent, useState } from 'react';

interface Props {
    payment: Payment | undefined;
    closeForm: () => void;
    createOrEdit: (payment: Payment) => void;
}

export default function PaymentForm({payment: selectedPayment, closeForm, createOrEdit}: Props) {
  const initialState = selectedPayment ?? {
    id: '',
    reference: '',
    amount: 0,
    date: '',
    from: '',
    to: ''
  }

  const [payment, setPayment] = useState(initialState);

  function handleSubmit() {
    createOrEdit(payment);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const {name, value} = event.target;
    setPayment({...payment, [name]: value});
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Input placeholder='Reference' value={payment.reference} name='reference' onChange={handleInputChange} />
        <Form.Input placeholder='Amount' value={payment.amount} name='amount' onChange={handleInputChange} />
        <Form.Input placeholder='Date' value={payment.date} name='date' onChange={handleInputChange} />
        <Form.Input placeholder='From' value={payment.from} name='from' onChange={handleInputChange} />
        <Form.Input placeholder='To' value={payment.to} name='to' onChange={handleInputChange} />
        <Button floated='right' positive type='submit' content='Submit' />
        <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
      </Form>
    </Segment>
  );
}
