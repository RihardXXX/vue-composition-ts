<script lang="ts" setup>
import { withDefaults } from 'vue';
import SvgIcon from '@/components/ui/SvgIcon.vue';
import VButton from '@/components/ui/VButton.vue';

interface Props {
    firstName: string;
    lastName: string;
    active: boolean;
    icon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    icon: true,
});

const emit = defineEmits<{
    (e: 'clickFirst'): void;
    (e: 'clickLast'): void;
}>();
</script>

<template>
    <div :class="$style.containerButton">
        <form :class="$style.typeRoom" @submit.prevent.stop="">
            <VButton
                :name="props.firstName"
                :class="[
                    $style.buttonType,
                    {
                        [$style.active]: !props.active,
                    },
                ]"
                @click="emit('clickFirst')"
            >
                <SvgIcon
                    v-if="props.icon"
                    name="public"
                    :class="$style.iconRoom"
                />
            </VButton>
            <VButton
                :name="props.lastName"
                :class="[
                    $style.buttonType,
                    {
                        [$style.active]: props.active,
                    },
                ]"
                @click="emit('clickLast')"
            >
                <SvgIcon
                    v-if="props.icon"
                    name="private"
                    :class="$style.iconRoom"
                />
            </VButton>
        </form>
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

.containerButton {
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

.closeIcon {
    width: 4rem;
    height: 4rem;
    transform: rotate(45deg);
}
</style>
