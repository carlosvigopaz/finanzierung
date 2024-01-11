import { Button, Card, Image } from 'semantic-ui-react';
import { Payment } from '../../../app/models/payment';

interface Props {
    payment: Payment;
    cancelSelectPayment: () => void;
    openForm: (id: string) => void;
}

export default function PaymentDetails({payment, cancelSelectPayment, openForm}: Props) {
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
            <Button onClick={cancelSelectPayment} basic color='grey' content='Cancel' />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
