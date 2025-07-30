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
      title: "UnivTrack | Üniversite Devamsızlık Takipçisi",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Track your university course attendance with ease",
        },
        {
          name: "description",
          key: "description-tr",
          content: "Üniversite ders devamsızlığınızı kolayca takip edin",
        },
        // PWA meta tags
        { name: "theme-color", content: "#3b82f6" },
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-title", content: "UnivTrack" },
        { name: "apple-mobile-web-app-status-bar-style", content: "default" }
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        // PWA icons
        { rel: "manifest", href: "/manifest.json" }
      ],
      script: [
        {
          // Sayfa yüklenmeden önce tema rengini yükleyen script
          innerHTML: `
						(function() {
							var savedHue = localStorage.getItem("theme-hue") || "240";
							var savedColorMode = localStorage.getItem("color-mode-preference");
							
							// CSS değişkenini document'e ata
							document.documentElement.style.setProperty("--hue", savedHue);
							
							// Renk modu kontrolü
							if (savedColorMode === "dark" || 
								(savedColorMode === "system" && 
								window.matchMedia && 
								window.matchMedia("(prefers-color-scheme: dark)").matches)) {
								document.documentElement.classList.add("dark");
							}
						})();
					`,
          type: "text/javascript",
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
      name: 'UnivTrack - Üniversite Devamsızlık Takipçisi',
      short_name: 'UnivTrack',
      description: 'Üniversite ders devamsızlıklarınızı kolayca takip edin',
      theme_color: '#3b82f6',
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
          type: 'image/png'
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
