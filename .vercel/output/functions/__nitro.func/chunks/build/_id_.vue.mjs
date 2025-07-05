import { _ as __nuxt_component_0 } from './nuxt-link.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList } from 'vue/server-renderer';
import { format, parseISO, addWeeks } from 'date-fns';
import { tr } from 'date-fns/locale';
import { onClickOutside } from '@vueuse/core';
import { u as useDatabase } from './useDatabase.mjs';
import { u as useAuth } from './useAuth.mjs';
import { b as useRoute, a as useRouter } from './server.mjs';
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
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    useAuth();
    const { getTerm, getAttendanceRecords, updateAttendanceStatus, bulkUpdateAttendance, getTermStatistics, generateTermCalendar } = useDatabase();
    ref(route.params.id);
    const loading = ref(true);
    const term = ref(null);
    const attendanceRecords = ref([]);
    ref([]);
    const groupedCalendar = ref([]);
    const statistics = ref([]);
    ref(null);
    const selectedWeek = ref(1);
    const weekDropdownOpen = ref(false);
    const weekDropdownRef = ref(null);
    onClickOutside(weekDropdownRef, () => {
      weekDropdownOpen.value = false;
    });
    const showBulkUpdateModal = ref(false);
    const bulkUpdateLoading = ref(false);
    const bulkUpdateData = ref({
      termId: "",
      courseName: "",
      targetWeek: 0,
      newStatus: ""
    });
    const showToast = ref(false);
    const toastMessage = ref("");
    const toastType = ref("success");
    ref(null);
    const selectedWeekData = computed(() => {
      if (!groupedCalendar.value || !groupedCalendar.value.length) return null;
      const weekIndex = selectedWeek.value - 1;
      if (weekIndex >= 0 && weekIndex < groupedCalendar.value.length) {
        return groupedCalendar.value[weekIndex];
      }
      return null;
    });
    const formatWeekRange = (weekNum) => {
      if (!term.value) return "";
      const startDate = parseISO(term.value.startDate);
      const weekStartDate = addWeeks(startDate, weekNum - 1);
      const weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekStartDate.getDate() + 6);
      return `${format(weekStartDate, "dd.MM")}-${format(weekEndDate, "dd.MM")}`;
    };
    const formatDate = (dateString) => {
      try {
        return format(parseISO(dateString), "dd.MM.yyyy");
      } catch (e) {
        return dateString;
      }
    };
    const formatCalendarDate = (dateString) => {
      try {
        return format(parseISO(dateString), "EEEE, d MMMM", { locale: tr });
      } catch (e) {
        return dateString;
      }
    };
    const getTimeSlotLabel = (timeSlot) => {
      const labels = {
        "morning1": "Öğleden Önce - 1. Slot",
        "morning2": "Öğleden Önce - 2. Slot",
        "morningExtra1": "Öğleden Önce - 3. Slot",
        "morningExtra2": "Öğleden Önce - 4. Slot",
        "morningExtra3": "Öğleden Önce - 5. Slot",
        "afternoon1": "Öğleden Sonra - 1. Slot",
        "afternoon2": "Öğleden Sonra - 2. Slot",
        "afternoonExtra1": "Öğleden Sonra - 3. Slot",
        "afternoonExtra2": "Öğleden Sonra - 4. Slot",
        "afternoonExtra3": "Öğleden Sonra - 5. Slot"
      };
      return labels[timeSlot] || timeSlot;
    };
    const getAttendanceStatus = (entry) => {
      const record = attendanceRecords.value.find(
        (r) => r.courseName === entry.courseName && r.date === entry.date
      );
      return record ? record.status : null;
    };
    const getStatusButtonClass = (status, isActive) => {
      if (status === "Gittim") {
        return isActive ? "bg-green-500 text-white" : "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300";
      } else if (status === "Gitmedim") {
        return isActive ? "bg-red-500 text-white" : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300";
      } else {
        return isActive ? "bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300";
      }
    };
    const hasRiskyAttendance = computed(() => {
      return statistics.value.some((stat) => stat.isAtRisk);
    });
    const totalWeeks = computed(() => {
      var _a;
      if ((_a = term.value) == null ? void 0 : _a.weekCount) {
        return term.value.weekCount;
      }
      return term.value ? groupedCalendar.value.length || 14 : 14;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-6" }, _attrs))}>`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center items-center py-10"><div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div></div>`);
      } else if (!unref(term)) {
        _push(`<div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center"><p class="text-gray-600 dark:text-gray-400 mb-6"> Dönem bulunamadı veya erişim izniniz yok. </p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard",
          class: "bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Dönemlerim&#39;e Dön `);
            } else {
              return [
                createTextVNode(" Dönemlerim'e Dön ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div><div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6"><div><h1 class="text-2xl font-bold">${ssrInterpolate(unref(term).name)}</h1><p class="text-gray-600 dark:text-gray-400"><span>Başlangıç Tarihi: ${ssrInterpolate(formatDate(unref(term).startDate))}</span></p></div><div class="mt-4 md:mt-0 flex flex-wrap gap-2">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard",
          class: "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-md text-sm flex items-center"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="mr-1"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId}></path></svg></span> Dönemlerim&#39;e Dön `);
            } else {
              return [
                createVNode("span", { class: "mr-1" }, [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-4 w-4",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                    })
                  ]))
                ]),
                createTextVNode(" Dönemlerim'e Dön ")
              ];
            }
          }),
          _: 1
        }, _parent));
        if (!unref(term).isReadOnly) {
          _push(`<button class="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-md text-sm flex items-center"><span class="mr-1"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></span> Dönemi Düzenle </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="space-y-6"><div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"><h3 class="text-sm font-medium mb-2">Devamsızlık Durumu</h3><div class="flex flex-wrap gap-3"><div class="flex items-center"><span class="w-4 h-4 bg-green-500 rounded-full mr-2"></span><span class="text-sm">Gittim</span></div><div class="flex items-center"><span class="w-4 h-4 bg-red-500 rounded-full mr-2"></span><span class="text-sm">Gitmedim</span></div><div class="flex items-center"><span class="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full mr-2"></span><span class="text-sm">Tatil / Ders Yok</span></div><div class="flex items-center"><span class="w-4 h-4 bg-white border border-dashed border-gray-300 dark:border-gray-600 rounded-full mr-2"></span><span class="text-sm">İşaretlenmedi</span></div><div class="flex items-center"><span class="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full mr-2"></span><span class="text-sm">Ders henüz başlamamış</span></div></div></div><div class="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg p-4 text-sm flex items-start shadow-sm border border-blue-200 dark:border-blue-800"><div class="flex-shrink-0 mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg></div><div class="ml-2"><strong>Toplu Devamsızlık Güncelleme!</strong> Bir duruma (Gittim/Gitmedim/Tatil) <strong>uzun basarak</strong>, ilgili dersin önceki haftalarını topluca güncelleyebilirsiniz. İşaretlenmemiş haftalar için otomatik olarak yeni kayıtlar oluşturulur, var olan kayıtlar ise güncellenir (tatiller korunur). </div></div><div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"><div class="flex items-center justify-center"><button${ssrIncludeBooleanAttr(unref(selectedWeek) <= 1) ? " disabled" : ""} class="${ssrRenderClass([
          "p-2 rounded-md",
          unref(selectedWeek) <= 1 ? "text-gray-400 dark:text-gray-600 cursor-not-allowed" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        ])}"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button><div class="relative mx-4"><button class="bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-300 px-4 py-2 rounded-md font-medium flex items-center">${ssrInterpolate(unref(selectedWeek))}. Hafta - ${ssrInterpolate(formatWeekRange(unref(selectedWeek)))} <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>`);
        if (unref(weekDropdownOpen)) {
          _push(`<div class="absolute z-10 mt-1 py-1 bg-white dark:bg-gray-800 rounded-md shadow-lg max-h-60 overflow-y-auto w-full border border-gray-200 dark:border-gray-700"><!--[-->`);
          ssrRenderList(unref(totalWeeks), (weekNum) => {
            _push(`<button class="${ssrRenderClass([weekNum === unref(selectedWeek) ? "bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-300" : "text-gray-700 dark:text-gray-300", "w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"])}">${ssrInterpolate(weekNum)}. Hafta - ${ssrInterpolate(formatWeekRange(weekNum))}</button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><button${ssrIncludeBooleanAttr(unref(selectedWeek) >= unref(totalWeeks)) ? " disabled" : ""} class="${ssrRenderClass([
          "p-2 rounded-md",
          unref(selectedWeek) >= unref(totalWeeks) ? "text-gray-400 dark:text-gray-600 cursor-not-allowed" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        ])}"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></div></div>`);
        if (unref(selectedWeekData)) {
          _push(`<div class="bg-white dark:bg-gray-800 rounded-lg shadow"><div class="p-4"><div class="space-y-4"><!--[-->`);
          ssrRenderList(unref(selectedWeekData), (dayEntries, dayIndex) => {
            _push(`<div class="border-b border-gray-100 dark:border-gray-700 last:border-0 pb-4 last:pb-0"><h4 class="text-sm font-medium mb-2">${ssrInterpolate(formatCalendarDate(dayEntries[0].date))}</h4><div class="space-y-2"><!--[-->`);
            ssrRenderList(dayEntries, (entry) => {
              _push(`<div class="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-md"><div class="mb-2 sm:mb-0"><p class="font-medium">${ssrInterpolate(entry.courseName)}</p><p class="text-xs text-gray-500 dark:text-gray-400">${ssrInterpolate(getTimeSlotLabel(entry.timeSlot))}</p></div><div>`);
              if (!entry.isPast) {
                _push(`<div class="bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm px-3 py-1 rounded-md inline-block"> Gelecek Tarihi </div>`);
              } else if (unref(term).isReadOnly && !getAttendanceStatus(entry)) {
                _push(`<div class="bg-white border border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 text-sm px-3 py-1 rounded-md inline-block"> İşaretlenmedi </div>`);
              } else {
                _push(`<div class="flex space-x-2"><!--[-->`);
                ssrRenderList(["Gittim", "Gitmedim", "Tatil / Ders Yok"], (status) => {
                  _push(`<button class="${ssrRenderClass([
                    "text-sm px-3 py-1 rounded-md",
                    getAttendanceStatus(entry) === status ? getStatusButtonClass(status, true) : getStatusButtonClass(status, false),
                    unref(term).isReadOnly ? "cursor-not-allowed opacity-75" : "cursor-pointer hover:opacity-90"
                  ])}"${ssrIncludeBooleanAttr(unref(term).isReadOnly) ? " disabled" : ""}>${ssrInterpolate(status)}</button>`);
                });
                _push(`<!--]--></div>`);
              }
              _push(`</div></div>`);
            });
            _push(`<!--]--></div></div>`);
          });
          _push(`<!--]--></div></div></div>`);
        } else {
          _push(`<div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center"><p class="text-gray-600 dark:text-gray-400">Bu haftada ders bulunmamaktadır.</p></div>`);
        }
        _push(`<div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6"><h3 class="text-lg font-medium mb-4">Devamsızlık Özeti</h3><div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"><thead><tr><th class="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"> Ders Adı </th><th class="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"> Devamsızlık Durumu </th></tr></thead><tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"><!--[-->`);
        ssrRenderList(unref(statistics), (stat) => {
          _push(`<tr><td class="${ssrRenderClass([stat.isAtRisk ? "text-red-600 dark:text-red-400" : "", "px-6 py-4 whitespace-nowrap text-sm font-medium"])}">${ssrInterpolate(stat.name)}</td><td class="${ssrRenderClass([stat.isAtRisk ? "text-red-600 dark:text-red-400" : "", "px-6 py-4 whitespace-nowrap text-sm"])}">${ssrInterpolate(stat.absences)} / ${ssrInterpolate(stat.availableWeeks)}</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
        if (unref(hasRiskyAttendance)) {
          _push(`<div class="mt-6 p-3 bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-md"><p class="text-sm"><strong>Uyarı:</strong> Kırmızı renkli dersler devamsızlık limitine yaklaşıyor veya aşmış durumda. </p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      }
      if (unref(showBulkUpdateModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto"><div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full mx-4 mb-4 relative"><button class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button><div class="p-5 border-b border-gray-200 dark:border-gray-700"><h3 class="text-lg font-semibold">Toplu Güncelleme</h3></div> <div class="p-5"><p class="mb-4 text-gray-700 dark:text-gray-300"><strong>${ssrInterpolate(unref(bulkUpdateData).courseName)}</strong> dersinin ilk <strong>${ssrInterpolate(unref(bulkUpdateData).targetWeek)}</strong> haftasına ait devam durumlarını (tatiller hariç) &#39;<strong>${ssrInterpolate(unref(bulkUpdateData).newStatus)}</strong>&#39; olarak güncellemek istediğinize emin misiniz? </p><p class="text-sm text-blue-600 dark:text-blue-400 mb-4"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg> Henüz işaretlenmemiş haftalar için otomatik olarak yeni kayıtlar oluşturulacaktır. </p><div class="flex justify-end space-x-3 mt-6"><button class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"> İptal </button><button${ssrIncludeBooleanAttr(unref(bulkUpdateLoading)) ? " disabled" : ""} class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md disabled:opacity-50">${ssrInterpolate(unref(bulkUpdateLoading) ? "Güncelleniyor..." : "Güncelle")}</button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showToast)) {
        _push(`<div class="${ssrRenderClass([[
          unref(toastType) === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
        ], "fixed bottom-4 right-4 p-3 rounded-md shadow-lg z-50 transition-opacity duration-300"])}">${ssrInterpolate(unref(toastMessage))}</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/terms/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_.vue.mjs.map
