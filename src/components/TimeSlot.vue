<script setup lang="ts">
  import axios from "axios";
  import authHeader from "../services/auth-header.ts";
  import { ref, onMounted } from "vue";
  import settings from "../settings.json";
  import {store} from "../user_store.ts";
  import {useRouter} from "vue-router";

  const props = defineProps<{
    selectedMachine: number|null
  }>()

  const urlApi = `${settings.environments.prod.api.uri}` + store.user.dorm + '/machines/' + props.selectedMachine + '/histories';
  const urlPostApi = `${settings.environments.prod.api.uri}/api/histories`;
  const reservations = ref([]);
  const router = useRouter();
  let error = ref(null);

  const times = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  let formattedTimes = times.map(time => {
    const currentDate = new Date();
    const [hour, minute] = time.split(':');
    currentDate.setHours(Number(hour), Number(minute), 0, 0);
    return {
      date_time: currentDate.toISOString(),
      name: time,
      active: true
    };
  });

  function getMachineReservations() {
    axios
      .get(urlApi, { headers: authHeader()})
      .then(response => {
        reservations.value = response.data;

        const todayReservations = reservations.value.map(reservation => {
          const today = new Date();
          const reservationDate = new Date(reservation?.startDate);
          if (today.getFullYear() == reservationDate.getFullYear() &&
              today.getMonth() == reservationDate.getMonth() &&
              today.getDate() == reservationDate.getDate()) {
            return reservationDate.toISOString();
          }
        });

        formattedTimes = formattedTimes.map((time) => {
          return {date_time: time.date_time, name: time.name, active: !todayReservations.includes(time.date_time)};
        });
      })
      .catch(e => {
        error = e.message;
        console.log(e);
      });
  }

  function createReservation(time) {
    let response = axios.post(urlPostApi, {
      "startDate": time.date_time,
      "endDate": time.date_time,
      "user": '/api/users/' + store.user.id,
      "machine": '/api/machines/' + props.selectedMachine
    } ,{headers: authHeader()});
    response.then(() => router.push('/success'));
  }
  onMounted(getMachineReservations);
</script>

<template>
  <div class="container">
    <div tabindex="0" :key="time.date_time" :class="['time-btn', { 'disabled': !time.active }]" v-on:click="createReservation(time)" v-for="time in formattedTimes">{{time.name}}</div>
  </div>
</template>

<style scoped>
  div.container {
    border-radius: 0.5625rem;
    border: 0.125rem solid #000;
    display: flex;
    flex-wrap: wrap;
    margin: 0 1rem 1rem;
    gap: 1rem;
    justify-content: space-evenly;
    padding: 1rem 0;
  }

  .time-btn {
    cursor: pointer;
    transition: background-color 0.3s;
    color: #DBDFEA;
    background-color: #8294C4;
    border: 0.125rem solid #000;
    border-radius: 0.5625rem;
    font-size: 2rem;
    width: 40%;
    line-height: normal;
  }

  .time-btn:hover {
    border: 0.25rem solid #000;
  }

  .time-btn:focus {
    border: 0.25rem solid #000;
  }

  .time-btn.disabled {
    text-decoration-line: line-through;
    color: #ffffff;
    background-color: transparent;
    border: 0.05125rem solid #000;
  }

</style>
