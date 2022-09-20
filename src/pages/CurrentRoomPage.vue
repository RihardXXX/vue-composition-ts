<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CurrentRoomPage',
});

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
    <h1>CurrentRoomPage {{ $route.params }}</h1>
</template>
