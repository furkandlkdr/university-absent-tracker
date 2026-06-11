<template>
  <div class="flex flex-col items-center justify-center py-10">
    <div class="w-full max-w-md">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 class="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">{{ t('login.title') }}</h1>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ t('login.email') }}</label>
            <input id="email" v-model="email" type="email" required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              :placeholder="t('login.emailPlaceholder')" />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ t('login.password') }}</label>
            <input id="password" v-model="password" type="password" required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              :placeholder="t('login.passwordPlaceholder')" />
          </div>

          <div class="text-right">
            <NuxtLink to="/forgot-password" class="text-sm text-primary-600 dark:text-primary-400 hover:underline">
              {{ t('login.forgotPassword') }}
            </NuxtLink>
          </div>

          <div v-if="error"
            class="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-2 rounded-md mt-4">
            {{ error }}
          </div>

          <div v-if="successMessage"
            class="bg-green-100 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-300 px-4 py-2 rounded-md mt-4">
            {{ successMessage }}
          </div>

          <button type="submit"
            class="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50"
            :disabled="loading">
            <span v-if="loading">{{ t('login.submitting') }}</span>
            <span v-else>{{ t('login.submit') }}</span>
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ t('home.noAccount') }}
            <NuxtLink to="/register" class="font-medium text-primary-600 dark:text-primary-400 hover:underline">
              {{ t('home.registerHere') }}
            </NuxtLink>
          </p>
        </div>
      </div>
      <!-- Warning Alert -->
      <div
        class="mt-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 dark:bg-yellow-900 dark:border-yellow-600 dark:text-yellow-200 rounded-md shadow">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p class="font-medium">{{ t('login.warningTitle') }}</p>
        </div>
        <p class="ml-8 text-sm mt-1">{{ t('login.warningDescription') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { isLoggedIn, login, authInitialized } = useAuth()
const { t } = useI18n()
const router = useRouter()

// Kullanıcı zaten giriş yapmışsa dashboard'a yönlendir
onMounted(() => {
  watchEffect(() => {
    if (authInitialized.value && isLoggedIn.value) {
      router.push('/dashboard')
    }
  })
})

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const successMessage = ref('')

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  try {
    const result = await login(email.value, password.value)

    if (result.error) {
      error.value = t('login.error')
    } else {
      // Başarılı girişten sonra dashboard'a yönlendir
      router.push('/dashboard')
    }
  } catch (e: any) {
    console.error('Giriş hatası:', e)
    error.value = e.message || t('login.genericError')
  } finally {
    loading.value = false
  }
}
</script>
