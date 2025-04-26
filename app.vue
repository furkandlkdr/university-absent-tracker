<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Set up global authentication state
const user = useState('user', () => null)
const isLoggedIn = computed(() => !!user.value)

// This will be used to handle auth state throughout the app
</script>

<style lang="postcss">
body {
  @apply antialiased text-gray-800 dark:text-gray-200;
}
</style>
