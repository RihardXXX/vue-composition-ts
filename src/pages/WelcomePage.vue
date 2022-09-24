<script lang="ts" setup>
import { ref, computed } from 'vue';

// ===
// import { inject } from 'vue';
//
// const axios: any = inject('axios');
//
// axios.get('/test').then((res: any) => console.log(res))
// ===

// шаг
const step = ref<number>(1);

// заголовок в зависимости от шага
const titleForm = computed<string>(() => {
    switch (step.value) {
        case 1:
            return 'начало';
        case 2:
            return 'регистрация';
        case 3:
            return 'войти';
        default:
            return 'начало';
    }
});

const startRegister = () => (step.value = 2);
const startLogin = () => (step.value = 3);
</script>

<template>
    <div :class="$style.IndexPage">
        <!--        <div :class="$style.swiper">-->
        <!--            <div ref="slider" class="swiper">-->
        <!--                <div class="swiper-wrapper">-->
        <!--                    <div-->
        <!--                        v-for="slide in slides"-->
        <!--                        :key="slide.id"-->
        <!--                        :class="$style.slide"-->
        <!--                        class="swiper-slide"-->
        <!--                    >-->
        <!--                        <div ref="image" :class="$style.image">-->
        <!--                            <img :src="slide.src" :class="$style.img" />-->
        <!--                        </div>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </div>-->
        <div :class="$style.registerSection">
            <div
                :class="[
                    $style.headerRegister,
                    {
                        [$style.headerRegister_active]: step !== 1,
                    },
                ]"
            >
                <svg-icon
                    v-if="step !== 1"
                    name="left-arrow"
                    :class="$style.iconBack"
                    @click="step = 1"
                />
                <h2 :class="$style.titleRegister">
                    {{ titleForm }}
                </h2>
            </div>
            <div v-if="step === 1" :class="$style.contentRegister">
                <div :class="$style.itemRegister" @click="startRegister">
                    регистрация
                </div>
                <div :class="$style.border"></div>
                <div :class="$style.itemLogin" @click="startLogin">войти</div>
            </div>
            <RegistrationForm
                v-else-if="step === 2"
                :class-container="[
                    $style.contentRegister,
                    $style.contentRegister_vertical,
                ]"
            />
            <LoginForm
                v-else-if="step === 3"
                :class-container="[
                    $style.contentRegister,
                    $style.contentRegister_vertical,
                ]"
            />
        </div>
    </div>
</template>

<style lang="scss" module>
.IndexPage {
    overflow: hidden;
    width: 100%;
    height: 100vh;
}

.swiper {
    width: 100%;
    height: 100%;
}

.slide {
    position: relative;
    width: 100%;
    height: 78rem;

    &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            75deg,
            rgba(0, 0, 0, 0.4) 0%,
            rgba(0, 0, 0, 0) 50.99%,
            rgba(217, 217, 217, 0) 50.99%
        );
    }

    @include respond-to(tablet) {
        height: 52.6rem;
    }

    @include respond-to(mobile) {
        height: 46.6rem;
    }
}

.image {
    position: relative;
    width: 100%;
    height: 100%;
    //display: flex;
}

.img {
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.registerSection {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 100;
    overflow: hidden;
    min-width: 30rem;
    border-radius: 1.2rem;
    background-color: $white;
    transform: translate(-50%, -50%);
}

.headerRegister {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.3rem 1.1rem;
    background-color: $black-bg;

    &_active {
        justify-content: flex-start;

        .iconBack {
            margin-right: 10rem;
        }
    }
}

.titleRegister {
    text-align: center;
    font-size: 1.6rem;
    font-weight: 600;
    //line-height: 2rem;
    color: $white;
}

.contentRegister {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.2rem 1.3rem;

    &_vertical {
        flex-direction: column;
    }
}

.itemRegister {
    width: 50%;
    //padding: 1rem 2rem;
    text-align: center;
    font-size: 1.8rem;
    font-weight: 500;
    color: $green-main;
    cursor: pointer;
}

.border {
    position: absolute;
    top: 0;
    left: 50%;
    width: 1px;
    height: 100%;
    background-color: #c6c6c6;
    transform: translate(-50%, 0);
}

.itemLogin {
    width: 50%;
    //padding: 1rem 2rem;
    text-align: center;
    font-size: 1.8rem;
    font-weight: 500;
    color: $blue-main;
    cursor: pointer;
}

.iconBack {
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 5rem;
    cursor: pointer;
    fill: $white;
}
</style>
