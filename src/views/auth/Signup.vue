<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useSignup from '@/composables/useSignup'
const router = useRouter()
const email = ref('')
const password = ref('')
const displayName = ref('')
const { error, signup, isPending } = useSignup()

const handleSubmit = async () => {
  await signup({
    email: email.value,
    password: password.value,
    displayName: displayName.value,
  })
  if (!error.value) {
    router.replace({ name: 'UserPlaylists' })
  }
}
</script>
<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input type="text" placeholder="Display name" v-model="displayName" />
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="srror">{{ error }}</div>
    <button v-if="!isPending">Sign up</button>
    <button v-else disabled>Loading...</button>
  </form>
</template>
