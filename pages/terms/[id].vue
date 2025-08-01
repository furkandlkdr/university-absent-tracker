<template>
  <div class="py-6">
    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center items-center py-10">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>

    <!-- Term not found -->
    <div v-else-if="!term" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        Dönem bulunamadı veya erişim izniniz yok.
      </p>
      <NuxtLink to="/dashboard" class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md">
        Dönemlerim'e Dön
      </NuxtLink>
    </div>

    <!-- Term details -->
    <div v-else>
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold">{{ term.name }}</h1>
          <p class="text-gray-600 dark:text-gray-400">
            <span>Başlangıç Tarihi: {{ formatDate(term.startDate) }}</span>
          </p>
        </div>

        <div class="mt-4 md:mt-0 flex flex-wrap gap-2">
          <NuxtLink to="/dashboard"
            class="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-md text-sm flex items-center">
            <span class="mr-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </span>
            Dönemlerim'e Dön
          </NuxtLink>

          <button v-if="!term.isReadOnly" @click="openTermEditModal"
            class="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-md text-sm flex items-center">
            <span class="mr-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </span>
            Dönemi Düzenle
          </button>
        </div>
      </div>

      <!-- Calendar View with Week Navigation -->
      <div class="space-y-6">
        <!-- Calendar Legend -->
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <h3 class="text-sm font-medium mb-2">Devamsızlık Durumu</h3>
          <div class="flex flex-wrap gap-3">
            <div class="flex items-center">
              <span class="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
              <span class="text-sm">Gittim</span>
            </div>
            <div class="flex items-center">
              <span class="w-4 h-4 bg-red-500 rounded-full mr-2"></span>
              <span class="text-sm">Gitmedim</span>
            </div>
            <div class="flex items-center">
              <span class="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full mr-2"></span>
              <span class="text-sm">Tatil / Ders Yok</span>
            </div>
            <div class="flex items-center">
              <span
                class="w-4 h-4 bg-white border border-dashed border-gray-300 dark:border-gray-600 rounded-full mr-2"></span>
              <span class="text-sm">İşaretlenmedi</span>
            </div>
            <div class="flex items-center">
              <span class="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full mr-2"></span>
              <span class="text-sm">Ders henüz başlamamış</span>
            </div>
          </div>
        </div>        <!-- New Tip/Hint for bulk update -->
        <div class="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg p-4 text-sm flex items-start shadow-sm border border-blue-200 dark:border-blue-800">
          <div class="flex-shrink-0 mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-2">
            <strong>Toplu Devamsızlık Güncelleme!</strong> Bir duruma (Gittim/Gitmedim/Tatil) <strong>uzun basarak</strong>, ilgili dersin önceki haftalarını topluca güncelleyebilirsiniz. İşaretlenmemiş haftalar için otomatik olarak yeni kayıtlar oluşturulur, var olan kayıtlar ise güncellenir (tatiller korunur).
          </div>
        </div>

        <!-- Read-only warning -->
        <div v-if="term.isReadOnly" class="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-lg p-4 text-sm flex items-start shadow-sm border border-orange-200 dark:border-orange-800">
          <div class="flex-shrink-0 mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-2">
            <strong>Dönem Tamamlandı!</strong> Bu dönem {{ term.weekCount || 14 }} haftası dolmuş olduğu için artık salt okunur modundadır. Devamsızlık kayıtlarını görüntüleyebilirsiniz ancak değiştiremezsiniz.
          </div>
        </div>

        <!-- Week Navigation -->
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div class="flex items-center justify-center">
            <button @click="navigateWeek(-1)" :disabled="selectedWeek <= 1" :class="[
              'p-2 rounded-md',
              selectedWeek <= 1 ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            ]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div class="relative mx-4">
              <button @click="weekDropdownOpen = !weekDropdownOpen"
                class="bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-300 px-4 py-2 rounded-md font-medium flex items-center">
                {{ selectedWeek }}. Hafta - {{ formatWeekRange(selectedWeek) }}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- Week Dropdown -->
              <div v-if="weekDropdownOpen"
                class="absolute z-10 mt-1 py-1 bg-white dark:bg-gray-800 rounded-md shadow-lg max-h-60 overflow-y-auto w-full border border-gray-200 dark:border-gray-700"
                ref="weekDropdownRef">
                <button v-for="weekNum in totalWeeks" :key="weekNum" @click="selectWeek(weekNum)"
                  class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  :class="weekNum === selectedWeek ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'">
                  {{ weekNum }}. Hafta - {{ formatWeekRange(weekNum) }}
                </button>
              </div>
            </div>

            <button @click="navigateWeek(1)" :disabled="selectedWeek >= totalWeeks" :class="[
              'p-2 rounded-md',
              selectedWeek >= totalWeeks ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            ]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Week Calendar View -->
        <div v-if="selectedWeekData" class="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div class="p-4">
            <div class="space-y-4">
              <div v-for="(dayEntries, dayIndex) in selectedWeekData" :key="dayIndex"
                class="border-b border-gray-100 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
                <h4 class="text-sm font-medium mb-2">{{ formatCalendarDate(dayEntries[0].date) }}</h4>

                <div class="space-y-2">
                  <div v-for="entry in dayEntries" :key="`${entry.date}-${entry.courseName}-${entry.timeSlot}`"
                    class="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-md">
                    <div class="mb-2 sm:mb-0">
                      <p class="font-medium">{{ entry.courseName }}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">{{ getTimeSlotLabel(entry.timeSlot) }}</p>
                    </div>

                    <div>
                      <div v-if="!entry.isPast"
                        class="bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm px-3 py-1 rounded-md inline-block">
                        Gelecek Tarihi
                      </div>
                      <div v-else-if="term.isReadOnly && !getAttendanceStatus(entry)"
                        class="bg-white border border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 text-sm px-3 py-1 rounded-md inline-block">
                        İşaretlenmedi
                      </div>
                      <div v-else class="flex space-x-2">
                        <button 
                          v-for="status in ['Gittim', 'Gitmedim', 'Tatil / Ders Yok']" 
                          :key="status" 
                          :class="[
                            'text-sm px-3 py-1 rounded-md select-none',
                            getAttendanceStatus(entry) === status ? getStatusButtonClass(status, true) : getStatusButtonClass(status, false),
                            term.isReadOnly ? 'cursor-not-allowed opacity-75' : 'cursor-pointer hover:opacity-90'
                          ]" 
                          :disabled="term.isReadOnly" 
                          @touchstart="!term.isReadOnly && onStatusButtonTouchStart($event, entry, status as 'Gittim' | 'Gitmedim' | 'Tatil / Ders Yok')"
                          @touchend="onStatusButtonTouchEnd"
                          @touchmove="onStatusButtonTouchMove"
                          @touchcancel="onStatusButtonTouchEnd"
                          @mousedown="!term.isReadOnly && onStatusButtonMouseDown($event, entry, status as 'Gittim' | 'Gitmedim' | 'Tatil / Ders Yok')"
                          @mouseup="onStatusButtonMouseUp"
                          @mouseleave="onStatusButtonMouseLeave"
                          @click="!term.isReadOnly && updateAttendance(entry, status as 'Gittim' | 'Gitmedim' | 'Tatil / Ders Yok')"
                          onselectstart="return false">
                          {{ status }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <p class="text-gray-600 dark:text-gray-400">Bu haftada ders bulunmamaktadır.</p>
        </div>

        <!-- Statistics Section (moved here from the tab) -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 class="text-lg font-medium mb-4">Devamsızlık Özeti</h3>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th
                    class="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Ders Adı
                  </th>
                  <th
                    class="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Devamsızlık Durumu
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="stat in statistics" :key="stat.name">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                    :class="stat.isAtRisk ? 'text-red-600 dark:text-red-400' : ''">
                    {{ stat.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm"
                    :class="stat.isAtRisk ? 'text-red-600 dark:text-red-400' : ''">
                    {{ stat.absences }} / {{ stat.availableWeeks }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="hasRiskyAttendance"
            class="mt-6 p-3 bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-md">
            <p class="text-sm">
              <strong>Uyarı:</strong> Kırmızı renkli dersler devamsızlık limitine yaklaşıyor veya aşmış durumda.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Bulk Update Confirmation Modal -->
    <div v-if="showBulkUpdateModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto"
      @click.self="cancelBulkUpdate">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full mx-4 mb-4 relative">
        <!-- Close button -->
        <button @click="cancelBulkUpdate" class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div class="p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold">Toplu Güncelleme</h3>
        </div>        <div class="p-5">
          <p class="mb-4 text-gray-700 dark:text-gray-300">
            <strong>{{ bulkUpdateData.courseName }}</strong> dersinin ilk <strong>{{ bulkUpdateData.targetWeek }}</strong> haftasına ait
            devam durumlarını (tatiller hariç) '<strong>{{ bulkUpdateData.newStatus }}</strong>' olarak güncellemek istediğinize emin misiniz?
          </p>
          <p class="text-sm text-blue-600 dark:text-blue-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            Henüz işaretlenmemiş haftalar için otomatik olarak yeni kayıtlar oluşturulacaktır.
          </p>
          
          <div class="flex justify-end space-x-3 mt-6">
            <button @click="cancelBulkUpdate"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
              İptal
            </button>
            <button @click="confirmBulkUpdate" :disabled="bulkUpdateLoading"
              class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md disabled:opacity-50">
              {{ bulkUpdateLoading ? 'Güncelleniyor...' : 'Güncelle' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="showToast" 
      class="fixed bottom-4 right-4 p-3 rounded-md shadow-lg z-50 transition-opacity duration-300" 
      :class="[
        toastType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      ]">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { format, parseISO, addWeeks } from 'date-fns'
import { tr } from 'date-fns/locale'
import { onClickOutside } from '@vueuse/core'
import type { Term, AttendanceRecord } from '~/composables/useDatabase'
import { useDatabase } from '~/composables/useDatabase'
import { useAuth } from '~/composables/useAuth'

const route = useRoute()
const router = useRouter()
const { isLoggedIn } = useAuth()
const { getTerm, getAttendanceRecords, updateAttendanceStatus, bulkUpdateAttendance, getTermStatistics, generateTermCalendar } = useDatabase()

// State
const termId = ref(route.params.id as string)
const loading = ref(true)
const term = ref<Term | null>(null)
const attendanceRecords = ref<AttendanceRecord[]>([])
const calendar = ref<any[]>([])
const groupedCalendar = ref<any[]>([])
const statistics = ref<any[]>([])
const currentWeek = ref<number | null>(null)
const selectedWeek = ref(1)
const weekDropdownOpen = ref(false)
const weekDropdownRef = ref(null)

// Kapanması için reference açıkça tanımlayalım
onClickOutside(weekDropdownRef, () => {
  weekDropdownOpen.value = false
})

// Long-press variables
let longPressTimer: ReturnType<typeof setTimeout> | null = null;
const longPressDelay = 600; // milliseconds

// Bulk update state
const showBulkUpdateModal = ref(false);
const bulkUpdateLoading = ref(false);
const bulkUpdateData = ref({
  termId: '',
  courseName: '',
  targetWeek: 0,
  newStatus: '' as 'Gittim' | 'Gitmedim' | 'Tatil / Ders Yok'
});

// Toast notification state
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref<'success' | 'error'>('success');
const toastTimeout = ref<ReturnType<typeof setTimeout> | null>(null);

// Computed property for the selected week's data
const selectedWeekData = computed(() => {
  if (!groupedCalendar.value || !groupedCalendar.value.length) return null

  const weekIndex = selectedWeek.value - 1
  if (weekIndex >= 0 && weekIndex < groupedCalendar.value.length) {
    return groupedCalendar.value[weekIndex]
  }

  return null
})

// Fetch term data
onMounted(async () => {
  loading.value = true
  try {
    // Fetch the term
    const fetchedTerm = await getTerm(termId.value)
    term.value = fetchedTerm

    if (term.value) {
      // Fetch attendance records for this term
      attendanceRecords.value = await getAttendanceRecords(termId.value)

      // Generate calendar from term schedule
      calendar.value = generateTermCalendar(term.value)

      // Group calendar by week and day
      groupCalendarEntries()

      // Calculate statistics
      statistics.value = getTermStatistics(term.value, attendanceRecords.value)

      // Calculate current week number
      calculateCurrentWeek()

      // Set selected week to current week if available
      if (currentWeek.value) {
        selectedWeek.value = currentWeek.value
      }
    }
  } catch (error) {
    console.error('Error fetching term data:', error)
  } finally {
    loading.value = false
  }
})

// Week navigation functions
const navigateWeek = (direction: number) => {
  const newWeek = selectedWeek.value + direction
  if (newWeek >= 1 && newWeek <= totalWeeks.value) {
    selectedWeek.value = newWeek
    weekDropdownOpen.value = false
  }
}

const selectWeek = (weekNum: number) => {
  selectedWeek.value = weekNum
  weekDropdownOpen.value = false
}

// Format week range (e.g., "21.04-27.04")
const formatWeekRange = (weekNum: number) => {
  if (!term.value) return ''

  const startDate = parseISO(term.value.startDate)
  const weekStartDate = addWeeks(startDate, weekNum - 1)
  const weekEndDate = new Date(weekStartDate)
  weekEndDate.setDate(weekStartDate.getDate() + 6)

  return `${format(weekStartDate, 'dd.MM')}-${format(weekEndDate, 'dd.MM')}`
}

// Format date methods
const formatDate = (dateString: string) => {
  try {
    return format(parseISO(dateString), 'dd.MM.yyyy')
  } catch (e) {
    return dateString
  }
}

const formatCalendarDate = (dateString: string) => {
  try {
    return format(parseISO(dateString), 'EEEE, d MMMM', { locale: tr })
  } catch (e) {
    return dateString
  }
}

// Group calendar entries by week and then by day
const groupCalendarEntries = () => {
  if (!calendar.value.length) return

  // First sort by date
  const sortedCalendar = [...calendar.value].sort((a, b) => a.date.localeCompare(b.date))

  // Then group by week
  const weeks: any[] = []
  let currentWeek = 1
  let weekEntries: any[] = []

  sortedCalendar.forEach(entry => {
    if (entry.weekNumber > currentWeek) {
      weeks.push(groupByDay(weekEntries))
      weekEntries = []
      currentWeek = entry.weekNumber
    }

    weekEntries.push(entry)
  })

  // Add the last week if there are entries
  if (weekEntries.length > 0) {
    weeks.push(groupByDay(weekEntries))
  }

  groupedCalendar.value = weeks
}

// Group entries by day
const groupByDay = (entries: any[]) => {
  const days: Record<string, any[]> = {}

  entries.forEach(entry => {
    if (!days[entry.date]) {
      days[entry.date] = []
    }

    days[entry.date].push(entry)
  })

  // Convert to array and sort by date
  return Object.entries(days)
    .map(([_, dayEntries]) => dayEntries)
    .sort((a, b) => a[0].date.localeCompare(b[0].date))
}

// Calculate current week based on term start date
const calculateCurrentWeek = () => {
  if (!term.value) return null

  const startDate = parseISO(term.value.startDate)
  const today = new Date()

  // Calculate week difference
  const diffTime = Math.abs(today.getTime() - startDate.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  const weekNumber = Math.floor(diffDays / 7) + 1

  // If current week is within the total week span
  if (weekNumber > 0 && weekNumber <= totalWeeks.value) {
    currentWeek.value = weekNumber
  } else if (weekNumber > totalWeeks.value) {
    currentWeek.value = totalWeeks.value // Cap at total weeks
  } else {
    currentWeek.value = null
  }
}

// Get the human-readable label for a time slot
const getTimeSlotLabel = (timeSlot: string) => {
  const labels = {
    'morning1': 'Öğleden Önce - 1. Slot',
    'morning2': 'Öğleden Önce - 2. Slot',
    'morningExtra1': 'Öğleden Önce - 3. Slot',
    'morningExtra2': 'Öğleden Önce - 4. Slot',
    'morningExtra3': 'Öğleden Önce - 5. Slot',
    'afternoon1': 'Öğleden Sonra - 1. Slot',
    'afternoon2': 'Öğleden Sonra - 2. Slot',
    'afternoonExtra1': 'Öğleden Sonra - 3. Slot',
    'afternoonExtra2': 'Öğleden Sonra - 4. Slot',
    'afternoonExtra3': 'Öğleden Sonra - 5. Slot'
  }

  return labels[timeSlot as keyof typeof labels] || timeSlot
}

// Get attendance status for a calendar entry
const getAttendanceStatus = (entry: any) => {
  const record = attendanceRecords.value.find(r =>
    r.courseName === entry.courseName &&
    r.date === entry.date
  )

  return record ? record.status : null
}

// Update attendance status
const updateAttendance = async (entry: any, status: 'Gittim' | 'Gitmedim' | 'Tatil / Ders Yok') => {
  if (!term.value || term.value.isReadOnly) return

  try {
    const result = await updateAttendanceStatus({
      termId: termId.value,
      courseName: entry.courseName,
      date: entry.date,
      status,
      weekNumber: entry.weekNumber
    })

    if (result.success) {
      // Refetch attendance records to update the UI
      attendanceRecords.value = await getAttendanceRecords(termId.value)

      // Update statistics
      statistics.value = getTermStatistics(term.value, attendanceRecords.value)
    }
  } catch (error) {
    console.error('Error updating attendance:', error)
  }
}

// Get button styling based on attendance status
const getStatusButtonClass = (status: string, isActive: boolean) => {
  if (status === 'Gittim') {
    return isActive
      ? 'bg-green-500 text-white'
      : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
  } else if (status === 'Gitmedim') {
    return isActive
      ? 'bg-red-500 text-white'
      : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
  } else {
    return isActive
      ? 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200'
      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
  }
}

// Check if there are any courses at risk of exceeding absence limits
const hasRiskyAttendance = computed(() => {
  return statistics.value.some(stat => stat.isAtRisk)
})

// Handle term edit button click - redirect to dashboard with edit modal trigger
const openTermEditModal = () => {
  if (!term.value || term.value.isReadOnly) return

  // Navigate to dashboard with query parameters to trigger edit modal
  router.push({
    path: '/dashboard',
    query: {
      action: 'edit',
      termId: termId.value
    }
  })
}

// Total weeks in the term
const totalWeeks = computed(() => {
  if (term.value?.weekCount) {
    return term.value.weekCount;
  }
  return term.value ? (groupedCalendar.value.length || 14) : 14;
})

// Long press event handlers using the composable
const { isLongPressing, onLongPressStart, onLongPressEnd, onLongPressCancel } = useLongPress((event: Event) => {
  // Long press callback - determine which element was long pressed
  const target = event.target as HTMLElement;
  const button = target.closest('button[data-course-name][data-week-number][data-status]');
  
  if (button) {
    const courseName = button.getAttribute('data-course-name');
    const weekNumber = parseInt(button.getAttribute('data-week-number') || '0');
    const status = button.getAttribute('data-status') as 'Gittim' | 'Gitmedim' | 'Tatil / Ders Yok';
    
    if (courseName && weekNumber && status) {
      openBulkUpdateModal(courseName, weekNumber, status);
    }
  }
}, 600);

// Long press event handlers for touch devices
const onStatusButtonTouchStart = (event: TouchEvent, entry: any, status: 'Gittim' | 'Gitmedim' | 'Tatil / Ders Yok') => {
  // Only allow long press on past dates
  if (!entry.isPast || term.value?.isReadOnly) return;
  
  // Set data attributes for the long press handler
  const target = event.target as HTMLElement;
  target.setAttribute('data-course-name', entry.courseName);
  target.setAttribute('data-week-number', entry.weekNumber.toString());
  target.setAttribute('data-status', status);
  
  onLongPressStart(event);
};

const onStatusButtonTouchEnd = () => {
  onLongPressEnd();
};

const onStatusButtonTouchMove = () => {
  // Cancel long press if touch moves too much
  onLongPressCancel();
};

// Long press event handlers for desktop/mouse devices
const onStatusButtonMouseDown = (event: MouseEvent, entry: any, status: 'Gittim' | 'Gitmedim' | 'Tatil / Ders Yok') => {
  // Only allow long press on past dates
  if (!entry.isPast || term.value?.isReadOnly) return;
  
  // Only start long press for left click
  if (event.button !== 0) return;
  
  // Set data attributes for the long press handler
  const target = event.target as HTMLElement;
  target.setAttribute('data-course-name', entry.courseName);
  target.setAttribute('data-week-number', entry.weekNumber.toString());
  target.setAttribute('data-status', status);
  
  onLongPressStart(event);
};

const onStatusButtonMouseUp = () => {
  onLongPressEnd();
};

const onStatusButtonMouseLeave = () => {
  onLongPressCancel();
};

// Open the bulk update confirmation modal
const openBulkUpdateModal = (courseName: string, targetWeek: number, newStatus: 'Gittim' | 'Gitmedim' | 'Tatil / Ders Yok') => {
  bulkUpdateData.value = {
    termId: termId.value,
    courseName,
    targetWeek,
    newStatus
  };
  
  showBulkUpdateModal.value = true;
};

// Cancel the bulk update
const cancelBulkUpdate = () => {
  showBulkUpdateModal.value = false;
};

// Confirm and execute the bulk update
const confirmBulkUpdate = async () => {
  bulkUpdateLoading.value = true;
  
  try {
    const result = await bulkUpdateAttendance(
      bulkUpdateData.value.termId,
      bulkUpdateData.value.courseName,
      bulkUpdateData.value.targetWeek,
      bulkUpdateData.value.newStatus
    );
    
    if (result.success) {
      // Show success toast with updated and created count
      let message = '';
      const createdCount = 'createdCount' in result ? result.createdCount : 0;
      
      if (result.updatedCount > 0 && createdCount > 0) {
        message = `${result.updatedCount} kayıt güncellendi, ${createdCount} yeni kayıt oluşturuldu.`;
      } else if (result.updatedCount > 0) {
        message = `${result.updatedCount} kayıt başarıyla güncellendi.`;
      } else if (createdCount > 0) {
        message = `${createdCount} yeni kayıt başarıyla oluşturuldu.`;
      } else {
        message = 'İşlem tamamlandı, ancak hiçbir değişiklik yapılmadı.';
      }
      
      showToastMessage(message, 'success');
      
      // Refresh attendance records
      attendanceRecords.value = await getAttendanceRecords(termId.value);
      
      // Update statistics
      if (term.value) {
        statistics.value = getTermStatistics(term.value, attendanceRecords.value);
      }
      
      // Close modal
      showBulkUpdateModal.value = false;
    } else {
      // Show error toast
      showToastMessage(`Güncelleme başarısız: ${result.error}`, 'error');
    }
  } catch (error: any) {
    showToastMessage(`Bir hata oluştu: ${error.message}`, 'error');
  } finally {
    bulkUpdateLoading.value = false;
  }
};

// Show toast message
const showToastMessage = (message: string, type: 'success' | 'error') => {
  // Clear existing timeout if there is one
  if (toastTimeout.value) {
    clearTimeout(toastTimeout.value);
  }
  
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;
  
  // Toast mesajını 6 saniye göstereceğiz (daha görünür olması için)
  toastTimeout.value = setTimeout(() => {
    showToast.value = false;
  }, 6000);
};
</script>
