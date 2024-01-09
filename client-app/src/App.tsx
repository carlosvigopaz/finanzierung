import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/payments')
      .then(response => {
        setPayments(response.data);
      });
  }, []);

  return (
    <>
      <Header as='h2' icon='users' content='Finanzierung' />
      <List>
        {payments.map((payment: any) => (
          <List.Item key={payment.id}>
            {payment.reference}
          </List.Item>
        ))}
      </List>
    </>
  )
}

export default App
