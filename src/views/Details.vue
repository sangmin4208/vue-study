<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="post" class="post">
    <h3>{{ post.title }}</h3>
    <p class="pre">{{ post.body }}</p>
    <button @click="handleClick">Delete</button>
  </div>
  <div v-else>
    <Spinner />
  </div>
</template>

<script>
import getPost from '@/composables/getPost'
import Spinner from '@/components/Spinner.vue'
import { useRoute, useRouter } from 'vue-router'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
export default {
  // props: ['id'],
  components: {
    Spinner,
  },
  setup(/*props*/) {
    const route = useRoute()
    const router = useRouter()
    const id = route.params.id
    // const { post, error, load } = getPost(props.id)
    const { post, error, load } = getPost(id)
    load()

    const handleClick = async () => {
      await deleteDoc(doc(db, 'posts', id))
      router.replace({ name: 'Home' })
    }

    return { post, error, handleClick }
  },
}
</script>

<style scoped>
.tags a {
  margin-right: 10px;
}
.post {
  max-width: 1200px;
  margin: 0 auto;
}
.post p {
  color: #444;
  line-height: 1.5em;
  margin-top: 40px;
}
.pre {
  white-space: pre-wrap;
}
</style>
