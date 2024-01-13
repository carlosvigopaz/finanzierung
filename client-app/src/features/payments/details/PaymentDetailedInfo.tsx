import { observer } from 'mobx-react-lite';
import {Segment, Grid, Icon} from 'semantic-ui-react'
import {Payment} from '../../../app/models/payment';

interface Props {
    payment: Payment
}

export default observer(function ActivityDetailedInfo({payment}: Props) {
    return (
      <Segment.Group>
        <Segment attached='top'>
          <Grid>
            <Grid.Column width={1}>
              <Icon size='large' color='teal' name='money' />
            </Grid.Column>
            <Grid.Column width={15}>
              <p>€ {payment.amount}</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign='middle'>
            <Grid.Column width={1}>
              <Icon name='calendar' size='large' color='teal' />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>{payment.date}</span>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign='middle'>
            <Grid.Column width={1}>
              <Icon name='building' size='large' color='teal' />
            </Grid.Column>
            <Grid.Column width={11}>
              <span>
                From {payment.from} to {payment.to}
              </span>
            </Grid.Column>
          </Grid>
        </Segment>
      </Segment.Group>
    );
})
