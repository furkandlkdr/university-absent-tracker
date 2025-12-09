import { sendPasswordResetEmail, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { c as useNuxtApp, e as useState } from './server.mjs';
import { computed } from 'vue';

const useAuth = () => {
  const nuxtApp = useNuxtApp();
  const auth = computed(() => {
    var _a;
    return (_a = nuxtApp.$firebase) == null ? void 0 : _a.auth;
  });
  const user = useState("user", () => null);
  const authInitialized = useState("auth-initialized", () => false);
  const register = async (email, password) => {
    if (!auth.value) return { user: null, error: "Firebase Auth not initialized" };
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth.value,
        email,
        password
      );
      return { user: userCredential.user, error: null };
    } catch (error) {
      return { user: null, error: error.message };
    }
  };
  const login = async (email, password) => {
    if (!auth.value) return { user: null, error: "Firebase Auth not initialized" };
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth.value,
        email,
        password
      );
      return { user: userCredential.user, error: null };
    } catch (error) {
      return { user: null, error: error.message };
    }
  };
  const logout = async () => {
    if (!auth.value) return { success: false, error: "Firebase Auth not initialized" };
    try {
      await signOut(auth.value);
      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  const resetPassword = async (email) => {
    if (!auth.value) return { success: false, error: "Firebase Auth not initialized" };
    try {
      await sendPasswordResetEmail(auth.value, email);
      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  return {
    user,
    authInitialized,
    isLoggedIn: computed(() => !!user.value),
    register,
    login,
    logout,
    resetPassword
  };
};

export { useAuth as u };
//# sourceMappingURL=useAuth.mjs.map
