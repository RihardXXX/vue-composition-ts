<script lang="ts" setup>
import ModalOverlayWrapper from '@/components/modals/ModalOverlayWrapper.vue';
import SvgIcon from '@/components/ui/SvgIcon.vue';
import PersonLogo from '@/components/PersonLogo.vue';
import avatar1 from '@/assets/images/avatar1.png';
import { onMounted, toRefs, inject } from 'vue';
import { useAuthorizationStore } from '@/store/authorization';
import { User } from '@/types/store/user';
import { Room } from '@/types/store/room';
import { urlAuth } from '@/api/urls/urlAuthorization';
import { AuthorizationUrlTypes } from '@/types/urls/authorizationUrlTypes';

// функция которая получает всех пользователей
const { getAllUsers } = useAuthorizationStore();
// все пользователи приложения
const { allUsers } = toRefs(useAuthorizationStore());
const axios = inject<any>('axios');

// получаем пути
// получение ссылок на юрл и либы аксиос для запросов
const urls = inject<AuthorizationUrlTypes>(urlAuth);

// получаем в хуке всех пользователей
onMounted(() => {
    console.log('onMounted');
    getAllUsers();
});

interface Props {
    invitedRoom: Room;
}

const props = defineProps<Props>();
const { invitedRoom } = toRefs(props);

const emit = defineEmits<{
    (e: 'close');
}>();

// выслать приглашение пользователю в группу эту приватную выбранную
const toInvite = (userSelect: User): void => {
    const url = urls?.addInvite;

    axios
        .post(url, {
            data: {
                invitedUser: userSelect,
                invitedRoom: invitedRoom.value,
            },
        }) // после добавления или удаления приглашения обновляем состояние пользователей
        .then(() => getAllUsers())
        .catch((err) => console.log(err.response.data.message));
};

// проверить приглашен ли пользователь в эту приватную группу
const isInvited = (selectUser: User): boolean => {
    // console.log('selectUser', selectUser);
    // console.log('invitedRoom.value', invitedRoom.value);
    return selectUser.invitedRooms.some(
        (room) => room._id === invitedRoom.value._id
    );
};
</script>

<template>
    <ModalOverlayWrapper>
        <div :class="$style.container">
            <h3 :class="$style.title">Пригласить пользователей</h3>
            <div v-if="allUsers.length" :class="$style.usersContainer">
                <div
                    v-for="(user, i) in allUsers"
                    :key="i + 1"
                    :class="$style.userCard"
                >
                    <PersonLogo
                        :username="user.username"
                        :img="avatar1"
                        :style="{ margin: '0 auto' }"
                    />
                    <button
                        :class="$style.buttonInvite"
                        @click="toInvite(user)"
                    >
                        <SvgIcon
                            name="invite"
                            :color="isInvited(user) ? '#111' : '#9e9e9e'"
                            :class="$style.iconInvite"
                        />
                    </button>
                    <div v-if="isInvited(user)" :class="$style.infoInvite">
                        приглашён
                    </div>
                    <div v-else :class="$style.infoInvite">не приглашён</div>
                </div>
            </div>
            <button :class="$style.buttonClose" @click="emit('close')">
                <SvgIcon name="close" :class="$style.closeIcon" />
            </button>
        </div>
    </ModalOverlayWrapper>
</template>

<style lang="scss" module>
.container {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    display: block;
    width: 90%;
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

.closeIcon {
    width: 3rem;
    height: 3rem;
    transform: rotate(45deg);
}
.title {
    padding-bottom: 1rem;
    border-bottom: 1px solid $gray-600;
    text-align: center;
    font-size: 2rem;
}

.description {
    margin-top: $offset * 3;
    text-align: center;
    font-size: 1.6rem;
}

.container {
    position: absolute;
    bottom: 0;
    display: block;
    width: 90%;
    height: 50%;
    padding: $offset * 4 $offset * 6;
    border-radius: 1rem 1rem 0 0;
    background-color: $gray-700;
    box-shadow: 0 8px 24px rgba($black-400, 0.1);
}

.usersContainer {
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 80%;
    margin-top: 1rem;
    //flex-direction: column;
}

.userCard {
    display: flex;
    width: 25%;
    flex-direction: column;
    margin-bottom: 2rem;
    //height: 4rem;
    //margin: 1rem;
    //border: 1px solid black;

    @include respond-to(sm) {
        width: 33%;
        font-size: 1.2rem;
    }
}

.settingSection {
    display: flex;
    justify-content: flex-start;
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

.buttonInvite {
    width: 50%;
    margin: 0 auto;
    border: none;
    background-color: transparent;
}

.iconInvite {
    width: 100%;
    height: 2rem;
    fill: $gray-400;

    &._invited {
        fill: $black-900;
    }
}

.infoInvite {
    text-align: center;
}
</style>
