import { ref } from 'vue'
import { db } from '../firebase/config'
import { collection, addDoc as addDoc_firebase } from 'firebase/firestore'
const useCollection = (path) => {
  const error = ref(null)
  const isPending = ref(false)
  const addDoc = async (data) => {
    isPending.value = true
    error.value = null
    try {
      const res = await addDoc_firebase(collection(db, path), data)
      return res
    } catch (err) {
      console.dir(err)
      error.value = `failed to add doc into the ${path}`
    } finally {
      isPending.value = false
    }
  }
  return { error, addDoc, isPending }
}

export default useCollection
