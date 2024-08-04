<template>
  <div id="container" class="font-serif ...">
    <section id="sec">
      <p>MindMingle <font-awesome-icon icon="lightbulb" /></p>
      <img
        id="quizImage"
        src="https://th.bing.com/th/id/OIP.2qxXEwEuearPg3nL_n6laAAAAA?pid=ImgDet&w=181&h=181&c=7&dpr=1.3"
        alt="Image"
      />
      <div class="dashboard">
        <button id="quiz-button" @click="goToQuiz">
          <font-awesome-icon icon="list" id="play" /> Quiz Dashboard
        </button>
      </div>
    </section>

    <aside id="aside">
      <Button @submit="startGame" :name="buttonName" class="mx-6 my-6"></Button>

      <div id="aside-container">
        <img
          id="user"
          src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          alt="image"
        />
        <div id="align-item">
          <h1 class="text-dark">{{ user }}</h1>

          <div class="game-data">
            <span>
              <p id="icon"><font-awesome-icon icon="medal" id="medal" /></p>
              <div id="score-text">
                <h2>0</h2>
                Game wins
              </div>
            </span>

            <span>
              <p id="icon"><font-awesome-icon icon="trophy" id="trophy" /></p>
              <div id="score-text">
                <h2>0</h2>
                Highest Score
              </div>
            </span>

            <span>
              <p id="icon"><font-awesome-icon icon="check" id="check" /></p>
              <div id="score-text">
                <h2>0</h2>
                Correct Answers
              </div>
            </span>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'

import Button from '@/components/Button.vue'
const username = localStorage.getItem('username')
const user = ref<string>(username)

const quizDashboard = ref<string>('Quiz Dashboard')
const buttonName = ref<string>('Start Quiz')
const router = useRouter()

const goToQuiz = () => {
  router.push('/quiz')
}

const startGame = () => {
  console.log('button clicked')
  router.push('/start')
}
</script>

<style scoped>
body {
  background-color: #ffffff;
  margin: 0px;
  padding: 0px;
}
#container {
  display: grid;
  grid-template-columns: 1fr 5fr;
  gap: 2px;
  background-color: white;
  border-radius: 8px;
  height: 100vh;
}
aside #aside-container {
  display: flex;
  margin-top: 100px;
}

#sec {
  box-shadow: 0px 0px 10px #bbc3d7;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#aside {
  background-color: white;
  padding-right: 20px;
  box-shadow: -5px 0px 10px #bbc3d7;
}
.dashboard {
  margin-top: 100px;
  padding: 5px;
  text-align: center;
  color: #2d2a43;
  height: 30px;
}
.dashboard:hover {
  color: orangered;
}
#quiz-button {
  font-size: 12px;
  width: 120px;
  margin-left: 3px;
}
#play {
  height: 10px;
  padding-right: 5px;
}
/* #quiz-button:hover {
  border-radius: 8px;
  border: none;
  padding-bottom: 5px;
} */
p {
  margin-top: 20px;
  text-align: center;
  color: rgb(21, 91, 118);
  font-weight: bold;
}

img {
  height: 150px;
  width: 150px;
  margin-top: 70px;
  margin-left: 70px;
}
#align-item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 70px;
  padding: 0px;
}
#icon {
  background-color: #f9fafc;
  border: none;
  border-radius: 10px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 18px;
}
h1 {
  margin-left: 40px;
  margin-bottom: 50px;
  font-size: 30px;
  font-weight: bold;
}
.game-data {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 0px;
  margin-left: 30px;
  margin-right: 50px;
}
.game-data span {
  display: flex;
  align-items: center;
}
.game-data span p {
  margin: 0px;
  padding: 0px;
  margin-left: 8px;
}
.game-data span h2 {
  margin: 0px;
  padding: 0px;
  margin-left: 15px;
}
.game-data span #score-text {
  margin: 0px;
  padding: 0px;
  margin-right: 130px;
}

#medal {
  color: rgb(226, 226, 16);
  padding: 8px;
}

#trophy {
  color: orangered;
  padding-right: 8px;
}

#check {
  color: rgb(13, 237, 13);
  padding-right: 8px;
}

img #user {
  float: left;
}
#quizImage {
  height: 150px;
  width: 150px;
  margin-right: 80px;
  margin-top: 100px;
}
</style>
