import { defineStore } from 'pinia';
import { ref, computed, inject } from 'vue';
import { User } from '@/types/store/user';
import { AuthorizationUrlTypes } from '@/types/urls/authorizationUrlTypes';
import { urlAuth } from '@/api/urls/urlAuthorization';
import { AxiosResponse } from 'axios';
import { useSocketIO } from '@/api/socketio/socket-io-client';
import { socketEventsClient } from '@/types/socket/socketEvents';
import { Room } from '@/types/store/room';

export const useAuthorizationStore = defineStore('authorization', () => {
    // пути для запросов и аксиос
    const urls = inject<AuthorizationUrlTypes>(urlAuth);
    const axios = inject<any>('axios');

    // объект работы с сокетами
    const { socket } = useSocketIO();

    // ===== Это состояние =====
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
    const allUsers = ref<Array<User>>([]);

    // ===== Это функции экшены =====
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

    // автоматическая авторизация при запуске приложения
    function authUser(): void {
        const tokenFromLocalStorage: string | null =
            window?.localStorage.getItem('token');
        if (!tokenFromLocalStorage) {
            return;
        }
        const url: string | undefined = urls?.auth;

        axios
            .get(url)
            .then((res: AxiosResponse): void => {
                user.value = res.data.user as User;
                isLoggedIn.value = true;
                token.value = tokenFromLocalStorage;
            })
            .catch((err: any) => console.log(err.response.data.message));
    }

    // выйти из состояния авторизации
    function logout(): void {
        window.localStorage.removeItem('token');
        user.value = null;
        isLoggedIn.value = false;
        token.value = '';
    }

    // автоматическое обновление состояния данных у текущего пользователя
    (function updateUserClient() {
        socket.on(
            socketEventsClient.updateUserClient,
            (updateUser: User): void => {
                user.value = updateUser;
            }
        );
    })();

    // получение всех пользователей в приложении
    function getAllUsers() {
        const url: string | undefined = urls?.allUsers;
        axios
            .get(url)
            .then((res: AxiosResponse): void => {
                allUsers.value = res.data.allUsers;
            })
            .catch((err) => console.log(err.response.data.message));
    }

    // установка текущего пользователя
    function setCurrentUser(currentUser: User) {
        user.value = currentUser;
    }

    // ===== Это геттеры =====
    // статус авторизации
    const status = computed<boolean>(() => isLoggedIn.value);
    // имя текущего пользователя
    const username = computed<string>(() => user.value?.username || '');
    // имеются ли вообще комнаты в которых пригласили текущего пользователя
    const isInvited = computed<boolean>(() =>
        Boolean(user.value?.invitedRooms?.length)
    );
    // комнаты сами в которые пригласили текущего пользователя
    const invitedRooms = computed<Array<Room> | []>(() => {
        return user.value?.invitedRooms || [];
    });

    return {
        userList,
        user,
        token,
        isLoggedIn,
        errors,
        isLoading,
        allUsers,
        status,
        registerUser,
        login,
        logout,
        authUser,
        getAllUsers,
        setCurrentUser,
        username,
        isInvited,
        invitedRooms,
    };
});
