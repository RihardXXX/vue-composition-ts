<script lang="ts" setup>
import VButton from '@/components/ui/VButton.vue';
import SvgIcon from '@/components/ui/SvgIcon.vue';
import PersonLogo from '@/components/PersonLogo.vue';
import ModalRoomCreate from '@/components/modals/ModalRoomCreate.vue';
import ModalInvitationList from '@/components/modals/ModalInvitationList.vue';
import avatar1 from '@/assets/images/avatar1.png';
import { useAuthorizationStore } from '@/store/authorization';
import { ref } from 'vue';
import { useSocketIO } from '@/api/socketio/socket-io-client';
import { socketEventsServer } from '@/types/socket/socketEvents';
import { toRefs } from 'vue';
import { useRoomsStore } from '@/store/rooms';
import { User } from '@/types/store/user';
import { Room } from '@/types/store/room';
import { useRouter } from 'vue-router';

// подключаемся к сторе и получаем состояние авторизации
const authorizationStore = useAuthorizationStore();
const roomsStore = useRoomsStore();
const { socket } = useSocketIO();
const router = useRouter();

const { username, user } = toRefs(authorizationStore);
const { currentRoom } = toRefs(roomsStore);

const open = ref<boolean>(false);

const createRoom = (): boolean => (open.value = true);
const closeModal = (): boolean => (open.value = false);

const selectRooms = (): void => {
    // выходим из текущей комнаты
    // когда пользователь выходит сообщаем остальным что пользователь вышел
    socket.emit(socketEventsServer.exitRoom, {
        user: user.value,
        room: currentRoom.value,
        changeRoom: false,
    } as {
        user: User;
        room: Room;
        changeRoom: boolean;
    });

    router.push({
        name: 'room-list',
    });
};
const exitLogin = (): void => authorizationStore.logout();

// открытие окна приглашений для просмотра моих приглашений
const openModalInvited = ref<boolean>(false);
const openModalInvites = (): boolean => (openModalInvited.value = true);
const closeModalInvites = (): boolean => (openModalInvited.value = false);
</script>

<template>
    <header :class="$style.headerMain">
        <VButton
            name="создать комнату"
            :class-container="$style.button"
            @click="createRoom"
        >
            <div :class="$style.addRoom">
                <div :class="$style.horizontal"></div>
                <div :class="$style.vertical"></div>
            </div>
        </VButton>
        <VButton
            name="мои приглашения"
            :class-container="$style.buttonInvite"
            @click="openModalInvites"
        />
        <div :class="$style.iconInstagramSection">
            <SvgIcon name="logoHeader" :class="$style.iconInstagram" />
        </div>
        <div :class="$style.rooms" @click="selectRooms">
            <SvgIcon name="rooms" :class="$style.exitIcon" />
        </div>
        <PersonLogo :username="username" :img="avatar1" />
        <div :class="$style.exit" @click="exitLogin">
            <SvgIcon name="exit" :class="$style.exitIcon" />
        </div>
        <teleport to="body">
            <ModalRoomCreate :open="open" @close="closeModal" />
        </teleport>
        <teleport to="body">
            <ModalInvitationList
                :open="openModalInvited"
                @close="closeModalInvites"
            />
        </teleport>
    </header>
</template>

<style lang="scss" module>
.headerMain {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 20vh;
    //padding: 1rem;
    border-top: 1px solid $gray-600;
}

.iconInstagramSection {
    position: absolute;
    bottom: 0;
    left: 0;
}

.iconInstagram {
    width: 14rem;
    height: 4rem;
}

.rooms {
    position: relative;
    height: 25%;
    display: flex;
    align-items: center;

    &:before {
        content: 'комнаты';
        position: absolute;
        top: 0;
        right: 0;
        z-index: 112;
        font-size: 1.2rem;
        font-weight: 500;
    }

    @include respond-to(md) {
        height: 40%;
    }
}

.exit {
    position: relative;
    height: 25%;
    display: flex;
    align-items: center;

    &:before {
        content: 'выйти';
        position: absolute;
        top: 0;
        left: 0;
        z-index: 112;
        font-size: 1.2rem;
        font-weight: 500;
    }

    @include respond-to(md) {
        height: 40%;
    }
}

.exitIcon {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    fill: $black-600;
}

.button {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 20%;
    height: 20%;
    padding: 0.4rem 0.6rem;
    border: 2px solid $black-900;
    text-align: center;

    span {
        color: $black-900;
        margin-left: 1rem;
        font-size: 2rem;
    }

    &:hover {
        border: 2px solid $white;

        .addRoom {
            border: 2px solid $white;
            transition: 0.7s;
        }

        .horizontal {
            background-color: $white;
            transition: 0.7s;
        }

        .vertical {
            background-color: $white;
            transition: 0.7s;
        }
    }

    @include respond-to(md) {
        height: 30%;

        span {
            font-size: 1.4rem;
        }
    }

    @include respond-to(sm) {
        width: 30%;

        span {
            margin-left: 0;
        }
    }
}

.buttonInvite {
    @extend .button;

    right: 0;
    left: unset;
}

.addRoom {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    padding: 0.2rem;
    border-radius: 0.5rem;
    border: 2px solid $black-900;
}

.horizontal {
    width: 100%;
    height: 0.3rem;
    border-radius: 2px;
    background-color: $black-900;
}

.vertical {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0.3rem;
    height: 85%;
    border-radius: 2px;
    background-color: $black-900;
    transform: translate(-50%, -50%);
}
</style>
