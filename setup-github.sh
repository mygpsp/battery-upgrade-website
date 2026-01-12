#!/bin/bash

# GitHub Repository Setup Script
# This script helps you push your Battery Upgrade Website to GitHub

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  GitHub Repository Setup${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo -e "${YELLOW}Initializing Git repository...${NC}"
    git init
    git add .
    git commit -m "Initial commit: Battery Upgrade Website with Order System"
fi

echo -e "${GREEN}✅ Git repository is ready${NC}"
echo ""

# Get GitHub username
echo -e "${BLUE}Please enter your GitHub username:${NC}"
read -p "Username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo -e "${YELLOW}No username provided. Exiting.${NC}"
    exit 1
fi

# Repository name
REPO_NAME="battery-upgrade-website"

echo ""
echo -e "${BLUE}Repository Details:${NC}"
echo "  Username: $GITHUB_USERNAME"
echo "  Repository: $REPO_NAME"
echo "  URL: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo ""

# Check if remote already exists
if git remote | grep -q "origin"; then
    echo -e "${YELLOW}Remote 'origin' already exists. Removing it...${NC}"
    git remote remove origin
fi

# Add remote
echo -e "${BLUE}Adding GitHub remote...${NC}"
git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

echo -e "${GREEN}✅ Remote added successfully${NC}"
echo ""

# Instructions
echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}  IMPORTANT: Next Steps${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""
echo "1. Go to GitHub and create a new repository:"
echo "   ${BLUE}https://github.com/new${NC}"
echo ""
echo "2. Use these settings:"
echo "   - Repository name: ${GREEN}$REPO_NAME${NC}"
echo "   - Description: ${GREEN}Bilingual Next.js website for battery upgrade service${NC}"
echo "   - Visibility: ${GREEN}Private${NC} (recommended)"
echo "   - ${YELLOW}DO NOT${NC} initialize with README, .gitignore, or license"
echo ""
echo "3. After creating the repository, run:"
echo "   ${GREEN}git push -u origin main${NC}"
echo ""
echo -e "${YELLOW}========================================${NC}"
echo ""

# Ask if user wants to push now
read -p "Have you created the repository on GitHub? Push now? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo -e "${BLUE}Pushing to GitHub...${NC}"
    git branch -M main
    git push -u origin main
    
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  ✅ Success!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo "Your repository is now live at:"
    echo "${BLUE}https://github.com/$GITHUB_USERNAME/$REPO_NAME${NC}"
    echo ""
else
    echo ""
    echo -e "${YELLOW}No problem! When you're ready, run:${NC}"
    echo "  ${GREEN}git push -u origin main${NC}"
    echo ""
fi
