<script setup lang="ts">

</script>

<template>
  <button type="submit">
    <svg xmlns="http://www.w3.org/2000/svg" width="65" height="24" viewBox="0 0 65 24" fill="none">
      <path d="M3.97206 15.3459C-1.85917 10.1494 1.81648 0.5 9.62712 0.5H56C60.6944 0.5 64.5 4.30558 64.5 9V15C64.5 19.6944 60.6944 23.5 56 23.5H16.3601C14.2746 23.5 12.262 22.7333 10.705 21.3459L3.97206 15.3459Z" fill="#8294C4" stroke="black"/>
      <text x="50%" y="55%" alignment-baseline="middle" text-anchor="middle" font-size="12px" fill="black"><slot></slot></text>
    </svg>
  </button>
</template>

<style scoped>

</style>
