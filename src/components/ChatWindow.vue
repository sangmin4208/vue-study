<script setup>
import getCollection from '../composables/getCollection'
import { formatDistanceToNow } from 'date-fns'
import { computed, ref, onUpdated } from 'vue'
const { error, documents } = getCollection('messages')
const formattedDocuments = computed(() => {
  if (documents.value) {
    return documents.value.map((doc) => {
      let time = formatDistanceToNow(doc.createAt.toDate())
      return { ...doc, createAt: time }
    })
  }
  return documents
})

// auto-scroll to bottom of messages
const messages = ref(null)
onUpdated(() => {
  messages.value.scrollTop = messages.value.scrollHeight
})
</script>
<template>
  <div class="chat-window">
    <div v-if="error">{{ error }}</div>
    <div v-if="documents" class="messages" ref="messages">
      <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
        <span class="created-at">{{ doc.createAt.toString() }}</span>
        <span class="name">{{ doc.name }}</span>
        <span class="message">{{ doc.message }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-window {
  background: #fafafa;
  padding: 30px 20px;
}
.single {
  margin: 18px 0;
}
.created-at {
  display: block;
  color: #999;
  font-size: 12px;
  margin-bottom: 4px;
}
.name {
  font-weight: bold;
  margin-right: 6px;
}
.messages {
  max-height: 400px;
  overflow: auto;
}
</style>
