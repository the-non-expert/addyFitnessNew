// src/routes/my-orders/+page.js
import { getUserOrders } from '$lib/services/orders';
import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
    // Only run on browser
    if (!browser) {
        return {
            orders: [],
            error: null
        };
    }

    try {
        const orders = await getUserOrders();
        return {
            orders,
            error: null
        };
    } catch (err) {
        if (err.message.includes('401') || err.message.includes('unauthorized')) {
            throw redirect(307, '/signin');
        }
        
        console.error('Error loading orders:', err);
        return {
            orders: [],
            error: err.message || 'Failed to load orders'
        };
    }
};