import { _ as __nuxt_component_0 } from './nuxt-link.mjs';
import { defineComponent, ref, inject, computed, mergeProps, unref, useSSRContext, withCtx, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { f as useColorMode, e as useState } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper.mjs';
import { useRouter } from 'vue-router';
import { onClickOutside } from '@vueuse/core';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'unhead/utils';
import 'devalue';
import 'unhead/plugins';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ThemeSelector",
  __ssrInlineRender: true,
  setup(__props) {
    const colorMode = useColorMode();
    const hue = ref(240);
    inject("setThemeHue", (val) => {
    });
    inject("themeHue", ref(240));
    inject("setColorMode", (mode) => {
    });
    const colorSliderStyle = computed(() => {
      const stops = [];
      for (let h = 0; h <= 360; h += 10) {
        const stop = `oklch(68% 0.19 ${h}) ${h / 3.6}%`;
        stops.push(stop);
      }
      return {
        background: `linear-gradient(to right, ${stops.join(", ")})`,
        height: "22px"
        // 8px'den 12px'e yükseltildi
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "theme-selector bg-surface-light dark:bg-surface-dark rounded-lg shadow-lg p-4 w-full max-w-xs" }, _attrs))} data-v-e2e81f43><div class="mb-4 border-b border-gray-200 dark:border-gray-700 pb-3" data-v-e2e81f43><h3 class="text-md font-medium text-gray-800 dark:text-gray-200" data-v-e2e81f43>Theme Color</h3><div class="mt-3" data-v-e2e81f43><div class="relative w-full mb-1" data-v-e2e81f43><input type="range" min="0" max="360" step="1"${ssrRenderAttr("value", unref(hue))} class="w-full h-4 rounded-lg appearance-none cursor-pointer" style="${ssrRenderStyle(unref(colorSliderStyle))}" data-v-e2e81f43><div class="flex items-center justify-between mt-2" data-v-e2e81f43><div class="flex space-x-1" data-v-e2e81f43><!--[-->`);
      ssrRenderList([0.05, 0.1, 0.15, 0.19], (chroma) => {
        _push(`<div class="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600" style="${ssrRenderStyle({ backgroundColor: `oklch(68% ${chroma} ${unref(hue)})` })}" data-v-e2e81f43></div>`);
      });
      _push(`<!--]--></div><div class="text-xs text-gray-600 dark:text-gray-300" data-v-e2e81f43>${ssrInterpolate(unref(hue))}°</div></div><div class="mt-3 p-2 rounded-md flex items-center justify-center space-x-2 border border-gray-200 dark:border-gray-700" data-v-e2e81f43><div class="h-10 w-10 rounded-md flex items-center justify-center" style="${ssrRenderStyle({ backgroundColor: `oklch(68% 0.19 ${unref(hue)})` })}" data-v-e2e81f43><span class="text-white font-bold" data-v-e2e81f43>A</span></div><div class="h-10 w-10 rounded-md flex items-center justify-center" style="${ssrRenderStyle({ backgroundColor: `oklch(88% 0.08 ${unref(hue)})` })}" data-v-e2e81f43><span class="text-gray-800 font-bold" data-v-e2e81f43>B</span></div><div class="h-10 w-10 rounded-md flex items-center justify-center" style="${ssrRenderStyle({ backgroundColor: `oklch(60% 0.1 ${unref(hue)})` })}" data-v-e2e81f43><span class="text-white font-bold" data-v-e2e81f43>C</span></div><div class="h-10 w-10 rounded-md flex items-center justify-center" style="${ssrRenderStyle({ backgroundColor: `oklch(40% 0.06 ${unref(hue)})` })}" data-v-e2e81f43><span class="text-white font-bold" data-v-e2e81f43>D</span></div></div></div></div></div><div data-v-e2e81f43><h3 class="text-md font-medium mb-3 text-gray-800 dark:text-gray-200" data-v-e2e81f43>Color Mode</h3><div class="flex items-center space-x-2" data-v-e2e81f43><button class="${ssrRenderClass([
        "px-3 py-1 rounded-md text-sm flex items-center justify-center",
        unref(colorMode).preference === "light" ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
      ])}" data-v-e2e81f43><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e2e81f43><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" data-v-e2e81f43></path></svg> Light </button><button class="${ssrRenderClass([
        "px-3 py-1 rounded-md text-sm flex items-center justify-center",
        unref(colorMode).preference === "dark" ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
      ])}" data-v-e2e81f43><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e2e81f43><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" data-v-e2e81f43></path></svg> Dark </button><button class="${ssrRenderClass([
        "px-3 py-1 rounded-md text-sm flex items-center justify-center",
        unref(colorMode).preference === "system" ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
      ])}" data-v-e2e81f43><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e2e81f43><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-e2e81f43></path></svg> System </button></div></div></div>`);
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ThemeSelector.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e2e81f43"]]);

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const isLoggedIn = useState("user");
    useRouter();
    const showThemeSelector = ref(false);
    const themeSelectorRef = ref(null);
    onClickOutside(themeSelectorRef, () => {
      showThemeSelector.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ThemeSelector = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col min-h-screen" }, _attrs))}><header class="bg-surface-light dark:bg-surface-dark shadow"><nav class="container mx-auto px-4 py-4 flex items-center justify-between">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-xl font-bold text-primary-600 dark:text-primary-400"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` UnivTrack `);
          } else {
            return [
              createTextVNode(" UnivTrack ")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(isLoggedIn)) {
        _push(`<div class="flex items-center space-x-4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard",
          class: "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Dönemlerim `);
            } else {
              return [
                createTextVNode(" Dönemlerim ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 relative"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.65 20.5L2.5 14.35q-.25-.25-.375-.55T2 13.175t.125-.625T2.5 12l5.75-5.725l-2.65-2.65L7.15 2l10 10q.25.25.363.55t.112.625t-.112.625t-.363.55L11 20.5q-.25.25-.55.375T9.825 21t-.625-.125t-.55-.375M9.825 7.85l-5.35 5.35h10.7zM19.8 21q-.9 0-1.525-.638T17.65 18.8q0-.675.338-1.275t.762-1.175L19.8 15l1.1 1.35q.4.575.75 1.175T22 18.8q0 .925-.65 1.563T19.8 21"></path></svg></button><button class="text-red-600 dark:text-red-400 hover:underline"> Çıkış Yap </button>`);
        if (unref(showThemeSelector)) {
          _push(`<div class="absolute right-4 top-16 z-10 mt-2">`);
          _push(ssrRenderComponent(_component_ThemeSelector, null, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="flex items-center space-x-4"><button class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 relative"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.65 20.5L2.5 14.35q-.25-.25-.375-.55T2 13.175t.125-.625T2.5 12l5.75-5.725l-2.65-2.65L7.15 2l10 10q.25.25.363.55t.112.625t-.112.625t-.363.55L11 20.5q-.25.25-.55.375T9.825 21t-.625-.125t-.55-.375M9.825 7.85l-5.35 5.35h10.7zM19.8 21q-.9 0-1.525-.638T17.65 18.8q0-.675.338-1.275t.762-1.175L19.8 15l1.1 1.35q.4.575.75 1.175T22 18.8q0 .925-.65 1.563T19.8 21"></path></svg></button>`);
        if (unref(showThemeSelector)) {
          _push(`<div class="absolute right-4 top-16 z-10 mt-2">`);
          _push(ssrRenderComponent(_component_ThemeSelector, null, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Giriş Yap `);
            } else {
              return [
                createTextVNode(" Giriş Yap ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/register",
          class: "bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Kayıt Ol `);
            } else {
              return [
                createTextVNode(" Kayıt Ol ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</nav></header><main class="container mx-auto px-4 py-6 flex-grow">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="bg-surface-light dark:bg-surface-dark shadow-inner mt-auto"><div class="container mx-auto px-4 py-4 text-center text-gray-600 dark:text-gray-400 text-sm"><p>Made with ❤️ by <a href="https://github.com/furkandlkdr" target="_blank" class="underline hover:text-primary-500 transition-colors">Nafair</a></p><p>© ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} UnivTrack</p></div></footer></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default.vue.mjs.map
