import { Button, Card, Image } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default observer(function PaymentDetails() {
  const {paymentStore} = useStore();
  const {selectedPayment: payment, loadPayment, loadingInitial} = paymentStore;
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      loadPayment(id);
    }
  }, [id, loadPayment]);

  if (loadingInitial || !payment) return <LoadingComponent />;

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
            <Button as={Link} to={`/manage/${payment.id}`} basic color='blue' content='Edit' />
            <Button as={Link} to='/payments' basic color='grey' content='Cancel' />
        </Button.Group>
      </Card.Content>
    </Card>
  );
})