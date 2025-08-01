import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { format, parseISO } from 'date-fns';
import { u as useDatabase } from './useDatabase.mjs';
import { u as useAuth } from './useAuth.mjs';
import { a as useRouter, b as useRoute } from './server.mjs';
import 'firebase/auth';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'unhead/utils';
import 'devalue';
import 'unhead/plugins';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    const { getTerms, getTerm, addTerm, updateTerm, deleteTerm: deleteTermFunc } = useDatabase();
    useRouter();
    useRoute();
    const loading = ref(true);
    const terms = ref([]);
    const showNewTermModal = ref(false);
    const showEditTermModal = ref(false);
    const termForm = ref({
      id: "",
      name: "",
      startDate: "",
      weekCount: 14,
      // Varsayılan olarak 14 hafta
      schedule: [
        { morningSlots: [""], afternoonSlots: [""] },
        // Pazartesi
        { morningSlots: [""], afternoonSlots: [""] },
        // Salı
        { morningSlots: [""], afternoonSlots: [""] },
        // Çarşamba
        { morningSlots: [""], afternoonSlots: [""] },
        // Perşembe
        { morningSlots: [""], afternoonSlots: [""] }
        // Cuma
      ]
    });
    const termFormLoading = ref(false);
    const termFormError = ref("");
    const showDeleteModal = ref(false);
    const termToDelete = ref(null);
    const deleteLoading = ref(false);
    const days = [
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma"
    ];
    const formatDate = (dateString) => {
      try {
        return format(parseISO(dateString), "dd.MM.yyyy");
      } catch (e) {
        return dateString;
      }
    };
    const getTotalCourses = (term) => {
      const courseNames = /* @__PURE__ */ new Set();
      term.schedule.forEach((course) => {
        if (course.name) courseNames.add(course.name);
      });
      return courseNames.size;
    };
    const weekCountError = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-6" }, _attrs))}><h1 class="text-2xl font-bold mb-6">Dönemlerim</h1>`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center items-center py-10"><div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>`);
      } else {
        _push(`<!--[--><div class="mb-6"><button class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md flex items-center"><span class="mr-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"></path></svg></span> Yeni Dönem Ekle </button></div>`);
        if (unref(terms).length === 0) {
          _push(`<div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center"><p class="text-gray-600 dark:text-gray-400 mb-4"> Henüz hiç dönem eklemediniz. </p><p class="text-gray-600 dark:text-gray-400"> Devamsızlık takibine başlamak için &quot;Yeni Dönem Ekle&quot; butonunu kullanın. </p></div>`);
        } else {
          _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
          ssrRenderList(unref(terms), (term) => {
            _push(`<div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-lg transition-shadow"><div class="flex items-start justify-between mb-4"><div><h3 class="text-lg font-semibold">${ssrInterpolate(term.name)}</h3><p class="text-sm text-gray-600 dark:text-gray-400"> Başlangıç: ${ssrInterpolate(formatDate(term.startDate))}</p></div><span class="${ssrRenderClass([
              "px-2 py-1 text-xs rounded-full",
              term.isReadOnly ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300" : "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
            ])}">${ssrInterpolate(term.isReadOnly ? "Tamamlandı" : "Aktif")}</span></div><p class="text-sm text-gray-600 dark:text-gray-400 mb-4">${ssrInterpolate(getTotalCourses(term))} ders </p><div class="flex justify-end space-x-2 mt-2"><button class="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center"><span class="mr-1"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg></span> Görüntüle </button>`);
            if (!term.isReadOnly) {
              _push(`<button class="text-gray-600 dark:text-gray-400 hover:underline text-sm flex items-center"><span class="mr-1"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg></span> Düzenle </button>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<button class="text-red-600 dark:text-red-400 hover:underline text-sm flex items-center"><span class="mr-1"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg></span> Sil </button></div></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`<!--]-->`);
      }
      if (unref(showNewTermModal) || unref(showEditTermModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto"><div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg w-full mx-4 mb-4 max-h-[85vh] overflow-y-auto relative"><button class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button><div class="p-5 border-b border-gray-200 dark:border-gray-700"><h3 class="text-lg font-semibold">${ssrInterpolate(unref(showEditTermModal) ? "Dönemi Düzenle" : "Yeni Dönem Ekle")}</h3></div><div class="p-5"><form class="space-y-4"><div><label for="termName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Dönem Adı <span class="text-red-500">*</span></label><input id="termName"${ssrRenderAttr("value", unref(termForm).name)} type="text" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" placeholder="Örn: 2025 Bahar"></div><div><label for="startDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Başlangıç Tarihi <span class="text-red-500">*</span></label><input id="startDate"${ssrRenderAttr("value", unref(termForm).startDate)} type="date" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"></div><div><label for="weekCount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Dönem Uzunluğu (Hafta) <span class="text-red-500">*</span></label><div class="flex items-stretch"><button type="button" class="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white flex items-center justify-center"${ssrIncludeBooleanAttr(unref(termForm).weekCount <= 5) ? " disabled" : ""}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg></button><div class="relative flex-1"><input id="weekCount"${ssrRenderAttr("value", unref(termForm).weekCount)} type="number" min="5" max="18" required class="w-full px-3 py-2 border-y border-gray-300 dark:border-gray-700 text-center focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"><div class="absolute inset-y-0 right-0 flex items-center px-3 text-xs text-gray-500 dark:text-gray-400"> hafta </div></div><button type="button" class="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-r-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white flex items-center justify-center"${ssrIncludeBooleanAttr(unref(termForm).weekCount >= 18) ? " disabled" : ""}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg></button></div><p class="${ssrRenderClass([{ "text-red-500 dark:text-red-400 font-medium animate-pulse": unref(weekCountError), "text-gray-500 dark:text-gray-400": !unref(weekCountError) }, "mt-1 text-xs"])}"> Dönem süresi 5 ile 18 hafta arasında olabilir (varsayılan: 14 hafta) </p></div><div><h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Haftalık Ders Programı</h4><div class="space-y-6"><!--[-->`);
        ssrRenderList(days, (day, dayIndex) => {
          _push(`<div class="border border-gray-200 dark:border-gray-700 rounded-md p-3"><h5 class="font-medium mb-2">${ssrInterpolate(day)}</h5><div class="space-y-3"><div><div class="flex justify-between items-center mb-1"><h6 class="text-xs text-gray-500 dark:text-gray-400">Öğleden Önce</h6>`);
          if (unref(termForm).schedule[dayIndex].morningSlots.length < 5) {
            _push(`<button type="button" class="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> ÖÖ Ders Slotu Ekle </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="grid grid-cols-1 gap-2"><!--[-->`);
          ssrRenderList(unref(termForm).schedule[dayIndex].morningSlots, (slot, slotIndex) => {
            _push(`<div class="flex items-center"><span class="text-xs w-10">${ssrInterpolate(slotIndex + 1)}.</span><input${ssrRenderAttr("value", unref(termForm).schedule[dayIndex].morningSlots[slotIndex])} type="text" class="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" placeholder="Ders adı">`);
            if (unref(termForm).schedule[dayIndex].morningSlots.length > 1) {
              _push(`<button type="button" class="ml-1 text-gray-500 hover:text-red-500"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></div></div><div><div class="flex justify-between items-center mb-1"><h6 class="text-xs text-gray-500 dark:text-gray-400">Öğleden Sonra</h6>`);
          if (unref(termForm).schedule[dayIndex].afternoonSlots.length < 5) {
            _push(`<button type="button" class="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> ÖS Ders Slotu Ekle </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="grid grid-cols-1 gap-2"><!--[-->`);
          ssrRenderList(unref(termForm).schedule[dayIndex].afternoonSlots, (slot, slotIndex) => {
            _push(`<div class="flex items-center"><span class="text-xs w-10">${ssrInterpolate(slotIndex + 1)}.</span><input${ssrRenderAttr("value", unref(termForm).schedule[dayIndex].afternoonSlots[slotIndex])} type="text" class="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" placeholder="Ders adı">`);
            if (unref(termForm).schedule[dayIndex].afternoonSlots.length > 1) {
              _push(`<button type="button" class="ml-1 text-gray-500 hover:text-red-500"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></div></div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
        if (unref(termFormError)) {
          _push(`<div class="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-2 rounded-md">${ssrInterpolate(unref(termFormError))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700"><button type="button" class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"> İptal </button><button type="submit"${ssrIncludeBooleanAttr(unref(termFormLoading)) ? " disabled" : ""} class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md disabled:opacity-50">${ssrInterpolate(unref(termFormLoading) ? "Kaydediliyor..." : "Kaydet")}</button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showDeleteModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto"><div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full mx-4 mb-4 relative"><button class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button><div class="p-5 border-b border-gray-200 dark:border-gray-700"><h3 class="text-lg font-semibold">Dönemi Sil</h3></div><div class="p-5"><p class="mb-4 text-gray-700 dark:text-gray-300"><strong>${ssrInterpolate((_a = unref(termToDelete)) == null ? void 0 : _a.name)}</strong> dönemini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz ve tüm devamsızlık kayıtları silinecektir. </p><div class="flex justify-end space-x-3"><button type="button" class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"> İptal </button><button type="button"${ssrIncludeBooleanAttr(unref(deleteLoading)) ? " disabled" : ""} class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md disabled:opacity-50">${ssrInterpolate(unref(deleteLoading) ? "Siliniyor..." : "Evet, Sil")}</button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dashboard.vue.mjs.map
