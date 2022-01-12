<script setup>
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import ChatForm from '../components/NewChatForm.vue'
import getUser from '../composables/getUser'
import ChatWindow from '../components/ChatWindow.vue'
const { user } = getUser()
const router = useRouter()

watch(user, () => {
  if (!user.value) {
    router.push({ name: 'Welcome' })
  }
})
</script>
<template>
  <div class="container">
    <Navbar />
    <ChatWindow />
    <ChatForm />
  </div>
</template>
