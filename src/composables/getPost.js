import { ref } from 'vue'
import { db } from '../firebase/config'
import { doc, getDoc } from 'firebase/firestore'

const getPost = (id) => {
  const post = ref(null)
  const error = ref(null)
  const load = async () => {
    try {
      // let data = await fetch('http://localhost:3000/posts/' + id)
      // if (!data.ok) {
      //   throw Error('that post does not exist')
      // }
      // post.value = await data.json()
      const docRef = doc(db, 'posts', id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        post.value = { ...docSnap.data(), id: docSnap.id }
      } else {
        throw Error('post does not exist')
      }
    } catch (err) {
      error.value = err.message
      console.log(error.value)
    }
  }

  return { post, error, load }
}
export default getPost
