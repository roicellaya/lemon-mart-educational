import { AuthMode } from '../app/auth/auth.enum'

export const environment = {
  baseUrl: 'http://localhost:3000',
  authMode: AuthMode.CustomServer,
  firebaseConfig: {
    projectId: '',
    appId: '',
    storageBucket: '',
    apiKey: '',
    authDomain: '',
    messagingSenderId: '',
    measurementId: '',
  },
}
