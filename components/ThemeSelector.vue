<template>
	<div class="theme-selector bg-surface-light dark:bg-surface-dark rounded-lg shadow-lg p-4 w-full max-w-xs dark-mode-transition">
		<div class="mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">
			<h3 class="text-md font-medium text-gray-800 dark:text-gray-200">Theme Color</h3>

			<!-- Color Slider -->
			<div class="mt-3">
				<div class="relative w-full mb-1">
					<input type="range" min="0" max="360" step="1" v-model="hue" @input="updateHue"
						class="w-full h-4 rounded-lg appearance-none cursor-pointer dark-mode-transition" :style="colorSliderStyle" />
					<!-- Selected Color Indicator and Preview Palette -->
					<div class="flex items-center justify-between mt-2">
						<div class="flex space-x-1">
							<div v-for="chroma in [0.05, 0.1, 0.15, 0.19]" :key="chroma"
								class="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 dark-mode-transition"
								:style="{ backgroundColor: `oklch(68% ${chroma} ${hue})` }" :aria-label="`Theme color preview with chroma ${chroma}`"></div>
						</div>
						<div class="text-xs text-gray-600 dark:text-gray-300 dark-mode-transition">{{ hue }}°</div>
					</div>

					<!-- Material You Style Preview -->
					<div
						class="mt-3 p-2 rounded-md flex items-center justify-center space-x-2 border border-gray-200 dark:border-gray-700 dark-mode-transition">
						<div class="h-10 w-10 rounded-md flex items-center justify-center"
							:style="{ backgroundColor: `oklch(68% 0.19 ${hue})` }">
							<span class="text-white font-bold">A</span>
						</div>
						<div class="h-10 w-10 rounded-md flex items-center justify-center"
							:style="{ backgroundColor: `oklch(88% 0.08 ${hue})` }">
							<span class="text-gray-800 font-bold">B</span>
						</div>
						<div class="h-10 w-10 rounded-md flex items-center justify-center"
							:style="{ backgroundColor: `oklch(60% 0.1 ${hue})` }">
							<span class="text-white font-bold">C</span>
						</div>
						<div class="h-10 w-10 rounded-md flex items-center justify-center"
							:style="{ backgroundColor: `oklch(40% 0.06 ${hue})` }">
							<span class="text-white font-bold">D</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Color Mode Selection -->
		<div>
			<h3 class="text-md font-medium mb-3 text-gray-800 dark:text-gray-200">Color Mode</h3>
			<div class="flex items-center space-x-2">
				<button @click="setColorMode('light')" :class="[
					'px-3 py-1 rounded-md text-sm flex items-center justify-center dark-mode-transition',
					colorMode.preference === 'light' ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
				]" aria-label="Light mode">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
					</svg>
					Light
				</button>
				<button @click="setColorMode('dark')" :class="[
					'px-3 py-1 rounded-md text-sm flex items-center justify-center dark-mode-transition',
					colorMode.preference === 'dark' ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
				]" aria-label="Dark mode">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
					</svg>
					Dark
				</button>
				<button @click="setColorMode('system')" :class="[
					'px-3 py-1 rounded-md text-sm flex items-center justify-center dark-mode-transition',
					colorMode.preference === 'system' ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
				]" aria-label="System mode">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
					System
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

// Renk tonu
const hue = ref(240)
const setThemeHue = inject<(val: number) => void>('setThemeHue', (val: number) => { })
const themeHue = inject<Ref<number>>('themeHue', ref(240))
const setModeFunction = inject<(mode: 'light' | 'dark' | 'system') => void>('setColorMode', (mode: 'light' | 'dark' | 'system') => { })

// Component oluşturulduğunda mevcut değeri kullan (istemci tarafında)
onBeforeMount(() => {
	if (process.client) {
		// LocalStorage'dan direkt oku böylece inject hatası yaşarsak da çalışır
		const savedHue = localStorage.getItem('theme-hue')
		if (savedHue) {
			hue.value = parseInt(savedHue)
		} else if (themeHue.value !== 240) {
			// Backup: inject edilen değeri kullan
			hue.value = themeHue.value
		}
	}
})

// Component DOM'a eklendiğinde tekrar kontrol et
onMounted(() => {
	if (process.client) {
		// LocalStorage'dan direkt oku böylece inject hatası yaşarsak da çalışır
		const savedHue = localStorage.getItem('theme-hue')
		if (savedHue) {
			hue.value = parseInt(savedHue)
		} else if (themeHue.value !== 240) {
			// Backup: inject edilen değeri kullan
			hue.value = themeHue.value
		}
	}
})

// Renk tonunu güncelleme
const updateHue = () => {
	setThemeHue(hue.value)
}

// Renk modu değiştirme
const setColorMode = (mode: 'light' | 'dark' | 'system') => {
	setModeFunction(mode)
}

// Slider için custom hue gradient oluşturan computed property
const colorSliderStyle = computed(() => {
	const stops = [];
	for (let h = 0; h <= 360; h += 10) {
		const stop = `oklch(68% 0.19 ${h}) ${h / 3.6}%`;
		stops.push(stop);
	}

	return {
		background: `linear-gradient(to right, ${stops.join(', ')})`,
		height: '22px', // 8px'den 12px'e yükseltildi
	};
});
</script>

<style scoped>
/* Sliderı daha güzel hale getirmek için özel stil */
input[type="range"] {
	-webkit-appearance: none;
	appearance: none;
	height: 12px;
	/* 8px'den 12px'e yükseltildi */
	border-radius: 12px;
	/* Border radius da arttırıldı */
	overflow: hidden;
	margin: 10px 0;
	/* Yukarı ve aşağıda extra boşluk ekle */
}

/* Slider thumb stilini seçilen renge göre güncelleme */
input[type="range"]::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	width: 22px;
	/* 16px'den 22px'e yükseltildi */
	height: 22px;
	/* 16px'den 22px'e yükseltildi */
	border-radius: 50%;
	background: oklch(68% 0.19 var(--hue, 240));
	border: 2px solid #fff;
	box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
	cursor: pointer;
	transform: translateY(0);
	/* Merkezleme için */
}

input[type="range"]::-moz-range-thumb {
	width: 22px;
	/* 16px'den 22px'e yükseltildi */
	height: 22px;
	/* 16px'den 22px'e yükseltildi */
	border-radius: 50%;
	background: oklch(68% 0.19 var(--hue, 240));
	border: 2px solid #fff;
	box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
	cursor: pointer;
}
</style>
