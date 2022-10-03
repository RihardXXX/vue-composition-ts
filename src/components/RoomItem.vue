<script lang="ts" setup>
import { withDefaults, toRefs } from 'vue';
import SvgIcon from '@/components/ui/SvgIcon.vue';
import { plural } from '@/utils';

interface Props {
    name: string;
    countUser?: number;
    isMyRoom?: boolean;
    disabled?: boolean;
    isPrivate?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    countUser: 0,
    isMyRoom: false,
    disabled: false,
    isPrivate: false,
});
const { name, countUser, isMyRoom, disabled, isPrivate } = toRefs(props);

const emit = defineEmits<{
    (e: 'click'): void;
    (e: 'deleteRoom'): void;
    (e: 'toInvite'): void;
}>();
</script>

<template>
    <li
        :class="[
            $style.itemRoom,
            {
                [$style._disabled]: disabled,
            },
        ]"
        @click="emit('click')"
    >
        <div :class="$style.roomName">
            <SvgIcon name="room" :class="$style.roomIcon" />
            <div :class="$style.linkItem">
                {{ name }}
            </div>
        </div>
        <div>
            <span>
                {{ countUser }}
            </span>
            <span>
                {{
                    plural(countUser, [
                        'пользователь',
                        'пользователя',
                        'пользователей',
                    ])
                }}
            </span>
        </div>
        <button
            v-if="isMyRoom"
            :class="$style.roomName"
            @click.stop="emit('deleteRoom')"
        >
            <SvgIcon name="close" :class="$style.deleteIcon" />
        </button>
        <div v-if="isPrivate" :class="$style.privateSection">
            <div>приватная</div>
            <button :class="$style.roomName" @click.stop="emit('toInvite')">
                пригласить
            </button>
        </div>
    </li>
</template>

<style lang="scss" module>
.itemRoom {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0.5rem;
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

    &._disabled {
        cursor: auto;

        &:hover {
            background: none;
        }
    }
}

.roomName {
    display: flex;
    align-items: center;
    justify-content: space-between;
    //border: none;
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

.deleteIcon {
    width: 1.5rem;
    height: 1.5rem;
    transform: rotate(45deg);
}

.privateSection {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
}
</style>
