<script lang="ts">
import { defineComponent } from 'vue';
import StartLoadingPage from './components/StartLoadingPage.vue';

export default defineComponent({
    name: 'App',
    components: {
        StartLoadingPage,
    },
});

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
    <ul class="test">
        <li>
            <router-link to="/welcome">Go to Home</router-link>
        </li>
        <li>
            <router-link to="/room-list">Go to About</router-link>
        </li>
        <li>
            <router-link to="/current-room/777">Go to Home</router-link>
        </li>
    </ul>
    <StartLoadingPage />

    <router-view></router-view>
</template>

<style lang="scss">
    .test {
        padding: 4rem;
    }
</style>
