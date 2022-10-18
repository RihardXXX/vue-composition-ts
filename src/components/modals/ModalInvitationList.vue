<script lang="ts" setup>
import ModalOverlayWrapper from '@/components/modals/ModalOverlayWrapper.vue';
import RoomItem from '@/components/RoomItem.vue';
import SvgIcon from '@/components/ui/SvgIcon.vue';
import { onMounted, toRefs } from 'vue';
import { useAuthorizationStore } from '@/store/authorization';
import { Room } from '@/types/store/room';

onMounted(() => {
    console.log('onMounted ');
});

const emit = defineEmits<{
    (e: 'close');
}>();

// подключаемся к сторе и получаем состояние авторизации
const authorizationStore = useAuthorizationStore();
const { invitedRooms } = toRefs(authorizationStore);

// принять приглашение в комнату и перейти в неё
const toComeIn = (room: Room): void => console.log('toComeIn', room);
</script>

<template>
    <ModalOverlayWrapper>
        <div :class="$style.container">
            <h3 :class="$style.title">Комнаты в которые меня пригласили</h3>
            <ul v-if="invitedRooms.length" :class="$style.roomsList">
                <RoomItem
                    v-for="room in invitedRooms"
                    :key="room._id"
                    :name="`приглашение в комнату ${room.name}`"
                    :count-user="room.users.length"
                    @click="() => toComeIn(room)"
                />
            </ul>
            <div v-else>
                <h3 :class="$style.notInvitedMessage">
                    у вас пока нет приглашений в комнаты
                </h3>
            </div>
            <button :class="$style.buttonClose" @click="emit('close')">
                <SvgIcon name="close" :class="$style.closeIcon" />
            </button></div
    ></ModalOverlayWrapper>
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

.roomsList {
    overflow: auto;
    width: 100%;
    height: 88%;
    margin: 1rem 0;
    list-style: none;
}

.notInvitedMessage {
    padding: 2rem 0;
    text-align: center;
    font-size: 2.4rem;
}
</style>
