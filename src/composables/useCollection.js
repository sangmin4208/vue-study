import { ref } from 'vue'
import { db } from '../firebase/config'
import { collection, addDoc as addDoc_firebase } from 'firebase/firestore'
const useCollection = (collectionName) => {
  const error = ref(null)
  const addDoc = async (data) => {
    error.value = null
    try {
      await addDoc_firebase(collection(db, collectionName), data)
    } catch (err) {
      console.dir(err)
      error.value = 'could not send the message'
    }
  }
  return { error, addDoc }
}

export default useCollection
