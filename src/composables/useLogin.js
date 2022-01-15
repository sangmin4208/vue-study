import { signInWithEmailAndPassword } from 'firebase/auth'
import { ref } from 'vue'
import { auth } from '../firebase/config'

const error = ref(null)
const isPending = ref(false)

const login = async (email, password) => {
  error.value = null
  isPending.value = true
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    error.value = null

    return res
  } catch (err) {
    console.log(err.value)
    error.value = 'Incorrect'
  } finally {
    isPending.value = false
  }
}

const useLogin = () => {
  return { error, login, isPending }
}

export default useLogin
