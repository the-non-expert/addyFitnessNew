// src/routes/healthcare/[service]/doctors/+page.js
import { doctors } from '$lib/stores/doctors';
import { error } from '@sveltejs/kit';

export function load({ params }) {
    const serviceSlug = params.service;
    const serviceDoctors = doctors[serviceSlug];
    
    if (!serviceDoctors) {
        throw error(404, 'Service not found');
    }

    return {
        doctors: serviceDoctors,
        service: serviceSlug
    };
}