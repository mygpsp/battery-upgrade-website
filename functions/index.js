const functions = require('@google-cloud/functions-framework');
const { Firestore } = require('@google-cloud/firestore');

// Initialize Firestore
const firestore = new Firestore();
const ORDERS_COLLECTION = 'orders';

/**
 * Generates a unique order ID
 * Format: ORD-YYYYMMDD-XXXX
 */
function generateOrderId() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

    return `ORD-${year}${month}${day}-${random}`;
}

/**
 * Validates the order data
 */
function validateOrderData(data) {
    const errors = [];

    if (!data.name || typeof data.name !== 'string' || !data.name.trim()) {
        errors.push('Name is required');
    }

    if (!data.email || typeof data.email !== 'string' || !data.email.trim()) {
        errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Invalid email format');
    }

    if (!data.phone || typeof data.phone !== 'string' || !data.phone.trim()) {
        errors.push('Phone number is required');
    }

    if (!data.address || typeof data.address !== 'string' || !data.address.trim()) {
        errors.push('Address is required');
    }

    if (!data.quantity || typeof data.quantity !== 'number' || data.quantity < 1) {
        errors.push('Quantity must be at least 1');
    }

    return errors;
}

/**
 * HTTP Cloud Function to submit battery upgrade orders
 */
functions.http('submitOrder', async (req, res) => {
    // Set CORS headers
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    // Only accept POST requests
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed. Use POST.' });
        return;
    }

    try {
        const orderData = req.body;

        // Validate the order data
        const validationErrors = validateOrderData(orderData);
        if (validationErrors.length > 0) {
            res.status(400).json({
                error: 'Validation failed',
                details: validationErrors
            });
            return;
        }

        // Generate unique order ID
        const orderId = generateOrderId();

        // Create the order document
        const order = {
            orderId,
            createdAt: new Date().toISOString(),
            status: 'Pending - Awaiting Battery',
            customer: {
                name: orderData.name.trim(),
                email: orderData.email.trim().toLowerCase(),
                phone: orderData.phone.trim(),
                address: orderData.address.trim()
            },
            items: {
                product: 'Bosch 4Ah to Tesla 10Ah Upgrade',
                quantity: orderData.quantity
            },
            pricing: {
                pricePerUnit: 149,
                totalPrice: 149 * orderData.quantity,
                currency: 'USD'
            }
        };

        // Save to Firestore
        await firestore.collection(ORDERS_COLLECTION).doc(orderId).set(order);

        console.log(`Order created successfully: ${orderId}`);

        // Return success response
        res.status(201).json({
            success: true,
            orderId,
            message: 'Order submitted successfully'
        });

    } catch (error) {
        console.error('Error processing order:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to process order. Please try again later.'
        });
    }
});
