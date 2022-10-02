<script lang="ts" setup>
import { useRoomsStore } from '../store/rooms';

const rooms = useRoomsStore();

console.log(rooms);
</script>

<template>
    <div :class="$style.container">
        Room-list page
    </div>
</template>


<style lang='scss' module>
    .container {
        min-height: 80vh;
        width: 100%;
    }
</style>
