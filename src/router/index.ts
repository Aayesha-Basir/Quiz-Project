import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import QuizHome from '@/views/quiz/QuizHome.vue'
import LoginPage from '@/views/LoginPage.vue'
import StartGame from '@/views/StartGame.vue'
import CreateQuiz from '@/views/quiz/CreateQuiz.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/quiz',
      name: 'Quiz',
      component: QuizHome
    },
    { path: '/quiz/:id', name: 'CreateQuiz', component: CreateQuiz },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/start',
      name: 'Start',
      component: StartGame
    }
  ]
})

const isAuthenticated = localStorage.getItem('username')

console.log('isAuthenticated', isAuthenticated)

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})

export default router
