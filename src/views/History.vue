<script setup lang="ts">
import {ref, onMounted} from 'vue';
import axios from 'axios'
import settings from '../settings.json'
import authHeader from '../services/auth-header';
import Header from "../components/Header.vue";
import {useRouter} from "vue-router";

const history = ref(null);
let error = ref(null);
const urlApi = `${settings.environments.prod.api.uri}/api/histories`;
const router = useRouter();

const options = { month: 'long', day: 'numeric', hour: 'numeric' };

onMounted(getAll);

function getAll() {
  axios
      .get(urlApi, {headers: authHeader()})
      .then(response => {
        history.value = response.data;
      })
      .catch(e => {
        error = e.message;
        console.log(e);
      }).finally(() => {
    if (history.value == null) {
      router.push('/login')
    }
  });
}
</script>

<template>
  <div class="main">
    <Header></Header>
    <table>
      <tr style="background-color: #8294C4">
        <th>from</th>
        <th>till</th>
        <th>machine</th>
      </tr>
      <tr v-for="item in history" style="background-color: #FFEAD2">
        <th>{{ new Date(item.startDate).toLocaleString("lt-LT") }}</th>
        <th>{{ new Date(item.endDate).toLocaleString("lt-LT")}}</th>
        <th>{{ item.machine?item.machine[14]:null }}</th>
      </tr>
    </table>
    <div v-if="!history || history.length === 0">No history entries</div>
  </div>
</template>

<style scoped>
table {
  margin: auto;
  border-radius: 1rem;
}
th {
  border: solid #1a1a1a 2px;
  padding: 0.5rem;
  border-radius: 1rem;
}
</style>
