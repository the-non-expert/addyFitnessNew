import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const createCheckoutStore = () => {
    const defaultValue = {
        planData: null,
        planType: null, // 'training' or 'nutrition'
        selectedPlan: null,
        selectedTrainingType: null,
        selectedTimeSlot: null
    };

    const { subscribe, set, update } = writable(defaultValue);

    if (browser) {
        try {
            const stored = localStorage.getItem('checkoutData');
            if (stored) {
                set(JSON.parse(stored));
            }
        } catch (err) {
            console.error('Error loading checkout data:', err);
        }
    }

    return {
        subscribe,
        setPlanData: (data) => {
            if (browser) {
                try {
                    localStorage.setItem('checkoutData', JSON.stringify(data));
                } catch (err) {
                    console.error('Error saving checkout data:', err);
                }
            }
            set(data);
        },
        clear: () => {
            if (browser) {
                localStorage.removeItem('checkoutData');
            }
            set(defaultValue);
        }
    };
};

export const checkoutStore = createCheckoutStore();