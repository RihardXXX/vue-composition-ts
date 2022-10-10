<script lang="ts" setup>
import RoomItem from '@/components/RoomItem.vue';
import VErrorList from '@/components/ui/VErrorList.vue';
import VInputSend from '@/components/ui/VInputSend.vue';
import SvgIcon from '@/components/ui/SvgIcon.vue';
import VToggleButton from '@/components/ui/VToggleButton.vue';
import { computed, reactive, toRefs } from 'vue';
import { useAuthorizationStore } from '@/store/authorization';
import { useRoomsStore } from '@/store/rooms';
import { Room } from '@/types/store/room';
import { User } from '@/types/store/user';
import { useSocketIO } from '@/api/socketio/socket-io-client';
import ModalOverlayWrapper from '@/components/modals/ModalOverlayWrapper.vue';

// создаваемая комната тип для отправки на сервер
interface CreateRoomType {
    private: boolean;
    roomName: string;
}
const room = reactive<CreateRoomType>({
    private: false,
    roomName: '',
});

// const errors = ref<Array<string>>([]);

const { user } = toRefs(useAuthorizationStore());
const { myRooms, errors } = toRefs(useRoomsStore());
// функции для работы с ошибками
const { addError, deleteError } = useRoomsStore();

const description = computed<string>(() => {
    if (user.value) {
        return user.value.roomCount > 0
            ? `Вы можете создать не более ${user.value.roomCount} комнат`
            : 'Вы не можете создать более 5 комнат';
    }
    return '';
});

const emit = defineEmits<{
    (e: 'close'): void;
}>();

// объект со списком событий
import { socketEventsServer } from '@/types/socket/socketEvents';
// объект сокета для получения данных от сервера
const { socket } = useSocketIO();

const createNewRoom = (): void => {
    deleteError();
    if (!room.roomName) {
        addError('имя комнаты не может быть пустым');
        return;
    }

    if (room.roomName.length > 30) {
        addError('имя комнаты не может быть больше 30 символов');
        return;
    }

    // создаём комнату
    socket.emit(socketEventsServer.createNewRoom, {
        room,
        user: user.value,
    } as {
        room: CreateRoomType;
        user: User;
    });

    // сбрасываем поля
    room.roomName = '';
    room.private = false;
};
const deleteRoom = (myRoom: Room): void => {
    console.log('delete room: ', room);
    socket.emit('deleteMyRoom', { room: myRoom, user: user.value } as {
        room: Room;
        user: User;
    });
};
const toInvite = (myRoom: Room): void => console.log('toInvite', myRoom);
</script>

<template>
    <ModalOverlayWrapper>
        <div :class="$style.container">
            <h3 :class="$style.title">Создать комнату</h3>

            <p :class="$style.description">
                {{ description }}
            </p>

            <ul v-if="myRooms.length" :class="$style.roomsList">
                <RoomItem
                    v-for="myRoom in myRooms"
                    :key="myRoom.id"
                    :name="myRoom.name"
                    :is-my-room="myRoom.author === user._id"
                    :is-private="myRoom.author === user._id && myRoom.private"
                    :count-user="myRoom.users.length"
                    disabled
                    @delete-room="() => deleteRoom(myRoom)"
                    @to-invite="() => toInvite(myRoom)"
                />
            </ul>

            <VErrorList
                v-if="errors.length"
                :error-list="errors"
                :class-container="$style.containerError"
            />

            <div v-if="user?.roomCount > 0" :class="$style.settingSection">
                <VInputSend
                    :value="room.roomName"
                    label="имя комнаты"
                    icon-name="send"
                    :class="$style.inputSend"
                    @input="
                        (event) => (room.roomName = event.target.value.trim())
                    "
                    @keyup.enter="createNewRoom"
                    @click="createNewRoom"
                />
                <VToggleButton
                    :active="room.private"
                    first-name="публичная"
                    last-name="приватная"
                    @click-first="room.private = false"
                    @click-last="room.private = true"
                />
            </div>
            <button :class="$style.buttonClose" @click="emit('close')">
                <SvgIcon name="close" :class="$style.closeIcon" />
            </button>
        </div>
    </ModalOverlayWrapper>
</template>

<style lang="scss" module>
.title {
    padding-bottom: 1rem;
    border-bottom: 1px solid $gray-600;
    text-align: center;
    font-size: 2rem;
}

.description {
    margin: 1rem 0 1rem 0;
    text-align: center;
    font-size: 1.6rem;
}

.container {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    display: block;
    //width: 90%;
    height: auto;
    //z-index: 1111;
    padding: $offset * 4 $offset * 6;
    border-radius: 1rem 1rem 0 0;
    background-color: $gray-700;
    box-shadow: 0 8px 24px rgba($black-400, 0.1);

    @include respond-to(md) {
        width: 100%;
    }

    @include respond-to(sm) {
        height: 100%;
    }
}

.settingSection {
    height: 6rem;
    display: flex;
    justify-content: flex-start;

    @include respond-to(sm) {
        flex-direction: column;
        margin-top: 3rem;
    }
}

.buttonClose {
    position: absolute;
    right: 0;
    bottom: 0;
    //width: 5rem;
    //height: 5rem;
    padding: 1rem;
    border-radius: 0.5rem;
    border: none;
    background-color: $white;
}

.sendInput {
    width: 25rem;
}

.typeRoom {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.buttonType {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.3rem;
    transition: 0.8s;

    &:hover {
        transition: 0.8s;

        svg {
            transition: 0.8s;
            fill: $white;
        }
    }

    &:last-child {
        margin-left: 1rem;
    }

    &.active {
        background-color: $gray-500;
        //transition: .8s;

        span {
            color: $white;
        }

        svg {
            fill: $white;
        }
    }
}

.iconRoom {
    width: 2rem;
    height: 2rem;
    fill: $gray-400;
}

.roomsList {
    overflow: auto;
    //width: 100%;
    height: 55%;
    margin: 1rem 4rem;
    list-style: none;

    @include respond-to(md) {
        max-height: 50vh;
        padding: 2rem;
        border: 1px solid $black-600;
    }

    @include respond-to(sm) {
        max-height: 60vh;
        margin: 0;
    }
}

.closeIcon {
    width: 3rem;
    height: 3rem;
    transform: rotate(45deg);
}

.containerError {
    width: auto;
    margin: 1rem 4rem;
}

.inputSend {
    width: 50%;

    @include respond-to(sm) {
        width: 100%;

        input {
            height: 4rem;
        }
    }
}
</style>
