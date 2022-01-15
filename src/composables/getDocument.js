import { ref, watchEffect } from 'vue'
import { db } from '@/firebase/config'
import { onSnapshot, doc } from 'firebase/firestore'

const getDocument = (path, id) => {
  const document = ref(null)
  const error = ref(null)
  const unsub = onSnapshot(
    doc(db, path, id),
    (doc) => {
      if (!doc.data()) {
        error.value = `Document with ${id} doesn't exist`
        throw Error(`Document with ${id} doesn't exist`)
      } else {
        document.value = { ...doc.data(), id: doc.id }
        error.value = ''
      }
    },
    (err) => {
      console.log(err.message)
      document.value = null
      error.value = 'could not fetch data'
    }
  )

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub())
  })
  return { document, error }
}

export default getDocument
