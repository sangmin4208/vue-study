<template>
  <form @submit.prevent="handleSubmit" v-if="project">
    <label>Title:</label>
    <input type="text" v-model="project.title" required />
    <label>Details:</label>
    <textarea v-model="project.details" required></textarea>
    <button>Update Poject</button>
  </form>
  <p v-else>loading...</p>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { onMounted } from '@vue/runtime-core'
export default {
  props: ['id'],
  setup(props) {
    const router = useRouter()
    let data = reactive({
      project: null,
    })
    const uri = `http://localhost:3000/projects/${props.id}`
    onMounted(() => {
      fetch(uri).then(async (res) => {
        data.project = await res.json()
      })
    })
    const handleSubmit = () => {
      let project = {
        ...data.project,
      }
      fetch(uri, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...project }),
      })
        .then(() => {
          router.replace({ name: 'Home' })
        })
        .catch((err) => {
          console.log(err)
        })
    }
    return {
      ...toRefs(data),
      handleSubmit,
    }
  },
}
</script>

<style></style>
