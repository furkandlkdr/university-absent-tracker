<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-surface-light dark:bg-surface-dark shadow">
      <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="text-xl font-bold text-primary-600 dark:text-primary-400">
          UniTrack
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
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
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
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
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
        &copy; {{ new Date().getFullYear() }} Devamsızlık Takip Uygulaması
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