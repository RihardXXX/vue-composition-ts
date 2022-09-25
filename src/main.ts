import { createApp } from 'vue';
import './reset.scss';
import './default.scss';
import 'virtual:svg-icons-register';
import App from './App.vue';
import router from './router/index';
import { createPinia } from 'pinia';
import VueAxios from 'vue-axios';
import axiosApp from './api/axios/axios';

// инициализируем ананас
const pinia = createPinia();

// создаём приложение
const app = createApp(App);

// подключаем роутер к приложению
app.use(router);
// подключаем ананас
app.use(pinia);
// подключаем axios
// app.use(VueAxios, axios);
app.use(VueAxios, axiosApp);
// провайдим axios через всё приложение
app.provide('axios', app.config.globalProperties.axios);
// console.log(app.provide);
// монтируем приложение в див
app.mount('#app');

// createApp(App).use(router).use(pinia).mount('#app');
