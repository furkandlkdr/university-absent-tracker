<template>
  <div class="flex flex-col items-center justify-center py-10">
    <div class="w-full max-w-md">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 class="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">Hesap Oluştur</h1>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-posta</label>
            <input id="email" v-model="email" type="email" required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="adiniz@example.com" />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Şifre</label>
            <input id="password" v-model="password" type="password" required minlength="6"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="En az 6 karakter" />
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Şifreyi
              Onayla</label>
            <input id="confirmPassword" v-model="confirmPassword" type="password" required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="Şifrenizi tekrar girin" />
          </div>

          <div v-if="error"
            class="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-2 rounded-md mt-4">
            {{ error }}
          </div>

          <button type="submit"
            class="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50"
            :disabled="loading || !isFormValid">
            <span v-if="loading">Kayıt yapılıyor...</span>
            <span v-else>Kayıt Ol</span>
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Zaten hesabınız var mı?
            <NuxtLink to="/login" class="font-medium text-primary-600 dark:text-primary-400 hover:underline">
              Giriş yapın
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { isLoggedIn, register } = useAuth()
const router = useRouter()

// If user is already logged in, redirect to dashboard
onMounted(() => {
  if (isLoggedIn.value) {
    router.push('/dashboard')
  }
})

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')

const isFormValid = computed(() => {
  return email.value &&
    password.value &&
    confirmPassword.value &&
    password.value === confirmPassword.value &&
    password.value.length >= 6
})

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Şifreler eşleşmiyor.'
    return
  }

  error.value = ''
  loading.value = true

  try {
    const result = await register(email.value, password.value)

    if (result.error) {
      error.value = 'Kayıt başarısız: ' + result.error
    } else {
      // Redirect to dashboard on successful registration
      router.push('/dashboard')
    }
  } catch (e: any) {
    error.value = e.message || 'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.'
  } finally {
    loading.value = false
  }
}
</script>