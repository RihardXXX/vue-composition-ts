<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits } from 'vue';

interface Props {
    value: string;
    label?: string;
    classContainer?: string | Array<string>;
}

const props = withDefaults(defineProps<Props>(), {
    label: '',
    classContainer: () => '',
});

const emit = defineEmits<{
    (e: 'input', value: string): void;
}>();
</script>

<template>
    <div :class="[$style.container, props.classContainer]">
        <div v-if="props.label" :class="$style.label">
            {{ props.label }}
        </div>
        <input
            :class="$style.input"
            :value="props.value"
            @input="emit('input', $event.target.value.trim())"
        />
    </div>
</template>

<style lang="scss" module>
.container {
    position: relative;
    width: 100%;
    padding: 1.1rem 1.2rem;
    border-radius: 5rem;
    border: 1px solid $gray-100;
}

.label {
    position: absolute;
    top: -1.1rem;
    left: 1rem;
    z-index: 10;
    padding: 0.2rem 0.3rem;
    background-color: $white;
    font-size: 1.4rem;
}

.input {
    width: 100%;
    //padding: .3rem;
    border: none;
    outline: none;
    font-size: 1.4rem;
}
</style>
