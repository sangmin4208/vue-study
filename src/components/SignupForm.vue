<script setup>
import { ref, defineEmits } from 'vue'
import useSignup from '../composables/useSignup'
const { error, signup } = useSignup()
const displayName = ref('')
const emit = defineEmits(['signup'])
const email = ref('')
const password = ref('')
const handleSubmit = async () => {
  await signup({
    email: email.value,
    password: password.value,
    displayName: displayName.value,
  })
  if (!error.value) {
    emit('signup')
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input
      type="text"
      required
      placeholder="display name"
      v-model="displayName"
    />
    <input type="email" required placeholder="email" v-model="email" />
    <input type="password" required placeholder="password" v-model="password" />
    <div class="error">{{ error }}</div>
    <button>Sign up</button>
  </form>
</template>
