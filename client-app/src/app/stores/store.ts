import { createContext, useContext } from 'react';
import PaymentStore from './paymentStore';
import CommonStore from './commonStore';

interface Store {
    paymentStore: PaymentStore;
    commonStore: CommonStore;
}

export const store: Store = {
    paymentStore: new PaymentStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}