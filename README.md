# 🎀 Ann's Birthday Website

A magical, sparkling birthday website built for the wonderful **Ann** — featuring floating particles, a live countdown clock, interactive cake, a full music player, polaroid gallery, and confetti bursts.

## ACCESS LINK: https://jack-ki1.github.io/ANN_BIRTHDAY/
---

## 📁 Project Structure

```
ann-birthday/
│
├── index.html                  ← Main page (open this in a browser)
│
├── css/
│   ├── style.css               ← All layout, animations, and section styles
│   └── player.css              ← Music player UI styles
│
├── js/
│   ├── particles.js            ← Floating emoji particle system + cursor
│   ├── confetti.js             ← Confetti burst system
│   ├── player.js               ← Full HTML5 Audio music player ⭐
│   └── main.js                 ← Countdown, cake/candles, scroll reveal, toasts
│
├── assets/
│   ├── music/
│   │   ├── README.txt          ← Instructions for adding MP3 files
│   │   ├── good-as-hell.mp3    ← (add your own MP3 here)
│   │   ├── girls-just-wanna.mp3
│   │   ├── diamonds.mp3
│   │   ├── shake-it-off.mp3
│   │   ├── run-the-world.mp3
│   │   ├── thank-u-next.mp3
│   │   └── love-on-top.mp3
│   │
│   └── images/
│       ├── README.txt          ← Instructions for adding photos
│       ├── photo-1.jpg         ← (add Ann's photos here)
│       ├── photo-2.jpg
│       ├── photo-3.jpg
│       ├── photo-4.jpg
│       └── photo-5.jpg
│
└── .github/
    └── workflows/
        └── deploy.yml          ← Auto-deploy to GitHub Pages on push
```

---

## 🎵 Adding Music

> GitHub Pages hosts static files, so you'll need to add your own MP3 files.

### Step 1 — Get your MP3 files
Download legally from:
- [Pixabay Music](https://pixabay.com/music/) — free, no attribution needed
- [Free Music Archive](https://freemusicarchive.org)
- [Jamendo](https://www.jamendo.com)
- Or use any MP3s you personally own

### Step 2 — Name and place them
Drop your `.mp3` files into `assets/music/` and name them:

| Filename | Song |
|---|---|
| `good-as-hell.mp3` | Good as Hell — Lizzo |
| `girls-just-wanna.mp3` | Girls Just Want to Have Fun — Cyndi Lauper |
| `diamonds.mp3` | Diamonds — Rihanna |
| `shake-it-off.mp3` | Shake It Off — Taylor Swift |
| `run-the-world.mp3` | Run the World (Girls) — Beyoncé |
| `thank-u-next.mp3` | Thank U, Next — Ariana Grande |
| `love-on-top.mp3` | Love On Top — Beyoncé |

### Step 3 — Or use completely different songs
Edit the `TRACKS` array at the top of `js/player.js`:

```js
const TRACKS = [
  {
    file:   'assets/music/my-song.mp3',  // filename in assets/music/
    title:  'My Song Title',
    artist: 'Artist Name',
    art:    '🎵',                         // emoji shown on artwork
    color:  'linear-gradient(135deg, #FF4E8E, #8B1A4A)',
  },
  // ... add as many as you like
];
```

> **Note:** If no MP3 files are found, the player UI still shows and a helpful notice appears. The page works fine without music.

---

## 📸 Adding Real Photos of Ann

### Step 1
Place Ann's photos into `assets/images/` named:
`photo-1.jpg`, `photo-2.jpg`, `photo-3.jpg`, `photo-4.jpg`, `photo-5.jpg`

### Step 2
In `index.html`, find the polaroid section and replace each emoji block:

**Before:**
```html
<div class="polaroid-img">🌸</div>
```

**After:**
```html
<div class="polaroid-img">
  <img src="assets/images/photo-1.jpg" alt="Ann">
</div>
```

Recommended: square crop images, at least 400×400px.

---

## 💌 Personalising the Text

All text is in `index.html`. Search for these sections to customise:

| What | Where in `index.html` |
|---|---|
| Hero subtitle | `.hero-message` paragraph |
| Birthday letter | `.letter-body` section |
| Wish card text | Each `.wish-text` paragraph |
| Memory board | Each `.memory-desc` paragraph |
| Candle labels | `.candle-label` spans |

---

## 🚀 Hosting on GitHub Pages (Free!)

### One-time setup

#### 1. Create a GitHub account
Go to [github.com](https://github.com) and sign up (it's free).

#### 2. Create a new repository
- Click the **+** icon → **New repository**
- Name it: `ann-birthday` (or anything you like)
- Set it to **Public** ✅
- Do **NOT** initialize with README (you already have one)
- Click **Create repository**

#### 3. Upload your files
**Option A — GitHub website (easiest):**
```
On the new repo page → click "uploading an existing file"
→ drag and drop your entire ann-birthday folder contents
→ write a commit message like "🎀 Initial birthday site"
→ click "Commit changes"
```

**Option B — Git command line:**
```bash
# Inside your ann-birthday folder:
git init
git add .
git commit -m "🎀 Happy Birthday Ann!"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ann-birthday.git
git push -u origin main
```

#### 4. Enable GitHub Pages
- Go to your repo on GitHub
- Click **Settings** → scroll to **Pages** (left sidebar)
- Under **Source** → select **GitHub Actions**
- The workflow in `.github/workflows/deploy.yml` will automatically run

#### 5. Get your live URL
After the action completes (~1 minute), your site is live at:
```
https://YOUR_USERNAME.github.io/ann-birthday/
```

> Share this link with Ann! 🎀

---

## 🔄 Updating the Site After Hosting

Every time you push a change to the `main` branch, GitHub Actions automatically redeploys the site within ~60 seconds.

```bash
# Make your changes, then:
git add .
git commit -m "Updated playlist / added photos"
git push
```

---

## 🛠️ Local Preview (No Server Needed for Most Things)

Just open `index.html` in a browser — everything works except:
- **Music**: browsers block local file audio by default. Use a simple local server:
  ```bash
  # Python (if installed):
  python -m http.server 8080
  # Then open: http://localhost:8080
  ```
  Or install the **Live Server** extension in VS Code.

---

## 🎨 Colour Reference

| Variable | Hex | Usage |
|---|---|---|
| `--rose` | `#FF4E8E` | Primary pink, buttons, headings |
| `--blush` | `#FFB3CF` | Light pink accents |
| `--petal` | `#FFD6E7` | Softest pink backgrounds |
| `--cream` | `#FFF5F8` | Page background |
| `--gold` | `#E8B86D` | Gold accents, countdown top bar |
| `--lavender` | `#C9A7FF` | Purple accents |
| `--lilac` | `#EDD9FF` | Soft purple backgrounds |
| `--deep` | `#8B1A4A` | Dark rose for headings |
| `--text` | `#4A1030` | Body text |

---

## ❓ Troubleshooting

| Problem | Fix |
|---|---|
| Music doesn't play | Add MP3 files to `assets/music/` with exact filenames |
| Site not showing on GitHub Pages | Check Settings → Pages → Source is set to "GitHub Actions" |
| Photos not showing | Check filenames match exactly (case-sensitive on Linux servers) |
| Cursor not showing | Custom cursor only works on desktop; auto-disabled on mobile |
| Page looks broken locally | Use a local server (`python -m http.server`) instead of opening the file directly |

---

Made with 💖 — Happy Birthday, Ann! 🎂
