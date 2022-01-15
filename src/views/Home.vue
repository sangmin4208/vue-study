<script setup>
import getCollection from '@/composables/getCollection'
import ListView from '@/components/ListView.vue'
import { orderBy } from 'firebase/firestore'

const { documents, error } = getCollection(
  'playlists',
  orderBy('createAt', 'desc')
)
</script>
<template>
  <div class="home">
    <div v-if="error">Could not fetch the data</div>
    <div v-if="documents">
      <ListView :playlists="documents" />
    </div>
  </div>
</template>
