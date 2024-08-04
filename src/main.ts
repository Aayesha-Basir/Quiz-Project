import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faPhone,
  faFilter,
  faPlus,
  faList,
  faHouse,
  faUser,
  faPlay,
  faLightbulb,
  faMedal,
  faTrophy,
  faCheck,
  faTrash,
  faPencil,
  faArrowLeftLong
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faFilter,
  faList,
  faPlus,
  faHouse,
  faPhone,
  faUser,
  faPlay,
  faLightbulb,
  faMedal,
  faTrophy,
  faCheck,
  faTrash,
  faPencil,
  faArrowLeftLong
)
import './styles/app.css'

const app = createApp(App)
const pinia = createPinia()
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(pinia)
app.use(router)

app.mount('#app')
