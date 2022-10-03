import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { socketEventsClient } from '@/types/socket/socketEvents';
import { useSocketIO } from '@/api/socketio/socket-io-client';
import { Room } from '@/types/store/room';

export const useRoomsStore = defineStore('rooms', () => {
    // объект работы с сокетами
    const { socket } = useSocketIO();

    // комнаты
    const rooms = ref<Array<Room>>([]);
    // текущая комната
    const currentRoom = ref<Room | null>(null);
    // массив ошибок
    const errors = ref<Array<string>>([]);
    // комнаты созданные мною
    const myRooms = ref<Array<Room>>([]);

    // инициализация комнат
    (function initialRoomsClient(): void {
        socket.on(
            socketEventsClient.initialRoomsClient,
            (allRooms: Array<Room>): void => {
                rooms.value = allRooms;
            }
        );
    })();

    // инициализация только моих комнат
    (function getMyRooms(): void {
        socket.on(
            socketEventsClient.getMyRooms,
            (resMyRooms: Array<Room>): void => {
                myRooms.value = resMyRooms;
            }
        );
    })();

    // геттеры
    // const allRooms = computed<Array<Room>>(() => rooms.value);
    // const allMyRooms = computed<Array<Room>>(() => myRooms.value);

    return {
        rooms,
        currentRoom,
        errors,
        myRooms,
        // allRooms,
        // allMyRooms,
    };
});
