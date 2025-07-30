import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
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

  // Initialize auth listener immediately
  if (process.client) {
    // Small delay to ensure Firebase is fully initialized
    setTimeout(() => {
      initializeAuthListener();
    }, 100);
  }

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
      // Email format validation
      if (!email || !email.includes('@')) {
        return { user: null, error: 'Geçerli bir e-posta adresi girin' };
      }
      
      // Password length validation
      if (!password || password.length < 6) {
        return { user: null, error: 'Şifre en az 6 karakter olmalıdır' };
      }
      
      const userCredential = await signInWithEmailAndPassword(
        auth.value,
        email,
        password
      );
      return { user: userCredential.user, error: null };
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMessage = 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.';
      
      // Firebase error codes handling
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Bu e-posta ile kayıtlı kullanıcı bulunamadı.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Şifre yanlış. Lütfen tekrar deneyin.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Çok fazla başarısız giriş denemesi. Lütfen daha sonra tekrar deneyin.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Geçersiz e-posta formatı.';
          break;
        default:
          errorMessage = error.message || errorMessage;
      }
      
      return { user: null, error: errorMessage };
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
