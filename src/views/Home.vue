<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios'
import settings from '../settings.json'
import authHeader from '../services/auth-header';
import Header from "../components/Header.vue";
import {useRouter} from "vue-router";
import BigButton from "../components/BigButton.vue";
import {store} from "../user_store.ts";

const users = ref(null);
let error = ref(null);
const urlApi = `${settings.environments.prod.api.uri}/api/users`;
const router = useRouter();

if (!store.user) {
  onMounted(getAll);
}

function getAll() {
    axios
        .get(urlApi, { headers: authHeader()})
        .then(response => {
          users.value = response.data;
        })
        .catch(e => {
          error = e.message;
          console.log(e);
        }).finally(() => {
          if (users.value == null) {
            router.push('/login')
          }
        });
}
</script>

<template>
  <div class="main">
    <Header></Header>
    <BigButton v-if="store.user" route="/reservation">Reservation</BigButton>
    <div></div>
    <BigButton v-if="store.user" route="/history">History</BigButton>
  </div>
</template>

<style scoped>
  .main {
    display: flex;
    flex-direction: column;
  }
</style>
