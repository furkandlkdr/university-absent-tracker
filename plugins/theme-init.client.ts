// Bu plugin, sayfa yüklenmeden önce tema değişkenlerini uygular
export default defineNuxtPlugin({
  name: "theme-init",
  enforce: "pre", // Diğer pluginlerden önce çalıştır
  setup() {
    if (process.client) {
      // localStorage'dan tema tercihlerini al
      const savedHue = localStorage.getItem("theme-hue") || "240";
      const savedColorMode = localStorage.getItem("color-mode-preference");

      // CSS değişkenini HTML elementine hemen uygula
      document.documentElement.style.setProperty("--hue", savedHue);

      // İlk yüklemede "flash of unstyled content" önlemek için inline stil ekle
      const inlineStyle = document.createElement("style");
      inlineStyle.textContent = `
        :root {
          --hue: ${savedHue};
        }
        
        /* Tema renklerini anında uygula */
        .text-primary-500 { color: oklch(68% 0.19 var(--hue)) !important; }
        .text-primary-600 { color: oklch(60% 0.20 var(--hue)) !important; }
        .text-primary-400 { color: oklch(76% 0.16 var(--hue)) !important; }
        
        .bg-primary-600 { background-color: oklch(60% 0.20 var(--hue)) !important; }
        .bg-primary-700 { background-color: oklch(52% 0.18 var(--hue)) !important; }
        
        .dark .text-primary-400 { color: oklch(76% 0.16 var(--hue)) !important; }
        .dark .text-primary-300 { color: oklch(84% 0.12 var(--hue)) !important; }
        
        /* Arkaplan renkleri */
        body { background-color: oklch(98% 0.003 var(--hue)); }
        .dark body { background-color: oklch(15% 0.008 var(--hue)); }
        
        /* Surface renkleri */
        .bg-surface-light { background-color: oklch(100% 0 0); }
        .dark .bg-surface-dark { background-color: oklch(22% 0.005 var(--hue)); }
      `;
      document.head.appendChild(inlineStyle);

      // 3 saniye sonra (sayfa yüklendikten sonra) bu geçici stili kaldır
      setTimeout(() => {
        if (document.head.contains(inlineStyle)) {
          document.head.removeChild(inlineStyle);
        }
      }, 3000);

      // Renk modunu body sınıfına ekle (dark mode için)
      if (savedColorMode === "dark") {
        document.documentElement.classList.add("dark");
      } else if (savedColorMode === "light") {
        document.documentElement.classList.remove("dark");
      } else {
        // System preference için
        if (
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
          document.documentElement.classList.add("dark");
        }
      }
    }
  },
});
