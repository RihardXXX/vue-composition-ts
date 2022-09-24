import { defineStore } from 'pinia';

export const useAuthorizationStore = defineStore('authorization', {
    state: () => {
        return {
            // for initially empty lists
            userList: [],
            // for data that is not yet loaded
            // user: null as UserInfo | null,

            user: {},
            token: '' as string,
            isLoggedIn: false as boolean,
            errors: null as Error | null,
            isLoading: false as boolean,
            allUsers: [],
        };
    },
});
