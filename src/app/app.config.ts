import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter }                                from '@angular/router';
import { provideClientHydration, withEventReplay }      from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp }            from '@angular/fire/app';
import { getFirestore, provideFirestore }               from '@angular/fire/firestore';
import { getDatabase, provideDatabase }                 from '@angular/fire/database';
import { routes }                                       from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp({
      projectId: "simple-crm-b2615",
      appId:       "1:802308525370:web:c856cea51d16505c1b1403",
      storageBucket: "simple-crm-b2615.firebasestorage.app",
      apiKey:      "AIzaSyDYaRPVhsvGYVWAn74Mo10LqwZuTEwAOFY",
      authDomain:  "simple-crm-b2615.firebaseapp.com",
      messagingSenderId: "802308525370"
    })),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase())
  ]
};
