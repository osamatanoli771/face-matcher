# Face Matcher - 24/7 Deployment Guide

This guide will help you deploy your Face Matcher application 24/7 using **GitHub Pages** (frontend) and **Render** (backend).

## 🎯 Overview

- **Frontend**: Hosted on GitHub Pages (free, 24/7)
- **Backend**: Hosted on Render (free tier, 24/7)
- **Total Cost**: $0/month

---

## 📋 Prerequisites

1. A GitHub account
2. A Render account (sign up at [render.com](https://render.com))
3. Git installed on your computer

---

## 🚀 Step 1: Push Your Code to GitHub

### 1.1 Create a New GitHub Repository

1. Go to [github.com](https://github.com) and log in
2. Click the **+** icon in the top right → **New repository**
3. Name it `face-matcher` (or any name you prefer)
4. Make it **Public** (required for free GitHub Pages)
5. **Don't** initialize with README (we already have code)
6. Click **Create repository**

### 1.2 Push Your Code

Open Terminal in your project directory and run:

```bash
cd /Users/macbookairm2/.gemini/antigravity/scratch/face-matcher

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Face Matcher App"

# Add your GitHub repository as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/face-matcher.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🖥️ Step 2: Deploy Backend to Render

### 2.1 Create a New Web Service on Render

1. Go to [render.com](https://render.com) and log in
2. Click **New +** → **Web Service**
3. Connect your GitHub account if not already connected
4. Select your `face-matcher` repository
5. Configure the service:

   **Settings:**
   - **Name**: `face-matcher-api` (or any name)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`

   **Environment Variables:**
   - Click **Add Environment Variable**
   - Add: `FLASK_ENV` = `production`
   - Add: `PORT` = `10000` (Render default)

6. Select **Free** plan
7. Click **Create Web Service**

### 2.2 Wait for Deployment

- Render will build and deploy your backend (takes 5-10 minutes)
- Once deployed, you'll see a URL like: `https://face-matcher-api-xxxx.onrender.com`
- **Copy this URL** - you'll need it for the frontend!

### 2.3 Test Your Backend

Visit: `https://your-backend-url.onrender.com/api/health`

You should see:
```json
{
  "status": "healthy",
  "message": "Face matching API is running with DeepFace AI"
}
```

> **⚠️ Important**: Free Render services sleep after 15 minutes of inactivity. The first request after sleeping takes ~30 seconds to wake up.

---

## 🌐 Step 3: Deploy Frontend to GitHub Pages

### 3.1 Update Frontend API URL

1. Open `frontend/script.js`
2. Find line 3:
   ```javascript
   const API_URL = window.location.hostname === 'localhost' 
       ? 'http://localhost:5001' 
       : 'YOUR_RENDER_BACKEND_URL_HERE';
   ```
3. Replace `YOUR_RENDER_BACKEND_URL_HERE` with your Render backend URL (without trailing slash):
   ```javascript
   const API_URL = window.location.hostname === 'localhost' 
       ? 'http://localhost:5001' 
       : 'https://face-matcher-api-xxxx.onrender.com';
   ```
4. Save the file

### 3.2 Commit and Push Changes

```bash
git add frontend/script.js
git commit -m "Update API URL for production"
git push
```

### 3.3 Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** → **Pages** (in left sidebar)
3. Under **Build and deployment**:
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/frontend`
4. Click **Save**

### 3.4 Wait for Deployment

- GitHub will deploy your frontend (takes 1-2 minutes)
- Once ready, you'll see: **"Your site is live at https://YOUR_USERNAME.github.io/face-matcher/"**
- Click the URL to visit your live app!

---

## 🎉 Step 4: Test Your Live Application

1. Visit your GitHub Pages URL: `https://YOUR_USERNAME.github.io/face-matcher/`
2. Upload two face images
3. Click **Compare Faces**
4. Wait for results (first request may take 30-60 seconds if backend is sleeping)

---

## 🔧 Troubleshooting

### Backend Issues

**Problem**: Backend returns 500 error
- **Solution**: Check Render logs (Dashboard → Your Service → Logs)
- Common issue: Missing dependencies in `requirements.txt`

**Problem**: Backend is slow on first request
- **Solution**: This is normal for free Render services (they sleep after inactivity)
- Upgrade to paid plan ($7/month) for always-on service

### Frontend Issues

**Problem**: CORS errors in browser console
- **Solution**: Make sure `flask-cors` is installed in backend
- Check that backend URL in `script.js` is correct

**Problem**: GitHub Pages shows 404
- **Solution**: Wait a few minutes for deployment
- Check Settings → Pages to see deployment status
- Make sure you selected `/frontend` folder, not root

### Connection Issues

**Problem**: "Failed to connect to server"
- **Solution**: 
  1. Verify backend URL is correct in `script.js`
  2. Test backend health endpoint directly
  3. Check browser console for exact error

---

## 🔄 Making Updates

### Update Backend

```bash
# Make changes to backend files
git add backend/
git commit -m "Update backend"
git push
```

Render will automatically redeploy (takes 5-10 minutes).

### Update Frontend

```bash
# Make changes to frontend files
git add frontend/
git commit -m "Update frontend"
git push
```

GitHub Pages will automatically redeploy (takes 1-2 minutes).

---

## 💰 Cost Breakdown

| Service | Plan | Cost | Limitations |
|---------|------|------|-------------|
| GitHub Pages | Free | $0 | Public repos only, 100GB bandwidth/month |
| Render | Free | $0 | Sleeps after 15min inactivity, 750 hours/month |

**Total**: $0/month for 24/7 hosting! 🎉

---

## 🚀 Optional: Upgrade for Better Performance

### Render Paid Plan ($7/month)
- Always-on (no sleeping)
- Faster performance
- More resources

### Custom Domain
- Buy a domain (e.g., `facematcher.com`)
- Configure in GitHub Pages settings
- Add CNAME record in domain DNS

---

## 📝 Summary

You now have:
- ✅ Backend API running 24/7 on Render
- ✅ Frontend UI hosted 24/7 on GitHub Pages
- ✅ Automatic deployments on every git push
- ✅ Free hosting with no credit card required

**Your Live URLs:**
- Frontend: `https://YOUR_USERNAME.github.io/face-matcher/`
- Backend: `https://your-backend-url.onrender.com`

Share your frontend URL with anyone to use your Face Matcher app! 🎊
