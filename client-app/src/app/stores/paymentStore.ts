import { makeAutoObservable, runInAction } from 'mobx';
import { Payment } from '../models/payment';
import agent from '../api/agent';
import { v4 as uuid } from 'uuid';

export default class PaymentStore {
    paymentRegistry = new Map<string, Payment>();
    selectedPayment: Payment | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this);
    }

    get paymentsByDate() {
        return Array
            .from(this.paymentRegistry.values())
            .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    loadPayments = async () => {
        try {
            const payments = await agent.Payments.list();
            payments.forEach(payment => {
                payment.date = payment.date.split('T')[0];
                this.paymentRegistry.set(payment.id, payment);
            });
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectPayment = (id: string) => {
        this.selectedPayment = this.paymentRegistry.get(id);
    }

    cancelSelectedPayment = () => {
        this.selectedPayment = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectPayment(id) : this.cancelSelectedPayment();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
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
                // this.payments = [...this.payments.filter(p => p.id !== id)]
                this.paymentRegistry.delete(id);
                if (this.selectedPayment?.id === id) this.cancelSelectedPayment();
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
