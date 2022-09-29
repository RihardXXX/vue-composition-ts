<script lang="ts" setup>
import { ref, computed } from 'vue';
import SvgIcon from '@/components/ui/SvgIcon.vue';
import RegistrationForm from '@/components/RegistrationForm.vue';
import LoginForm from '@/components/LoginForm.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/scss/autoplay';
import slide1 from '../assets/images/slide1.jpeg';
import slide2 from '../assets/images/slide2.jpeg';
import slide3 from '../assets/images/slide3.jpeg';

// подключение модуля автовоспроизведения
const modules = [Autoplay];

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

const startRegister = (): number => (step.value = 2);
const startLogin = (): number => (step.value = 3);
</script>

<template>
    <div :class="$style.IndexPage">
        <swiper
            :modules="modules"
            :autoplay="{ delay: '4000' }"
            :speed="2000"
            :class="$style.swiper"
        >
            <swiper-slide :class="$style.image">
                <img :src="slide1" :class="$style.img" />
            </swiper-slide>
            <swiper-slide :class="$style.image">
                <img :src="slide2" :class="$style.img" />
            </swiper-slide>
            <swiper-slide :class="$style.image">
                <img :src="slide3" :class="$style.img" />
            </swiper-slide>
        </swiper>

        <div :class="$style.registerSection">
            <div :class="$style.headerRegister">
                <SvgIcon
                    v-if="step !== 1"
                    name="leftArrow"
                    color="white"
                    :class="$style.iconBack"
                    @click="step = 1"
                ></SvgIcon>
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
                :class-container="[$style.contentRegister, $style._vertical]"
            />
            <LoginForm
                v-else-if="step === 3"
                :class-container="[$style.contentRegister, $style._vertical]"
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
    width: 100%;
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
}

._vertical {
    flex-direction: column;
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
    //transform: rotate(-359deg);
}
</style>
