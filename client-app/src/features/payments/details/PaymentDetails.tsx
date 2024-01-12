import { Button, Card, Image } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default function PaymentDetails() {
  const {paymentStore} = useStore();
  const {selectedPayment: payment, openForm, cancelSelectedPayment} = paymentStore;

  if (!payment) return <LoadingComponent />;

  return (
    <Card>
      <Image src='/assets/categoryImages/culture.jpg' wrapped ui={false} />
      <Card.Content>
        <Card.Header>{payment.reference}</Card.Header>
        <Card.Meta>
          <span>{payment.date}</span>
        </Card.Meta>
        <Card.Description>
          <div>€ {payment.amount}</div>
          <div>From {payment.from} to {payment.to}</div>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='2'>
            <Button onClick={() => openForm(payment.id)} basic color='blue' content='Edit' />
            <Button onClick={cancelSelectedPayment} basic color='grey' content='Cancel' />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
