<template>
  <FilterNav @filterChange="current = $event" :current="current" />
  <div v-if="projects.length">
    <div v-for="project in filteredProjects" :key="project.id">
      <SingleProject
        :project="project"
        @delete="handleDelete"
        @complete="handleComplete"
      />
    </div>
  </div>
</template>

<script>
import SingleProject from '../components/SingleProject.vue'
import FilterNav from '../components/FilterNav.vue'
import { onMounted, reactive, toRefs } from '@vue/runtime-core'
import { computed } from 'vue'
export default {
  name: 'Home',
  components: { SingleProject, FilterNav },
  setup() {
    const state = reactive({
      projects: [],
      current: 'all',
    })
    onMounted(() => {
      fetch(' http://localhost:3000/projects')
        .then((res) => res.json())
        .then((data) => {
          state.projects = data
        })
    })

    let filteredProjects = computed(() => {
      let projects = [...state.projects]
      switch (state.current) {
        case 'completed':
          return state.projects.filter((project) => project.complete)
        case 'ongoing':
          return state.projects.filter((project) => !project.complete)
        default:
          projects.sort((a, b) => {
            return b.complete - a.complete
          })
          return projects
      }
    })
    const handleDelete = (id) => {
      state.projects = state.projects.filter((project) => project.id !== id)
    }
    const handleComplete = (id) => {
      let project = state.projects.find((project) => project.id === id)
      project.complete = !project.complete
    }
    return {
      ...toRefs(state),
      handleDelete,
      handleComplete,
      filteredProjects,
    }
  },
}
</script>
