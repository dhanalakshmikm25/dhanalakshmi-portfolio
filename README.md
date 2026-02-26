# DKM Portfolio — Deployment Guide

## 🚀 Quick Start (Local)

```bash
cd portfolio
npm install
npm start
```

Open http://localhost:3000

---

## 🌐 Deploy to Vercel (Recommended — Easiest)

1. Push this folder to a GitHub repo
2. Go to https://vercel.com → "Add New Project"
3. Import your GitHub repo
4. Vercel auto-detects React → click **Deploy**
5. You get a free URL like `https://dkm-portfolio.vercel.app`

**Custom domain**: Vercel Dashboard → Settings → Domains → add your domain.

---

## 🌐 Deploy to Netlify

1. Push to GitHub
2. Go to https://netlify.com → "Add new site" → "Import from Git"
3. Build command: `npm run build` | Publish dir: `build`
4. Click **Deploy Site**
5. Free URL like `https://dkm-portfolio.netlify.app`

---

## 🌐 Deploy to GitHub Pages

1. In `package.json`, add this field (replace YOUR_USERNAME):
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/portfolio"
   ```
2. Push to GitHub
3. Run:
   ```bash
   npm install
   npm run deploy
   ```
4. In GitHub repo → Settings → Pages → Source: `gh-pages` branch
5. Live at `https://YOUR_USERNAME.github.io/portfolio`

---

## ✏️ Customizing

- **Your info**: Edit `src/App.jsx` — update the `projects`, `experience`, `skills` arrays at the top
- **LinkedIn/GitHub links**: Search for `href: "#"` in `App.jsx` and replace with your actual URLs
- **Profile photo**: Add an `<img>` in the Hero section (optional)
- **Contact form**: Currently shows a success message. To actually send emails, integrate [EmailJS](https://emailjs.com) (free) or [Formspree](https://formspree.io)

---

## 📦 Project Structure

```
portfolio/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx       ← All portfolio code lives here
│   └── index.js      ← React entry point
├── package.json
└── README.md
```
