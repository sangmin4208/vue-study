<script setup>
import { ref, defineEmits } from 'vue'
import useLogin from '../composables/useLogin'
const emit = defineEmits(['login'])
const email = ref('')
const password = ref('')
const { error, login } = useLogin()
const handleSubmit = async () => {
  await login(email.value, password.value)
  if (!error.value) {
    emit('login')
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input type="email" required placeholder="email" v-model="email" />
    <input type="password" required placeholder="password" v-model="password" />
    <div class="error">{{ error }}</div>
    <button>Log in</button>
  </form>
</template>
