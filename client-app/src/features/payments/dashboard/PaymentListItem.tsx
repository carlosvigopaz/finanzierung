import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Payment } from "../../../app/models/payment";

interface Props {
  payment: Payment;
}

export default function PaymentListItem({payment}: Props) {
  return(
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src='/assets/user.png' />
            <Item.Content>
              <Item.Header as={Link} to={`/payments/${payment.id}`}>
                {payment.reference}
              </Item.Header>
              <Item.Description>Hosted by Carlos</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='calendar alternate outline' />{payment.date}
          &nbsp;&nbsp;
          <Icon name='euro sign' />{payment.amount}
        </span>
      </Segment>
      <Segment secondary>
        From {payment.from} to {payment.to}
      </Segment>
      <Segment clearing>
        <Button as={Link} to={`/payments/${payment.id}`}
          color='teal' floated='right' content='View' />
      </Segment>
    </Segment.Group>
  );
}