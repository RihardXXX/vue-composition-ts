<script lang="ts" setup>
import VInput from '@/components/ui/VInput.vue';
import VErrorList from '@/components/ui/VErrorList.vue';
import VToggleButton from '@/components/ui/VToggleButton.vue';
import VButton from '@/components/ui/VButton.vue';
import { defineProps, withDefaults, ref } from 'vue';
import { inject } from 'vue';
import { urlAuth } from '@/api/urls/urlAuthorization';
import { AuthorizationUrlTypes } from '@/types/urls/authorizationUrlTypes';
import { AxiosResponse } from 'axios';
import { RegisterUserSend } from '@/types/registration/registerUserSend';
import { User } from '@/types/store/user';
import { useAuthorizationStore } from '@/store/authorization';

// получение ссылок на юрл и либы аксиос для запросов
const urls = inject<AuthorizationUrlTypes>(urlAuth);
const axios = inject<any>('axios');

// получение сторы для добавления пользователя
const authorizationStore = useAuthorizationStore();

export interface Props {
    classContainer?: Array<string> | string;
}

const props = withDefaults(defineProps<Props>(), {
    classContainer: '',
});

// реактивные переменные
const errors = ref<Array<string>>([]);
const username = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const gender = ref<boolean>(false);

const setName = (e: string): string => (username.value = e);
const setEmail = (e: string): string => (email.value = e);
const setPassword = (e: string): string => (password.value = e);

const setRegistration = (): void => {
    errors.value = [];
    const url: string | undefined = urls?.registration;
    // console.log('url: ', url);
    const sex: string = gender.value ? 'муж' : 'жен';

    axios
        .post(url, {
            user: {
                username: username.value,
                email: email.value,
                password: password.value,
                gender: sex,
            } as RegisterUserSend,
        })
        .then((res: AxiosResponse) => {
            const user: User = res.data.user;
            console.log('user: ', user);
            authorizationStore.registerUser(user);
        })
        .catch((err: any) => {
            errors.value = err.response.data.message as Array<string>;
        });
};
</script>

<template>
    <div :class="[$style.container, props.classContainer]">
        <form :class="$style.form" @submit.prevent="setRegistration">
            <VInput
                label="ваше имя"
                :value="username"
                :class-container="$style.inputItem"
                @input="setName"
            />
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
            <div :class="$style.genderQuestion">укажите ваш пол</div>
            <VToggleButton
                :active="gender"
                first-name="женский"
                last-name="мужской"
                :icon="false"
                @click-first="gender = false"
                @click-last="gender = true"
            />
            <VButton
                :class-container="$style.buttonRegister"
                name="регистрация"
            />
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

.genderQuestion {
    padding: 0.4rem 0;
    text-align: center;
}

.buttonRegister {
    margin-top: 1rem;
}

.errorList {
    margin-top: 1rem;
}
</style>
