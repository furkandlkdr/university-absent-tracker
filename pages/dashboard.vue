<template>
  <div class="py-6">
    <h1 class="text-2xl font-bold mb-6">Dönemlerim</h1>

    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center items-center py-10">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <!-- Terms list -->
    <template v-else>
      <!-- Create new term button -->
      <div class="mb-6">
        <button @click="showNewTermModal = true"
          class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md flex items-center">
          <span class="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clip-rule="evenodd" />
            </svg>
          </span>
          Yeni Dönem Ekle
        </button>
      </div>

      <!-- Empty state -->
      <div v-if="terms.length === 0" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Henüz hiç dönem eklemediniz.
        </p>
        <p class="text-gray-600 dark:text-gray-400">
          Devamsızlık takibine başlamak için "Yeni Dönem Ekle" butonunu kullanın.
        </p>
      </div>

      <!-- Terms grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="term in terms" :key="term.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
          <!-- Term header -->
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold">{{ term.name }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Başlangıç: {{ formatDate(term.startDate) }}
              </p>
            </div>

            <!-- Status badge -->
            <span :class="[
              'px-2 py-1 text-xs rounded-full',
              term.isReadOnly
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
            ]">
              {{ term.isReadOnly ? 'Tamamlandı' : 'Aktif' }}
            </span>
          </div>

          <!-- Term details -->
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {{ getTotalCourses(term) }} ders
          </p>

          <!-- Actions -->
          <div class="flex justify-end space-x-2 mt-2">
            <button @click="term.id && viewTerm(term.id)"
              class="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center">
              <span class="mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fill-rule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clip-rule="evenodd" />
                </svg>
              </span>
              Görüntüle
            </button>

            <button v-if="!term.isReadOnly" @click="editTerm(term)"
              class="text-gray-600 dark:text-gray-400 hover:underline text-sm flex items-center">
              <span class="mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </span>
              Düzenle
            </button>

            <button @click="confirmDeleteTerm(term)"
              class="text-red-600 dark:text-red-400 hover:underline text-sm flex items-center">
              <span class="mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd" />
                </svg>
              </span>
              Sil
            </button>
          </div>
        </div>
      </div>
    </template>

    <!-- New/Edit Term Modal -->
    <div v-if="showNewTermModal || showEditTermModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="cancelTermModal">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg w-full max-h-screen overflow-y-auto">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold">{{ showEditTermModal ? 'Dönemi Düzenle' : 'Yeni Dönem Ekle' }}</h3>
        </div>

        <div class="p-4">
          <form @submit.prevent="saveTerm" class="space-y-4">
            <div>
              <label for="termName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Dönem Adı <span class="text-red-500">*</span>
              </label>
              <input id="termName" v-model="termForm.name" type="text" required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Örn: 2025 Bahar" />
            </div>

            <div>
              <label for="startDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Başlangıç Tarihi <span class="text-red-500">*</span>
              </label>
              <input id="startDate" v-model="termForm.startDate" type="date" required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" />
            </div>

            <div>
              <label for="weekCount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Dönem Uzunluğu (Hafta) <span class="text-red-500">*</span>
              </label>
              <div class="flex items-stretch">
                <button type="button" @click="decrementWeekCount" 
                  class="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white flex items-center justify-center"
                  :disabled="termForm.weekCount <= 5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                  </svg>
                </button>
                <div class="relative flex-1">
                  <input id="weekCount" v-model.number="termForm.weekCount" type="number" min="5" max="18" required
                    class="w-full px-3 py-2 border-y border-gray-300 dark:border-gray-700 text-center focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    @blur="validateWeekCount" />
                  <div class="absolute inset-y-0 right-0 flex items-center px-3 text-xs text-gray-500 dark:text-gray-400">
                    hafta
                  </div>
                </div>
                <button type="button" @click="incrementWeekCount"
                  class="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-r-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white flex items-center justify-center"
                  :disabled="termForm.weekCount >= 18">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <p class="mt-1 text-xs" :class="{ 'text-red-500 dark:text-red-400 font-medium animate-pulse': weekCountError, 'text-gray-500 dark:text-gray-400': !weekCountError }">
                Dönem süresi 5 ile 18 hafta arasında olabilir (varsayılan: 14 hafta)
              </p>
            </div>

            <div>
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Haftalık Ders Programı</h4>

              <div class="space-y-6">
                <div v-for="(day, dayIndex) in days" :key="dayIndex"
                  class="border border-gray-200 dark:border-gray-700 rounded-md p-3">
                  <h5 class="font-medium mb-2">{{ day }}</h5>

                  <div class="space-y-3">
                    <!-- Morning Slots -->
                    <div>
                      <h6 class="text-xs text-gray-500 dark:text-gray-400 mb-1">Öğleden Önce</h6>
                      <div class="grid grid-cols-1 gap-2">
                        <div class="flex items-center">
                          <span class="text-xs w-10">1.</span>
                          <input v-model="termForm.schedule[dayIndex].morning1" type="text"
                            class="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Ders adı" />
                        </div>
                        <div class="flex items-center">
                          <span class="text-xs w-10">2.</span>
                          <input v-model="termForm.schedule[dayIndex].morning2" type="text"
                            class="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Ders adı" />
                        </div>
                      </div>
                    </div>

                    <!-- Afternoon Slots -->
                    <div>
                      <h6 class="text-xs text-gray-500 dark:text-gray-400 mb-1">Öğleden Sonra</h6>
                      <div class="grid grid-cols-1 gap-2">
                        <div class="flex items-center">
                          <span class="text-xs w-10">1.</span>
                          <input v-model="termForm.schedule[dayIndex].afternoon1" type="text"
                            class="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Ders adı" />
                        </div>
                        <div class="flex items-center">
                          <span class="text-xs w-10">2.</span>
                          <input v-model="termForm.schedule[dayIndex].afternoon2" type="text"
                            class="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Ders adı" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="termFormError"
              class="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-2 rounded-md">
              {{ termFormError }}
            </div>

            <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button type="button" @click="cancelTermModal"
                class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                İptal
              </button>
              <button type="submit" :disabled="termFormLoading"
                class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md disabled:opacity-50">
                {{ termFormLoading ? 'Kaydediliyor...' : 'Kaydet' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="showDeleteModal = false">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold">Dönemi Sil</h3>
        </div>

        <div class="p-4">
          <p class="mb-4 text-gray-700 dark:text-gray-300">
            <strong>{{ termToDelete?.name }}</strong> dönemini silmek istediğinizden emin misiniz? Bu işlem geri
            alınamaz ve
            tüm devamsızlık kayıtları silinecektir.
          </p>

          <div class="flex justify-end space-x-3">
            <button type="button" @click="showDeleteModal = false"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
              İptal
            </button>
            <button type="button" @click="deleteTerm" :disabled="deleteLoading"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md disabled:opacity-50">
              {{ deleteLoading ? 'Siliniyor...' : 'Evet, Sil' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format, parseISO } from 'date-fns'
import type { Term } from '~/composables/useDatabase'
import { useDatabase } from '~/composables/useDatabase'
import { useAuth } from '~/composables/useAuth'

const { user, isLoggedIn, authInitialized } = useAuth()
const { getTerms, getTerm, addTerm, updateTerm, deleteTerm: deleteTermFunc } = useDatabase()
const router = useRouter()
const route = useRoute()

// Term list
const loading = ref(true)
const terms = ref<Term[]>([])

// Term form
const showNewTermModal = ref(false)
const showEditTermModal = ref(false)
const termForm = ref({
  id: '',
  name: '',
  startDate: '',
  weekCount: 14, // Varsayılan olarak 14 hafta
  schedule: [
    { morning1: '', morning2: '', afternoon1: '', afternoon2: '' }, // Monday
    { morning1: '', morning2: '', afternoon1: '', afternoon2: '' }, // Tuesday
    { morning1: '', morning2: '', afternoon1: '', afternoon2: '' }, // Wednesday
    { morning1: '', morning2: '', afternoon1: '', afternoon2: '' }, // Thursday
    { morning1: '', morning2: '', afternoon1: '', afternoon2: '' }  // Friday
  ]
})
const termFormLoading = ref(false)
const termFormError = ref('')

// Delete confirmation
const showDeleteModal = ref(false)
const termToDelete = ref<Term | null>(null)
const deleteLoading = ref(false)

// Days of the week
const days = [
  'Pazartesi',
  'Salı',
  'Çarşamba',
  'Perşembe',
  'Cuma'
]

// Fetch terms and check for query parameters when component mounts
onMounted(async () => {
  // Kimlik doğrulaması tamamlandığında ve kullanıcı oturum açtıysa dönemleri getir
  const unwatch = watchEffect(async () => {
    if (authInitialized.value && isLoggedIn.value) {
      await fetchTerms()

      // Check for query parameters to determine if we should open the edit modal
      const action = route.query.action as string
      const termId = route.query.termId as string

      if (action === 'edit' && termId) {
        // First, find the term in the already loaded terms
        let termToEdit = terms.value.find(t => t.id === termId)

        // If not found in loaded terms, fetch it directly
        if (!termToEdit) {
          const fetchedTerm = await getTerm(termId)
          if (fetchedTerm) {
            termToEdit = fetchedTerm
          }
        }

        if (termToEdit) {
          editTerm(termToEdit)

          // Clear the query parameters without reloading the page
          router.replace({ path: '/dashboard', query: {} })
        }
      }

      // İzlemeyi durdur - bir kez çalıştırmak yeterli
      unwatch()
    }
  })
})

// Format date for display
const formatDate = (dateString: string) => {
  try {
    return format(parseISO(dateString), 'dd.MM.yyyy')
  } catch (e) {
    return dateString
  }
}

// Get total number of courses in a term
const getTotalCourses = (term: Term) => {
  let count = 0

  // Convert the schedule array from our form structure to the database structure
  const courseNames = new Set()
  term.schedule.forEach(course => {
    if (course.name) courseNames.add(course.name)
  })

  return courseNames.size
}

// Fetch terms
const fetchTerms = async (retryCount = 0, maxRetries = 3) => {
  loading.value = true
  try {
    terms.value = await getTerms()
    console.log('Fetched terms:', terms.value)
  } catch (error) {
    console.error('Error fetching terms:', error)

    // If we have retries remaining, attempt to fetch again after a delay
    if (retryCount < maxRetries) {
      console.log(`Retrying fetchTerms (attempt ${retryCount + 1} of ${maxRetries})...`)
      setTimeout(() => fetchTerms(retryCount + 1, maxRetries), 2000)
      return
    }
  } finally {
    loading.value = false
  }
}

// Reset term form
const resetTermForm = () => {
  termForm.value = {
    id: '',
    name: '',
    startDate: '',
    weekCount: 14, // Varsayılan olarak 14 hafta
    schedule: [
      { morning1: '', morning2: '', afternoon1: '', afternoon2: '' },
      { morning1: '', morning2: '', afternoon1: '', afternoon2: '' },
      { morning1: '', morning2: '', afternoon1: '', afternoon2: '' },
      { morning1: '', morning2: '', afternoon1: '', afternoon2: '' },
      { morning1: '', morning2: '', afternoon1: '', afternoon2: '' }
    ]
  }
  termFormError.value = ''
}

// Open edit term modal
const editTerm = (term: Term) => {
  // Reset the form first
  resetTermForm()

  // Set form values from term
  termForm.value.id = term.id || ''
  termForm.value.name = term.name
  termForm.value.startDate = term.startDate

  // Convert the schedule array from the database structure to our form structure
  term.schedule.forEach((course) => {
    const dayIndex = course.dayOfWeek
    const timeSlot = course.timeSlot
    termForm.value.schedule[dayIndex][timeSlot] = course.name
  })

  // Show edit modal
  showEditTermModal.value = true
}

// Save term (create or update)
const saveTerm = async () => {
  termFormError.value = ''
  termFormLoading.value = true

  try {
    // Validate form
    if (!termForm.value.name || !termForm.value.startDate) {
      termFormError.value = 'Lütfen dönem adı ve başlangıç tarihini girin.'
      termFormLoading.value = false
      return
    }

    // Convert the schedule from our form structure to the database structure
    const schedule: { name: string; dayOfWeek: number; timeSlot: "morning1" | "morning2" | "afternoon1" | "afternoon2" }[] = []
    for (let dayIndex = 0; dayIndex < 5; dayIndex++) {
      const day = termForm.value.schedule[dayIndex]

      // Check for morning slots
      if (day.morning1) {
        schedule.push({
          name: day.morning1,
          dayOfWeek: dayIndex,
          timeSlot: 'morning1' as "morning1"
        })
      }

      if (day.morning2) {
        schedule.push({
          name: day.morning2,
          dayOfWeek: dayIndex,
          timeSlot: 'morning2' as "morning2"
        })
      }

      // Check for afternoon slots
      if (day.afternoon1) {
        schedule.push({
          name: day.afternoon1,
          dayOfWeek: dayIndex,
          timeSlot: 'afternoon1' as "afternoon1"
        })
      }

      if (day.afternoon2) {
        schedule.push({
          name: day.afternoon2,
          dayOfWeek: dayIndex,
          timeSlot: 'afternoon2' as "afternoon2"
        })
      }
    }

    // Validate that each course name is unique (no duplicate course names)
    const courseNames = schedule.map(course => course.name)
    const uniqueCourseNames = new Set(courseNames)

    if (courseNames.length !== uniqueCourseNames.size) {
      termFormError.value = 'Her ders adı benzersiz olmalıdır. Aynı ders adını birden fazla kez kullanmayın.'
      termFormLoading.value = false
      return
    }

    // Check if there's at least one course
    if (schedule.length === 0) {
      termFormError.value = 'En az bir ders eklemelisiniz.'
      termFormLoading.value = false
      return
    }

    let result

    if (showEditTermModal.value && termForm.value.id) {
      // Update existing term
      result = await updateTerm(termForm.value.id, {
        name: termForm.value.name,
        startDate: termForm.value.startDate,
        weekCount: termForm.value.weekCount,
        schedule
      })
    } else {
      // Create new term
      result = await addTerm({
        name: termForm.value.name,
        startDate: termForm.value.startDate,
        weekCount: termForm.value.weekCount,
        schedule
      })
    }

    if (result.error) {
      termFormError.value = result.error
    } else {
      // Close modal and refresh terms list
      resetTermForm()
      showNewTermModal.value = false
      showEditTermModal.value = false
      await fetchTerms()
    }
  } catch (error: any) {
    termFormError.value = error.message || 'Dönem kaydedilirken bir hata oluştu.'
  } finally {
    termFormLoading.value = false
  }
}

// Cancel term modal
const cancelTermModal = () => {
  resetTermForm()
  showNewTermModal.value = false
  showEditTermModal.value = false
}

// Confirm delete term
const confirmDeleteTerm = (term: Term) => {
  termToDelete.value = term
  showDeleteModal.value = true
}

// Delete term
const deleteTerm = async () => {
  if (!termToDelete.value?.id) return

  deleteLoading.value = true
  try {
    const result = await deleteTermFunc(termToDelete.value.id)

    if (result.error) {
      // TODO: Show error message
      console.error('Error deleting term:', result.error)
    } else {
      // Close modal and refresh terms list
      showDeleteModal.value = false
      termToDelete.value = null
      await fetchTerms()
    }
  } catch (error) {
    console.error('Error deleting term:', error)
  } finally {
    deleteLoading.value = false
  }
}

// Navigate to term detail page
const viewTerm = (termId: string) => {
  router.push(`/terms/${termId}`)
}

// Increment week count
const incrementWeekCount = () => {
  if (termForm.value.weekCount < 18) {
    termForm.value.weekCount++
  }
}

// Decrement week count
const decrementWeekCount = () => {
  if (termForm.value.weekCount > 5) {
    termForm.value.weekCount--
  }
}

// Validate week count
const weekCountError = ref(false)
const validateWeekCount = () => {
  weekCountError.value = termForm.value.weekCount < 5 || termForm.value.weekCount > 18
}
</script>