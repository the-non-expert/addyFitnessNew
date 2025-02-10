import { paymentStore } from '$lib/stores/payment';
import { createOrder, verifyPayment } from '../services/paymentService';

export function loadRazorpay() {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
            console.log('Razorpay script loaded successfully');
            resolve(true);
        };
        script.onerror = () => {
            console.error('Failed to load Razorpay script');
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

export function initializeRazorpay(orderDetails, onSuccess) {
    const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderDetails.amount * 100, // Razorpay expects amount in paise
        currency: "INR",
        name: "ADDY FITNESS",
        description: orderDetails.title,
        order_id: orderDetails.order_id,
        handler: async function (response) {
            console.log('Payment response:', response); 
            try {
                // Verify payment
                const verificationData = {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature
                };
                
                const result = await verifyPayment(verificationData);
                console.log('Verification result:', result); // Debug log
                if (result.status === 'success') {
                    onSuccess(result);
                }
            } catch (error) {
                paymentStore.setError(error.message);
            }
        },
        // prefill: {
        //     name: localStorage.getItem('userName'),
        //     email: localStorage.getItem('userEmail'),
        //     contact: localStorage.getItem('userPhone')
        // },
        prefill: {
            name: "SAYED ADNAN ALI", // Hard code these for testing
            email: "addyfitness21@gmail.com",
            contact: "9778803677"
        },
        theme: {
            color: "#F472B6" // pink-400 color
        }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
}

export function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(price);
}

export function calculateTotalAmount(plan, selectedOptions) {
    // Add any additional calculations based on selected options
    return plan.price;
}