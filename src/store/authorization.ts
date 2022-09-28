import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { User } from '@/types/store/user';

export const useAuthorizationStore = defineStore('authorization', () => {
    // массив пользователей
    const userList = ref<Array<any>>([]);
    // текущий авторизованный пользователь
    const user = ref<User | null>(null);
    // токен
    const token = ref<string>('');
    // авторизован ли пользователь
    const isLoggedIn = ref<boolean>(false);
    // ошибки глобальные
    const errors = ref<Error | null>(null);
    // загружается ли страница
    const isLoading = ref<boolean>(false);
    // все пользователи
    const allUsers = ref<Array<any>>([]);

    // регистрация пользователя
    function registerUser(newUser: User): void {
        user.value = newUser;
        token.value = newUser.token;
        isLoggedIn.value = true;
        window.localStorage.setItem('token', newUser.token);
    }

    // авторизоваться в вручную по логину и паролю
    function login(userLogin: User): Promise<null> {
        return new Promise((resolve, reject) => {
            user.value = userLogin;
            isLoggedIn.value = true;
            token.value = userLogin.token;
            window.localStorage.setItem('token', userLogin.token);
            resolve(null);
        });
    }

    return {
        userList,
        user,
        token,
        isLoggedIn,
        errors,
        isLoading,
        allUsers,
        registerUser,
        login,
    };
});
