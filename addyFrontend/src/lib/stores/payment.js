import { writable } from 'svelte/store';

function createPaymentStore() {
    const { subscribe, set, update } = writable({
        isLoading: false,
        error: null,
        orderDetails: null,
        currentOrder: null
    });

    return {
        subscribe,
        startPayment: () => update(state => ({ ...state, isLoading: true, error: null })),
        setError: (error) => update(state => ({ ...state, error, isLoading: false })),
        setOrderDetails: (details) => update(state => ({ ...state, orderDetails: details, isLoading: false })),
        setCurrentOrder: (order) => update(state => ({ ...state, currentOrder: order })),
        reset: () => set({ isLoading: false, error: null, orderDetails: null, currentOrder: null })
    };
}

export const paymentStore = createPaymentStore();