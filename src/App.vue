<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import StartLoadingPage from '@/components/StartLoadingPage.vue';
import { useAuthorizationStore } from './store/authorization';

// подключаемся к сторе и получаем состояние авторизации
const authorization = useAuthorizationStore();

// console.log(authorization);

const router = useRouter();

// переменные шага и статуса авторизации
const step = ref<number>(1);
const isLoggedIn = ref<boolean>(false);

// смена роута в зависимости от статуса
const changeRoute = (status: boolean): void => {
    if (status) {
        router.push({ name: 'room-list' });
    } else {
        router.push({ name: 'welcome' });
    }
};

// слежка за статусом авторизации
watch(isLoggedIn, changeRoute);

onMounted(() => {
    // запускаем страницу загрузки 2 секунды
    new Promise((resolve): void => {
        setTimeout(() => {
            step.value = 2;
            resolve('');
        }, 2000);
    }) // а потом производим рироут в зависимости от статуса авторизации
        .then((): void => changeRoute(isLoggedIn.value));
});
</script>

<template>
    <StartLoadingPage v-if="step === 1" />
    <div v-else>
        <router-view></router-view>
        <div v-show="isLoggedIn">header</div>
    </div>
</template>
