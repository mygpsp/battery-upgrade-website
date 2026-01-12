# Quick Start Guide

Get your Battery Upgrade website up and running in minutes!

## 🚀 Local Development (5 minutes)

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install Cloud Function dependencies
cd functions
npm install
cd ..
```

### 2. Start the Development Servers

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Cloud Function (optional for testing orders):**
```bash
cd functions
npm start
```

### 3. Open Your Browser

Visit: **http://localhost:3000**

Test the order form at: **http://localhost:3000/order**

## 🌐 Production Deployment (15 minutes)

### Prerequisites

- Google Cloud Platform account
- `gcloud` CLI installed and authenticated
- Firestore database created (see [FIRESTORE_SETUP.md](./FIRESTORE_SETUP.md))

### Quick Deploy

```bash
# 1. Set your GCP project
gcloud config set project YOUR_PROJECT_ID

# 2. Run the deployment script
./deploy.sh
```

That's it! The script will:
- ✅ Deploy the Cloud Function
- ✅ Deploy the Next.js app to Cloud Run
- ✅ Configure environment variables automatically
- ✅ Provide you with the live website URL

### Manual Deploy (if you prefer)

**Deploy Cloud Function:**
```bash
cd functions
gcloud functions deploy submitOrder \
  --runtime nodejs20 \
  --trigger-http \
  --allow-unauthenticated \
  --region us-central1
cd ..
```

**Deploy Frontend:**
```bash
# Update .env.local with your Cloud Function URL
echo "NEXT_PUBLIC_ORDER_FUNCTION_URL=https://us-central1-PROJECT_ID.cloudfunctions.net/submitOrder" > .env.local

# Deploy to Cloud Run
gcloud run deploy battery-upgrade-website \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` in the root directory:

```bash
NEXT_PUBLIC_ORDER_FUNCTION_URL=https://REGION-PROJECT_ID.cloudfunctions.net/submitOrder
```

For local development, use:
```bash
NEXT_PUBLIC_ORDER_FUNCTION_URL=http://localhost:8080
```

### Translations

Edit the translation files to customize text:
- **English**: `public/locales/en.json`
- **Georgian**: `public/locales/ka.json`

### Styling

Customize the design in:
- **Global styles**: `app/globals.css`
- **Tailwind config**: `tailwind.config.js`

## 📊 Firestore Setup

See the detailed guide: [FIRESTORE_SETUP.md](./FIRESTORE_SETUP.md)

**Quick setup:**
```bash
# Enable Firestore API
gcloud services enable firestore.googleapis.com

# Create Firestore database
gcloud firestore databases create \
  --location=us-central1 \
  --type=firestore-native

# Deploy security rules
gcloud firestore deploy firestore.rules
```

## 🧪 Testing

### Test Firestore Connection

```bash
cd functions
node test-firestore.js
```

### Test Order Submission

1. Visit your website
2. Navigate to the Order page
3. Fill out the form with test data
4. Submit the order
5. Check Firestore console for the new order

### View Orders in Firestore

```bash
# List all orders
gcloud firestore documents list orders

# View a specific order
gcloud firestore documents describe orders/ORD-XXXXXXXX-XXXX
```

## 📱 Features Overview

### ✅ Implemented Features

- [x] Bilingual website (English/Georgian)
- [x] Responsive design (mobile, tablet, desktop)
- [x] Modern UI with animations and gradients
- [x] Order submission form with validation
- [x] Google Cloud Function backend
- [x] Firestore database integration
- [x] Order confirmation page
- [x] Automatic deployment with Cloud Build

### 🎯 Future Enhancements (Optional)

- [ ] Admin dashboard to manage orders
- [ ] Email notifications for new orders
- [ ] Payment integration (Stripe, PayPal)
- [ ] Order tracking system
- [ ] Customer portal to view order status
- [ ] Analytics and reporting

## 🛠️ Troubleshooting

### Issue: "Module not found" errors

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# For Cloud Function
cd functions
rm -rf node_modules package-lock.json
npm install
```

### Issue: Cloud Function returns 404

**Solution:**
- Verify the function is deployed: `gcloud functions list`
- Check the function URL in `.env.local`
- Ensure the function is in the correct region

### Issue: Orders not saving to Firestore

**Solution:**
- Verify Firestore database is created
- Check Cloud Function logs: `gcloud functions logs read submitOrder`
- Ensure security rules allow writes

### Issue: Website shows old content after deployment

**Solution:**
- Clear browser cache
- Wait a few minutes for Cloud Run to update
- Force refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

## 📚 Documentation

- [README.md](./README.md) - Complete documentation
- [FIRESTORE_SETUP.md](./FIRESTORE_SETUP.md) - Firestore setup guide
- [cloudbuild.yaml](./cloudbuild.yaml) - CI/CD configuration

## 🆘 Support

Need help? Check:
- [Next.js Documentation](https://nextjs.org/docs)
- [Google Cloud Functions](https://cloud.google.com/functions/docs)
- [Firestore Documentation](https://cloud.google.com/firestore/docs)

## 🎉 Success Checklist

- [ ] Local development server running
- [ ] Can view website at http://localhost:3000
- [ ] Language switcher works (EN ↔ ქარ)
- [ ] Order form validates input
- [ ] Firestore database created
- [ ] Cloud Function deployed
- [ ] Frontend deployed to Cloud Run
- [ ] Test order submitted successfully
- [ ] Order appears in Firestore console

**Congratulations! Your Battery Upgrade website is ready! 🚀**
