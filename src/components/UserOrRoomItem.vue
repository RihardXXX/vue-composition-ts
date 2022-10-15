<script lang="ts" setup>
import { withDefaults, toRefs } from 'vue';

interface Props {
    active?: boolean;
    label?: string;
}

const props = withDefaults(defineProps<Props>(), {
    active: false,
    label: '',
});

const { active, label } = toRefs(props);

const emit = defineEmits<{
    (e: 'click'): void;
}>();
</script>

<template>
    <div
        :class="[
            $style.item,
            $style._room,
            {
                [$style._activeRoom]: active,
            },
        ]"
        @click="emit('click')"
    >
        {{ label }}
    </div>
</template>

<style lang="scss" module>
.item {
    position: relative;
    display: inline-block;
    align-items: flex-start;
    justify-content: flex-start;
    width: 90%;
    //min-height: 3rem;
    margin: 0.2rem 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid $gray-600;
    background-color: $white;
    word-wrap: break-word;
    flex-direction: column;
    cursor: pointer;

    @include respond-to(md) {
        width: 90%;
    }

    &._room {
        border: 0.5px solid $black-400;
        background-color: $gray-600;
        transition: 0.4s;
        cursor: pointer;

        &:hover {
            background-color: $gray-400;

            @include respond-to(md) {
                background-color: $blue-100;
            }
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
</style>
