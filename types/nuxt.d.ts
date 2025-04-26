import type { FirebaseApp } from 'firebase/app'
import type { Auth } from 'firebase/auth'

declare module '#app' {
  interface NuxtApp {
    $firebase: {
      firestore: any;
      app: FirebaseApp;
      auth: Auth;
    }
  }
}

export {}