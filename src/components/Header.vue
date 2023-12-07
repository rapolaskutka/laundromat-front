<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios'
import settings from '../settings.json'
import authHeader from '../services/auth-header';
import {useRouter} from "vue-router";
import authService from "../services/AuthService.ts";
import {store} from "../user_store.ts";
import axiosInstance from "../services/AxiosInstance.ts"

const users = ref([]);
const urlApi = `${settings.environments.prod.api.uri}/api/users`;
const router = useRouter();

 if (!store.user) {
  onMounted(getAll);
 }

function getAll() {
  axiosInstance.get(urlApi, { headers: authHeader(), responseType: "json"})
      .then(response => {
        console.log(response);
        users.value = response.data;
        store.user = response.data[0];
      })
      .catch(error => {
        console.log(error)
      });
}

function routerReturn() {
  if (router.currentRoute.value.name !== 'Home') {
    router.back();
  } else if (router.currentRoute.value.name === 'Success') {
    router.push('/')
  } else {
    authService.logout();
  }
}
</script>

<template>
  <div class="main">
    <div class="name" v-if="store.user">Hi, {{store.user.email}}!</div>
    <div class="dorm" v-if="store.user">{{store.user.dorm}}!</div>
    <div class="arrow" v-if="store.user" v-on:click="routerReturn" title="back/logout"></div>
  </div>
</template>

<style scoped>
  div.main {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr 0.5fr;
    grid-column-gap: 0;
    grid-row-gap: 0;
    align-items: center;
    justify-items: end;
    margin-bottom: 2rem;
  }
  div.name {
    font-size: 1.5rem;
    grid-area: 1 / 1 / 2 / 3;
  }
  div.dorm {
    text-decoration-line: underline;
    grid-area: 2 / 1 / 3 / 3;
  }
  div.arrow {
    position:relative;
    width:30px;
    height: 30px;
    cursor:pointer;
    transition:0.5s;
    overflow:hidden;
    border:solid 2px black;
    border-radius:50%;
    background-color: #8294C4;
  }

  div.arrow:after{
    position: absolute;
    display: block;
    content: "";
    color: black;
    width: 1rem;
    height: 15px;
    top: -1px;
    border-bottom: solid 2px;
    transform: translatex(0.4rem);
  }

  div.arrow:before{
    position: absolute;
    display: block;
    content: "";
    color: black;
    width: 8px;
    height: 8px;
    border-top: solid 2px;
    border-left: solid 2px;
    border-radius: 15%;
    top: 50%;
    left: 0.25rem;
    transform-origin:0 0;
    transform: rotatez(-45deg);
  }
</style>
