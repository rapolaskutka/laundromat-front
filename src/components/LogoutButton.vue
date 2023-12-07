<script setup lang="ts">
import authService from "../services/AuthService.ts";
import {store} from "../user_store.ts";
import {useRouter} from "vue-router";

const router = useRouter();

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('token');
  store.user = null;
  router.push('/login');
}

</script>

<template>
  <svg v-on:click="logout" xmlns="http://www.w3.org/2000/svg" width="66" height="24" viewBox="0 0 66 24" fill="none">
    <rect x="0.5" y="0.5" width="65" height="23" rx="11.5" fill="#8294C4" stroke="black"/>
    <path d="M13 12.5C13.2761 12.5 13.5 12.2761 13.5 12C13.5 11.7239 13.2761 11.5 13 11.5L13 12.5ZM3.64645 11.6464C3.45118 11.8417 3.45118 12.1583 3.64645 12.3536L6.82843 15.5355C7.02369 15.7308 7.34027 15.7308 7.53553 15.5355C7.7308 15.3403 7.7308 15.0237 7.53553 14.8284L4.70711 12L7.53553 9.17157C7.7308 8.97631 7.7308 8.65973 7.53553 8.46447C7.34027 8.2692 7.02369 8.2692 6.82843 8.46447L3.64645 11.6464ZM13 11.5L4 11.5L4 12.5L13 12.5L13 11.5Z" fill="black"/>
    <text x="16" y="18" fill="black">Logout</text>
  </svg>
</template>

<style scoped>
svg {
  cursor: pointer;
  @media screen and (min-width: 600px) {
    margin: 0 2rem 0 0;
    scale: 2;
  }
  @media screen and (min-width: 1200px) {
    margin: 0 3rem 0 0;
    scale: 3;
  }
}
</style>
