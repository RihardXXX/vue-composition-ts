<script lang="ts" setup>
import { useRoomsStore } from '../store/rooms';

const rooms = useRoomsStore();

console.log(rooms);
</script>

<template>
    <h1>RoomListPage</h1>
</template>
