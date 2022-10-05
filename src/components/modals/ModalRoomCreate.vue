<script lang="ts" setup>
import RoomItem from '@/components/RoomItem.vue';
import VErrorList from '@/components/ui/VErrorList.vue';
</script>

<template>
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
                @deleteRoom="() => deleteRoom(myRoom)"
                @toInvite="() => toInvite(myRoom)"
            />
        </ul>

        <VErrorList
            v-if="errors.length"
            :error-list="errors"
            :class-container="$style.containerError"
        />

        <div v-if="user.roomCount > 0" :class="$style.settingSection">
            <VInputSend
                :value="room.roomName"
                label="имя комнаты"
                icon-name="send"
                :style="{ width: '50%' }"
                @input="(event) => (room.roomName = event.target.value.trim())"
                @keyup.enter.native="createNewRoom"
                @click="createNewRoom"
            />
            <VToggleButton
                :active="room.private"
                first-name="публичная"
                last-name="приватная"
                @clickFirst="room.private = false"
                @clickLast="room.private = true"
            />
        </div>
        <button :class="$style.buttonClose" @click="$emit('close')">
            <svg-icon name="close" :class="$style.closeIcon" />
        </button>
    </div>
</template>

<style lang="scss" module>
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
    height: auto;
    padding: $offset * 4 $offset * 6;
    border-radius: 1rem 1rem 0 0;
    background-color: $gray-700;
    box-shadow: 0 8px 24px rgba($black-400, 0.1);
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
</style>
