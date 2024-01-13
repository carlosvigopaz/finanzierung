import { makeAutoObservable, runInAction } from 'mobx';
import { Payment } from '../models/payment';
import agent from '../api/agent';
import { v4 as uuid } from 'uuid';

export default class PaymentStore {
    paymentRegistry = new Map<string, Payment>();
    selectedPayment: Payment | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    get paymentsByDate() {
        return Array
            .from(this.paymentRegistry.values())
            .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    get groupedPayments() {
        return Object.entries(
            this.paymentsByDate.reduce((payments, payment) => {
                const date = payment.date;
                payments[date] = payments[date] ? [...payments[date], payment] : [payment];
                return payments;
            }, {} as {[key: string]: Payment[]})
        );
    }

    loadPayments = async () => {
        this.setLoadingInitial(true);
        try {
            const payments = await agent.Payments.list();
            payments.forEach(payment => {
                this.setPayment(payment);
            });
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadPayment = async (id: string) => {
        let payment = this.getPayment(id);
        if (payment) {
            this.selectedPayment = payment;
            return payment;
        } else {
            this.setLoadingInitial(true);
            try {
                payment = await agent.Payments.details(id);
                this.setPayment(payment);
                runInAction(() => this.selectedPayment = payment);
                this.setLoadingInitial(false);
                return payment;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setPayment = (payment: Payment) => {
        payment.date = payment.date.split('T')[0];
        this.paymentRegistry.set(payment.id, payment);
    }

    private getPayment = (id: string) => {
        return this.paymentRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createPayment = async (payment: Payment) => {
        this.loading = true;
        payment.id = uuid();
        try {
            await agent.Payments.create(payment);
            runInAction(() => {
                this.paymentRegistry.set(payment.id, payment);
                this.selectedPayment = payment;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    updatePayment = async (payment: Payment) => {
        this.loading = true;
        try {
            await agent.Payments.update(payment);
            runInAction(() => {
                this.paymentRegistry.set(payment.id, payment);
                this.selectedPayment = payment;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    deletePayment = async (id: string) => {
        this.loading = true;
        try {
            await agent.Payments.delete(id);
            runInAction(() => {
                this.paymentRegistry.delete(id);
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }

    }
}
