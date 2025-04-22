// lib/services/appointment.js
import { post, put } from '../api';

export async function createAppointment(appointmentData, token) {  // Add token parameter
    try {
        const response = await post('/appointments', appointmentData, token);  // Pass token
        return response;
    } catch (error) {
        console.error('Error creating appointment:', error);
        throw error;
    }
}

export async function updateAppointment(id, data, token) {  // Add token parameter
    try {
        const response = await put(`/appointments/${id}`, data, token);  // Pass token
        return response;
    } catch (error) {
        console.error('Error updating appointment:', error);
        throw error;
    }
}