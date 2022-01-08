<template>
  <div class="project" :class="{ complete: project.complete }">
    <div class="actions">
      <h3 @click="showDetails = !showDetails">{{ project.title }}</h3>
      <div class="icons">
        <router-link :to="{ name: 'EditProject', params: { id: project.id } }">
          <div class="material-icons">edit</div>
        </router-link>
        <div @click="deleteProject" class="material-icons">delete</div>
        <div @click="toggleComplete" class="material-icons tick">done</div>
      </div>
    </div>
    <div class="details" v-if="showDetails">
      {{ project.details }}
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
const base_uri = 'http://localhost:3000/projects/'
export default {
  props: ['project'],
  setup(props, { emit }) {
    const state = reactive({
      showDetails: false,
    })
    const uri = base_uri + props.project.id
    const deleteProject = () => {
      fetch(uri, { method: 'DELETE' })
        .then(() => {
          emit('delete', props.project.id)
        })
        .catch((err) => console.log(err))
    }
    const toggleComplete = () => {
      fetch(uri, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ complete: !props.project.complete }),
      })
        .then(() => {
          emit('complete', props.project.id)
        })
        .catch((err) => console.log(err))
    }

    return {
      ...toRefs(state),
      deleteProject,
      toggleComplete,
    }
  },
}
</script>

<style>
.project {
  margin: 20px auto;
  background: white;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
  border-left: 10px solid #e90074;
}
.project.complete {
  border-left: 10px solid #00ce89;
}
.project.complete .tick {
  color: #00ce89;
  font-size: 30px;
}
h3 {
  cursor: pointer;
}
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.material-icons {
  font-size: 24px;
  margin-left: 10px;
  color: #bbb;
  cursor: pointer;
}
.material-icons:hover {
  color: #777;
}
</style>
