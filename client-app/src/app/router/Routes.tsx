import { RouteObject, createBrowserRouter } from 'react-router-dom';
import App from '../layout/App';
import HomePage from '../../features/home/HomePage';
import PaymentDashboard from '../../features/payments/dashboard/PaymentDashboard';
import PaymentForm from '../../features/payments/form/PaymentForm';
import PaymentDetails from '../../features/payments/details/PaymentDetails';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'payments', element: <PaymentDashboard /> },
            { path: 'payments/:id', element: <PaymentDetails /> },
            { path: 'createPayment', element: <PaymentForm key='create' /> },
            { path: 'manage/:id', element: <PaymentForm key='manage' /> }
        ]
    }
];

export const router = createBrowserRouter(routes);
