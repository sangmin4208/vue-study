import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref } from 'vue'
import { auth } from '../firebase/config'
const error = ref(null)

const signup = async ({ email, password, displayName }) => {
  error.value = null
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
  }
}

const useSignup = () => {
  return { error, signup }
}

export default useSignup
