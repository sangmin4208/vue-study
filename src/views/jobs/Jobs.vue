<template>
  <h1>Jobs</h1>
  <template v-if="jobs.length > 0">
    <div class="job" v-for="job in jobs" :key="job.id">
      <router-link :to="{ name: 'JobDetails', params: { id: job.id } }">
        <h2>{{ job.title }}</h2>
      </router-link>
    </div>
  </template>
  <template v-else>
    <p>Loading jobs...</p>
  </template>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
export default {
  setup() {
    const state = reactive({
      jobs: [],
    })
    onMounted(() => {
      fetch('http://localhost:3000/jobs')
        .then((res) => res.json())
        .then((data) => {
          state.jobs = data
        })
        .catch((err) => console.log(err))
    })
    return {
      ...toRefs(state),
    }
  },
}
</script>

<style>
.job h2 {
  background: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  margin: 10px auto;
  max-width: 600px;
  cursor: pointer;
  color: #444;
}
.job h2:hover {
  background: #ddd;
}
.job a {
  text-decoration: none;
}
</style>
