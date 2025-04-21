// src/lib/stores/healthcareStore.js
import { writable } from 'svelte/store';

function createHealthcareStore() {
    const { subscribe, set, update } = writable({
        serviceData: null,
        selectedDoctor: null,
        appointmentDate: null,
        appointmentTime: null
    });

    return {
        subscribe,
        setServiceData: (data) => update(store => ({ ...store, serviceData: data })),
        setSelectedDoctor: (doctor) => update(store => ({ ...store, selectedDoctor: doctor })),
        setAppointmentDateTime: (date, time) => update(store => ({ 
            ...store, 
            appointmentDate: date,
            appointmentTime: time 
        })),
        clear: () => set({ 
            serviceData: null, 
            selectedDoctor: null,
            appointmentDate: null, 
            appointmentTime: null 
        })
    };
}

export const healthcareStore = createHealthcareStore();