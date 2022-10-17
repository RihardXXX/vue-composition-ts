<script lang="ts" setup>
import ModalOverlayWrapper from '@/components/modals/ModalOverlayWrapper.vue';
import { onMounted } from 'vue';

onMounted(() => {
    console.log('onMounted ');
});
</script>

<template>
    <ModalOverlayWrapper> ModalInvitationList </ModalOverlayWrapper>
</template>
