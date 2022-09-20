import { createApp } from 'vue';
import './reset.scss';
import './default.scss';
import App from './App.vue';
import router from './router/index';

createApp(App).use(router).mount('#app');
