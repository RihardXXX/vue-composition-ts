<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import StartLoadingPage from '@/components/StartLoadingPage.vue';
import { useAuthorizationStore } from '@/store/authorization';
import HeaderLayout from '@/components/layout/HeaderLayout.vue';

// подключаемся к сторе и получаем состояние авторизации
const authorizationStore = useAuthorizationStore();
const router = useRouter();

// переменные шага и статуса авторизации
const step = ref<number>(1);

// смена роута в зависимости от статуса
const changeRoute = (status: boolean): void => {
    console.log('status: ', status);
    if (status) {
        router.push({ name: 'room-list' });
    } else {
        router.push({ name: 'welcome' });
    }
};

// слежка за статусом авторизации
watch(() => authorizationStore.status, changeRoute);

onMounted(async () => {
    // запускаем проверку авторизации пользователя
    await authorizationStore.authUser();

    // запускаем страницу загрузки 2 секунды
    new Promise((resolve): void => {
        setTimeout(() => {
            step.value = 2;
            resolve('');
        }, 2000);
    }) // а потом производим рироут в зависимости от статуса авторизации
        .then((): void => changeRoute(authorizationStore.status));
});
</script>

<template>
    <StartLoadingPage v-if="step === 1" />
    <div v-else>
        <router-view></router-view>
        <HeaderLayout v-show="authorizationStore.status" />
    </div>
</template>
