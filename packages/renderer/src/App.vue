<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import Button from 'primevue/button';
import {invoke} from '@vite-electron-builder/preload';

async function handleClick() {
  const response = await invoke('auth:login');
  console.log(response);
}

</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <Accordion value="0">
    <AccordionPanel value="0">
        <AccordionHeader>
          <div>Image goes here</div>
          <div>Tennis TV</div>
        </AccordionHeader>
        <AccordionContent>
          <Button label="Authenticate with TennisTV using the built-in browser" @click="handleClick"></Button>
        </AccordionContent>
    </AccordionPanel>
  </Accordion>
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
