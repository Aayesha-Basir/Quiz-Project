<template>
  <!-- <div>User {{ $route.params.id }}</div> -->
  <h3 class="hidden">
    {{ $route.params.id === 'create' ? 'Create Quiz' : 'Edit Quiz' }}
  </h3>
  <div id="container" class="font-serif...">
    <section id="sec">
      <p>MindMingle <font-awesome-icon icon="lightbulb" /></p>
      <img
        id="quizImage"
        src="https://th.bing.com/th/id/OIP.2qxXEwEuearPg3nL_n6laAAAAA?pid=ImgDet&w=181&h=181&c=7&dpr=1.3"
        alt="Image"
      />
      <div class="dashboard">
        <button id="quiz-button" @click="goToHomePage">
          <font-awesome-icon icon="house" id="house" /> Back To Home
        </button>
      </div>

      <div class="questionDashboard">
        <button id="questionlist" @click="goToQuestionDashboard">
          <font-awesome-icon icon="list" id="list" /> question Dashboard
        </button>
      </div>
    </section>
    <aside>
      <form @submit.prevent="handleSubmit">
        <img
          src="https://dz9yg0snnohlc.cloudfront.net/cro-questions-you-can-ask-someone-to-get-to-know-them-2.jpg"
          alt="loading..."
          class="image"
        />
        <input
          placeholder="enter question"
          type="text"
          id="question"
          class="input-question"
          v-model="quizObject.question"
          required
        />

        <div class="option-container">
          <div class="option-row">
            <label for="A">A</label>
            <input
              placeholder="Enter the option"
              type="text"
              id="question"
              v-model="quizObject.options[0].answer"
              required
            />
            <label for="B">B</label>
            <input
              placeholder="Enter the option"
              type="text"
              id="question"
              v-model="quizObject.options[1].answer"
              required
            />
          </div>

          <div class="option-row">
            <label for="C">C</label>
            <input
              placeholder="Enter the option"
              type="text"
              id="question"
              v-model="quizObject.options[2].answer"
              required
            />
            <label for="D">D</label>
            <input
              placeholder="Enter the option"
              type="text"
              id="question"
              v-model="quizObject.options[3].answer"
              required
            />
          </div>
        </div>

        <div class="container-optioncategory">
          <label for="correctOption"> correctOption</label>
          <select
            placeholder="Correct Option"
            type="text"
            id="question"
            class="correctoption"
            v-model="quizObject.correctOption"
          >
            <option v-for="(option, index) in quizObject.options" :key="index">
              {{ option.answer }}
            </option>
          </select>
          <label for="category">category</label>
          <select
            placeholder="Quiz Category"
            type="text"
            id="question"
            v-model="quizObject.category"
            required
          >
            <option v-for="category in categoryList" :key="category">{{ category }}</option>
          </select>
        </div>
        <div>
          <button class="button" type="submit">Submit</button>
          <button v-if="$route.params.id !== 'create'" class="cancelbutton" @click="cancelEdit">
            Cancel
          </button>
        </div>
      </form>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

import { useQuizStore } from '@/stores/quizStore'
import { onMounted, ref } from 'vue'

const route = useRoute()
const router = useRouter()

const cancelEdit = () => {
  router.push('/quiz')
}

interface QuizOptions {
  id: Number
  answer: String
}

interface Quiz {
  question: String
  options: QuizOptions[]
  category: String
  correctOption: String
}

const quizStore = useQuizStore()

const quizObject = ref<Quiz>({
  question: '',
  options: [
    { id: 1, answer: '' },
    { id: 2, answer: '' },
    { id: 3, answer: '' },
    { id: 4, answer: '' }
  ],
  category: '',
  correctOption: ''
})

const handleSubmit = () => {
  if (route.params.id === 'create') {
    quizStore.createQuiz(quizObject.value)
  } else {
    quizObject.value['id'] = parseInt(route.params.id as string)
    quizStore.editQuiz(quizObject.value)
  }
  router.push('/quiz')
  // Clear the quizObject after submission
  clearQuizForm()
}
const goToQuestionDashboard = () => {
  router.push('/quiz')
}
const clearQuizForm = () => {
  quizObject.value = {
    question: '',
    options: [
      { id: 1, answer: '' },
      { id: 2, answer: '' },
      { id: 3, answer: '' },
      { id: 4, answer: '' }
    ],
    category: '',
    correctOption: ''
  }
}

const deleteItem = (id: number) => {
  quizStore.deleteQuiz(id)
}

const fetchQuizFromStore = () => {
  if (route.params.id !== 'create') {
    let num = route.params.id as string
    let id = parseInt(num)
    console.log(typeof id)
    const quizes = quizStore.getQuizById(id)
    console.log(quizes)

    quizObject.value.question = quizes.question
    quizObject.value.options[0].answer = quizes.options[0].answer
    quizObject.value.options[1].answer = quizes.options[1].answer
    quizObject.value.options[2].answer = quizes.options[2].answer
    quizObject.value.options[3].answer = quizes.options[3].answer
    quizObject.value.correctOption = quizes.correctOption
    quizObject.value.category = quizes.category
  }
}
const categoryList = ['General Knowledge', 'Computer', 'Movies', 'Music']
const goToHomePage = () => {
  router.push('/')
}
onMounted(() => {
  fetchQuizFromStore()
})
</script>

<style scoped>
#container {
  display: grid;
  grid-template-columns: 1fr 5fr;
  gap: 2px;
  background-color: white;
  border-radius: 8px;
  height: 100vh;
}
#sec {
  box-shadow: 0px 0px 10px #bbc3d7;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#aside {
  background-color: white;
  padding-right: 20px;
  box-shadow: -5px 0px 10px #bbc3d7;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
p {
  margin-top: 20px;
  text-align: center;
  color: rgb(21, 91, 118);
  font-weight: bold;
}
.dashboard {
  margin-top: 100px;
  padding: 5px;
  text-align: center;
  color: #2d2a43;
  height: 30px;
}
.dashboard:hover,
.questionDashboard:hover {
  color: orangered;
}
.questionDashboard {
  font-size: 12px;
  margin-top: 20px;
  margin-left: 30px;
  padding: 5px;
  text-align: center;
  color: #2d2a43;
  height: 30px;
}
#list {
  padding-right: 8px;
}
#quiz-button {
  font-size: 12px;
  width: 120px;
  margin-left: 3px;
}
#house {
  height: 15px;
  padding-right: 8px;
}
form {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 5px 5px 10px #bbc3d7;
  height: 100vh;
}
.input-question {
  margin-top: 20px;
  text-align: center;
  width: 700px;
  padding: 5px;
  border: none;
  border-radius: 10px;
  background-color: #d9deea;
  color: #2d2a43;
}
.option-container {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-evenly;
  margin-top: 10px;
  margin-left: 10%;
  margin-right: 11%;
}
.option-container label {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8px;
  height: 8px;
  padding: 15px;
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 15px;
  border-radius: 10px;
  background-color: #d9deea;
}
.option-container input {
  width: 200px;
  height: 30px;
  background-color: #d9deea;
  color: #2d2a43;
  border: none;
  margin-top: 17px;
  padding-left: 10px;
  border-radius: 10px;
}
.container-optioncategory {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  background-color: #d9deea;
  border: none;
  border-radius: 10px;
  width: 700px;
  padding: 5px;
  margin: 35px;
  margin-left: 50px;
  border-radius: 10px;
}

.button,
.cancelbutton {
  background-color: #2d2a43;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 8px;
  width: 180px;
  margin-top: 5px;
  margin-right: 40px;
  margin-bottom: 40px;
}
.button:hover {
  background-color: #48eb4b;
  border: none;
  color: white;
}
.cancelbutton:hover {
  background-color: #d01919;
  border: none;
  color: white;
}
#quizImage {
  height: 150px;
  width: 150px;
  margin-left: 30px;
  margin-top: 100px;
}
.image {
  width: 50%;
  height: 40%;
}
.option-container .option-row {
  display: flex;
  justify-content: space-evenly;
}
.correctoption {
  width: 150px;
}
.button-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
