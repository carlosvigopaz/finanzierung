import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Payment } from '../../../app/models/payment';

interface Props {
  payments: Payment[];
  selectPayment: (id: string) => void;
  deletePayment: (id: string) => void;
}

export default function PaymentList({ payments, selectPayment, deletePayment }: Props) {
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
                <Button onClick={() => deletePayment(payment.id)} floated='right' content='Delete' color='red' />
                <Label basic content={`€ ${payment.amount}`} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
