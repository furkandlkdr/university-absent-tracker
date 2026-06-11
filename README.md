# UnivTrack — Free University Attendance Tracker PWA

> A mobile-first, open-source **university attendance tracker** and **student absent manager** for college and high-school students. Installable, offline-capable, multilingual (English 🇬🇧 & Turkish 🇹🇷), and free forever.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](#)
[![PWA Ready](https://img.shields.io/badge/PWA-installable-5A0FC8.svg)](#-core-features)
[![i18n](https://img.shields.io/badge/i18n-EN%20%7C%20TR-1f6feb.svg)](#-multilingual)
[![Made with Nuxt 3](https://img.shields.io/badge/Nuxt-3-00DC82.svg)](https://nuxt.com)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-FFCA28.svg)](https://firebase.google.com)
[![Responsive](https://img.shields.io/badge/responsive-mobile%20%7C%20tablet%20%7C%20desktop-blueviolet.svg)](#-responsive-uiux-preview)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#-contributing)
[![Stars](https://img.shields.io/github/stars/furkandlkdr/university-absent-tracker?style=social)](https://github.com/furkandlkdr/university-absent-tracker/stargazers)

[**Live Demo**](https://univtrack.vercel.app/) · [**Report Bug**](https://github.com/furkandlkdr/university-absent-tracker/issues) · [**Request Feature**](https://github.com/furkandlkdr/university-absent-tracker/issues)

---

## 📚 Table of Contents

- [🎯 Introduction](#-introduction)
- [✨ Core Features](#-core-features)
- [🎓 Key Benefits for Students](#-key-benefits-for-students)
- [🖼️ Responsive UI/UX Preview](#-responsive-uiux-preview)
- [🌍 Multilingual](#-multilingual)
- [⚙️ Tech Stack](#-tech-stack)
- [🚀 Getting Started (Local Setup)](#-getting-started-local-setup)
- [☁️ Deployment](#-deployment)
- [📁 Project Structure](#-project-structure)
- [🌐 SEO & Internationalization](#-seo--internationalization)
- [🧪 Development & Testing](#-development--testing)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [💖 Acknowledgements](#-acknowledgements)

---

## 🎯 Introduction

**UnivTrack** is a free, open-source, mobile-first **college attendance app** that helps students track their course attendance, calculate their absence counts in real time, and stay safely below the absence limit. It is built with **Nuxt 3**, **Vue 3**, **Firebase**, and **Tailwind CSS**, deployed on **Vercel**, and runs as a fully **installable PWA** (Progressive Web App) on Android, iOS, Windows, macOS, and Linux.

> **Why UnivTrack?** Most universities expose attendance policies through dense web portals or hand-written spreadsheets. UnivTrack gives every student a personal, privacy-first, mobile attendance manager that lives in their pocket and updates in real time.

**Target keywords:** _university attendance tracker_, _student absent manager_, _college attendance app_, _open source attendance tool_, _PWA attendance_, _absence tracker_, _school attendance app_, _student productivity_.

---

## ✨ Core Features

- 🔐 **Secure Authentication** — Email + password sign-up and login powered by **Firebase Authentication**.
- 🗓️ **Term Management** — Create unlimited academic terms with custom names, start dates, and term lengths (5–18 weeks).
- 📅 **Custom Weekly Schedule** — Define up to 5 morning + 5 afternoon course slots per day (Mon–Fri).
- ✅ **Daily Attendance Marking** — Tap to mark each class as _Attended_, _Absent_, or _Holiday / No Class_.
- 👆 **Long-Press Bulk Updates** — Long-press any status button to retroactively mark several previous weeks of the same course in a single gesture.
- 📊 **Dynamic Absence Statistics** — Live `X / Y` format (absences ÷ available weeks, excluding holidays) per course.
- 🚨 **Automatic Absence Warnings** — Courses approaching or exceeding the absence limit are highlighted in red.
- 🔒 **Read-Only Completed Terms** — Once a term's final week has passed, it becomes read-only to preserve history.
- 🎨 **Material-You Theming** — Pick from a live color hue slider, plus Light / Dark / System color modes.
- 📱 **Progressive Web App (PWA)** — Install to your home screen, get an app icon, full-screen mode, and offline shell.
- ⚡ **Lightning-Fast SPA Feel** — Single-page Vue 3 application with route-level code splitting.
- 🌍 **i18n out of the box** — English 🇬🇧 and Turkish 🇹🇷 translations with automatic browser language detection.

---

## 🎓 Key Benefits for Students

- **Never exceed the absence limit again.** Real-time warnings surface at-risk courses the moment you fall behind.
- **Works offline.** Once installed as a PWA, the app shell loads instantly even without internet.
- **Your data, your control.** All data is stored in your own Firebase project — no third-party ads, no tracking.
- **One tap to log an entire week.** Long-press bulk updates turn minutes of bookkeeping into one gesture.
- **Beautiful on every device.** Mobile-first responsive layout that scales gracefully to tablet and desktop.
- **Free forever.** MIT-licensed and 100 % open source.

---

## 🖼️ Responsive UI/UX Preview

> Replace the placeholders below with real screenshots from your project before publishing.

### 📱 Mobile (PWA home screen)

<!-- Add screenshot: ![Mobile home](docs/screenshots/mobile-home.png) -->

```
┌─────────────────────────┐
│  UnivTrack        EN ▾  │
│                         │
│   University            │
│   Attendance Tracker    │
│   App                   │
│                         │
│   ✦ Easy schedule       │
│   ✦ Custom term length  │
│   ✦ Auto warnings       │
│   ✦ PWA installable     │
│                         │
│   [ Sign up ] [ Login ] │
└─────────────────────────┘
```

### 🖥️ Desktop (Dashboard)

<!-- Add screenshot: ![Desktop dashboard](docs/screenshots/desktop-dashboard.png) -->

```
┌──────────────────────────────────────────────────────────────┐
│ UnivTrack       My Terms    [Theme] [EN ▾]  [Log out]        │
├──────────────────────────────────────────────────────────────┤
│  My Terms                                  [ + Add New Term ]│
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐              │
│  │ 2025 Spr.  │  │ 2025 Fall  │  │ 2024 Spr.  │              │
│  │ Active     │  │ Active     │  │ Completed  │              │
│  │ 6 courses  │  │ 5 courses  │  │ 7 courses  │              │
│  │ View Edit  │  │ View Edit  │  │ View       │              │
│  └────────────┘  └────────────┘  └────────────┘              │
└──────────────────────────────────────────────────────────────┘
```

### 🗓️ Term Detail (Weekly Calendar + Status Buttons)

<!-- Add screenshot: ![Term detail](docs/screenshots/term-detail.png) -->

```
Week 3 — 03.02-09.02
┌──────────────────────────────────────────────┐
│ Mon 03 Feb — Algorithms                     │
│   [ Attended ] [ Absent ] [ Holiday ]        │
├──────────────────────────────────────────────┤
│ Tue 04 Feb — Linear Algebra                 │
│   [ Attended ] [ Absent ] [ Holiday ]        │
└──────────────────────────────────────────────┘
```

> Tip: capture screenshots at 375×812 (mobile), 768×1024 (tablet), and 1440×900 (desktop) for crisp previews.

---

## 🌍 Multilingual

UnivTrack ships with first-class **internationalization (i18n)** support:

| Language | Code | Status |
| -------- | ---- | ------ |
| 🇬🇧 English | `en` | Default |
| 🇹🇷 Türkçe  | `tr` | Default for `tr-*` browsers |

**Detection order:**

1. `localStorage.univtrack-locale` (explicit user choice wins)
2. `navigator.language` (browser preference)
3. `tr-*` browsers → Turkish, all others → English

**Responsive switcher:**

- **Desktop** — Globe icon (🌐) + current language code opens a clean dropdown.
- **Mobile / Tablet** — Compact `EN | TR` segmented toggle with 36 px+ touch targets.

Adding a new language is trivial — drop a new JSON file in [`i18n/locales/`](i18n/locales/) and register it in [`composables/useI18n.ts`](composables/useI18n.ts).

---

## ⚙️ Tech Stack

| Layer       | Technology                                                              |
| ----------- | ----------------------------------------------------------------------- |
| Framework   | [Nuxt 3](https://nuxt.com) + [Vue 3](https://vuejs.org) (Composition API) |
| Language    | [TypeScript](https://www.typescriptlang.org)                             |
| Styling     | [Tailwind CSS](https://tailwindcss.com) + custom Material-You tokens     |
| State       | [VueUse](https://vueuse.org) composables + `useState`                    |
| Auth        | [Firebase Authentication](https://firebase.google.com/products/auth)     |
| Database    | [Cloud Firestore](https://firebase.google.com/products/firestore)       |
| PWA         | [`@vite-pwa/nuxt`](https://vite-pwa-org.netlify.app/) + Workbox         |
| Deployment  | [Vercel](https://vercel.com) (Nitro preset)                              |
| Analytics   | [Vercel Analytics](https://vercel.com/analytics) (opt-in)                |
| i18n        | Custom lightweight composable + JSON dictionaries                        |

---

## 🚀 Getting Started (Local Setup)

### 1. Prerequisites

- **Node.js 18.x or 20.x** (LTS recommended)
- **npm**, **yarn**, or **pnpm**
- A free [Firebase](https://console.firebase.google.com/) account

### 2. Clone & Install

```bash
git clone https://github.com/furkandlkdr/university-absent-tracker.git
cd university-absent-tracker

# Pick your favorite package manager
npm install
# or
yarn install
# or
pnpm install
```

### 3. Configure Firebase

1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication → Sign-in method → Email/Password**.
3. Enable **Firestore Database** (start in production mode and set up rules — see [Firebase security rules docs](https://firebase.google.com/docs/firestore/security/get-started)).
4. Register a **Web app** inside your project's settings and copy the config keys.

### 4. Configure Environment Variables

Create a `.env` file at the project root (it is already in `.gitignore`):

```dotenv
# Public keys (safe to ship to the browser)
NUXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NUXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NUXT_PUBLIC_FIREBASE_APP_ID=1:...:web:...

# Server-only (NEVER expose)
NUXT_FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}
```

> 💡 On Vercel, add the same variables under **Project Settings → Environment Variables** and select the production environment.

### 5. Run the Dev Server

```bash
npm run dev
# or yarn dev / pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and start tracking your attendance!

### 6. Build for Production

```bash
npm run build
npm run preview      # local preview of the production build
# or
npm run generate     # static site generation (SSG)
```

---

## ☁️ Deployment

UnivTrack uses the **Vercel Nitro preset** out of the box (`nuxt.config.ts` → `nitro.preset = 'vercel'`).

### One-Click Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffurkandlkdr%2Funiversity-absent-tracker)

Or manually:

```bash
npm i -g vercel
vercel login
vercel --prod
```

Don't forget to set the Firebase env variables in your Vercel project settings.

---

## 📁 Project Structure

```
university-absent-tracker/
├── app.vue                  # Root component (theme provider)
├── nuxt.config.ts           # SEO meta, PWA, modules, runtime config
├── tailwind.config.js
├── tsconfig.json
├── assets/
│   └── css/main.css
├── components/
│   ├── LanguageSwitcher.vue # Responsive EN | TR + globe dropdown
│   ├── OnboardingGuide.vue  # First-run 4-step tour
│   └── ThemeSelector.vue    # Color hue + Light/Dark/System
├── composables/
│   ├── useAuth.ts           # Firebase Auth wrapper
│   ├── useDatabase.ts       # Firestore CRUD
│   ├── useI18n.ts           # Lightweight i18n engine ⭐
│   └── useLongPress.ts      # Touch + mouse long-press gesture
├── i18n/
│   └── locales/             # JSON dictionaries
│       ├── en.json
│       └── tr.json
├── layouts/
│   └── default.vue          # Header (with LanguageSwitcher) + footer
├── middleware/
│   └── auth.ts              # Route guard
├── pages/
│   ├── index.vue            # Landing page
│   ├── login.vue
│   ├── register.vue
│   ├── forgot-password.vue
│   ├── dashboard.vue        # My Terms
│   └── terms/[id].vue       # Term detail + attendance
├── plugins/
│   ├── firebase.client.ts
│   └── theme-init.client.ts
├── public/
│   ├── manifest.json        # PWA manifest
│   └── pwa-icons/
└── types/
    └── nuxt.d.ts
```

---

## 🌐 SEO & Internationalization

UnivTrack is **search-engine optimized** for global discovery.

| Asset                  | Location                                                          |
| ---------------------- | ----------------------------------------------------------------- |
| Meta title + desc      | `nuxt.config.ts` → `app.head`                                     |
| Open Graph + Twitter   | `nuxt.config.ts` → `app.head.meta`                                |
| JSON-LD structured data| `nuxt.config.ts` → `app.head.script` (`SoftwareApplication`)      |
| `hreflang` alternates  | `nuxt.config.ts` → `app.head.link` (`en`, `tr`, `x-default`)      |
| Canonical URL          | `nuxt.config.ts` → `app.head.link[rel=canonical]`                 |
| PWA manifest           | `public/manifest.json` (multilingual, `lang: en`, `dir: ltr`)     |
| `<html lang="…">`      | Set pre-paint via inline init script in `nuxt.config.ts`           |
| `robots.txt`           | `public/robots.txt`                                               |
| Sitemap-ready          | Dynamic routes (`/`, `/login`, `/dashboard`, `/terms/[id]`)       |

### SEO Title & Description (English)

```html
<title>UnivTrack - Free University Attendance Tracker | Student Absent Manager PWA</title>
<meta name="description" content="UnivTrack is a free, open-source university attendance tracker and student absent manager. Track your college course attendance, set custom term lengths, and stay below the absence limit. PWA-ready, mobile-friendly, installable." />
<meta name="keywords" content="university attendance tracker, student absent manager, college attendance app, open source attendance tool, PWA attendance, course attendance tracker, absence tracker, school attendance app, attendance manager, student attendance, class attendance app, free attendance tracker, attendance PWA, mobile attendance app, university app, student productivity" />
```

### SEO Title & Description (Turkish)

```html
<title>UnivTrack - Ücretsiz Üniversite Devamsızlık Takipçisi | Öğrenci Yoklama Yöneticisi PWA</title>
<meta name="description" content="UnivTrack; üniversite öğrencileri için ücretsiz, açık kaynaklı bir devamsızlık takipçisi ve yoklama yöneticisidir. Ders devamsızlıklarınızı takip edin, dönem uzunluğunuzu özelleştirin ve devamsızlık sınırını aşmayın. PWA olarak yüklenebilir, mobil uyumlu." />
<meta name="keywords" content="üniversite devamsızlık takipçisi, öğrenci yoklama yöneticisi, devamsızlık uygulaması, açık kaynak devamsızlık aracı, PWA devamsızlık, ders yoklama, devamsızlık sayacı, okul devamsızlık uygulaması, öğrenci uygulaması, üniversite uygulaması" />
```

---

## 🧪 Development & Testing

```bash
npm run dev          # Dev server with HMR
npm run build        # Production build
npm run preview      # Preview the production build
npm run generate     # Static site generation
```

Recommended IDE: **VS Code** with the [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. **Any contributions you make are greatly appreciated** 💖

### Ways to contribute

- 🐛 **Report a bug** — open an [issue](https://github.com/furkandlkdr/university-absent-tracker/issues) with reproduction steps.
- 💡 **Suggest a feature** — start a discussion in the [Ideas](https://github.com/furkandlkdr/university-absent-tracker/discussions) tab.
- 🌍 **Add a new language** — copy `i18n/locales/en.json`, translate it, and submit a PR.
- 🎨 **Improve the UI/UX** — fix spacing, animations, accessibility.
- 📚 **Improve the docs** — typos, examples, GIFs, screenshots.
- 💻 **Submit a PR** — fork → feature branch → commit → push → open a PR.

### Local contribution workflow

1. Fork the project
2. Create your feature branch:
   ```bash
   git checkout -b feat/amazing-feature
   ```
3. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat: add Spanish locale 🇪🇸"
   ```
4. Push to your branch:
   ```bash
   git push origin feat/amazing-feature
   ```
5. Open a Pull Request describing the motivation, changes, and screenshots (if UI).

> 👋 **Calling all student developers!** This project is intentionally simple to get started with. Look for [`good first issue`](https://github.com/furkandlkdr/university-absent-tracker/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) tags.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for the full text.

```
MIT License

Copyright (c) 2024 Nafair (github.com/furkandlkdr)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND...
```

---

## 💖 Acknowledgements

- [Nuxt](https://nuxt.com) team for an outstanding meta-framework.
- [Firebase](https://firebase.google.com) for serverless auth and database.
- [Vercel](https://vercel.com) for zero-config hosting and analytics.
- The amazing open-source community for the libraries and inspiration.

Built with ❤️ by **[Nafair](https://github.com/furkandlkdr)** — and a lot of help from the GitHub Copilot & Claude 3 Sonnet agents.

---

<sub>⭐ If this project helped you, please consider giving it a star — it helps other students find it!</sub>
