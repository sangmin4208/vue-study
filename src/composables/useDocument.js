import { ref } from 'vue'
import { db } from '@/firebase/config'
import {
  doc,
  deleteDoc as deleteDoc_firebase,
  updateDoc as updateDoc_firebase,
} from 'firebase/firestore'

const useDocument = (path, id) => {
  const error = ref(null)
  const isPending = ref(false)

  const docRef = doc(db, path, id)

  const deleteDoc = async () => {
    isPending.value = true
    error.value = null
    try {
      const res = await deleteDoc_firebase(docRef)
      return res
    } catch (err) {
      console.log(err.message)
      error.value = 'could not delete the document'
    } finally {
      isPending.value = false
    }
  }

  const updateDoc = async (updates) => {
    isPending.value = true
    error.value = null
    try {
      const res = await updateDoc_firebase(docRef, updates)
      return res
    } catch (err) {
      console.log(err.message)
      error.value = 'could not update the document'
    } finally {
      isPending.value = false
    }
  }
  return { error, isPending, deleteDoc, updateDoc }
}

export default useDocument
