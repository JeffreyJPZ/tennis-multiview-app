<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import Button from 'primevue/button';
import {invoke} from '@vite-electron-builder/preload';

async function handleClick() {
  const response = await invoke('tennistv:auth:login');
  console.log(response);
}

</script>

<template>
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
</style>
