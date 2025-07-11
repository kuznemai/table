import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Avatar from 'vue3-avatar';
createApp(App).component('avatar', Avatar);
const app = createApp(App);
app.use(router);
app.mount('#app');
