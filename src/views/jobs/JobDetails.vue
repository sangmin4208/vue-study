<template>
  <h1>Job Details Page</h1>
  <template v-if="job">
    <h2>{{ job.title }} ({{ job.id }})</h2>
    <p>{{ job.details }}</p>
  </template>
  <template v-else>
    <p>Loading job...</p>
  </template>
</template>

<script>
import { onMounted, reactive, toRefs } from '@vue/runtime-core'
export default {
  props: ['id'],
  // data() {
  //   return {
  //     id: this.$route.params.id,
  //   }
  // },
  setup(props) {
    const state = reactive({
      job: null,
    })
    onMounted(() => {
      fetch(`http://localhost:3000/jobs/${props.id}`)
        .then((res) => res.json())
        .then((data) => {
          state.job = data
        })
        .catch((err) => console.log(err))
    })
    return {
      ...toRefs(state),
    }
  },
}
</script>

<style></style>
