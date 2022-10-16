<script lang="ts" setup>
import { toRefs, withDefaults } from 'vue';

interface Props {
    open?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    open: false,
});
const { open } = toRefs(props);

const emit = defineEmits<{
    (e: 'close'): void;
}>();
</script>

<template>
    <div v-if="open" :class="$style.overlay">
        <slot @close="emit('close')"></slot>
    </div>
</template>

<style lang="scss" module>
.overlay {
    z-index: 1111;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.4);
}
</style>
