<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-white dark:bg-gray-800 shadow">
      <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="text-xl font-bold text-blue-600 dark:text-blue-400">
          Devamke
        </NuxtLink>
        
        <!-- Nav links for authenticated users -->
        <div v-if="isLoggedIn" class="flex items-center space-x-4">
          <NuxtLink to="/dashboard" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            Dönemlerim
          </NuxtLink>
          <button @click="handleLogout" class="text-red-600 dark:text-red-400 hover:underline">
            Çıkış Yap
          </button>
        </div>
        
        <!-- Nav links for guests -->
        <div v-else class="flex items-center space-x-4">
          <NuxtLink to="/login" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            Giriş Yap
          </NuxtLink>
          <NuxtLink to="/register" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            Kayıt Ol
          </NuxtLink>
        </div>
      </nav>
    </header>
    
    <main class="container mx-auto px-4 py-6 flex-grow">
      <slot />
    </main>
    
    <footer class="bg-white dark:bg-gray-800 shadow-inner mt-auto">
      <div class="container mx-auto px-4 py-4 text-center text-gray-600 dark:text-gray-400 text-sm">
        &copy; {{ new Date().getFullYear() }} Devamsızlık Takip Uygulaması
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'

const isLoggedIn = useState('user')
const router = useRouter()

// Handle user logout
const handleLogout = async () => {
  try {
    const auth = getAuth()
    await signOut(auth)
    // Reset user state
    useState('user').value = null
    // Redirect to home page
    router.push('/')
  } catch (error) {
    console.error('Error logging out:', error)
  }
}
</script>