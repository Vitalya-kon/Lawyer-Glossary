
import { createApp } from 'vue'
import { PaginationBar } from 'v-page'

import { getCharacter } from 'rickmortyapi'
import App from './App.vue'

import './assets/main.css'
import 'aos/dist/aos.css'
import 'tailwindcss/tailwind.css'

const app = createApp(App);

app.use(PaginationBar, {
    align: 'center',
    info: false,
})
// app.use(getCharacter)
app.mount('#app')
