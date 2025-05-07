<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-surface-light dark:bg-surface-dark shadow">
      <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="text-xl font-bold text-primary-600 dark:text-primary-400">
          UnivTrack
        </NuxtLink>

        <!-- Navigasyon bağlantıları (oturum açmış kullanıcılar) -->
        <div v-if="isLoggedIn" class="flex items-center space-x-4">
          <NuxtLink to="/dashboard"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
            Dönemlerim
          </NuxtLink>
          <button @click="showThemeSelector = !showThemeSelector"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8.65 20.5L2.5 14.35q-.25-.25-.375-.55T2 13.175t.125-.625T2.5 12l5.75-5.725l-2.65-2.65L7.15 2l10 10q.25.25.363.55t.112.625t-.112.625t-.363.55L11 20.5q-.25.25-.55.375T9.825 21t-.625-.125t-.55-.375M9.825 7.85l-5.35 5.35h10.7zM19.8 21q-.9 0-1.525-.638T17.65 18.8q0-.675.338-1.275t.762-1.175L19.8 15l1.1 1.35q.4.575.75 1.175T22 18.8q0 .925-.65 1.563T19.8 21" />
            </svg>
          </button>
          <button @click="handleLogout" class="text-red-600 dark:text-red-400 hover:underline">
            Çıkış Yap
          </button>

          <!-- Tema Seçici Dropdown -->
          <div v-if="showThemeSelector" class="absolute right-4 top-16 z-10 mt-2" ref="themeSelectorRef">
            <ThemeSelector />
          </div>
        </div>

        <!-- Navigasyon bağlantıları (misafirler) -->
        <div v-else class="flex items-center space-x-4">
          <button @click="showThemeSelector = !showThemeSelector"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8.65 20.5L2.5 14.35q-.25-.25-.375-.55T2 13.175t.125-.625T2.5 12l5.75-5.725l-2.65-2.65L7.15 2l10 10q.25.25.363.55t.112.625t-.112.625t-.363.55L11 20.5q-.25.25-.55.375T9.825 21t-.625-.125t-.55-.375M9.825 7.85l-5.35 5.35h10.7zM19.8 21q-.9 0-1.525-.638T17.65 18.8q0-.675.338-1.275t.762-1.175L19.8 15l1.1 1.35q.4.575.75 1.175T22 18.8q0 .925-.65 1.563T19.8 21" />
            </svg>
          </button>

          <!-- Tema Seçici Dropdown -->
          <div v-if="showThemeSelector" class="absolute right-4 top-16 z-10 mt-2" ref="themeSelectorRef">
            <ThemeSelector />
          </div>

          <NuxtLink to="/login"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
            Giriş Yap
          </NuxtLink>
          <NuxtLink to="/register" class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md">
            Kayıt Ol
          </NuxtLink>
        </div>
      </nav>
    </header>

    <main class="container mx-auto px-4 py-6 flex-grow">
      <slot />
    </main>

    <footer class="bg-surface-light dark:bg-surface-dark shadow-inner mt-auto">
      <div class="container mx-auto px-4 py-4 text-center text-gray-600 dark:text-gray-400 text-sm">
      <p>Made with ❤️ by <a href="https://github.com/furkandlkdr" class="underline hover:text-primary-500 transition-colors">Nafair</a></p>
      <p>&copy; {{ new Date().getFullYear() }} UnivTrack</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'
import { onClickOutside } from '@vueuse/core'

const isLoggedIn = useState('user')
const router = useRouter()

// Tema seçici görünürlüğü
const showThemeSelector = ref(false)
const themeSelectorRef = ref(null)

// Dışarı tıklandığında tema seçiciyi kapat
onClickOutside(themeSelectorRef, () => {
  showThemeSelector.value = false
})

// Kullanıcı çıkış işlemi
const handleLogout = async () => {
  try {
    const auth = getAuth()
    await signOut(auth)
    // Kullanıcı durumunu sıfırla
    useState('user').value = null
    // Ana sayfaya yönlendir
    router.push('/')
  } catch (error) {
    console.error('Çıkış yapılırken hata oluştu:', error)
  }
}
</script>