import { _ as __nuxt_component_0 } from './nuxt-link.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useAuth } from './useAuth.mjs';
import { u as useDatabase } from './useDatabase.mjs';
import { a as useRouter } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'firebase/auth';
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'unhead/utils';
import 'devalue';
import 'unhead/plugins';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    const { getTerms } = useDatabase();
    useRouter();
    const email = ref("");
    const password = ref("");
    const loading = ref(false);
    const error = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center py-10" }, _attrs))}><div class="w-full max-w-md"><div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"><h1 class="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">Giriş Yap</h1><form class="space-y-4"><div><label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-posta</label><input id="email"${ssrRenderAttr("value", unref(email))} type="email" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white" placeholder="adiniz@example.com"></div><div><label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Şifre</label><input id="password"${ssrRenderAttr("value", unref(password))} type="password" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white" placeholder="********"></div><div class="text-right">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/forgot-password",
        class: "text-sm text-primary-600 dark:text-primary-400 hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Şifremi unuttum `);
          } else {
            return [
              createTextVNode(" Şifremi unuttum ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(error)) {
        _push(`<div class="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-2 rounded-md mt-4">${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit" class="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""}>`);
      if (unref(loading)) {
        _push(`<span>Giriş yapılıyor...</span>`);
      } else {
        _push(`<span>Giriş Yap</span>`);
      }
      _push(`</button></form><div class="mt-6 text-center"><p class="text-sm text-gray-600 dark:text-gray-400"> Hesabınız yok mu? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/register",
        class: "font-medium text-primary-600 dark:text-primary-400 hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Kaydolun `);
          } else {
            return [
              createTextVNode(" Kaydolun ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div><div class="mt-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 dark:bg-yellow-900 dark:border-yellow-600 dark:text-yellow-200 rounded-md shadow"><div class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg><p class="font-medium">Önemli Uyarı: Lütfen JavaScript&#39;i ve Ad blocker&#39;ları kapatın!</p></div><p class="ml-8 text-sm mt-1">Bu uygulama düzgün çalışmak için JavaScript gerektirir ve Ad blocker&#39;lar Firebase bağlantısını engelleyebilir.</p></div></div></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login.vue.mjs.map
