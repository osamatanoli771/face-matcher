# GitHub Authentication Guide

GitHub is asking for authentication when you try to push code. Here are your options:

## ✅ Option 1: GitHub Desktop (Recommended - Easiest)

**Best for**: Beginners, visual interface lovers

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Install and sign in with your GitHub account
3. Click **File** → **Add Local Repository**
4. Browse to: `/Users/macbookairm2/.gemini/antigravity/scratch/face-matcher`
5. Click **Publish repository**
   - Name: `face-matcher`
   - Make it **Public** (required for free GitHub Pages)
   - Uncheck "Keep this code private"
6. Click **Publish Repository**

Done! Your code is now on GitHub. 🎉

---

## Option 2: Personal Access Token (PAT)

**Best for**: Command line users

### Create Token

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **Generate new token** → **Generate new token (classic)**
3. Configure:
   - **Note**: `Face Matcher Deployment`
   - **Expiration**: 90 days
   - **Scopes**: ✅ Check **repo**
4. Click **Generate token**
5. **COPY THE TOKEN** (you won't see it again!)

### Use Token

```bash
cd /Users/macbookairm2/.gemini/antigravity/scratch/face-matcher

# Create repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/face-matcher.git
git push -u origin main

# When prompted:
# Username: YOUR_GITHUB_USERNAME
# Password: PASTE_YOUR_TOKEN_HERE
```

### Save Token (Optional)

To avoid entering it every time:

```bash
# macOS Keychain will save it automatically after first use
# Or use credential helper:
git config --global credential.helper osxkeychain
```

---

## Option 3: SSH Key (Most Secure)

**Best for**: Advanced users, long-term setup

### Generate SSH Key

```bash
# Generate new SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Press Enter to accept default location
# Press Enter twice for no passphrase (or set one for extra security)

# Copy public key to clipboard
pbcopy < ~/.ssh/id_ed25519.pub
```

### Add to GitHub

1. Go to [github.com/settings/keys](https://github.com/settings/keys)
2. Click **New SSH key**
3. Title: `MacBook Air M2`
4. Paste your key (already in clipboard)
5. Click **Add SSH key**

### Use SSH URL

```bash
cd /Users/macbookairm2/.gemini/antigravity/scratch/face-matcher

# Use SSH URL instead of HTTPS
git remote add origin git@github.com:YOUR_USERNAME/face-matcher.git
git push -u origin main
```

---

## Quick Comparison

| Method | Difficulty | Security | Best For |
|--------|-----------|----------|----------|
| GitHub Desktop | ⭐ Easy | Good | Beginners |
| Personal Token | ⭐⭐ Medium | Good | CLI users |
| SSH Key | ⭐⭐⭐ Advanced | Excellent | Developers |

---

## Troubleshooting

### "Repository not found"
- Make sure you created the repository on GitHub first
- Check the repository name matches exactly

### "Permission denied"
- Double-check your username
- Make sure you copied the token correctly
- Token must have **repo** scope enabled

### "Support for password authentication was removed"
- This means you tried using your GitHub password
- Use a Personal Access Token instead

---

## Next Steps After Pushing

Once your code is on GitHub:

1. ✅ Deploy backend to Render (see [DEPLOYMENT.md](file:///Users/macbookairm2/.gemini/antigravity/scratch/face-matcher/DEPLOYMENT.md))
2. ✅ Enable GitHub Pages for frontend
3. ✅ Update frontend with backend URL
4. 🎉 Your app is live!
