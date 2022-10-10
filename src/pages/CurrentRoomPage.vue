<script lang="ts" setup>
import SvgIcon from '@/components/ui/SvgIcon.vue';
import UserOrRoomItem from '@/components/UserOrRoomItem.vue';
import VInputSend from '@/components/ui/VInputSend.vue';
import { Room } from '@/types/store/room';
import { onMounted, toRefs, ref, onUnmounted } from 'vue';
import { useSocketIO } from '@/api/socketio/socket-io-client';
import { socketEventsServer } from '@/types/socket/socketEvents'
import { useAuthorizationStore } from '@/store/authorization';
import { useRoomsStore } from '@/store/rooms';
import { User } from '@/types/store/user';

// объект сокета
const { socket } = useSocketIO();
// глобальное состояние пользователя и комнат
const { user } = toRefs(useAuthorizationStore());
const { currentRoom, rooms, messagesCurrentRoom, usersCurrentRoom } = toRefs(
    useRoomsStore()
);

const text = ref<string>('');
const up = ref<boolean>(false);

onMounted(() => {
    // отправляем пользователя и текущую комнату на сервер
    socket.emit(socketEventsServer.joinedRooms, {
        user: user.value,
        room: currentRoom.value,
    });
});

onUnmounted(() => {
    console.log('onUnmounted');
    // выходим из текущей комнаты
    // когда пользователь выходит сообщаем остальным что пользователь вышел
    socket.emit(socketEventsServer.exitRoom, {
        user: user.value,
        room: currentRoom.value,
    })
});

// отправить сообщение в текущую комнату
const sendMessage = (): void => console.log('sendMessage');
// сменить комнату
const changeRoom = (newRoom: Room): void =>
    console.log('change room on: ', newRoom);

const upOrDownList = (): void => console.log('upOrDownList');

const setName = (): void => console.log('setName');
</script>

<template>
    <div :class="$style.IndexPage">
<!--        <pre>-->
<!--            {{ currentRoom.users }}-->
<!--        </pre>-->
        <div :class="$style.container">
            <button :class="$style.UpDown" @click="upOrDownList">
                <SvgIcon
                    name="left-arrow"
                    :class="[
                        $style.iconUpDown,
                        {
                            [$style._up]: up,
                        },
                    ]"
                />
            </button>
            <div :class="$style.chatWindow">
                <div :class="$style.chatRooms">
                    <h3 :class="$style.titleRoom">Комнаты:</h3>
                    <UserOrRoomItem
                        v-for="room in rooms"
                        :key="room._id"
                        :active="currentRoom._id === room._id"
                        :label="room.name"
                        @click="() => changeRoom(room)"
                    />
                </div>
                <div ref="chatContainer" :class="$style.chatContainer">
                    <div
                        v-for="message in messagesCurrentRoom"
                        :key="message._id"
                        :ref="message._id"
                        :class="[
                            $style.itemContainer,
                            {
                                [$style._right]: message.user._id === user._id,
                            },
                        ]"
                    >
                        <div
                            v-tooltip.bottom-end="{
                                content: 'написать этому пользователю',
                                // delay: { show: 200, hide: 100 },
                            }"
                            :class="$style.item"
                            @click="() => setName(message)"
                        >
                            <span :class="$style.username">
                                {{ message.user.username }}:
                            </span>
                            <span :class="$style.userMessage">
                                {{ message.message_body }}
                            </span>
                        </div>
                    </div>
                </div>
                <div :class="$style.userName">
                    <h3 :class="$style.titleRoom">пользователи:</h3>
                    <UserOrRoomItem
                        v-for="user in usersCurrentRoom"
                        :key="user._id"
                        :label="user.username"
                    />
                </div>
            </div>
            <div :class="$style.inputSection">
                <VInputSend
                    ref="usernameInput"
                    :value="text"
                    icon-name="send"
                    @input="(event) => (text = event.target.value.trim())"
                    @keyup.enter="sendMessage"
                    @click="sendMessage"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
.IndexPage {
    width: 100%;
    height: 80vh;
}

.container {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: $gray-700;
}

.chatWindow {
    //position: relative;
    overflow: auto;
    display: flex;
    width: 100%;
    height: 90%;
}

.chatRooms {
    overflow: auto;
    display: flex;
    width: 10%;
    height: 100%;
    border-right: 0.5px solid $gray-200;
    flex-direction: column;
}

.userName {
    overflow: auto;
    display: flex;
    width: 10%;
    height: 100%;
    border-left: 0.5px solid $gray-200;
    flex-direction: column;
}

.titleRoom {
    margin: 0.2rem 0.5rem;
}

.chatContainer {
    //position: relative;
    overflow: auto;
    display: flex;
    width: 80%;
    height: 100%;
    flex-direction: column;
}

.UpDown {
    position: absolute;
    right: 0;
    bottom: -9.5rem;
    z-index: 100;
    //border: none;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 0.5px solid $gray-200;
    background: $white;
}

.iconUpDown {
    width: 2rem;
    height: 2rem;
    transform: rotate(90deg);
    transition: 0.7s;

    &._up {
        transform: rotate(-90deg);
    }
}

.itemContainer {
    display: flex;
    justify-content: flex-start;
    width: 100%;

    &._right {
        justify-content: flex-end;
    }
}

.item {
    position: relative;
    display: inline-block;
    align-items: flex-start;
    justify-content: flex-start;
    width: 70%;
    //min-height: 3rem;
    margin: 0.2rem 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid $gray-600;
    background-color: $white;
    word-wrap: break-word;
    flex-direction: column;
    cursor: pointer;

    &._room {
        border: 0.5px solid $black-400;
        background-color: $gray-600;
        transition: 0.4s;
        cursor: pointer;

        &:hover {
            background-color: $gray-400;
        }
    }

    &._activeRoom {
        background-color: $blue-100;
        color: $white;
    }

    &:hover {
        .username {
            font-weight: 800;
        }
    }
}

.border {
    width: 100%;
    height: 1px;
    margin-top: 0.5rem;
    background-color: $gray-200;
}

.username {
    font-size: 1.2rem;
    font-weight: 500;
    color: $black-600;
}

.userMessage {
    font-size: 1.2rem;
    font-weight: 400;
    color: $black-100;
}

.inputSection {
    position: relative;
    width: 100%;
    height: 10%;
}

.run {
    position: absolute;
    top: -40px;
    left: 0;
}

.sendSection {
    display: flex;
    align-items: center;
    margin: 0.5rem;
    padding: 0.2rem 0.5rem;
    border-radius: 0.5rem;
    background-color: $white;
}

.inputMessage {
    width: 97%;
    border: none;
    font-size: 1.4rem;

    &:focus {
        outline-style: none;
    }
}

.sendMessage {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3%;
}

.sendIcon {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    fill: $black-600;
}
</style>
