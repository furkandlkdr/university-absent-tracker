import { _ as __nuxt_component_0 } from './nuxt-link.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { u as useAuth } from './useAuth.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import './server.mjs';
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'unhead/utils';
import 'devalue';
import 'unhead/plugins';
import 'firebase/auth';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "forgot-password",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    const email = ref("");
    const loading = ref(false);
    const error = ref("");
    const success = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center py-10" }, _attrs))}><div class="w-full max-w-md"><div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"><h1 class="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">Şifre Sıfırlama</h1>`);
      if (unref(success)) {
        _push(`<div class="bg-green-100 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-300 px-4 py-2 rounded-md mb-4"> Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen e-postanızı kontrol edin. </div>`);
      } else {
        _push(`<!--[--><p class="text-gray-600 dark:text-gray-400 mb-4"> Şifrenizi sıfırlamak için e-posta adresinizi girin. Size bir sıfırlama bağlantısı göndereceğiz. </p><form class="space-y-4"><div><label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-posta</label><input id="email"${ssrRenderAttr("value", unref(email))} type="email" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white" placeholder="adiniz@example.com"></div>`);
        if (unref(error)) {
          _push(`<div class="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-2 rounded-md mt-4">${ssrInterpolate(unref(error))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button type="submit" class="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50"${ssrIncludeBooleanAttr(unref(loading) || !unref(email)) ? " disabled" : ""}>`);
        if (unref(loading)) {
          _push(`<span>Gönderiliyor...</span>`);
        } else {
          _push(`<span>Sıfırlama Bağlantısı Gönder</span>`);
        }
        _push(`</button></form><!--]-->`);
      }
      _push(`<div class="mt-6 text-center"><p class="text-sm text-gray-600 dark:text-gray-400">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "font-medium text-primary-600 dark:text-primary-400 hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Giriş sayfasına dön `);
          } else {
            return [
              createTextVNode(" Giriş sayfasına dön ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div></div></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/forgot-password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=forgot-password.vue.mjs.map
