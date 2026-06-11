<template>
  <transition name="onboarding-fade">
    <section v-if="visible" class="mx-auto w-full max-w-4xl">
      <div class="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/95 shadow-xl backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/90">
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute -top-20 -right-24 h-48 w-48 rounded-full bg-primary-200/30 blur-3xl dark:bg-primary-500/20" />
          <div class="absolute -bottom-16 -left-20 h-48 w-48 rounded-full bg-slate-200/60 blur-3xl dark:bg-slate-700/30" />
        </div>

        <div class="relative p-4 md:p-6">
          <div>
            <h3 class="mt-3 text-xl md:text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">{{ t('onboarding.title') }}</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">{{ t('onboarding.subtitle') }}</p>

            <ul class="mt-4 space-y-3">
              <li v-for="step in steps" :key="step.id" class="flex gap-3 rounded-lg border border-slate-200/70 bg-white/80 p-3 shadow-sm transition hover:border-primary-200 hover:bg-white dark:border-slate-800/80 dark:bg-slate-900/70 dark:hover:border-primary-500/40 dark:hover:bg-slate-900/90">
                <div class="flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold"
                  :class="step.completed ? 'border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-500/50 dark:bg-primary-500/15 dark:text-primary-100' : 'border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'">
                  <span v-if="step.completed">✓</span>
                  <span v-else>{{ step.id }}</span>
                </div>

                <div class="flex-1">
                  <div class="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p class="text-sm font-semibold text-slate-900 dark:text-slate-100">{{ step.title }}</p>
                      <p class="mt-1 text-xs text-slate-500 dark:text-slate-300">{{ step.description }}</p>
                    </div>

                    <div class="flex items-center gap-3">
                      <span v-if="step.completed" class="text-xs font-medium text-primary-600 dark:text-primary-200">{{ t('onboarding.completed') }}</span>
                      <button v-else-if="!step.hideCta" @click="$emit(step.event, step.payload)"
                        class="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
                        {{ step.cta || t('onboarding.start') }}
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="mt-4 flex items-center justify-end">
            <button @click="dismiss" class="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-slate-100">{{ t('common.dismiss') }}</button>
          </div>
        </div>
      </div>
    </section>
  </transition>
</template>

<script setup lang="ts">
const { t } = useI18n()

defineProps<{
  steps: Array<Record<string, any>>
  visible: boolean
}>()

const emit = defineEmits(['create-term', 'open-term', 'log-attendance', 'dismiss'])

const dismiss = () => {
  emit('dismiss')
}
</script>

<style scoped>
.onboarding-fade-enter-active,
.onboarding-fade-leave-active {
  transition: opacity 280ms ease, transform 320ms ease;
}

.onboarding-fade-enter-from,
.onboarding-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
