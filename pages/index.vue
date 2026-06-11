<template>
  <div class="flex flex-col items-center justify-center py-10">
    <!-- Loading state while auth is initializing -->
    <div v-if="!authInitialized" class="w-full max-w-4xl text-center">
      <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div class="flex flex-col items-center justify-center space-y-4">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p class="text-lg text-gray-600 dark:text-gray-400">{{ t('common.loading') }}</p>
        </div>
      </div>
    </div>

    <!-- Main content - only shown when auth is initialized and user is not logged in -->
    <div v-else class="w-full max-w-4xl">
      <div class="text-center mb-10">
        <h1 class="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-4">
          {{ t('home.title') }}
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {{ t('home.subtitle') }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{{ t('home.featuresTitle') }}</h2>
          <ul class="space-y-2">
            <li class="flex items-start">
              <div class="mr-2 mt-1 text-primary-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <span>{{ t('home.features.createSchedule') }}</span>
            </li>
            <li class="flex items-start">
              <div class="mr-2 mt-1 text-primary-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <span>{{ t('home.features.customLength') }}</span>
            </li>
            <li class="flex items-start">
              <div class="mr-2 mt-1 text-primary-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <span>{{ t('home.features.mobileTracking') }}</span>
            </li>
            <li class="flex items-start">
              <div class="mr-2 mt-1 text-primary-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <span>{{ t('home.features.limitWarnings') }}</span>
            </li>
            <li class="flex items-start">
              <div class="mr-2 mt-1 text-primary-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <span>{{ t('home.features.personalization') }}</span>
            </li>
          </ul>
        </div>

        <div class="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-md flex flex-col justify-between">
          <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{{ t('home.getStartedTitle') }}</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            {{ t('home.getStartedDescription') }}
          </p>
          <div class="flex flex-col space-y-3">
            <NuxtLink to="/register"
              class="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md text-center">
              {{ t('home.signupNow') }}
            </NuxtLink>
            <NuxtLink to="/login"
              class="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-2 px-4 rounded-md text-center">
              {{ t('nav.login') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { isLoggedIn, authInitialized } = useAuth()
const { t } = useI18n()
const router = useRouter()

// Wait for auth to initialize, then redirect if user is logged in
onMounted(() => {
  watchEffect(() => {
    if (authInitialized.value && isLoggedIn.value) {
      router.push('/dashboard')
    }
  })
})
</script>