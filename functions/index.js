const functions = require('@google-cloud/functions-framework');
const { Firestore } = require('@google-cloud/firestore');

// Initialize Firestore
const firestore = new Firestore();

// Register the function with the specific name 'order-processor'
// This MUST match the _FUNCTION_NAME in your Cloud Build settings!
functions.http('order-processor', async (req, res) => {
    // 1. Handle CORS (Cross-Origin Resource Sharing)
    // This allows your website to talk to this backend function.
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
        return;
    }

    // 2. Ensure only POST requests are allowed
    if (req.method !== 'POST') {
        return res.status(405).send({ error: 'Method not allowed' });
    }

    try {
        // 3. Get the order data from the request
        const orderData = req.body;

        // Simple validation
        if (!orderData) {
            return res.status(400).send({ error: 'No order data provided' });
        }

        console.log("Received order:", JSON.stringify(orderData));

        // 4. Save the order to Firestore
        const orderRef = firestore.collection('orders').doc();
        const orderWithTimestamp = {
            ...orderData,
            orderId: orderRef.id,
            createdAt: new Date().toISOString(),
            status: 'Pending'
        };

        await orderRef.set(orderWithTimestamp);

        // 5. Send success response
        res.status(200).send({
            success: true,
            message: 'Order received',
            orderId: orderRef.id
        });

    } catch (error) {
        console.error("Error processing order:", error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});
