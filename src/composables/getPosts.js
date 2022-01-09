import { ref } from 'vue'
import {
  collection,
  // getDocs,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { db } from '../firebase/config'
const getPosts = () => {
  const posts = ref([])
  const error = ref(null)
  const load = async () => {
    try {
      // let data = await fetch('http://localhost:3000/posts')
      // if (!data.ok) {
      //   throw Error('no data available')
      // }
      // posts.value = await data.json()

      // Firebase: snapshot
      // const querySnapshot = await getDocs(
      //   query(collection(db, 'posts'), orderBy('createAt', 'desc'))
      // )
      // posts.value = querySnapshot.docs.map((doc) => ({
      //   id: doc.id,
      //   ...doc.data(),
      // }))
      onSnapshot(
        query(collection(db, 'posts'), orderBy('createAt', 'desc')),
        (querySnapshot) => {
          posts.value = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        }
      )
    } catch (err) {
      error.value = err.message
    }
  }

  return { posts, error, load }
}

export default getPosts
