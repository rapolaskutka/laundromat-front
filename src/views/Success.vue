<script setup lang="ts">
import {ref, onMounted} from 'vue';
import axios from 'axios'
import settings from '../settings.json'
import authHeader from '../services/auth-header';
import Header from "../components/Header.vue";
import {useRouter} from "vue-router";
import LogoutButton from "../components/LogoutButton.vue";

const router = useRouter();

const screenWidth = window.innerWidth;
let array = [];
let numberOfElements;
if (screenWidth > 1200) {
  numberOfElements = 7;
} else if (screenWidth > 600) {
  numberOfElements = 5;
} else {
  numberOfElements = 3;
}

for (let i = 0; i < numberOfElements; i++) {
  let rand = 1/numberOfElements * (Math.random() * 150);
  let margin = rand;
  switch (numberOfElements) {
    case 3: margin = rand / 4; break;
    case 7: rand = rand * 2; margin = rand; break;
    default: margin = rand;
  }
  margin = margin > 10 ? 10 : margin;
  array.push({style: `height: ${rand}%; margin-bottom: ${margin * Math.random()}rem`});
}
</script>

<template>
  <div class="main">
    <Header></Header>
    <div class="container">
      <h1>Done!!!</h1>
      <div class="stars">
        <img v-for="item in array" :style="item.style" src="/star.png" alt="star">
      </div>
      <div class="right">
        <LogoutButton>logout</LogoutButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  min-height: 80vh;
  justify-content: space-around;
}
.stars {
  height: 40vh;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  padding: 4rem 1rem 1rem 6rem;
  overflow: visible;
}
.right {
  display: flex;
  justify-content: flex-end;
}
img {
  object-fit: contain;
  max-height: 100%;
}
</style>
