import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref } from 'vue'
import { auth } from '@/firebase/config'

const error = ref(null)
const isPending = ref(false)
const signup = async ({ email, password, displayName }) => {
  error.value = null
  isPending.value = true
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    if (!res) {
      throw new Error('Could not complete the singup')
    }
    error.value = null
    updateProfile(res.user, { displayName })
    return res.user
  } catch (err) {
    console.log(err)
    error.value = err.message
  } finally {
    isPending.value = false
  }
}

const useSignup = () => {
  return { error, signup }
}

export default useSignup
