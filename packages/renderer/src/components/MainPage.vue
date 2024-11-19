<script setup lang="ts">
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import {MenuItem} from 'primevue/menuitem';

defineProps<{ isLoggedIn: boolean, items: MenuItem[] }>();

</script>

<template>
    <Menubar :model="items">
        <template #start>
            <div>Logo goes here</div>
        </template>
        <template #item="{ item, props }">
            <a v-ripple class="flex items-center" v-bind="props.action">
                <span>{{ item.label }}</span>
            </a>
        </template>
        <template #end>
            <div class="flex items-center gap-2">
                <Button label="SIGN OUT"></Button>
            </div>
        </template>
    </Menubar>
</template>

<style scoped>
</style>
