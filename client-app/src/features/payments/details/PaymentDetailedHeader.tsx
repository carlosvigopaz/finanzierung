import { observer } from 'mobx-react-lite';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {Payment} from "../../../app/models/payment";

const paymentImageStyle = {
    filter: 'brightness(30%)'
};

const paymentImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    payment: Payment
}

export default observer (function ActivityDetailedHeader({payment}: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/categoryImages/travel.jpg`} fluid style={paymentImageStyle}/>
                <Segment style={paymentImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={payment.reference}
                                    style={{color: 'white'}}
                                />
                                <p>{payment.date}</p>
                                <p>
                                    Hosted by <strong>Carlos</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join Payment</Button>
                <Button>Cancel attendance</Button>
                <Button color='orange' floated='right'>
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    )
})
