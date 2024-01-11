import axios, { AxiosResponse } from 'axios';
import { Payment } from '../models/payment';

const sleep = (delay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
};
axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
});

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: object = {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: object = {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody)
};

const Payments = {
    list: () => requests.get<Payment[]>('/payments'),
    details: (id: string) => requests.get<Payment>(`/payments/${id}`),
    create: (payment: Payment) => requests.post<void>('/payments', payment),
    update: (payment: Payment) => requests.put<void>(`/payments/${payment.id}`, payment),
    delete: (id: string) => requests.del<void>(`/payments/${id}`)
};

const agent = {
    Payments
}

export default agent;