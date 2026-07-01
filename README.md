# Faran Rehmat — Portfolio
## How to make this LIVE (100% FREE)

---

### Option 1 — GitHub Pages (Recommended, free forever)

1. Go to https://github.com and create a free account
2. Click "New repository" → name it exactly: `yourusername.github.io`
3. Upload ALL files from this folder (keeping the folder structure)
4. Go to Settings → Pages → Source: main branch → Save
5. Your portfolio will be live at: https://yourusername.github.io

---

### Option 2 — Netlify (Drag & Drop, takes 60 seconds)

1. Go to https://netlify.com → Sign up free
2. Drag the entire portfolio folder onto the Netlify dashboard
3. Done! You get a free URL like: https://faran-portfolio.netlify.app
4. You can set a custom domain later (also free with Netlify subdomain)

---

### Option 3 — Vercel (Also free)

1. Go to https://vercel.com → Sign up free
2. Import from GitHub or drag & drop
3. Done!

---

## File Structure

```
faran-portfolio/
├── index.html          ← Main portfolio page (open this in browser)
├── css/
│   └── style.css       ← All styles
├── js/
│   ├── data.js         ← Your projects data (edit this to add projects)
│   ├── background.js   ← Three.js 3D animation
│   └── app.js          ← All portfolio logic
├── images/
│   ├── church-flyer.jpeg
│   ├── church-flyer2.png
│   ├── one-piece-pause.jpeg
│   ├── one-piece-players.jpeg
│   └── one-piece-loading.jpeg
└── README.md           ← This file
```

## Admin Panel

To manage your portfolio, scroll to the bottom and log in:
- Username: `admin`
- Password: `admin123`

**Important:** Change these credentials before going live!

## Adding New Projects

Open `js/data.js` and add a new object to the `defaultProjects` array:

```js
{
  id: 12,
  title: 'My New Project',
  cat: 'design',   // options: design, game, web, tool
  desc: 'Description of the project...',
  stack: ['Photoshop', 'Figma'],
  github: 'https://github.com/...',
  demo: 'https://...',
  images: ['images/myimage.jpg'],
  featured: true
}
```
