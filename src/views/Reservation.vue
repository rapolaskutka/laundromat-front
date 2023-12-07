<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios'
import settings from '../settings.json'
import authHeader from '../services/auth-header';
import Header from "../components/Header.vue";
import BigButton from "../components/BigButton.vue";
import TimeSlot from "../components/TimeSlot.vue";

const machines = ref([]);
let machineType = ref(null);
let selectedMachine = ref(null);
let error = ref(null);
const urlApi = `${settings.environments.prod.api.uri}/api/machines`;

function getAll(machineType) {
  this.machineType = machineType;
    axios
      .get(urlApi, { headers: authHeader()})
      .then(response => {
        machines.value = response.data.filter((machine) => {
          if (machine.type == machineType && machine.isActive) {
            return machine;
          }
        });
      })
      .catch(e => {
        error = e.message;
        console.log(e);
      });
}

function removeMachineType() {
  machineType.value = null;
  selectedMachine.value = null;
}
</script>

<template>
  <div class="main">
    <Header></Header>
    <TransitionGroup name="list">
      <BigButton v-if="machines && (machineType == 1 || !machineType)" v-on:click="getAll(1)" route="">Washing machines</BigButton>
      <BigButton v-if="machines && (machineType == 2 || !machineType)" v-on:click="getAll(2)" route="">Dryers</BigButton>
      <BigButton v-if="machines && (machineType == 3 || !machineType)" v-on:click="getAll(3)" route="">Ironing board</BigButton>
      <BigButton v-if="machineType" v-on:click="removeMachineType" route="">Other</BigButton>
      <div class="custom-select-wrapper" v-if="machines.length > 0 && machineType">
        <select class="custom-select" v-model="selectedMachine">
          <option disabled value="">-</option>
          <option v-for="machine in machines" :value="machine.id">{{ machine.id }}</option>
        </select>
        <svg class="custom-select-arrow" xmlns="http://www.w3.org/2000/svg" width="21" height="18" viewBox="0 0 28 24" fill="none">
          <path d="M 18.2085 19.5876 C 16.241 22.6546 11.759 22.6546 9.7915 19.5876 L 3.4485 9.6998 C 1.3137 6.372 3.7033 2 7.6569 2 L 20.343 2 C 24.2968 2 26.6864 6.372 24.5516 9.6997 L 18.2085 19.5876 Z" fill="#8294C4" stroke="black"/>
        </svg>
      </div>
      <TimeSlot v-if="selectedMachine" :selected-machine="selectedMachine" :key="selectedMachine"></TimeSlot>
    </TransitionGroup>
  </div>
</template>

<style scoped>
  .main {
    display: flex;
    flex-direction: column;
  }

  .custom-select-wrapper {
    position: relative;
    margin: 0 1rem 1rem;
  }

  select.custom-select {
    border-radius: 0.5625rem;
    border: 2px solid #000;
    background: #FFEAD2;
    color: #1a1a1a;
    font-family: inherit;
    font-size: 2rem;
    text-align: center;
    appearance: none; /* Hide default arrow */
    width: 100%;
  }

  /* Styles for the custom dropdown arrow */
  .custom-select-arrow {
    position: absolute;
    top: 50%;
    right: 1rem; /* Adjust the position of the arrow */
    transform: translateY(-50%);
    pointer-events: none; /* Ensure the arrow doesn't interfere with select functionality */
  }

  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(2rem);
  }
</style>
