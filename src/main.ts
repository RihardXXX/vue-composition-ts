import { createApp } from 'vue';
import './reset.scss';
import './default.scss';
import 'virtual:svg-icons-register';
import App from '@/App.vue';
import router from '@/router/index';
import { createPinia } from 'pinia';
import VueAxios from 'vue-axios';
import axiosApp from '@/api/axios/axios';
import { urlAuthorization, urlAuth } from '@/api/urls/urlAuthorization';
import { Vue3Mq, MqResponsive } from 'vue3-mq';
import VTooltip from 'v-tooltip';

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
// внедряем url пути для авторизации
app.provide(urlAuth, urlAuthorization);
// адаптив для шаблона подключаем
// Name	Minimum width
// xs	0
// sm	576
// md	768
// lg	992
// xl	1200
// xxl	1400
// xs задаем телефон md планшет
app.use(Vue3Mq, {
    preset: 'bootstrap5',
});
// глобальная регистрация компонента
app.component('MqResponsive', MqResponsive);
// подключаем тултип
app.use(VTooltip, {
    defaultHtml: false,
});
app.directive('tooltip', VTooltip.VTooltip);
// монтируем приложение в див
app.mount('#app');

// createApp(App).use(router).use(pinia).mount('#app');
