<script setup>
import { ref as vueRef, watch, watchEffect } from 'vue'
import { db, ref as firebaseRef, onValue, query, orderByKey, startAt, endAt } from '../firebaseeDB'

import AnswerSection from './AnswerSection.vue'

const output = vueRef([])

const searchLetter = (letter) => {
    const dbRef = firebaseRef(db, '/');
    const capitalizedLetter = letter.toUpperCase();
    const q = query(dbRef, orderByKey(), startAt(capitalizedLetter), endAt(capitalizedLetter + "\uf8ff"));
    onValue(q, (snapshot) => {
        output.value = [];
        snapshot.forEach((childSnapshot) => {
            var childKey = childSnapshot.key;
            var childValue = childSnapshot.val();
            output.value.push({key: childKey, value: childValue});
        });
    }, (error) => {
        console.error("Ошибка чтения данных: ", error);
    });
}

const handleCustomEvent = (data) => {
  output.value = data.output;
}

</script>

<template>
    <div class="container mx-auto px-4 lg:max-w-60 lg:mt-12 mt-6 pb-20" v-if="output.length == 0">
        <div data-aos="fade-up" class="lg:mt-6 mt-2 bg-gray-700 bg-opacity-90 p-6 rounded-lg">    
            <h2 class="text-center font-manrope text-white text-xl lg:text-2xl font-semibold">Поиск по алфавиту</h2>
            <div class=" px-1 md:px-20 lg:px-24 py-10 flex flex-wrap gap-4 justify-center">
                <span @click="searchLetter('А')" class="item">А</span>
                <span @click="searchLetter('Б')" class="item">Б</span>
                <span @click="searchLetter('В')" class="item">В</span>
                <span @click="searchLetter('Г')" class="item">Г</span>
                <span @click="searchLetter('Д')" class="item">Д</span>
                <span @click="searchLetter('Е')" class="item">Е</span>
                <span @click="searchLetter('Ж')" class="item">Ж</span>
                <span @click="searchLetter('З')" class="item">З</span>
                <span @click="searchLetter('И')" class="item">И</span>
                <span @click="searchLetter('К')" class="item">К</span>
                <span @click="searchLetter('Л')" class="item">Л</span>
                <span @click="searchLetter('М')" class="item">М</span>
                <span @click="searchLetter('Н')" class="item">Н</span>
                <span @click="searchLetter('О')" class="item">О</span>
                <span @click="searchLetter('П')" class="item">П</span>
                <span @click="searchLetter('Р')" class="item">Р</span>
                <span @click="searchLetter('С')" class="item">С</span>
                <span @click="searchLetter('Т')" class="item">Т</span>
                <span @click="searchLetter('У')" class="item">У</span>
                <span @click="searchLetter('Ф')" class="item">Ф</span>
                <span @click="searchLetter('Х')" class="item">Х</span>
                <span @click="searchLetter('Ц')" class="item">Ц</span>
                <span @click="searchLetter('Ч')" class="item">Ч</span>
                <span @click="searchLetter('Ш')" class="item">Ш</span>
                <span @click="searchLetter('Щ')" class="item">Щ</span>
                <span @click="searchLetter('Э')" class="item">Э</span>
                <span @click="searchLetter('Ю')" class="item">Ю</span>
                <span @click="searchLetter('Я')" class="item">Я</span>
            </div>       
        </div>
    </div>
    <AnswerSection @custom-event="handleCustomEvent" :data="output" v-else/>
</template>

<style scoped>
    .item{
        @apply font-bold font-manrope text-gray-800 text-xl lg:text-3xl bg-yellow-100  box-border
        rounded-lg py-3 w-14 text-center cursor-pointer transition-all hover:bg-yellow-200;
    }
    
</style>