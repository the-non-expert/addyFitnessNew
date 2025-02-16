// src/lib/stores/healthcareStore.js
import { writable } from 'svelte/store';

function createHealthcareStore() {
    const { subscribe, set, update } = writable({
        serviceData: null,
        appointmentDate: null,
        appointmentTime: null
    });

    return {
        subscribe,
        setServiceData: (data) => update(store => ({ ...store, serviceData: data })),
        setAppointmentDateTime: (date, time) => update(store => ({ 
            ...store, 
            appointmentDate: date,
            appointmentTime: time 
        })),
        clear: () => set({ serviceData: null, appointmentDate: null, appointmentTime: null })
    };
}

export const healthcareStore = createHealthcareStore();