import { d as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import { u as useAuth } from './useAuth.mjs';
import 'vue';
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
import 'vue/server-renderer';
import 'devalue';
import 'unhead/plugins';
import 'firebase/auth';

const auth = defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn.value && to.path !== "/" && to.path !== "/login" && to.path !== "/register" && to.path !== "/forgot-password") {
    return navigateTo("/login");
  }
  if (isLoggedIn.value && (to.path === "/login" || to.path === "/register" || to.path === "/forgot-password")) {
    return navigateTo("/dashboard");
  }
});

export { auth as default };
//# sourceMappingURL=auth.mjs.map
