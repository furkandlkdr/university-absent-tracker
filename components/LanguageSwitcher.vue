<template>
  <div class="relative" ref="containerRef">
    <!-- Single trigger for BOTH desktop and mobile: just the globe icon.
         Clicking opens the same dropdown everywhere. -->
    <button
      type="button"
      @click="toggleOpen"
      :aria-label="t('common.changeLanguage')"
      :aria-expanded="open"
      :aria-haspopup="true"
      class="inline-flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 dark-mode-transition focus:outline-none focus:ring-2 focus:ring-primary-500 rounded p-1.5 min-h-[36px] min-w-[36px]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>

    <!-- Dropdown panel — used on both desktop and mobile -->
    <transition name="lang-fade">
      <div
        v-if="open"
        class="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-800 rounded-md shadow-lg ring-1 ring-black/5 dark:ring-white/10 z-50 overflow-hidden"
        role="menu"
      >
        <button
          v-for="option in options"
          :key="option.value"
          type="button"
          role="menuitemradio"
          :aria-checked="locale === option.value"
          @click="select(option.value)"
          :class="[
            'w-full flex items-center justify-between px-4 py-2 text-sm focus:outline-none focus:bg-gray-100 dark:focus:bg-slate-700 dark-mode-transition',
            locale === option.value
              ? 'bg-primary-50 dark:bg-slate-700/60 text-primary-700 dark:text-primary-300 font-semibold'
              : 'text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/40',
          ]"
        >
          <span class="flex items-center gap-2">
            <span class="font-mono text-xs font-bold w-6 text-gray-500 dark:text-slate-400">{{ option.code }}</span>
            <span>{{ option.label }}</span>
          </span>
          <svg
            v-if="locale === option.value"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-primary-600 dark:text-primary-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import type { Locale } from '~/composables/useI18n'

const { locale, setLocale, t } = useI18n()

const open = ref(false)
const containerRef = ref<HTMLElement | null>(null)

const options = [
  { value: 'en' as Locale, code: 'EN', label: 'English' },
  { value: 'tr' as Locale, code: 'TR', label: 'Türkçe' },
]

const toggleOpen = () => {
  open.value = !open.value
}

const select = (value: Locale) => {
  setLocale(value)
  open.value = false
}

onClickOutside(containerRef, () => {
  open.value = false
})

// Close on Escape
onMounted(() => {
  const handler = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && open.value) open.value = false
  }
  document.addEventListener('keydown', handler)
  onBeforeUnmount(() => document.removeEventListener('keydown', handler))
})
</script>

<style scoped>
.lang-fade-enter-active,
.lang-fade-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.lang-fade-enter-from,
.lang-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
