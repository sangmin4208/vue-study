<script setup>
import useLogOut from '../composables/userLogout'
import getUser from '../composables/getUser'
const { error, logout } = useLogOut()
const { user } = getUser()
const handleLogout = async () => {
  await logout()
  if (error.value) {
    console.log(error.value)
  }
}
</script>

<template>
  <nav v-if="user">
    <div>
      <p>Hey there {{ user.displayName }}</p>
      <p class="email">Currently logged in as {{ user.email }}</p>
    </div>
    <button @click="handleLogout">Logout</button>
  </nav>
</template>
<style>
nav {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav p {
  margin: 2px auto;
  font-size: 16px;
  color: #444;
}
nav p.email {
  font-size: 14px;
  color: #999;
}
</style>
