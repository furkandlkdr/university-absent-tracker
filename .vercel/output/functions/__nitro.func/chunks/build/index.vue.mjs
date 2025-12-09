import { _ as __nuxt_component_0 } from './nuxt-link.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center py-10" }, _attrs))}><div class="w-full max-w-4xl"><div class="text-center mb-10"><h1 class="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-4"> UnivTrack | Devamsızlık Takip Uygulaması </h1><p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"> Öğrenciler için ders devamsızlıklarını kolayca takip etmek için tasarlanmış mobil öncelikli bir web uygulaması. </p></div><div class="grid md:grid-cols-2 gap-8"><div class="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-md"><h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Uygulama Özellikleri</h2><ul class="space-y-2"><li class="flex items-start"><div class="mr-2 mt-1 text-primary-500"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></div><span>Kolay dönem ve ders programı oluşturma</span></li><li class="flex items-start"><div class="mr-2 mt-1 text-primary-500"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></div><span>Özelleştirilebilir dönem uzunluğu (5-18 hafta)</span></li><li class="flex items-start"><div class="mr-2 mt-1 text-primary-500"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></div><span>Devamsızlıklarınızı mobil uyumlu arayüz ile takip edin</span></li><li class="flex items-start"><div class="mr-2 mt-1 text-primary-500"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></div><span>Otomatik devamsızlık limiti uyarıları</span></li><li class="flex items-start"><div class="mr-2 mt-1 text-primary-500"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></div><span>Kişiselleştirilebilir tema renkleri ve mod seçimi</span></li></ul></div><div class="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-md flex flex-col justify-between"><h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Hemen Başlayın</h2><p class="text-gray-600 dark:text-gray-400 mb-6"> Derslerinizin devamsızlık takibini kolaylaştırmak için hemen üye olun ve uygulamayı kullanmaya başlayın. </p><div class="flex flex-col space-y-3">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/register",
        class: "bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md text-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Hemen Üye Ol `);
          } else {
            return [
              createTextVNode(" Hemen Üye Ol ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-2 px-4 rounded-md text-center"
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
      _push(`</div></div></div></div></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index.vue.mjs.map
