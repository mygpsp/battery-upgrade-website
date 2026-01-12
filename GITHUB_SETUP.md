# GitHub Repository Setup Instructions

Your code has been successfully committed to Git! Now you need to create a GitHub repository and push your code.

## ✅ What's Been Done

- ✅ Git repository initialized
- ✅ All project files committed
- ✅ Commit message: "Initial commit: Battery Upgrade Website with Order System"
- ✅ 29 files committed (2,808 insertions)

## 🚀 Next Steps: Create GitHub Repository

### Option 1: Using GitHub Web Interface (Recommended)

1. **Go to GitHub**: Visit [https://github.com/new](https://github.com/new)

2. **Create New Repository**:
   - **Repository name**: `battery-upgrade-website`
   - **Description**: `Bilingual Next.js website for battery upgrade service with Google Cloud Run and Firestore integration`
   - **Visibility**: Choose **Private** (recommended) or Public
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)

3. **Click "Create repository"**

4. **Push Your Code**:
   
   After creating the repository, GitHub will show you commands. Use these:

   ```bash
   # Add the remote repository
   git remote add origin https://github.com/YOUR_USERNAME/battery-upgrade-website.git
   
   # Push your code
   git branch -M main
   git push -u origin main
   ```

   Replace `YOUR_USERNAME` with your actual GitHub username.

### Option 2: Using GitHub CLI (If Installed)

If you have GitHub CLI installed, you can create the repository directly:

```bash
# Install GitHub CLI (if not installed)
brew install gh

# Authenticate with GitHub
gh auth login

# Create repository and push
gh repo create battery-upgrade-website \
  --private \
  --description "Bilingual Next.js website for battery upgrade service with Google Cloud Run and Firestore integration" \
  --source=. \
  --push
```

## 📋 Repository Details

**Recommended Settings**:
- **Name**: `battery-upgrade-website`
- **Description**: `Bilingual Next.js website for battery upgrade service with Google Cloud Run and Firestore integration`
- **Visibility**: Private (contains business logic and configuration)
- **Topics/Tags**: `nextjs`, `google-cloud`, `firestore`, `bilingual`, `battery-upgrade`, `serverless`

## 🔐 Important: Environment Variables

**DO NOT commit** `.env.local` files with sensitive data. The `.gitignore` file is already configured to exclude:
- `.env*` files
- `node_modules`
- `.next` build directory
- Cloud Function dependencies

## ✅ Verification

After pushing, verify your repository contains:

```
battery-upgrade-website/
├── app/                      # Next.js frontend
├── functions/                # Cloud Functions
├── public/locales/           # Translations
├── cloudbuild.yaml           # CI/CD config
├── Dockerfile                # Container config
├── deploy.sh                 # Deployment script
├── README.md                 # Documentation
├── QUICKSTART.md             # Quick start guide
├── FIRESTORE_SETUP.md        # Database setup
└── PROJECT_SUMMARY.md        # Project overview
```

## 🎯 After Pushing to GitHub

1. **Enable GitHub Actions** (optional):
   - Go to repository Settings → Actions
   - Enable workflows if you want CI/CD

2. **Add Repository Secrets** (for automated deployment):
   - Go to Settings → Secrets and variables → Actions
   - Add `GCP_PROJECT_ID`
   - Add `GCP_SA_KEY` (service account key)

3. **Set Up Branch Protection** (recommended):
   - Go to Settings → Branches
   - Add rule for `main` branch
   - Require pull request reviews

## 📝 Quick Reference Commands

```bash
# Check current status
git status

# View commit history
git log --oneline

# View remote repository
git remote -v

# Push changes (after initial setup)
git push

# Pull latest changes
git pull

# Create a new branch
git checkout -b feature/your-feature-name

# Switch back to main
git checkout main
```

## 🆘 Troubleshooting

### Issue: "Permission denied (publickey)"

**Solution**: Set up SSH keys or use HTTPS with personal access token
```bash
# Use HTTPS instead
git remote set-url origin https://github.com/YOUR_USERNAME/battery-upgrade-website.git
```

### Issue: "Repository not found"

**Solution**: Make sure you created the repository on GitHub and the URL is correct
```bash
# Check remote URL
git remote -v

# Update if needed
git remote set-url origin https://github.com/YOUR_USERNAME/battery-upgrade-website.git
```

## 🎉 Success!

Once pushed, your repository will be live at:
```
https://github.com/YOUR_USERNAME/battery-upgrade-website
```

You can then:
- Share the repository with team members
- Set up automated deployments
- Track issues and features
- Collaborate with others

---

**Need help?** Check the [GitHub Documentation](https://docs.github.com/en/get-started/quickstart/create-a-repo)
