<script setup>
import getCollection from '@/composables/getCollection'
import getUser from '@/composables/getUser'
import ListView from '../../components/ListView.vue'
import { orderBy, where } from 'firebase/firestore'
const { user } = getUser()
const { documents: playlists } = getCollection(
  'playlists',
  orderBy('createAt', 'desc'),
  where('userId', '==', user.value.uid)
)
console.log(user)
</script>

<template>
  <h2>My playlists</h2>
  <div v-if="playlists">
    <ListView :playlists="playlists"></ListView>
  </div>
  <router-link :to="{ name: 'CreatePlaylist' }" class="btn">
    Create a new Playlist
  </router-link>
</template>
