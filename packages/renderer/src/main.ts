import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Ripple from 'primevue/ripple';

const app = createApp(App);

app.use(PrimeVue);
app.directive('ripple', Ripple);

app.mount('#app');

