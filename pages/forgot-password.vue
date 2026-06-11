<template>
  <div class="flex flex-col items-center justify-center py-10">
    <div class="w-full max-w-md">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 class="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">{{ t('forgotPassword.title') }}</h1>

        <div v-if="success"
          class="bg-green-100 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-300 px-4 py-2 rounded-md mb-4">
          {{ t('forgotPassword.successMessage') }}
        </div>

        <template v-else>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            {{ t('forgotPassword.description') }}
          </p>

          <form @submit.prevent="handleResetPassword" class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ t('forgotPassword.email') }}</label>
              <input id="email" v-model="email" type="email" required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                :placeholder="t('forgotPassword.emailPlaceholder')" />
            </div>

            <div v-if="error"
              class="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-2 rounded-md mt-4">
              {{ error }}
            </div>

            <button type="submit"
              class="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50"
              :disabled="loading || !email">
              <span v-if="loading">{{ t('forgotPassword.submitting') }}</span>
              <span v-else>{{ t('forgotPassword.submit') }}</span>
            </button>
          </form>
        </template>

        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            <NuxtLink to="/login" class="font-medium text-primary-600 dark:text-primary-400 hover:underline">
              {{ t('forgotPassword.backToLogin') }}
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { resetPassword } = useAuth()
const { t } = useI18n()

const email = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)

const handleResetPassword = async () => {
  error.value = ''
  loading.value = true

  try {
    const result = await resetPassword(email.value)

    if (result.error) {
      error.value = t('forgotPassword.error', { message: result.error })
    } else {
      success.value = true
    }
  } catch (e: any) {
    console.error('Şifre sıfırlama hatası:', e)
    error.value = e.message || t('forgotPassword.genericError')
  } finally {
    loading.value = false
  }
}
</script>
