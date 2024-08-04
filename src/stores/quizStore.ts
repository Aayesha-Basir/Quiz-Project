import { ref, toRefs } from 'vue'
import { defineStore } from 'pinia'

//define typescript interfacesfor Options and Quiz
interface Options {
  id: number
  option: string
}

interface Quiz {
  id: number
  question: string
  options: Options[]
  category: string
  correctOption: string
}

//defining pinia store named "quiz" using defiestore
export const useQuizStore = defineStore('quiz', () => {
  //this hold the array of quiz object
  const quizes = ref<Quiz[]>([])

  let initialId = 0
  // Load quizes from localStorage on initialization
  const savedQuizes = localStorage.getItem('quizvalue')
  if (savedQuizes) {
    quizes.value = JSON.parse(savedQuizes)
  }

  const createQuiz = (quiz: Omit<Quiz, 'id'>) => {
    console.log('sssssss', quiz)

    initialId++

    const newQuiz: Quiz = {
      id: initialId,
      ...quiz
    }

    quizes.value.push(newQuiz)

    // Save quizes to localStorage after creating a new quiz
    localStorage.setItem('quizvalue', JSON.stringify(quizes.value))
  }

  const editQuiz = (quiz: Quiz) => {
    console.log('quiz', quiz)
    const index = quizes.value.findIndex((q) => q.id === quiz.id)
    console.log('index', index)
    console.log('quizes.value[index]', quizes.value[index])

    if (index !== -1) {
      quizes.value[index] = quiz
      console.log('after', quizes.value[index])
    }
  }

  const deleteQuiz = (id: number) => {
    const index = quizes.value.findIndex((quiz) => quiz.id === id)
    quizes.value.splice(index, 1)
    localStorage.setItem('quizvalue', JSON.stringify(quizes.value))
  }

  const getQuizById = (id: number) => {
    const data = quizes.value.filter((quiz) => quiz.id === id)
    return data[0]
  }
  const getQuizes = () => {
    return quizes.value
  }

  return { quizes, createQuiz, editQuiz, deleteQuiz, getQuizes, getQuizById}
})
