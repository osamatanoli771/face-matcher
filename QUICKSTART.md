# Quick Start Guide - Face Matcher

## ⚠️ Important: Port Conflict Fixed

Your Mac's ControlCenter is using port 5000, so I've changed the backend to use **port 5001** instead.

## 🚀 Quick Setup (3 Steps)

### Step 1: Install Homebrew (if not installed)

Open Terminal and run:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**Note:** This will ask for your password (admin access required).

### Step 2: Install CMake

After Homebrew is installed:
```bash
brew install cmake
```

### Step 3: Install Python Dependencies

```bash
cd /Users/macbookairm2/.gemini/antigravity/scratch/face-matcher/backend
pip3 install -r requirements.txt
```

**Note:** This may take 5-10 minutes as it compiles the face recognition library.

---

## 🎯 Running the Application

### Option 1: Automated Script (Recommended)

```bash
cd /Users/macbookairm2/.gemini/antigravity/scratch/face-matcher
./start.sh
```

Then open: **http://localhost:8000**

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd /Users/macbookairm2/.gemini/antigravity/scratch/face-matcher/backend
python3 app.py
```

You should see:
```
🚀 Face Matching API Server Starting...
📍 Server running on http://localhost:5001
🔍 Ready to compare faces!
```

**Terminal 2 - Frontend:**
```bash
cd /Users/macbookairm2/.gemini/antigravity/scratch/face-matcher/frontend
python3 -m http.server 8000
```

Then open: **http://localhost:8000**

---

## 🐛 Troubleshooting

### "cmake not found"
**Solution:** Install CMake first (Step 2 above)

### "No module named 'flask'"
**Solution:** Install Python dependencies (Step 3 above)

### "Port already in use"
**Solution:** 
- Port 5000 conflict is already fixed (now using 5001)
- If port 8000 is busy, use a different port:
  ```bash
  python3 -m http.server 8080
  ```

### Homebrew installation asks for password
**Solution:** This is normal. Enter your Mac admin password.

---

## ✅ What I Fixed

1. **Port Conflict:** Changed backend from port 5000 → 5001 (macOS ControlCenter was using 5000)
2. **Updated Frontend:** Frontend now connects to port 5001
3. **Created This Guide:** Step-by-step instructions to get you running

---

## 📝 Current Status

- ✅ Code is ready
- ✅ Port conflict fixed
- ⏳ Need to install: Homebrew, CMake, Python packages
- ⏳ Then you can run the app!

---

## 🆘 Still Having Issues?

If you encounter any errors, please share:
1. The exact error message
2. Which step you're on
3. The output from the terminal

I'll help you resolve it!
