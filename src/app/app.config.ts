import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import {
  ScreenTrackingService,
  UserTrackingService,
  getAnalytics,
  provideAnalytics,
} from '@angular/fire/analytics'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { getAuth, provideAuth } from '@angular/fire/auth'
import { getFirestore, provideFirestore } from '@angular/fire/firestore'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter } from '@angular/router'

import { environment } from '../environments/environment'
import { routes } from './app.routes'
import { authFactory } from './auth/auth.factory'
import { AuthHttpInterceptor } from './auth/auth.http.interceptor'
import { AuthService } from './auth/auth.service'
import { provideUiService } from './common/ui.service'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([AuthHttpInterceptor])),
    {
      provide: AuthService,
      useFactory: authFactory,
    },
    provideUiService(),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideAnalytics(() => getAnalytics())),
    ScreenTrackingService,
    UserTrackingService,
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
}
