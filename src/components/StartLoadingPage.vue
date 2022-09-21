<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const circle = ref<HTMLElement | null>(null);
const percent = ref<number>(0);

const startLoader = (): void => {
    const id = setInterval(() => {
        percent.value += 10;

        if (percent.value === 100) {
            clearInterval(id);
        }
        if (circle.value) {
            circle.value.style.cssText = `--percent:${percent.value};`;
        }
    }, 150);
};

onMounted(() => {
    startLoader();
});
</script>

<template>
    <div :class="$style.percent">
        <svg>
            <circle cx="105" cy="105" r="100"></circle>
            <circle
                ref="circle"
                cx="105"
                cy="105"
                r="100"
                style="--percent: 0"
            ></circle>
        </svg>
        <div :class="$style.number">
            <h3>{{ percent }}<span>%</span></h3>
            загрузка
        </div>
    </div>
</template>

<style lang="scss" module>
.percent {
    margin: 20% auto;
    position: relative;
    width: 21rem;
    height: 21rem;
    //transform: translateY(-100%);
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
        transition: all 0.5s;

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
            font-size: 3rem;
        }
    }
}

//@keyframes dash {
//    to {
//        stroke-dashoffset: 0;
//    }
//}
</style>
