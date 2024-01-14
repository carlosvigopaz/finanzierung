import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import App from '../layout/App';
import HomePage from '../../features/home/HomePage';
import PaymentDashboard from '../../features/payments/dashboard/PaymentDashboard';
import PaymentForm from '../../features/payments/form/PaymentForm';
import PaymentDetails from '../../features/payments/details/PaymentDetails';
import TestErrors from '../../features/errors/TestErrors';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'payments', element: <PaymentDashboard /> },
            { path: 'payments/:id', element: <PaymentDetails /> },
            { path: 'createPayment', element: <PaymentForm key='create' /> },
            { path: 'manage/:id', element: <PaymentForm key='manage' /> },
            { path: 'errors', element: <TestErrors /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: '*', element: <Navigate replace to='/not-found' /> }
        ]
    }
];

export const router = createBrowserRouter(routes);
