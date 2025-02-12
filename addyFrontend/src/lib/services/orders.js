// src/lib/services/orders.js
import { get } from '$lib/api';

export async function getUserOrders() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const orders = await get('/payments/my-orders', token);
        return orders;
    } catch (error) {
        throw error;
    }
}

export async function getOrderById(orderId) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const order = await get(`/payments/${orderId}`, token);
        return order;
    } catch (error) {
        throw error;
    }
}