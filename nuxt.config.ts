// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "@vite-pwa/nuxt"],
  css: ["~/assets/css/main.css"],
  colorMode: {
    preference: "system", // default theme
    fallback: "dark", // fallback theme
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "",
    storageKey: "nuxt-color-mode",
  },
  app: {
    head: {
      // ----- Title & description (EN) -----
      title: "UnivTrack - Free University Attendance Tracker | Student Absent Manager PWA",
      titleTemplate: "%s | UnivTrack",
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },

        // English SEO description (target keyword-rich)
        {
          name: "description",
          content:
            "UnivTrack is a free, open-source university attendance tracker and student absent manager. Track your college course attendance, set custom term lengths, and stay below the absence limit. PWA-ready, mobile-friendly, installable.",
        },
        {
          name: "keywords",
          content:
            "university attendance tracker, student absent manager, college attendance app, open source attendance tool, PWA attendance, course attendance tracker, absence tracker, school attendance app, attendance manager, student attendance, class attendance app, free attendance tracker, attendance PWA, mobile attendance app, university app, student productivity",
        },
        { name: "author", content: "Nafair (github.com/furkandlkdr)" },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { name: "googlebot", content: "index, follow" },
        { name: "application-name", content: "UnivTrack" },
        { name: "generator", content: "Nuxt 3" },
        { name: "rating", content: "general" },
        { name: "distribution", content: "global" },
        { name: "revisit-after", content: "7 days" },

        // Open Graph (Facebook / LinkedIn / Discord / Slack)
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "UnivTrack" },
        { property: "og:title", content: "UnivTrack - Free University Attendance Tracker PWA" },
        {
          property: "og:description",
          content:
            "Track your university course attendance with ease. UnivTrack is a free, open-source, mobile-first PWA for students.",
        },
        { property: "og:url", content: "https://univtrack.vercel.app/" },
        { property: "og:image", content: "https://univtrack.vercel.app/pwa-icons/android-chrome-512x512.png" },
        { property: "og:image:width", content: "512" },
        { property: "og:image:height", content: "512" },
        { property: "og:image:alt", content: "UnivTrack - University Attendance Tracker" },
        { property: "og:locale", content: "en_US" },
        { property: "og:locale:alternate", content: "tr_TR" },

        // Twitter Card
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "UnivTrack - Free University Attendance Tracker" },
        {
          name: "twitter:description",
          content: "Free, open-source, mobile-first PWA to track your university course attendance and avoid exceeding the absence limit.",
        },
        { name: "twitter:image", content: "https://univtrack.vercel.app/pwa-icons/android-chrome-512x512.png" },
        { name: "twitter:image:alt", content: "UnivTrack - University Attendance Tracker" },

        // PWA / Apple / Windows
        { name: "theme-color", content: "#3b82f6" },
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-title", content: "UnivTrack" },
        { name: "apple-mobile-web-app-status-bar-style", content: "default" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "msapplication-TileColor", content: "#3b82f6" },
        { name: "msapplication-config", content: "/browserconfig.xml" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/pwa-icons/apple-touch-icon.png" },
        { rel: "manifest", href: "/manifest.json" },
        { rel: "canonical", href: "https://univtrack.vercel.app/" },
        { rel: "alternate", hreflang: "en", href: "https://univtrack.vercel.app/?lang=en" },
        { rel: "alternate", hreflang: "tr", href: "https://univtrack.vercel.app/?lang=tr" },
        { rel: "alternate", hreflang: "x-default", href: "https://univtrack.vercel.app/" },
      ],
      script: [
        {
          // Inline init script: theme + i18n <html lang> pre-paint (avoids FOUC)
          innerHTML: `
						(function() {
							try {
								var savedHue = localStorage.getItem("theme-hue") || "240";
								var savedColorMode = localStorage.getItem("color-mode-preference");
								var savedLocale = localStorage.getItem("univtrack-locale");

								document.documentElement.style.setProperty("--hue", savedHue);

								if (savedColorMode === "dark" ||
									(savedColorMode === "system" &&
									window.matchMedia &&
									window.matchMedia("(prefers-color-scheme: dark)").matches)) {
									document.documentElement.classList.add("dark");
								}

								var lang = savedLocale;
								if (!lang) {
									var bl = (navigator.language || "").toLowerCase();
									lang = bl.indexOf("tr") === 0 ? "tr" : "en";
								}
								document.documentElement.setAttribute("lang", lang);
							} catch (e) { /* no-op */ }
						})();
					`,
          type: "text/javascript",
        },
        // JSON-LD structured data: WebSite + SoftwareApplication
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "UnivTrack",
            operatingSystem: "Web, Android, iOS, Windows, macOS",
            applicationCategory: "EducationalApplication",
            description:
              "Free, open-source university attendance tracker and student absent manager. Mobile-first PWA to track course attendance and avoid exceeding the absence limit.",
            url: "https://univtrack.vercel.app/",
            image: "https://univtrack.vercel.app/pwa-icons/android-chrome-512x512.png",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            author: {
              "@type": "Person",
              name: "Nafair",
              url: "https://github.com/furkandlkdr",
            },
            inLanguage: ["en", "tr"],
          }),
        },
      ],
      style: [
        {
          // Kritik CSS doğrudan head içinde tanımlanır
          innerHTML: `
						:root {
							--hue: 240;
						}
						
						html.dark {
							color-scheme: dark;
						}
						
						/* Tema renkleri */
						.text-primary-400 { color: oklch(76% 0.16 var(--hue)) !important; }
						.text-primary-500 { color: oklch(68% 0.19 var(--hue)) !important; }
						.text-primary-600 { color: oklch(60% 0.20 var(--hue)) !important; }
						.dark .text-primary-300 { color: oklch(84% 0.12 var(--hue)) !important; }
						.dark .text-primary-400 { color: oklch(76% 0.16 var(--hue)) !important; }
						
						.bg-primary-600 { background-color: oklch(60% 0.20 var(--hue)) !important; }
						.bg-primary-700 { background-color: oklch(52% 0.18 var(--hue)) !important; }
						
						body { 
							background-color: oklch(98% 0.003 var(--hue));
							color: oklch(30% 0.004 var(--hue));
						}
						
						.dark body { 
							background-color: oklch(15% 0.008 var(--hue)); 
							color: oklch(90% 0.008 var(--hue));
						}
					`,
          media: "all",
        },
      ],
    },
  },
  // Nuxt 3'te global middleware yapılandırması
  routeRules: {
    "/**": { appMiddleware: ["auth"] },
  },
  // For Vercel deployment
  nitro: {
    preset: "vercel",
  },
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
    },
    // Private keys for server-side only
    firebaseServiceAccount: process.env.FIREBASE_SERVICE_ACCOUNT,
  },
  // PWA configuration
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'UnivTrack - University Attendance Tracker',
      short_name: 'UnivTrack',
      description: 'Free, open-source university attendance tracker. Track your course absences and stay below the limit.',
      lang: 'en',
      dir: 'ltr',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      orientation: 'portrait',
      background_color: '#ffffff',
      theme_color: '#3b82f6',
      categories: ['education', 'productivity'],
      icons: [
        {
          src: 'pwa-icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: 'pwa-icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: 'pwa-icons/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  }
});
