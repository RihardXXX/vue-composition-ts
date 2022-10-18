<script lang="ts" setup>
import { withDefaults, toRefs } from 'vue';
import SvgIcon from '@/components/ui/SvgIcon.vue';
import { plural } from '@/utils';

interface Props {
    name: string;
    countUser?: number | string;
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
        <div :class="[$style.roomName, $style._width]">
            <SvgIcon name="room" :class="$style.roomIcon" />
            <div :class="$style.linkItem">
                {{ name }}
            </div>
        </div>
        <div :class="$style.usersCounter">
            <span>
                {{ countUser }}
            </span>
            &nbsp;
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

        <MqResponsive target="md">
            <hr :class="$style.hr" />
        </MqResponsive>

        <MqResponsive target="md">
            <hr :class="$style.hr" />
        </MqResponsive>

        <button
            v-if="isMyRoom"
            :class="$style.deleteRoom"
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
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4rem;
    //align-items: center;
    //justify-content: space-around;
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

    @include respond-to(md) {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin-bottom: 2rem;
        border: 0.2rem solid $gray-800;
    }

    @include respond-to(sm) {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
}

.roomName {
    padding: 0.4rem;
    display: flex;
    align-items: center;
    //justify-content: space-between;
    //border: none;
    border: 0.1rem solid $black-200;
    transition: all 0.5s;

    &:hover {
        background-color: $black-100;
        color: $white;

        .linkItem {
            color: $white;
        }

        .roomIcon {
            fill: $white;
        }
    }

    //@include respond-to(md) {
    //    max-width: 50%;
    //}
}

//._width {
//    width: 6rem;
//}

.usersCounter {
    display: flex;
    align-items: center;
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

    //@include respond-to(md) {
    //    align-items: flex-start;
    //    //
    //    //.roomName {
    //    //    width: 50%;
    //    //}
    //    //
    //    //div {
    //    //    width: 50%;
    //    //}
    //}
}

.hr {
    background: $black-300;
    height: 0.2rem;
    border: none;
}

.deleteRoom {
    width: 3rem;
    height: 3rem;
    border: 0.1rem solid $black-200;
    transition: all 0.5s;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: $black-100;
        color: $white;
    }

    @include respond-to(md) {
        max-width: 3rem;
        max-height: 3rem;
    }
}
</style>
