import { createContext, useContext } from 'react';
import PaymentStore from './paymentStore';

interface Store {
    paymentStore: PaymentStore;
}

export const store: Store = {
    paymentStore: new PaymentStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}