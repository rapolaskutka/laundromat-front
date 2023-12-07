<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();
const props = defineProps<{
  route: string|null
}>()

function navigate() {
  if (props.route) {
    router.push(props.route);
  }
}
</script>

<template>
  <button v-on:click="navigate"><slot></slot></button>
</template>

<style scoped>
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5625rem;
    border: 0.125rem solid #000000;
    background: #8294C4;
    min-height: 3.5rem;
    color: #000;
    font-size: 2rem;
    margin: 0 1rem 1rem;
    font-family: inherit;
  }
</style>
