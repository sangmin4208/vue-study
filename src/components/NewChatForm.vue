<script setup>
import { ref } from 'vue'
import { serverTimestamp } from 'firebase/firestore'
import getUser from '../composables/getUser'
import useCollection from '../composables/useCollection'
const message = ref('')
const { user } = getUser()
const { addDoc, error } = useCollection('messages')
const handleSubmit = async () => {
  if (!message.value) {
    return
  }
  const chat = {
    name: user.value.displayName,
    message: message.value,
    createAt: serverTimestamp(),
  }

  await addDoc(chat)
  if (!error.value) {
    message.value = ''
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <textarea
      placeholder="Type a message and hit enter to send..."
      v-model="message"
      @keypress.enter.prevent="handleSubmit"
    ></textarea>
    <div>{{ error }}</div>
  </form>
</template>

<style scoped>
form {
  margin: 10px;
}
textarea {
  width: 100%;
  max-width: 100%;
  margin-bottom: 6px;
  padding: 10px;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  font-family: inherit;
  outline: none;
}
</style>
