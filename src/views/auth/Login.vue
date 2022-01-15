<script setup>
import { ref } from 'vue'

import useLogin from '@/composables/useLogin'
import { useRouter } from 'vue-router'

const { error, login, isPending } = useLogin()
const router = useRouter()
const email = ref('')
const password = ref('')
const handleSubmit = async () => {
  await login(email.value, password.value)
  if (!error.value) {
    router.replace({ name: 'UserPlaylists' })
  }
}
</script>
<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <p class="error">{{ error }}</p>
    <button v-if="!isPending">Log in</button>
    <button v-else disabled>Loding...</button>
  </form>
</template>
