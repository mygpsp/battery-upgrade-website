# Battery Upgrade Website

A bilingual (English/Georgian) marketing website for Bosch 4Ah to Tesla 10Ah battery upgrade service, with integrated order submission system using Google Cloud's serverless architecture.

## 🚀 Features

- **Bilingual Support**: Full English and Georgian translations
- **Modern Design**: Premium dark theme with gradients, animations, and glassmorphism effects
- **Order Management**: Secure order submission with Google Cloud Functions
- **Database**: Firestore for scalable order storage
- **Serverless Architecture**: Fully serverless using Google Cloud Platform
- **Responsive**: Mobile-first design that works on all devices

## 📋 Prerequisites

- Node.js 20 or higher
- Google Cloud Platform account
- Google Cloud CLI (`gcloud`) installed and configured
- Firestore database set up in your GCP project

## 🏗️ Project Structure

```
www.batterrycharger/
├── app/                          # Next.js app directory
│   ├── components/               # React components
│   │   ├── Navigation.js         # Navigation bar with language switcher
│   │   └── Footer.js             # Footer component
│   ├── contexts/                 # React contexts
│   │   └── LanguageContext.js    # Language management context
│   ├── order/                    # Order page
│   │   └── page.js               # Order form
│   ├── order-success/            # Order success page
│   │   └── page.js               # Order confirmation
│   ├── layout.js                 # Root layout
│   ├── page.js                   # Home page
│   └── globals.css               # Global styles
├── functions/                    # Google Cloud Functions
│   ├── index.js                  # Order submission function
│   └── package.json              # Function dependencies
├── public/
│   └── locales/                  # Translation files
│       ├── en.json               # English translations
│       └── ka.json               # Georgian translations
├── cloudbuild.yaml               # Cloud Build configuration
├── Dockerfile                    # Docker configuration for Cloud Run
├── next.config.mjs               # Next.js configuration
├── package.json                  # Frontend dependencies
└── README.md                     # This file
```

## 🔧 Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install Cloud Function dependencies
cd functions
npm install
cd ..
```

### 2. Set Up Google Cloud Firestore

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project or create a new one
3. Navigate to **Firestore Database**
4. Click **Create Database**
5. Select **Native mode**
6. Choose a location (e.g., `us-central1`)
7. Click **Create**

### 3. Configure Firestore Security Rules

In the Firestore console, set up security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow Cloud Functions to write
    match /orders/{orderId} {
      allow read: if false;  // No public reads
      allow write: if request.auth != null || request.time != null;
    }
  }
}
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp env.example .env.local
```

For local development, the default `http://localhost:8080` will work when running the Cloud Function locally.

For production, update with your deployed Cloud Function URL:
```
NEXT_PUBLIC_ORDER_FUNCTION_URL=https://REGION-PROJECT_ID.cloudfunctions.net/submitOrder
```

## 🚀 Running Locally

### Run the Frontend

```bash
npm run dev
```

The website will be available at `http://localhost:3000`

### Run the Cloud Function Locally

In a separate terminal:

```bash
cd functions
npm start
```

The Cloud Function will be available at `http://localhost:8080`

### Test the Order Submission

1. Navigate to `http://localhost:3000/order`
2. Fill out the order form
3. Submit the order
4. You should be redirected to the success page with an order ID

## 📦 Deployment

### Option 1: Automated Deployment with Cloud Build

This will deploy both the frontend and backend automatically:

```bash
# Set your GCP project ID
export PROJECT_ID=your-project-id

# Submit the build
gcloud builds submit --config=cloudbuild.yaml \
  --substitutions=_REGION=us-central1,PROJECT_ID=$PROJECT_ID
```

### Option 2: Manual Deployment

#### Deploy the Cloud Function

```bash
cd functions

gcloud functions deploy submitOrder \
  --runtime nodejs20 \
  --trigger-http \
  --allow-unauthenticated \
  --region us-central1 \
  --entry-point submitOrder

cd ..
```

After deployment, note the Function URL and update your `.env.local`:

```
NEXT_PUBLIC_ORDER_FUNCTION_URL=https://us-central1-PROJECT_ID.cloudfunctions.net/submitOrder
```

#### Deploy the Frontend to Cloud Run

```bash
# Build and deploy
gcloud run deploy battery-upgrade-website \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 3000 \
  --set-env-vars NEXT_PUBLIC_ORDER_FUNCTION_URL=https://us-central1-PROJECT_ID.cloudfunctions.net/submitOrder
```

## 🗄️ Firestore Data Structure

Orders are stored in the `orders` collection with the following structure:

```json
{
  "orderId": "ORD-20260115-1234",
  "createdAt": "2026-01-15T10:00:00Z",
  "status": "Pending - Awaiting Battery",
  "customer": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+995 555 123 456",
    "address": "123 Main St, Tbilisi, Georgia"
  },
  "items": {
    "product": "Bosch 4Ah to Tesla 10Ah Upgrade",
    "quantity": 1
  },
  "pricing": {
    "pricePerUnit": 149,
    "totalPrice": 149,
    "currency": "USD"
  }
}
```

### Order Statuses

- `Pending - Awaiting Battery`: Initial status when order is created
- `In Progress`: Battery upgrade is being performed
- `Shipped Back`: Upgraded battery has been shipped to customer
- `Completed`: Order is complete

## 🌍 Adding/Modifying Translations

Translations are stored in JSON files:

- English: `public/locales/en.json`
- Georgian: `public/locales/ka.json`

To add a new translation:

1. Add the key-value pair to both files
2. Use the translation in your component: `t('your.translation.key')`

Example:
```javascript
import { useLanguage } from '../contexts/LanguageContext';

function MyComponent() {
  const { t } = useLanguage();
  return <h1>{t('hero.title')}</h1>;
}
```

## 🔐 Security Considerations

1. **Firestore Rules**: The default rules only allow writes from authenticated sources. For production, consider implementing Cloud Function authentication.

2. **CORS**: The Cloud Function is configured to accept requests from any origin. For production, update the CORS settings to only allow your domain:

```javascript
res.set('Access-Control-Allow-Origin', 'https://yourdomain.com');
```

3. **Rate Limiting**: Consider implementing rate limiting on the Cloud Function to prevent abuse.

4. **Input Validation**: The Cloud Function validates all input data before saving to Firestore.

## 📊 Monitoring Orders

To view orders in Firestore:

1. Go to the [Firestore Console](https://console.cloud.google.com/firestore)
2. Navigate to the `orders` collection
3. View individual order documents

For production, consider building an admin dashboard to manage orders.

## 🛠️ Development

### Tech Stack

- **Frontend**: Next.js 15, React, Tailwind CSS
- **Backend**: Google Cloud Functions (Node.js 20)
- **Database**: Google Firestore
- **Hosting**: Google Cloud Run
- **CI/CD**: Google Cloud Build

### Key Dependencies

- `next`: React framework
- `react`: UI library
- `tailwindcss`: Utility-first CSS framework
- `@google-cloud/firestore`: Firestore SDK
- `@google-cloud/functions-framework`: Cloud Functions framework

## 📝 License

Copyright © 2026 BatteryUpgrade. All rights reserved.

## 🤝 Support

For questions or support, contact:
- Email: info@batteryupgrade.ge
- Phone: +995 555 123 456
