<script lang="ts" setup>
import SvgIcon from '@/components/ui/SvgIcon.vue';
import { onMounted, ref, toRefs } from 'vue';
import { useRoomsStore } from '@/store/rooms';
// import { useSocketIO } from '@/api/socketio/socket-io-client';
import { useAuthorizationStore } from '@/store/authorization';
import { User } from '@/types/store/user';
import { socketEventsServer } from '@/types/socket/socketEvents';
import { Room } from '@/types/store/room';
import RoomItem from '@/components/RoomItem.vue';
import ModalInviteUser from '@/components/modals/ModalInviteUser.vue';
import { useRouter } from 'vue-router';

// получаем реактивное состояние всех комнат и только комнат пользователя
const { rooms, myRooms } = toRefs(useRoomsStore());
const { setCurrentRoom } = useRoomsStore();
// получаем данные о текущем пользователе
const { user: currentUser } = useAuthorizationStore();
// объект сокета для получения данных от сервера
const { socket } = useRoomsStore();
// роутер объект для перехода
const router = useRouter();

// console.log('router', router);

onMounted(() => {
    // инициализация комнат
    socket.emit(socketEventsServer.initialRooms, { user: currentUser as User });
});

// функции для перехода в конкретную комнату
const nextRoom = (room: Room): void => {
    // console.log(room);
    setCurrentRoom(room);
    router.push({ name: 'current-room' });
};

const deleteRoom = (room: Room): void => console.log('deleteRoom', room);

// открытие окна для приглашения пользователей в приватную комнату
const open = ref<boolean>(false);
const closeModal = (): boolean => (open.value = false);

// комната приглашения для модалки пропсов
const roomInvite = ref<Room>();
const toInvite = (selectRoom: Room): void => {
    open.value = true;
    roomInvite.value = selectRoom;
};
</script>

<template>
    <div :class="$style.container">
        <teleport to="body">
            <ModalInviteUser
                :open="open"
                :invited-room="roomInvite"
                @close="closeModal"
            />
        </teleport>
        <div :class="$style.column">
            <div :class="$style.head">
                <SvgIcon name="chats" :class="$style.chatsIcon" />
            </div>
            <h4>все комнаты</h4>
            <ul v-if="rooms.length" :class="$style.roomsList">
                <RoomItem
                    v-for="room in rooms"
                    :key="room._id"
                    :name="room.name"
                    :is-my-room="room.author === currentUser._id"
                    :is-private="
                        room.author === currentUser._id && room.private
                    "
                    :count-user="room.users.length"
                    @click="() => nextRoom(room)"
                    @delete-room="() => deleteRoom(room)"
                    @to-invite="() => toInvite(room)"
                />
            </ul>
        </div>
        <div :class="$style.column">
            <div :class="$style.head">
                <svg-icon name="tweets" :class="$style.chatsIcon" />
            </div>
            <h4>ваши комнаты</h4>
            <ul v-if="myRooms.length" :class="$style.roomsList">
                <RoomItem
                    v-for="room in myRooms"
                    :key="room._id"
                    :name="room.name"
                    :is-my-room="room.author === currentUser._id"
                    :is-private="
                        room.author === currentUser._id && room.private
                    "
                    :count-user="room.users.length"
                    @click="() => nextRoom(room)"
                    @delete-room="() => deleteRoom(room)"
                    @to-invite="() => toInvite(room)"
                />
            </ul>
            <div v-else>вы пока не создали не одну комнату</div>
        </div>
    </div>
</template>

<style lang="scss" module>
.container {
    display: flex;
    width: 100%;
    height: 80vh;
    background-color: $gray-700;
}

.column {
    width: 50%;
    text-align: center;
}

.head {
    padding: 0.5rem 0;
    border-bottom: 0.1rem solid $black-200;

    &:first-child {
        border-right: 0.1rem solid $black-200;
    }
}

.chatsIcon {
    width: 3rem;
    height: 3rem;
}

.roomsList {
    overflow: auto;
    width: 100%;
    height: 88%;
    list-style: none;
}

.itemRoom {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 0.3rem;
    padding: 0.8rem 2rem;
    border: 0.08rem solid $gray-800;
    transition: 0.4s;
    cursor: pointer;

    &:first-child {
        margin-top: 0;
    }

    &:hover {
        background-color: $white;
    }
}

.roomName {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.roomIcon {
    width: 1.5rem;
    height: 1.5rem;
}

.linkItem {
    margin-left: 1rem;
    text-decoration: none;
    font-size: 1.3rem;
    color: $black-900;
}
</style>
