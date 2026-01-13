# Cloud Build Configuration Guide

## ✅ Commit Successful!

Your updated Cloud Build configuration has been committed and pushed to GitHub.

**Commit**: `58f3565`  
**Message**: "Update Cloud Build configuration for Artifact Registry deployment"

---

## 📋 What Changed

The `cloudbuild.yaml` file has been updated to use **Google Artifact Registry** (the modern replacement for Container Registry) with a more streamlined deployment process.

### Key Improvements

1. **Docker Build & Push**: Builds and pushes the container image to Artifact Registry
2. **Proper Image Tagging**: Uses `COMMIT_SHA` for version tracking
3. **Simplified Deployment**: Cleaner, more maintainable configuration
4. **Cloud Function Integration**: Deploys backend function alongside frontend

---

## 🔧 Required Substitutions

The Cloud Build configuration uses **substitution variables** that need to be provided when running the build. Here are the required variables:

### Required Variables

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `PROJECT_ID` | Your Google Cloud Project ID | `my-project-123456` |
| `_REGION` | Deployment region | `us-central1` |
| `_ARTIFACT_REGISTRY_REPO` | Artifact Registry repository name | `battery-upgrade` |
| `_SERVICE_NAME` | Cloud Run service name | `battery-upgrade-website` |
| `_FUNCTION_NAME` | Cloud Function name | `submitOrder` |
| `COMMIT_SHA` | Git commit SHA (auto-provided by Cloud Build) | Auto-generated |

---

## 🚀 Deployment Steps

### Step 1: Create Artifact Registry Repository

Before deploying, create an Artifact Registry repository:

```bash
# Set your project
export PROJECT_ID=your-project-id
export REGION=us-central1

# Enable Artifact Registry API
gcloud services enable artifactregistry.googleapis.com

# Create repository
gcloud artifacts repositories create battery-upgrade \
  --repository-format=docker \
  --location=$REGION \
  --description="Docker repository for Battery Upgrade Website"
```

### Step 2: Deploy Using Cloud Build

#### Option A: Using gcloud command

```bash
gcloud builds submit \
  --config=cloudbuild.yaml \
  --substitutions=_REGION=us-central1,_ARTIFACT_REGISTRY_REPO=battery-upgrade,_SERVICE_NAME=battery-upgrade-website,_FUNCTION_NAME=submitOrder
```

#### Option B: Create a Cloud Build Trigger

1. Go to [Cloud Build Triggers](https://console.cloud.google.com/cloud-build/triggers)
2. Click "Create Trigger"
3. Configure:
   - **Name**: `deploy-battery-upgrade-website`
   - **Event**: Push to a branch
   - **Source**: Connect your GitHub repository
   - **Branch**: `^main$`
   - **Configuration**: Cloud Build configuration file
   - **Location**: `cloudbuild.yaml`
4. Add substitution variables:
   ```
   _REGION = us-central1
   _ARTIFACT_REGISTRY_REPO = battery-upgrade
   _SERVICE_NAME = battery-upgrade-website
   _FUNCTION_NAME = submitOrder
   ```
5. Click "Create"

Now, every push to the `main` branch will automatically trigger a deployment!

---

## 📊 Build Process

The Cloud Build process follows these steps:

### 1. Build Docker Image
```bash
docker build -t us-central1-docker.pkg.dev/PROJECT_ID/battery-upgrade/battery-upgrade-website:COMMIT_SHA .
```

### 2. Push to Artifact Registry
```bash
docker push us-central1-docker.pkg.dev/PROJECT_ID/battery-upgrade/battery-upgrade-website:COMMIT_SHA
```

### 3. Deploy Cloud Function
```bash
gcloud functions deploy submitOrder \
  --source=./functions \
  --runtime=nodejs20 \
  --trigger-http \
  --allow-unauthenticated \
  --region=us-central1
```

### 4. Deploy to Cloud Run
```bash
gcloud run deploy battery-upgrade-website \
  --image=us-central1-docker.pkg.dev/PROJECT_ID/battery-upgrade/battery-upgrade-website:COMMIT_SHA \
  --region=us-central1 \
  --allow-unauthenticated
```

---

## 🔐 Required Permissions

Ensure your Cloud Build service account has these permissions:

```bash
# Get the Cloud Build service account
export PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
export CLOUDBUILD_SA="${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com"

# Grant necessary roles
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${CLOUDBUILD_SA}" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${CLOUDBUILD_SA}" \
  --role="roles/cloudfunctions.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${CLOUDBUILD_SA}" \
  --role="roles/artifactregistry.writer"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${CLOUDBUILD_SA}" \
  --role="roles/iam.serviceAccountUser"
```

---

## 📝 Example: Complete Deployment

Here's a complete example from start to finish:

```bash
# 1. Set variables
export PROJECT_ID=my-battery-project
export REGION=us-central1

# 2. Set the project
gcloud config set project $PROJECT_ID

# 3. Enable required APIs
gcloud services enable \
  cloudbuild.googleapis.com \
  run.googleapis.com \
  cloudfunctions.googleapis.com \
  artifactregistry.googleapis.com \
  firestore.googleapis.com

# 4. Create Artifact Registry repository
gcloud artifacts repositories create battery-upgrade \
  --repository-format=docker \
  --location=$REGION \
  --description="Battery Upgrade Website"

# 5. Create Firestore database
gcloud firestore databases create \
  --location=$REGION \
  --type=firestore-native

# 6. Deploy using Cloud Build
gcloud builds submit \
  --config=cloudbuild.yaml \
  --substitutions=_REGION=$REGION,_ARTIFACT_REGISTRY_REPO=battery-upgrade,_SERVICE_NAME=battery-upgrade-website,_FUNCTION_NAME=submitOrder

# 7. Get the deployed URLs
echo "Cloud Run URL:"
gcloud run services describe battery-upgrade-website \
  --region=$REGION \
  --format='value(status.url)'

echo "Cloud Function URL:"
gcloud functions describe submitOrder \
  --region=$REGION \
  --format='value(httpsTrigger.url)'
```

---

## 🔍 Monitoring Builds

### View Build History

```bash
# List recent builds
gcloud builds list --limit=10

# View specific build
gcloud builds describe BUILD_ID

# Stream build logs
gcloud builds log BUILD_ID --stream
```

### View in Console

Go to: https://console.cloud.google.com/cloud-build/builds

---

## 🐛 Troubleshooting

### Issue: "Repository not found"

**Solution**: Create the Artifact Registry repository first
```bash
gcloud artifacts repositories create battery-upgrade \
  --repository-format=docker \
  --location=us-central1
```

### Issue: "Permission denied"

**Solution**: Grant Cloud Build service account the necessary permissions (see Required Permissions section above)

### Issue: "Firestore not initialized"

**Solution**: Create Firestore database
```bash
gcloud firestore databases create --location=us-central1 --type=firestore-native
```

### Issue: Build fails at Docker push

**Solution**: Ensure Artifact Registry API is enabled
```bash
gcloud services enable artifactregistry.googleapis.com
```

---

## 📚 Additional Resources

- [Cloud Build Documentation](https://cloud.google.com/build/docs)
- [Artifact Registry Documentation](https://cloud.google.com/artifact-registry/docs)
- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Cloud Functions Documentation](https://cloud.google.com/functions/docs)

---

## ✅ Next Steps

1. **Create Artifact Registry repository** (see Step 1 above)
2. **Set up Cloud Build trigger** (optional, for automatic deployments)
3. **Deploy your application** using `gcloud builds submit`
4. **Verify deployment** by visiting the Cloud Run URL
5. **Test order submission** to ensure everything works

---

## 🎯 Success Checklist

- [x] Cloud Build configuration updated
- [x] Changes committed to Git
- [x] Changes pushed to GitHub
- [ ] Artifact Registry repository created
- [ ] Cloud Build permissions configured
- [ ] Application deployed via Cloud Build
- [ ] Cloud Run service is live
- [ ] Cloud Function is deployed
- [ ] End-to-end testing completed

---

**Commit**: `58f3565`  
**Repository**: https://github.com/mygpsp/battery-upgrade-website  
**Status**: ✅ Ready for deployment

---

*Your Cloud Build configuration is now optimized for production deployment! 🚀*
