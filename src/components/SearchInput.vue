<script setup>
import { ref as vueRef, watch, onMounted } from 'vue'
import { db, ref as firebaseRef, onValue } from '../firebaseeDB'
import AnswerSection from './AnswerSection.vue'
import AlphaviteSearch from './AlphaviteSearch.vue'

const searchQuery = vueRef('')
const output = vueRef([])
const allData = vueRef([])

// Загружаем все данные один раз при загрузке компонента
onMounted(() => {
  const dbRef = firebaseRef(db, '/')
  onValue(dbRef, (snapshot) => {
    const data = []
    snapshot.forEach((childSnapshot) => {
      data.push({
        key: childSnapshot.key,
        value: childSnapshot.val()
      })
    })
    allData.value = data
  })
})

watch(searchQuery, (newVal) => {
  if (!newVal) {
    output.value = []
    return
  }

  const searchTerm = newVal.toUpperCase().trim()
  console.log(searchTerm);
  const results = []
  
  // Ищем точные совпадения сначала
  const exactMatches = []
  // Затем частичные совпадения
  const partialMatches = []
  
  allData.value.forEach(item => {
    if (item.key.includes(searchTerm)) {
      if (item.key.startsWith(searchTerm)) {
        exactMatches.push(item)
      } else {
        partialMatches.push(item)
      }
    }
  })
  
  // Сортируем результаты
  exactMatches.sort((a, b) => a.key.localeCompare(b.key))
  partialMatches.sort((a, b) => a.key.localeCompare(b.key))
  
  output.value = [...exactMatches, ...partialMatches]
})

const handleCustomEvent = (data) => {
  output.value = data.output
}
</script>

<template>
  <div class="container mx-auto px-4 sticky top-4 z-10">
    <form class="lg:max-w-md mx-auto w-full lg:w-1/2 mt-6">   
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Поиск</label>
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input 
          type="search" 
          id="default-search" 
          v-model="searchQuery" 
          class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="Найдем ответы..." 
          required 
        />
      </div>
    </form>
  </div>
  <AnswerSection @custom-event="handleCustomEvent" :data="output" v-if="output.length > 0"/>
  <AlphaviteSearch v-else/>
</template>