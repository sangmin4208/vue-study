import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: 'AIzaSyBRVA60rXe8Kw2jPgb8onBIpKTH71r92dE',
  authDomain: 'vue-blog-4c512.firebaseapp.com',
  projectId: 'vue-blog-4c512',
  storageBucket: 'vue-blog-4c512.appspot.com',
  messagingSenderId: '583149500928',
  appId: '1:583149500928:web:a7cb9fe91d63b79bc876e5',
  measurementId: 'G-SNGNC03X9D',
}

// init firebase
const firebaseApp = initializeApp(firebaseConfig)

// init firestore service
const db = getFirestore()

export { firebaseApp, db }
