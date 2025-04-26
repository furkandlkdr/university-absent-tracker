<template>
  <div class="flex flex-col items-center justify-center py-10">
    <div class="w-full max-w-4xl">
      <div class="text-center mb-10">
        <h1 class="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          Devamke | Devamsızlık Takip Uygulaması
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Öğrenciler için ders devamsızlıklarını kolayca takip etmek için tasarlanmış mobil öncelikli bir web uygulaması.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Uygulama Özellikleri</h2>
          <ul class="space-y-2">
            <li class="flex items-start">
              <div class="mr-2 mt-1 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <span>Kolay dönem ve ders programı oluşturma</span>
            </li>
            <li class="flex items-start">
              <div class="mr-2 mt-1 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <span>Devamsızlıklarınızı mobil uyumlu arayüz ile takip edin</span>
            </li>
            <li class="flex items-start">
              <div class="mr-2 mt-1 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <span>Otomatik devamsızlık limiti uyarıları</span>
            </li>
            <li class="flex items-start">
              <div class="mr-2 mt-1 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <span>Birden fazla dönem yönetimi</span>
            </li>
          </ul>
        </div>
        
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between">
          <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Hemen Başlayın</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Derslerinizin devamsızlık takibini kolaylaştırmak için hemen üye olun ve uygulamayı kullanmaya başlayın.
          </p>
          <div class="flex flex-col space-y-3">
            <NuxtLink to="/register" class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-center">
              Hemen Üye Ol
            </NuxtLink>
            <NuxtLink to="/login" class="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-2 px-4 rounded-md text-center">
              Giriş Yap
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { isLoggedIn } = useAuth()

// If user is already logged in, redirect to dashboard
onMounted(() => {
  if (isLoggedIn.value) {
    navigateTo('/dashboard')
  }
})
</script>