/**
 * Test script to verify Firestore connection and create a sample order
 * 
 * Usage:
 *   node test-firestore.js
 * 
 * Make sure you have:
 * 1. Created a Firestore database
 * 2. Set GOOGLE_APPLICATION_CREDENTIALS environment variable
 *    OR authenticated with gcloud CLI
 */

const { Firestore } = require('@google-cloud/firestore');

async function testFirestore() {
    console.log('🔍 Testing Firestore connection...\n');

    try {
        // Initialize Firestore
        const firestore = new Firestore();
        console.log('✅ Firestore client initialized');

        // Create a test order
        const testOrder = {
            orderId: `TEST-${Date.now()}`,
            createdAt: new Date().toISOString(),
            status: 'Pending - Awaiting Battery',
            customer: {
                name: 'Test User',
                email: 'test@example.com',
                phone: '+995 555 123 456',
                address: 'Test Address, Tbilisi, Georgia'
            },
            items: {
                product: 'Bosch 4Ah to Tesla 10Ah Upgrade',
                quantity: 1
            },
            pricing: {
                pricePerUnit: 149,
                totalPrice: 149,
                currency: 'USD'
            },
            isTest: true
        };

        console.log('\n📝 Creating test order...');
        await firestore.collection('orders').doc(testOrder.orderId).set(testOrder);
        console.log(`✅ Test order created: ${testOrder.orderId}`);

        // Read the order back
        console.log('\n📖 Reading test order...');
        const doc = await firestore.collection('orders').doc(testOrder.orderId).get();

        if (doc.exists) {
            console.log('✅ Test order retrieved successfully');
            console.log('\nOrder data:');
            console.log(JSON.stringify(doc.data(), null, 2));
        } else {
            console.log('❌ Test order not found');
        }

        // Query orders
        console.log('\n🔍 Querying all orders...');
        const snapshot = await firestore.collection('orders').limit(5).get();
        console.log(`✅ Found ${snapshot.size} order(s)`);

        snapshot.forEach(doc => {
            const data = doc.data();
            console.log(`\n  - ${doc.id}`);
            console.log(`    Customer: ${data.customer.name}`);
            console.log(`    Status: ${data.status}`);
            console.log(`    Created: ${data.createdAt}`);
        });

        // Clean up test order
        console.log('\n🧹 Cleaning up test order...');
        await firestore.collection('orders').doc(testOrder.orderId).delete();
        console.log('✅ Test order deleted');

        console.log('\n✨ All tests passed! Firestore is working correctly.\n');

    } catch (error) {
        console.error('\n❌ Error testing Firestore:', error.message);
        console.error('\nTroubleshooting tips:');
        console.error('1. Make sure you have created a Firestore database');
        console.error('2. Authenticate with: gcloud auth application-default login');
        console.error('3. Set your project: gcloud config set project YOUR_PROJECT_ID');
        console.error('4. Enable Firestore API: gcloud services enable firestore.googleapis.com\n');
        process.exit(1);
    }
}

// Run the test
testFirestore();
