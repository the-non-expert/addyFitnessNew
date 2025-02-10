// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = "http://localhost:8000";


export async function createOrder(orderData) {
    try {
        const token = localStorage.getItem('token');
        console.log('Making request with:', {
            url: `${API_URL}/payments/create-order`,
            token: token ? 'Token exists' : 'No token',
            data: orderData
        });
        
        const response = await fetch(`${API_URL}/payments/create-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(orderData)
        });

        console.log(response)

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to create order');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

export async function verifyPayment(paymentData) {
    try {
        const response = await fetch(`${API_URL}/payments/verify-payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(paymentData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Payment verification failed');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

export async function getUserOrders() {
    try {
        const response = await fetch(`${API_URL}/payments/my-orders`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to fetch orders');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}