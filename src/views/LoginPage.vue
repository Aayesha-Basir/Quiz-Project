<template>
  <div class="login-container">
    <h2>Login Page</h2>
    <form @submit.prevent="login" class="login-form">
      <label for="username"> <font-awesome-icon icon="user" /> Username:</label>
      <input
        class="font-serif ..."
        v-model="username"
        type="text"
        id="username"
        placeholder="Enter your full name"
      />
      <button class="bg-dark hover:bg-sky-700 ..." type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref<string>('')

const login = () => {
  // Save username to localStorage
  localStorage.setItem('username', username.value)
  console.log(username.value)
  // provide('sharedData', username.value)
  router.push('/')
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
}

.login-form {
  width: 300px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/*button:hover {
    background-color: #2980b9;
}*/
</style>
