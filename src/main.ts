import { createApp } from 'vue';
import './reset.scss';
import './default.scss';
import App from './App.vue';
import router from './router/index';
import { createPinia } from 'pinia';
import axios from 'axios'
import VueAxios from 'vue-axios'

// инициализируем ананас
const pinia = createPinia();

// создаём приложение
const app = createApp(App)

// подключаем роутер к приложению
app.use(router);
// подключаем ананас
app.use(pinia);
// подключаем axios
app.use(VueAxios, axios);
// провайдим axios через всё приложение
app.provide('axios', app.config.globalProperties.axios)
// монтируем приложение в див
app.mount('#app');

// createApp(App).use(router).use(pinia).mount('#app');
