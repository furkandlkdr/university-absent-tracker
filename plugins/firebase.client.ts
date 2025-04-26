import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, enableIndexedDbPersistence, connectFirestoreEmulator, CACHE_SIZE_UNLIMITED } from 'firebase/firestore'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  
  const config = {
    // Öncelikle runtime config'ten değerleri almayı dene
    apiKey: runtimeConfig.public?.firebaseApiKey || import.meta.env.FIREBASE_API_KEY || '**FIREBASE_API_KEY**',
    authDomain: runtimeConfig.public?.firebaseAuthDomain || import.meta.env.FIREBASE_AUTH_DOMAIN || '**FIREBASE_AUTH_DOMAIN**',
    projectId: runtimeConfig.public?.firebaseProjectId || import.meta.env.FIREBASE_PROJECT_ID || '**FIREBASE_PROJECT_ID**',
    storageBucket: runtimeConfig.public?.firebaseStorageBucket || import.meta.env.FIREBASE_STORAGE_BUCKET || '**FIREBASE_STORAGE_BUCKET**',
    messagingSenderId: runtimeConfig.public?.firebaseMessagingSenderId || import.meta.env.FIREBASE_MESSAGING_SENDER_ID || '**FIREBASE_MESSAGING_SENDER_ID**',
    appId: runtimeConfig.public?.firebaseAppId || import.meta.env.FIREBASE_APP_ID || '**FIREBASE_APP_ID**'
  }

  // Firebase örneklerini oluşturma işlemini try-catch bloğu içine alalım
  try {
    const app = initializeApp(config)
    const auth = getAuth(app)
    
    // Enhanced Firestore configuration with persistence and better error handling
    const firestore = getFirestore(app)
    
    // Enable offline persistence with unlimited cache size
    // This helps when connection issues occur or ad-blockers interfere
    enableIndexedDbPersistence(firestore, {
      cacheSizeBytes: CACHE_SIZE_UNLIMITED
    }).catch((err) => {
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