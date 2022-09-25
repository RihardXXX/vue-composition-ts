<script lang="ts" setup>
import { withDefaults, defineProps, defineEmits } from 'vue';

interface Props {
    name?: string;
    classContainer?: Array<string> | string;
}

const props = withDefaults(defineProps<Props>(), {
    name: '',
    classContainer: '',
});

// type-based
const emit = defineEmits<{
    (e: 'click'): void;
}>();
</script>

<template>
    <button
        :class="[$style.container, props.classContainer]"
        @click="emit('click')"
    >
        <slot></slot>
        <span :class="$style.name">{{ props.name }}</span>
    </button>
</template>

<style lang="scss" module>
.container {
    position: relative;
    width: 100%;
    padding: 0.8rem 1.6rem;
    border-radius: 0.7rem;
    border: 1px solid $gray-100;
    background-color: $gray-300;
    text-align: center;
    transition: 0.8s;

    &:hover {
        background-color: $gray-500;
        //transition: .8s;

        .name {
            color: $white;
            transition: 0.8s;
        }
    }
}

.name {
    font-size: 1.3rem;
    color: $gray-400;
}
</style>
