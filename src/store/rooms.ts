import { defineStore } from 'pinia'

export const useRoomsStore = defineStore('rooms', {
    state: () => {
        return {
            // for initially empty lists
            userList: [],
            // for data that is not yet loaded
            user: null,
        }
    },
})

export {};
