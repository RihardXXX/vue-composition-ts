import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRoomsStore = defineStore('rooms', () => {
    // комнаты
    const rooms = ref<Array<any>>([]);
    // текущая комната
    const currentRoom = ref<object | null>(null);
    // массив ошибок
    const errors = ref<Array<any>>([]);
    // комнаты созданные мною
    const myRooms = ref<Array<any>>([]);

    return {
        rooms,
        currentRoom,
        errors,
        myRooms,
    };
});
