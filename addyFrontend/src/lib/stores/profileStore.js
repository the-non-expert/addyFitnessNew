// stores/profileStore.js
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { user } from './userStore';

const createProfileStore = () => {
    const defaultValue = {
        full_name: '',
        phone: '',
        address: '',
        height: '',
        weight: '',
        goals: '',
        medical_conditions: '',
        dietary_restrictions: '',
        emergency_contact_name: '',
        emergency_contact_number: '',
        preferred_workout_time: '',
        experience_level: ''
    };

    const { subscribe, set, update } = writable(defaultValue);

    return {
        subscribe,
        setProfile: (data) => {
            set(data);
        },
        updateField: (field, value) => {
            update(store => ({
                ...store,
                [field]: value
            }));
        },
        clear: () => set(defaultValue)
    };
};

export const profileStore = createProfileStore();

// Load profile data when user changes
user.subscribe(userData => {
    if (userData) {
        profileStore.setProfile(userData);
    } else {
        profileStore.clear();
    }
});