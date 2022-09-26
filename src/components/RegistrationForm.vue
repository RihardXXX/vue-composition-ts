<script lang="ts" setup>
import VInput from '@/components/ui/VInput.vue';
import VErrorList from '@/components/ui/VErrorList.vue';
import VToggleButton from '@/components/ui/VToggleButton.vue';
import VButton from '@/components/ui/VButton.vue';
import { defineProps, withDefaults, ref } from 'vue';

// интерфейс пропсов и пропсы
interface Props {
    classContainer?: Array<string> | string;
}

const props = withDefaults(defineProps<Props>(), {
    classContainer: '',
});

// реактивные переменные
const errors = ref<Array<string>>([]);
const username = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const gender = ref<boolean>(false);

const setName = (e: string): string => (username.value = e);
const setEmail = (e: string): string => (email.value = e);
const setPassword = (e: string): string => (password.value = e);
const setRegistration = () => {
    errors.value = [];
    console.log('setRegistration');
    // const url = moduleApi.authorization.registration;
    // const gender = this.gender ? 'муж' : 'жен';
};
</script>

<template>
    <div :class="[$style.container, props.classContainer]">
        <form :class="$style.form" @submit.prevent="setRegistration">
            {{ username }}
            <VInput
                label="ваше имя"
                :value="username"
                :class-container="$style.inputItem"
                @input="setName"
            />
            <VInput
                label="ваша почта"
                :value="email"
                :class-container="$style.inputItem"
                @input="setEmail"
            />
            <VInput
                label="ваш пароль"
                :value="password"
                :class-container="$style.inputItem"
                @input="setPassword"
            />
            <div :class="$style.genderQuestion">укажите ваш пол</div>
            <VToggleButton
                :active="gender"
                first-name="женский"
                last-name="мужской"
                :icon="false"
                @click-first="gender = false"
                @click-last="gender = true"
            />
            <VButton
                :class-container="$style.buttonRegister"
                name="регистрация"
            />
        </form>
        <VErrorList
            v-if="errors.length"
            :error-list="errors"
            :class-container="$style.buttonRegister"
        />
    </div>
</template>

<style lang="scss" module>
.container {
    padding: 0;
}

.form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    flex-direction: column;
}

.inputItem {
    margin-top: 1.2rem;

    &:first-child {
        margin-top: 0;
    }
}

.genderQuestion {
    padding: 0.4rem 0;
    text-align: center;
}

.buttonRegister {
    margin-top: 1rem;
}

.errorList {
    margin-top: 1rem;
}
</style>

<!--<script>-->
<!--    import { mapActions } from 'vuex';-->
<!--    import VInput from '~/components/ui/input/VInput';-->
<!--    import VButton from '~/components/ui/button/VButton';-->
<!--    import VErrorList from '~/components/ui/error/VErrorList';-->
<!--    import moduleApi from '~/config/api/module';-->
<!--    import VToggleButton from '~/components/main/VToggleButton';-->

<!--    export default {-->
<!--        name: 'RegistrationForm',-->

<!--        components: {-->
<!--            VInput,-->
<!--            VButton,-->
<!--            VErrorList,-->
<!--            VToggleButton,-->
<!--        },-->

<!--        props: {-->
<!--            classContainer: {-->
<!--                type: [String, Array],-->
<!--                required: false,-->
<!--                default: '',-->
<!--            },-->
<!--        },-->

<!--        data() {-->
<!--            return {-->
<!--                errors: [],-->

<!--                username: '',-->
<!--                email: '',-->
<!--                password: '',-->
<!--                gender: false,-->
<!--            };-->
<!--        },-->

<!--        methods: {-->
<!--            ...mapActions('authorization', [-->
<!--                'registerUser',-->
<!--            ]),-->

<!--            // установка имени-->
<!--            setName(e) {-->
<!--                this.username = e.trim();-->
<!--            },-->

<!--            setEmail(e) {-->
<!--                this.email = e.trim();-->
<!--            },-->

<!--            setPassword(e) {-->
<!--                this.password = e.trim();-->
<!--            },-->

<!--            setRegistration() {-->
<!--                this.errors = [];-->
<!--                const url = moduleApi.authorization.registration;-->
<!--                const gender = this.gender ? 'муж' : 'жен';-->

<!--                this.$axios.post(url, {-->
<!--                    user: {-->
<!--                        username: this.username,-->
<!--                        email: this.email,-->
<!--                        password: this.password,-->
<!--                        gender,-->
<!--                    },-->
<!--                })-->
<!--                    .then(({ data }) => {-->
<!--                        this.registerUser(data.user);-->
<!--                    })-->
<!--                    .catch(err => this.errors = err.response.data.message);-->
<!--            },-->

<!--        },-->
<!--    };-->
<!--</script>-->

<!--<style lang="scss" module>-->
<!--    .container {-->
<!--        padding: 0;-->
<!--    }-->

<!--    .form {-->
<!--        display: flex;-->
<!--        align-items: center;-->
<!--        justify-content: space-between;-->
<!--        width: 100%;-->
<!--        flex-direction: column;-->
<!--    }-->

<!--    .inputItem {-->
<!--        margin-top: 1.2rem;-->

<!--        &:first-child {-->
<!--            margin-top: 0;-->
<!--        }-->
<!--    }-->

<!--    .genderQuestion {-->
<!--        padding: .4rem 0;-->
<!--        text-align: center;-->
<!--    }-->

<!--    .buttonRegister {-->
<!--        margin-top: 1rem;-->
<!--    }-->

<!--    .errorList {-->
<!--        margin-top: 1rem;-->
<!--    }-->
<!--</style>-->
