// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, Timestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: 'AIzaSyAaTQGsaIEqmSMoz5c9TKlZeDmAtC3H508',
  authDomain: 'vue-muso-ba1c2.firebaseapp.com',
  projectId: 'vue-muso-ba1c2',
  storageBucket: 'vue-muso-ba1c2.appspot.com',
  messagingSenderId: '366722587739',
  appId: '1:366722587739:web:455eb0703442d49951337e',
  measurementId: 'G-879P69746C',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// init services
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

const timestamp = Timestamp.now

export { db, auth, storage, timestamp }
