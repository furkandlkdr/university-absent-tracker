import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut, // Logout için signOut ekliyorum
  type User, 
  type Auth
} from "firebase/auth";

export const useAuth = () => {
  const nuxtApp = useNuxtApp();
  const auth = computed(() => nuxtApp.$firebase?.auth as Auth | undefined);
  const user = useState<User | null>("user", () => null);
  const authInitialized = useState<boolean>("auth-initialized", () => false);

  // Flag to track if auth state listener is set
  let unsubscribeAuthListener: (() => void) | null = null;

  // Function to initialize auth state monitoring
  const initializeAuthListener = () => {
    if (auth.value && !unsubscribeAuthListener) {
      unsubscribeAuthListener = onAuthStateChanged(auth.value, (authUser) => {
        user.value = authUser;
        authInitialized.value = true;
      });
    }
  };

  // Monitor auth state - Use onNuxtReady for client-side execution
  onMounted(() => {
    if (process.client) {
      initializeAuthListener();

      // Watch for auth becoming available if plugin loads later
      watch(auth, (newAuth) => {
        if (newAuth && !unsubscribeAuthListener) {
          initializeAuthListener();
        }
      });
    }
  });

  // Cleanup on component unmount
  onUnmounted(() => {
    if (unsubscribeAuthListener) {
      unsubscribeAuthListener();
      unsubscribeAuthListener = null; // Reset flag
    }
  });

  // Register a new user
  const register = async (email: string, password: string) => {
    if (!auth.value) return { user: null, error: 'Firebase Auth not initialized' };
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth.value,
        email,
        password
      );
      return { user: userCredential.user, error: null };
    } catch (error: any) {
      return { user: null, error: error.message };
    }
  };

  // Login with email and password
  const login = async (email: string, password: string) => {
    if (!auth.value) return { user: null, error: 'Firebase Auth not initialized' };
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth.value,
        email,
        password
      );
      return { user: userCredential.user, error: null };
    } catch (error: any) {
      return { user: null, error: error.message };
    }
  };

  // Logout current user
  const logout = async () => {
    if (!auth.value) return { success: false, error: 'Firebase Auth not initialized' };
    try {
      await signOut(auth.value);
      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // Send password reset email
  const resetPassword = async (email: string) => {
    if (!auth.value) return { success: false, error: 'Firebase Auth not initialized' };
    try {
      await sendPasswordResetEmail(auth.value, email);
      return { success: true, error: null };
    } catch (error: any) {
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
    resetPassword,
  };
};