<template>
  <div id="container" class="font-serif...">
    <section id="sec">
      <p id="quiz-name">MindMingle <font-awesome-icon icon="lightbulb" /></p>
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

      <div class="createPage">
        <button id="questionlist" @click="goToCreatePage">
          <font-awesome-icon icon="plus" id="plus" /> Create question
        </button>
      </div>
    </section>

    <aside class="flex justify-center">
      <div class="search-container">
        <input type="text" placeholder="Enter Category.." id="filter-button" v-model="filterText" />
        <button><font-awesome-icon icon="filter" id="filter" /></button>
      </div>
      <div class="grid grid-cols-2 gap-8 px-4 py-8 mx-0">
        <div
          v-for="(item, index) in allQuizes"
          :key="index"
          class="bg-primary shadow-lg rounded-lg p-4 my-4 flex-direction: columns-0"
        >
          <label for="question" class="font-medium text-sm text-gray-500">Question</label>
          <h3
            id="question"
            class="font-semibold text-lg rounded-lg text-black bg-secondary mx-2 px-8"
          >
            {{ item.question }}
          </h3>

          <label class="font-medium text-sm text-gray-500">Options</label>
          <ul v-for="(option, index) in item.options" :key="index" class="grid grid-cols-2 gap-2">
            <li
              class="font-semibold text-base rounded-lg text-black bg-secondary mx-8 my-2 flex items-center justify-center"
            >
              {{ option.answer }}
            </li>
          </ul>
          <label class="font-medium text-sm text-gray-500">correctOption</label>
          <p class="font-semibold text-lg bg-green-200 text-black my-2 rounded-lg mx-8">
            {{ item.correctOption }}
          </p>
          <br />
          <label class="font-medium text-sm text-gray-500">category</label>
          <p
            class="font-semibold text-lg text-black my-2 flex justify-center rounded-lg mx-2 bg-secondary"
          >
            {{ item.category }}
          </p>

          <div class="float-right">
            <button @click="editQuestion(item.id)" class="mx-1">
              <font-awesome-icon
                icon="pencil"
                class="text-blue-600 hover:text-green-700 transform motion-safe:hover:scale-110"
              />
            </button>
            <button @click="deleteQuestion(item.id)" class="mx-1">
              <font-awesome-icon
                icon="trash"
                class="text-blue-600 hover:text-red-600 transform motion-safe:hover:scale-110"
              />
            </button>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'
import Button from '@/components/Button.vue'

import { useQuizStore } from '@/stores/quizStore'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const router = useRouter()

const filterText = ref<string>('')
const quizButton = ref<string>('Create Quiz')
const quizStore = useQuizStore()
// const allQuizes = quizStore.getQuizes()

const editQuestion = (id: number) => {
  router.push({ name: 'CreateQuiz', params: { id } })
}

watch(filterText, (newValue, oldValue) => {
  console.log('input value:', newValue)
})
const deleteQuestion = (id: number) => {
  quizStore.deleteQuiz(id)
}

const goToCreatePage = () => {
  router.push({ name: 'CreateQuiz', params: { id: 'create' } })
}

const goToHomePage = () => {
  router.push('/')
}
const allQuizes = computed(() => {
  if (filterText.value.trim() === '') {
    return quizStore.getQuizes() //Return all quizes
  } else {
    const filteredQuizes = quizStore
      .getQuizes()
      .filter((quiz) => quiz.category.toLowerCase().includes(filterText.value.toLowerCase()))
    console.log('filteredQuizes:', filteredQuizes)
    return filteredQuizes
  }
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
p {
  margin-top: 10px;
  text-align: center;
  font-weight: bold;
}
.dashboard {
  margin-top: 100px;
  padding: 5px;
  text-align: center;
  color: #2d2a43;
  height: 30px;
}
.createPage {
  margin-top: 20px;
  margin-left: 10px;
  padding: 5px;
  text-align: center;
  color: #2d2a43;
  height: 30px;
  font-size: 12px;
}
.dashboard:hover,
.createPage:hover {
  color: orangered;
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
#quizImage {
  height: 150px;
  width: 150px;
  margin-left: 30px;
  margin-top: 100px;
}
#quiz-name {
  margin-top: 20px;
  text-align: center;
  color: rgb(21, 91, 118);
  font-weight: bold;
}
#plus {
  padding-right: 8px;
  height: 15px;
}
.search-container {
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 10px;
  margin-right: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
#filter {
  color: #2d2a43;
  padding: 10px;
  height: 20px;
  margin-left: 5px;
}
#filter-button {
  background-color: #bbc3d7;
  padding: 5px;
  border: none;
  border-radius: 10px;
  padding-left: 10px;
}
#filter:hover {
  color: blue;
}
</style>
