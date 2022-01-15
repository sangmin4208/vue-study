import {
  getDownloadURL,
  ref as StorageRef,
  uploadBytes,
  deleteObject,
} from 'firebase/storage'
import { storage } from '@/firebase/config'
import getUser from '@/composables/getUser'
import { ref } from 'vue'
const { user } = getUser()

const useStorage = () => {
  const error = ref(null)
  const url = ref(null)
  const filePath = ref(null)

  const uploadImage = async (file) => {
    error.value = ''
    filePath.value = `covers/${user.value.uid}/${file.name}`
    const storageRef = StorageRef(storage, filePath.value)
    try {
      const res = await uploadBytes(storageRef, file)
      url.value = await getDownloadURL(res.ref)
    } catch (err) {
      console.log(err.message)
      error.value = err.message
    }
  }
  const deleteImage = async (path) => {
    error.value = ''
    const storageRef = StorageRef(storage, path)
    try {
      await deleteObject(storageRef)
    } catch (err) {
      console.log(err.message)
      error.value = err.message
    }
  }

  return { url, filePath, error, uploadImage, deleteImage }
}

export default useStorage
