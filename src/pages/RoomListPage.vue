<script lang="ts" setup>
import { useRoomsStore } from '@/store/rooms';
import { useSocketIO } from '@/api/socketio/socket-io-client';
import { useAuthorizationStore } from '@/store/authorization';
import { User } from '@/types/store/user';
import { socketEventsClient } from '@/types/socket/socketEvents';

const rooms = useRoomsStore();
const { user: currentUser } = useAuthorizationStore();
const { socket } = useSocketIO();

// interface Test {
//     user: User | null
// }

// инициализация комнат
socket.emit(socketEventsClient.initialRooms, { user: currentUser as User });
</script>

<template>
    <div :class="$style.container">Room-list page</div>
</template>

<style lang="scss" module>
.container {
    min-height: 80vh;
    width: 100%;
}
</style>
