<script lang="ts" setup>
import { withDefaults, toRefs } from 'vue';

interface Props {
    img: string;
    username: string;
    size?: string;
}

const props = withDefaults(defineProps<Props>(), {
    size: '',
});
const { img, username } = toRefs(props);
</script>

<template>
    <div :class="[$style.person]">
        <div :class="$style.borderLogo">
            <img :src="img" :class="$style.avatar" alt="face" />
        </div>
        <div :class="$style.username">
            {{ username }}
        </div>
    </div>
</template>

<style lang="scss" module>
.person {
    position: relative;
    display: flex;
    justify-content: center;
    width: 8rem;
    height: 9.1rem;
    //border: 1px solid black;
}

.borderLogo {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 6.7rem;
    height: 6.7rem;
    margin-top: 0.5rem;
    border-radius: 100%;
    background: #fff;
    text-align: center;

    &:before {
        content: '';
        position: absolute;
        top: -2.3px;
        right: -2.3px;
        bottom: -2.3px;
        left: -2.3px;
        z-index: -1;
        border-radius: 100%;
        background: linear-gradient(180deg, #de0046, #f7a34b);
    }
}

.username {
    position: absolute;
    bottom: 0.5rem;
    left: 50%;
    text-align: center;
    font-size: 1.15rem;
    font-weight: 400;
    transform: translateX(-50%);
}

.avatar {
    z-index: 112;
    width: 6rem;
    height: 6rem;
}
</style>
