import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { SyntheticEvent, useState } from 'react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function PaymentList() {
  const {paymentStore} = useStore();
  const {paymentsByDate, deletePayment, loading} = paymentStore;

  const [target, setTarget] = useState('');

  function handleDeletePayment(event: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(event.currentTarget.name);
    deletePayment(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {paymentsByDate.map((payment) => (
          <Item key={payment.id}>
            <Item.Content>
              <Item.Header as='a'>{payment.reference}</Item.Header>
              <Item.Meta>{payment.date}</Item.Meta>
              <Item.Description>
                <div>€ {payment.amount}</div>
                <div>From {payment.from} to {payment.to}</div>
              </Item.Description>
              <Item.Extra>
                <Button onClick={() => paymentStore.selectPayment(payment.id)} floated='right' content='View' color='blue' />
                <Button
                  name={payment.id}
                  loading={loading && target===payment.id}
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
})