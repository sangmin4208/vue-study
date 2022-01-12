import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: 'AIzaSyDj7C74wzbO3zsXAwrUOoOUg-3wLxZN6g8',
  authDomain: 'vue-live-chat-f1075.firebaseapp.com',
  projectId: 'vue-live-chat-f1075',
  storageBucket: 'vue-live-chat-f1075.appspot.com',
  messagingSenderId: '902312206312',
  appId: '1:902312206312:web:52f044afb83be3d7c98e5d',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
