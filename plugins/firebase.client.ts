import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, enableIndexedDbPersistence, connectFirestoreEmulator, CACHE_SIZE_UNLIMITED } from 'firebase/firestore'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  
  // Her değer için string türünü garantileyen helper fonksiyon
  const getConfigValue = (value: string | undefined, fallback: string): string => {
    return value || fallback;
  }
  
  const config = {
    // String türü garantili yapılandırma değerleri
    apiKey: runtimeConfig.public?.firebaseApiKey || import.meta.env?.FIREBASE_API_KEY,
    authDomain: runtimeConfig.public?.firebaseAuthDomain || import.meta.env?.FIREBASE_AUTH_DOMAIN,
    projectId: runtimeConfig.public?.firebaseProjectId || import.meta.env?.FIREBASE_PROJECT_ID,
    storageBucket: runtimeConfig.public?.firebaseStorageBucket || import.meta.env?.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: runtimeConfig.public?.firebaseMessagingSenderId || import.meta.env?.FIREBASE_MESSAGING_SENDER_ID,
    appId: runtimeConfig.public?.firebaseAppId || import.meta.env?.FIREBASE_APP_ID
  }

  // Firebase örneklerini oluşturma işlemini try-catch bloğu içine alalım
  try {
    const app = initializeApp(config)
    const auth = getAuth(app)
    
    // Enhanced Firestore configuration with persistence and better error handling
    const firestore = getFirestore(app)
    
    // Enable offline persistence with unlimited cache size
    // This helps when connection issues occur or ad-blockers interfere
    // The settings object is removed as cacheSizeBytes is not a valid property here.
    // IndexedDB persistence uses unlimited cache by default.
    enableIndexedDbPersistence(firestore)
      .catch((err) => {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a time
        console.warn('Firebase persistence could not be enabled: Multiple tabs open')
      } else if (err.code === 'unimplemented') {
        // The current browser does not support persistence
        console.warn('Firebase persistence not supported in this browser')
      } else {
        console.error('Error enabling Firebase persistence:', err)
      }
    });

    nuxtApp.provide('firebase', { app, auth, firestore })
    console.log('Firebase başarıyla başlatıldı.')
  } catch (error) {
    console.error('Firebase başlatılırken hata oluştu:', error)
    // Firebase olmadığında uygulamanın çökmemesi için boş nesneler sağlayalım
    nuxtApp.provide('firebase', { 
      app: null, 
      auth: null, 
      firestore: null 
    })
  }
})
