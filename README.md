# Plasynex Multilingual Promo Site

Smart, global, precision manufacturing showcase for **Plasynex (Nanjing Wanjia Precision Injection Co., Ltd.)**. The site delivers full content in **English, Simplified Chinese, and Korean** with a built-in language switcher, responsive layout, and SEO-ready metadata.

## Tech Stack

- [Vite](https://vitejs.dev/) + [React 19](https://react.dev/) SPA routed with `react-router-dom`
- Vanilla CSS with CSS variables for the blue/gray corporate palette
- Custom language context + translation dictionary (no i18n dependency) and dynamic meta tag hook

## Project Structure

```
.
├── public/
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   └── LanguageSwitcher.jsx
│   ├── context/
│   │   └── LanguageContext.jsx
│   ├── data/
│   │   └── translations.js        # All EN/CN/KR content, SEO meta, CTA labels, etc.
│   ├── hooks/
│   │   └── usePageMetadata.js     # Updates <title>, meta description, and <html lang="">
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Manufacturing.jsx
│   │   ├── Products.jsx
│   │   └── Quality.jsx
│   ├── App.jsx
│   ├── index.css                  # Global theme, layout, responsive rules
│   └── main.jsx
├── index.html                     # Base SEO tags + theme color
├── package.json
└── vite.config.js
```

Each page consumes the translation dictionary so every visible string is localized, including navigation, CTA text, and the contact-form UI copy (non-functional by design).

## Local Development

```bash
npm install
npm run dev    # http://localhost:5173

npm run build  # production build in dist/
npm run preview
```

## Git & GitHub Workflow

```bash
git clone https://github.com/ssoe94/wj_promo
# copy/replace the generated project files into the repo

git add .
git commit -m "Initial multilingual static promo site"
git push origin main
```

## Render.com Deployment

1. Connect the GitHub repo to Render and create a **Static Site**.
2. Configuration:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist/`
3. Each push to `main` will trigger a new static deploy.

## GoDaddy Domain Binding

1. After Render issues a `onrender.com` hostname, add DNS records in GoDaddy:
   - **Apex/root domain (`example.com`)** – Create an **A record** pointing to Render’s static IP `216.24.57.1`.
   - **WWW or other subdomains** – Create **CNAME** records pointing to the Render-provided hostname (e.g., `your-site.onrender.com`).
2. Set TTL to **600 seconds (10 minutes)** for faster propagation during go-live.
3. Expect DNS propagation in **15 minutes to 1 hour**. Once the Render dashboard shows “Verified,” enable HTTPS.

## Image Placeholder Guide

| Location | Selector/Class | Suggested Replacement |
| --- | --- | --- |
| Home hero visual (large) | `.hero-placeholder.large` | High-resolution photo of Plasynex factory floor |
| Home hero visual (small) | `.hero-placeholder.small` | MES dashboard or production cell close-up |
| Factory snapshots cards | `.highlight-card` | Replace gradient cards with actual facility photos if desired |

All placeholders are clearly styled with dashed borders so designers can swap them with real media later.

## Optional Enhancements

1. **Dark Mode Toggle** – extend the CSS variables and store preference in `localStorage`.
2. **Animated Counters** – highlight press count, floor space, and PPAP success metrics on the home page.
3. **Advanced SEO** – generate structured data (`ld+json`) for products and organization schema.
4. **Hero Video Background** – embed a muted manufacturing reel with a blur overlay for performance.
5. **China-Friendly CDN Tips** – host static assets on a mainland-friendly CDN (Aliyun OSS, Baidu Cloud) and lazy-load fonts for faster access inside the firewall.

---

Need updates or new sections (case studies, sustainability, etc.)? Duplicate a page component and add new copy inside `src/data/translations.js`; the language switcher will pick it up automatically.*** End Patch
