<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'StartLoadingPage',
});
</script>

<template>
    <div class="percent">
        <svg>
            <circle cx="105" cy="105" r="100"></circle>
            <circle cx="105" cy="105" r="100" style="--percent: 70"></circle>
        </svg>
        <div class="number">
            <h3>70<span>%</span></h3>
        </div>
    </div>
</template>

<style lang="scss">
.percent {
    position: relative;
    width: 40rem;
    height: 40rem;
}

svg {
    position: relative;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);

    circle {
        width: 100%;
        height: 100%;
        fill: none;
        stroke: #f0f0f0;
        stroke-width: 10;
        stroke-linecap: round;

        &:last-of-type {
            stroke-dasharray: 625px;
            stroke-dashoffset: calc(625px - (625px * var(--percent)) / 100);
            stroke: #3498db;
        }
    }
}

.number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    h3 {
        font-weight: 200;
        font-size: 3.5rem;

        span {
            font-size: 2rem;
        }
    }
}
</style>
