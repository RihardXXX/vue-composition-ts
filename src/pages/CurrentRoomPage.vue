<script lang="ts" setup>
//компоненты
import UserOrRoomItem from '@/components/UserOrRoomItem.vue';
import VInputSend from '@/components/ui/VInputSend.vue';
import VErrorList from '@/components/ui/VErrorList.vue';
import SvgIcon from '@/components/ui/SvgIcon.vue';
// интерфейсы
import { Room } from '@/types/store/room';
import { User } from '@/types/store/user';
import { socketEventsServer } from '@/types/socket/socketEvents';
// хуки и функции вью
import { onMounted, toRefs, ref, onUnmounted, watch } from 'vue';
// глобальное состояние Пиниа
import { useAuthorizationStore } from '@/store/authorization';
import { useRoomsStore } from '@/store/rooms';

// глобальное состояние пользователя и комнат
const { user } = toRefs(useAuthorizationStore());
const { currentRoom, rooms, messagesCurrentRoom, usersCurrentRoom, errors } =
    toRefs(useRoomsStore());
// объект сокета должен быть один чтобы по айди цеплялись события
// реактивность не требуется
const { socket, deleteError, addError } = useRoomsStore();

// текст сообщения
const text = ref<string>('');
// чтобы стирать ошибку отсутствие текста
watch(
    () => text.value,
    (text: string): void => {
        if (text.length) {
            deleteError();
        }
    }
);

// ссылки на рефы сообщений
const divMessages = ref([]);

onMounted(() => {
    // отправляем пользователя и текущую комнату на сервер
    socket.emit(socketEventsServer.joinedRooms, {
        user: user.value,
        room: currentRoom.value,
    });
    deleteError();
});

onUnmounted(() => {
    // выходим из текущей комнаты
    // когда пользователь выходит сообщаем остальным что пользователь вышел
    socket.emit(socketEventsServer.exitRoom, {
        user: user.value,
        room: currentRoom.value,
    } as {
        user: User;
        room: Room;
    });
});

// отправить сообщение в текущую комнату
const sendMessage = (): void => {
    deleteError();
    if (!text.value.length) {
        addError('поле сообщения не может быть пустым');
        return;
    }
    const currentUser = user.value;

    socket.emit(socketEventsServer.createNewMessage, {
        text: text.value,
        room: currentRoom.value,
        user: currentUser,
    });

    text.value = '';
};
// сменить комнату
const changeRoom = (newRoom: Room): void =>
    console.log('change room on: ', newRoom);

const setName = (): void => console.log('setName');

// вверх или вниз включен режим
const up = ref<boolean>(false);
// функция которая скроллит автоматически к определенному элементу
const nextMessageScroll = (
    _id: string,
    duration: number,
    divs: object
): void => {
    setTimeout(() => {
        const element: HTMLElement = divs[_id];
        element?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, duration);
};

// поднимаемся по сообщениям и спускаемся плавно
// если спустились то включаем авто спуск для новых сообщений
const upOrDownList = (): void => {
    // перемещаем стрелку, отключаем автоскролл вниз
    up.value = !up.value;
    // скроллим плавно к верхнем элементу если включен режим вверх
    if (messagesCurrentRoom.value.length && up.value) {
        // скроллим к первому верхнему элементу
        const _id = messagesCurrentRoom.value[0]._id;
        nextMessageScroll(_id, 1000, divMessages.value);
    } else {
        // включаем режим авто скролла и скроллим к последнему элементу
        const _id =
            messagesCurrentRoom.value[messagesCurrentRoom.value.length - 1]._id;
        nextMessageScroll(_id, 1000, divMessages.value);
    }
};

// тут следим за списком и у определенного списка докручиваем скролл
watch(
    () => messagesCurrentRoom.value,
    (messages) => {
        if (messages.length && !up.value) {
            // тут будем делать скрол как получим ответ от сервера
            const _id = messages[messages.length - 1]._id;
            nextMessageScroll(_id, 1500, divMessages.value);
        }
    }
);
</script>

<template>
    <div :class="$style.IndexPage">
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
            <div
                :class="[
                    $style.chatWindow,
                    {
                        [$style.errorMessage]: errors.length,
                    },
                ]"
            >
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
                        :ref="(el) => (divMessages[message._id] = el)"
                        :class="[
                            $style.itemContainer,
                            {
                                [$style._right]: message.user._id === user._id,
                            },
                        ]"
                    >
                        <div
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
                    :value="text"
                    label="текст для сообщение записывайте сюда"
                    icon-name="send"
                    :class="$style.inputSend"
                    @input="(event) => (text = event.target.value.trim())"
                    @keyup.enter="sendMessage"
                    @click="sendMessage"
                />
                <VErrorList
                    :error-list="errors"
                    :class-container="$style.errorList"
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
    height: 92%;
    margin-bottom: 2rem;
}

.errorMessage {
    height: 85%;
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
    //height: 10%;
}

.inputSend {
    min-height: 4rem;

    .inputMessage {
        min-width: 98%;
    }
}

.errorList {
    margin: 0 1rem;
    max-width: 25%;
    text-align: center;
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
