import { ref, watchEffect } from 'vue'
import { db } from '../firebase/config'
import { onSnapshot, collection, query } from 'firebase/firestore'

const getCollection = (path, ...options) => {
  const documents = ref(null)
  const error = ref(null)
  const q = query(collection(db, path), ...options)

  const unsub = onSnapshot(
    q,
    (querySnapshot) => {
      const results = []
      querySnapshot.forEach((doc) => {
        doc.data().createAt &&
          results.push({
            ...doc.data(),
            id: doc.id,
          })
      })
      documents.value = results
      error.value = ''
    },
    (err) => {
      console.log(err.message)
      documents.value = []
      error.value = 'could not fetch data'
    }
  )

  watchEffect((onInvalidate) => {
    // unsub from prev collection when watcher is stopped (component unmounted)
    onInvalidate(() => unsub())
  })
  return { documents, error }
}

export default getCollection
