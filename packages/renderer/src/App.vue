<script setup lang="ts">
import { onMounted, ref } from 'vue';
import LandingPage from './components/LandingPage.vue';
import MainPage from './components/MainPage.vue';
import { invoke } from '@vite-electron-builder/preload';

const isLoggedIn = ref(false);

onMounted(async () => {
  const response = await invoke('tennistv:auth:login');
  console.log(response);
  isLoggedIn.value = true;
});

</script>

<template>
  <MainPage v-if="isLoggedIn" :items="[
    {label: 'HOME'},
    {label: 'LIVE'},
    {label: 'REPLAYS'},
    {label: 'HIGHLIGHTS'},
    {label: 'TOURNAMENTS'},
    {label: 'STATS'}
  ]" :isLoggedIn="isLoggedIn"/>
  <LandingPage v-else :isLoggedIn="isLoggedIn"/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
