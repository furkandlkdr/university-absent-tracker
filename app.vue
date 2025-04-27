<template>
  <div class="min-h-screen">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const user = useState('user', () => null)
const isLoggedIn = computed(() => !!user.value)

const colorMode = useColorMode()

// Tema yönetimi değişkenleri
const currentHue = useState('theme-hue', () => {
  // Başlangıçta localStorage'dan değeri almaya çalış (varsayılan: 240)
  return process.client ? parseInt(localStorage.getItem('theme-hue') || '240') : 240
})

// Tema fonksiyonlarını global olarak erişilebilir yap
provide('themeHue', currentHue)
provide('setThemeHue', (hue: number) => {
  currentHue.value = hue
  document.documentElement.style.setProperty('--hue', hue.toString())
  if (process.client) {
    localStorage.setItem('theme-hue', hue.toString())
  }
})

// Renk modu değişikliği için fonksiyon
provide('setColorMode', (mode: 'light' | 'dark' | 'system') => {
  colorMode.preference = mode
  if (process.client) {
    localStorage.setItem('color-mode-preference', mode)
  }
})
</script>
