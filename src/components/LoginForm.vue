<script lang="ts" setup>
import VInput from '@/components/ui/VInput.vue';
import VErrorList from '@/components/ui/VErrorList.vue';
import VButton from '@/components/ui/VButton.vue';
import { urlAuth } from '@/api/urls/urlAuthorization';
import { AuthorizationUrlTypes } from '@/types/urls/authorizationUrlTypes';
import { withDefaults, ref, inject, toRefs } from 'vue';
import { LoginUserSend } from '@/types/registration/loginUserSend';
import { AxiosResponse } from 'axios';
import { User } from '@/types/store/user';
import { useAuthorizationStore } from '@/store/authorization';
import { useRouter } from 'vue-router';

// получение сторы для добавления пользователя
const authorizationStore = useAuthorizationStore();

const router = useRouter();

// инициализация пропсов
interface Props {
    classContainer?: Array<string> | string;
}

const props = withDefaults(defineProps<Props>(), {
    classContainer: '',
});
const { classContainer } = toRefs(props);

const urls = inject<AuthorizationUrlTypes>(urlAuth);
const axios = inject<any>('axios');

// инициализация состояний
const email = ref<string>('');
const password = ref<string>('');

const setEmail = (e: string): string => (email.value = e);
const setPassword = (e: string): string => (password.value = e);
const errors = ref<Array<string>>([]);

const setLogin = () => {
    console.log('setLogin');
    errors.value = [];

    if (!email.value) {
        errors.value.push('заполните пожалуйста поле почты');
        return;
    }

    if (!password.value) {
        errors.value.push('заполните пожалуйста поле пароля');
        return;
    }

    const url = urls?.login;

    axios
        .post(url, {
            user: {
                email: email.value,
                password: password.value,
            } as LoginUserSend,
        })
        .then((res: AxiosResponse): void => {
            // console.log('res: ', res);
            const user: User = res.data.user;
            authorizationStore.login(user);
            router.push({ name: 'room-list' });
        })
        .catch((err: any) => {
            errors.value = err.response.data.message as Array<string>;
        });
};
</script>

<template>
    <div :class="[$style.container, classContainer]">
        <form :class="$style.form" @submit.prevent="setLogin">
            <VInput
                label="ваша почта"
                :value="email"
                :class-container="$style.inputItem"
                @input="setEmail"
            />
            <VInput
                label="ваш пароль"
                :value="password"
                :class-container="$style.inputItem"
                @input="setPassword"
            />
            <VButton :class-container="$style.buttonRegister" name="войти" />
        </form>
        <VErrorList
            v-if="errors.length"
            :error-list="errors"
            :class-container="$style.buttonRegister"
        />
    </div>
</template>

<style lang="scss" module>
.container {
    padding: 0;
}

.form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    flex-direction: column;
}

.inputItem {
    margin-top: 1.2rem;

    &:first-child {
        margin-top: 0;
    }
}

.buttonRegister {
    margin-top: 1rem;
}

.errorList {
    margin-top: 1rem;
}
</style>
