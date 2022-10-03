<script lang="ts" setup>
import VButton from '@/components/ui/VButton.vue';
import SvgIcon from '@/components/ui/SvgIcon.vue';
import PersonLogo from '@/components/PersonLogo.vue';
import avatar1 from '@/assets/images/avatar1.png';
import { useAuthorizationStore } from '@/store/authorization';
// import { toRefs } from 'vue'

// подключаемся к сторе и получаем состояние авторизации
const authorizationStore = useAuthorizationStore();

const { isInvited, username } = authorizationStore;

const openModal = (): void => console.log('openModal');
const openModalInvites = (): void => console.log('openModalInvites');
const selectRooms = (): void => console.log('selectRooms');
const exitLogin = (): void => authorizationStore.logout();
</script>

<template>
    <header :class="$style.headerMain">
        <VButton
            name="создать комнату"
            :class-container="$style.button"
            @click="openModal"
        >
            <div :class="$style.addRoom">
                <div :class="$style.horizontal"></div>
                <div :class="$style.vertical"></div>
            </div>
        </VButton>
        <VButton
            v-if="isInvited"
            name="мои приглашения"
            :class-container="$style.buttonInvite"
            @click="openModalInvites"
        />
        <div :class="$style.iconInstagramSection">
            <SvgIcon name="logoHeader" :class="$style.iconInstagram" />
        </div>
        <div :class="$style.rooms" @click="selectRooms">
            <SvgIcon name="rooms" :class="$style.exitIcon" />
        </div>
        <PersonLogo :username="username" :img="avatar1" />
        <div :class="$style.exit" @click="exitLogin">
            <SvgIcon name="exit" :class="$style.exitIcon" />
        </div>
    </header>
</template>

<style lang="scss" module>
.headerMain {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-height: 20vh;
    //padding: 1rem;
    border-top: 1px solid $gray-600;
}

.iconInstagramSection {
    position: absolute;
    bottom: 0;
    left: 0;
}

.iconInstagram {
    width: 14rem;
    height: 4rem;
}

.rooms {
    position: relative;
    height: 100%;

    &:before {
        content: 'комнаты';
        position: absolute;
        top: -1.5rem;
        right: 0;
        z-index: 112;
        font-size: 1.2rem;
        font-weight: 500;
    }
}

.exit {
    position: relative;
    height: 100%;

    &:before {
        content: 'выйти';
        position: absolute;
        top: -1.5rem;
        left: 0;
        z-index: 112;
        font-size: 1.2rem;
        font-weight: 500;
    }
}

.exitIcon {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    fill: $black-600;
}

.button {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 20%;
    padding: 0.4rem 0.6rem;
    border: 2px solid $black-900;
    text-align: center;

    span {
        color: $black-900;
        margin-left: 1rem;
    }

    &:hover {
        border: 2px solid $white;

        .addRoom {
            border: 2px solid $white;
            transition: 0.7s;
        }

        .horizontal {
            background-color: $white;
            transition: 0.7s;
        }

        .vertical {
            background-color: $white;
            transition: 0.7s;
        }
    }
}

.buttonInvite {
    @extend .button;

    right: 0;
    left: unset;
}

.addRoom {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    padding: 0.2rem;
    border-radius: 0.5rem;
    border: 2px solid $black-900;
}

.horizontal {
    width: 100%;
    height: 0.3rem;
    border-radius: 2px;
    background-color: $black-900;
}

.vertical {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0.3rem;
    height: 85%;
    border-radius: 2px;
    background-color: $black-900;
    transform: translate(-50%, -50%);
}
</style>

<!--<script>-->
<!--    import { mapState, mapActions } from 'vuex';-->
<!--    import VButton from '~/components/ui/button/VButton';-->
<!--    import ModalRoomCreate from '~/components/main/ModalRoomCreate';-->
<!--    import PersonLogo from '~/components/common/PersonLogo';-->
<!--    import ModalListInvitedRooms from '~/components/main/ModalListInvitedRooms';-->

<!--    export default {-->
<!--        name: 'TheHeader',-->

<!--        components: {-->
<!--            VButton,-->
<!--            PersonLogo,-->
<!--        },-->

<!--        computed: {-->
<!--            ...mapState('authorization', [-->
<!--                'user',-->
<!--            ]),-->

<!--            ...mapState([-->
<!--                'currentRoom',-->
<!--            ]),-->

<!--            username() {-->
<!--                return this.user.username;-->
<!--            },-->

<!--            // есть ли приглашения-->
<!--            isInvited() {-->
<!--                return this.user.invitedRooms.length;-->
<!--            },-->
<!--        },-->

<!--        methods: {-->
<!--            ...mapActions('authorization', [-->
<!--                'logout',-->
<!--            ]),-->

<!--            // разлогинится-->
<!--            exitLogin() {-->
<!--                this.logout();-->
<!--            },-->

<!--            // выбрать комнату-->
<!--            selectRooms() {-->
<!--                // выходим из текущей комнаты-->
<!--                // когда пользователь выходит сообщаем остальным что пользователь вышел-->
<!--                this.$socket.emit('exitRoom', { user: this.user, room: this.currentRoom });-->
<!--                this.$router.push('/');-->
<!--            },-->

<!--            // открываем модалку для создания комнаты-->
<!--            openModal() {-->
<!--                console.log('open');-->
<!--                this.$modal.open(ModalRoomCreate);-->
<!--            },-->

<!--            // открыть модалку с приглашениями-->
<!--            openModalInvites() {-->
<!--                console.log('openModalInvites');-->
<!--                this.$modal.open(ModalListInvitedRooms);-->
<!--            },-->
<!--        },-->
<!--    };-->
<!--</script>-->
