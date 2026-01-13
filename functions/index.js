const functions = require('@google-cloud/functions-framework');
const { Firestore } = require('@google-cloud/firestore');

// Detect if we're running locally (no GCP credentials)
const isLocal = !process.env.GOOGLE_APPLICATION_CREDENTIALS && !process.env.GCLOUD_PROJECT;

// Initialize Firestore only if not local
let firestore;
if (!isLocal) {
    try {
        firestore = new Firestore();
        console.log('✅ Firestore initialized');
    } catch (error) {
        console.warn('⚠️  Firestore initialization failed:', error.message);
    }
}

// In-memory storage for local development
const localOrders = [];

// Register the function with the specific name 'order-processor'
functions.http('order-processor', async (req, res) => {
    // 1. Handle CORS (Cross-Origin Resource Sharing)
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
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
        if (!orderData || !orderData.name || !orderData.email) {
            return res.status(400).send({
                error: 'Missing required fields',
                required: ['name', 'email', 'phone', 'address', 'quantity']
            });
        }

        console.log("📦 Received order:", JSON.stringify(orderData, null, 2));

        // Generate order ID
        const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        // Create order object
        const orderWithTimestamp = {
            ...orderData,
            orderId: orderId,
            createdAt: new Date().toISOString(),
            status: 'Pending - Awaiting Battery'
        };

        // 4. Save the order
        if (isLocal) {
            // Local development - save to memory
            localOrders.push(orderWithTimestamp);
            console.log('💾 Order saved locally (in-memory)');
            console.log(`📊 Total orders in memory: ${localOrders.length}`);
        } else {
            // Production - save to Firestore
            if (firestore) {
                const orderRef = firestore.collection('orders').doc(orderId);
                await orderRef.set(orderWithTimestamp);
                console.log('💾 Order saved to Firestore');
            } else {
                console.warn('⚠️  Firestore not available, order not persisted');
            }
        }

        // 5. Send success response
        console.log(`✅ Order processed successfully: ${orderId}`);

        res.status(200).send({
            success: true,
            message: 'Order received successfully',
            orderId: orderId,
            environment: isLocal ? 'local' : 'production'
        });

    } catch (error) {
        console.error("❌ Error processing order:", error);
        res.status(500).send({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

// Helper endpoint to view local orders (development only)
if (isLocal) {
    functions.http('view-orders', async (req, res) => {
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).send({
            total: localOrders.length,
            orders: localOrders
        });
    });
    console.log('🔧 Development mode: /view-orders endpoint available');
}

console.log(`🚀 Function starting in ${isLocal ? 'LOCAL' : 'PRODUCTION'} mode`);
