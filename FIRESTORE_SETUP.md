# Firestore Setup Guide

This guide will walk you through setting up Google Cloud Firestore for the Battery Upgrade website.

## Prerequisites

- Google Cloud Platform account
- `gcloud` CLI installed and authenticated
- A GCP project created

## Step 1: Enable Required APIs

```bash
# Set your project ID
export PROJECT_ID=your-project-id

# Set the project
gcloud config set project $PROJECT_ID

# Enable required APIs
gcloud services enable firestore.googleapis.com
gcloud services enable cloudfunctions.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

## Step 2: Create Firestore Database

### Option A: Using gcloud CLI

```bash
# Create Firestore database in Native mode
gcloud firestore databases create \
  --location=us-central1 \
  --type=firestore-native
```

### Option B: Using Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to **Firestore Database** (search in the top bar)
4. Click **Create Database**
5. Select **Native mode**
6. Choose a location (e.g., `us-central1`)
7. Click **Create**

## Step 3: Configure Firestore Security Rules

Create or update your Firestore security rules:

```bash
# Create a firestore.rules file (already included in the project)
gcloud firestore deploy indexes firestore.rules
```

Or manually in the console:

1. Go to **Firestore Database** → **Rules**
2. Replace the content with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Orders collection - only allow server-side writes
    match /orders/{orderId} {
      // No public reads for privacy
      allow read: if false;
      
      // Allow writes from Cloud Functions (authenticated requests)
      // or any request with valid timestamp (server-side)
      allow write: if request.auth != null || request.time != null;
    }
  }
}
```

3. Click **Publish**

## Step 4: Create Firestore Indexes (Optional)

For better query performance, create indexes:

```bash
# Create a firestore.indexes.json file
cat > firestore.indexes.json << 'EOF'
{
  "indexes": [
    {
      "collectionGroup": "orders",
      "queryScope": "COLLECTION",
      "fields": [
        {
          "fieldPath": "status",
          "order": "ASCENDING"
        },
        {
          "fieldPath": "createdAt",
          "order": "DESCENDING"
        }
      ]
    },
    {
      "collectionGroup": "orders",
      "queryScope": "COLLECTION",
      "fields": [
        {
          "fieldPath": "customer.email",
          "order": "ASCENDING"
        },
        {
          "fieldPath": "createdAt",
          "order": "DESCENDING"
        }
      ]
    }
  ]
}
EOF

# Deploy indexes
gcloud firestore indexes create --database=(default) --field-config=firestore.indexes.json
```

## Step 5: Test Firestore Connection

You can test the Firestore connection using the Node.js script:

```bash
cd functions
npm install
node test-firestore.js
```

## Step 6: Grant Permissions to Cloud Functions

Ensure your Cloud Functions have permission to access Firestore:

```bash
# Get the Cloud Functions service account
export FUNCTION_SA=$(gcloud iam service-accounts list \
  --filter="displayName:Cloud Functions Service Account" \
  --format="value(email)")

# Grant Firestore permissions
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$FUNCTION_SA" \
  --role="roles/datastore.user"
```

## Step 7: Verify Setup

After deploying your Cloud Function, you can verify the setup by:

1. Submitting a test order through the website
2. Checking Firestore console for the new order document
3. Viewing Cloud Function logs:

```bash
gcloud functions logs read submitOrder --region=us-central1 --limit=50
```

## Firestore Data Structure

### Orders Collection

Collection: `orders`

Document ID: Auto-generated (e.g., `ORD-20260112-1234`)

Document Structure:
```json
{
  "orderId": "ORD-20260112-1234",
  "createdAt": "2026-01-12T18:00:00Z",
  "status": "Pending - Awaiting Battery",
  "customer": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+995 555 123 456",
    "address": "123 Main St, Tbilisi, Georgia"
  },
  "items": {
    "product": "Bosch 4Ah to Tesla 10Ah Upgrade",
    "quantity": 2
  },
  "pricing": {
    "pricePerUnit": 149,
    "totalPrice": 298,
    "currency": "USD"
  }
}
```

## Querying Orders

### Using gcloud CLI

```bash
# List all orders
gcloud firestore documents list orders

# Get a specific order
gcloud firestore documents describe orders/ORD-20260112-1234
```

### Using Node.js

```javascript
const { Firestore } = require('@google-cloud/firestore');
const firestore = new Firestore();

// Get all orders
const snapshot = await firestore.collection('orders').get();
snapshot.forEach(doc => {
  console.log(doc.id, '=>', doc.data());
});

// Get orders by status
const pendingOrders = await firestore
  .collection('orders')
  .where('status', '==', 'Pending - Awaiting Battery')
  .get();

// Get orders by customer email
const customerOrders = await firestore
  .collection('orders')
  .where('customer.email', '==', 'john@example.com')
  .get();
```

## Monitoring and Maintenance

### View Firestore Usage

```bash
# View Firestore metrics
gcloud monitoring dashboards list
```

### Backup Firestore Data

```bash
# Export all Firestore data
gcloud firestore export gs://your-backup-bucket/firestore-backup
```

### Clean Up Test Data

```bash
# Delete a specific order
gcloud firestore documents delete orders/ORD-20260112-1234
```

## Troubleshooting

### Issue: "Permission denied" when writing to Firestore

**Solution**: Ensure the Cloud Function service account has the `roles/datastore.user` role.

### Issue: Orders not appearing in Firestore

**Solution**: 
1. Check Cloud Function logs for errors
2. Verify the Cloud Function URL is correct in `.env.local`
3. Check CORS settings in the Cloud Function

### Issue: "Database not found"

**Solution**: Ensure you created the Firestore database in Native mode (not Datastore mode).

## Cost Estimation

Firestore pricing (as of 2026):
- **Stored data**: $0.18/GB/month
- **Document reads**: $0.06 per 100,000 documents
- **Document writes**: $0.18 per 100,000 documents
- **Document deletes**: $0.02 per 100,000 documents

For a small business with ~100 orders/month:
- Storage: ~1MB = $0.0002/month
- Writes: 100 = $0.0002/month
- **Total**: Less than $0.01/month

Firestore has a generous free tier:
- 1 GB storage
- 50,000 reads/day
- 20,000 writes/day
- 20,000 deletes/day

## Next Steps

1. ✅ Create Firestore database
2. ✅ Configure security rules
3. ✅ Deploy Cloud Function
4. ✅ Test order submission
5. 📊 Build admin dashboard (optional)
6. 📧 Set up email notifications (optional)
7. 📊 Set up monitoring and alerts (optional)

## Additional Resources

- [Firestore Documentation](https://cloud.google.com/firestore/docs)
- [Cloud Functions Documentation](https://cloud.google.com/functions/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firestore Pricing](https://cloud.google.com/firestore/pricing)
