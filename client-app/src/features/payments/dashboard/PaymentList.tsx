import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Payment } from '../../../app/models/payment';
import { SyntheticEvent, useState } from 'react';

interface Props {
  payments: Payment[];
  selectPayment: (id: string) => void;
  deletePayment: (id: string) => void;
  submitting: boolean;
}

export default function PaymentList({ payments, selectPayment, deletePayment, submitting }: Props) {
  const [target, setTarget] = useState('');

  function handleDeletePayment(event: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(event.currentTarget.name);
    deletePayment(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {payments.map((payment) => (
          <Item key={payment.id}>
            <Item.Content>
              <Item.Header as='a'>{payment.reference}</Item.Header>
              <Item.Meta>{payment.date}</Item.Meta>
              <Item.Description>
                <div>€ {payment.amount}</div>
                <div>From {payment.from} to {payment.to}</div>
              </Item.Description>
              <Item.Extra>
                <Button onClick={() => selectPayment(payment.id)} floated='right' content='View' color='blue' />
                <Button
                  name={payment.id}
                  loading={submitting && target==payment.id}
                  onClick={(event) => handleDeletePayment(event, payment.id)}
                  floated='right' content='Delete' color='red' />
                <Label basic content={`€ ${payment.amount}`} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
