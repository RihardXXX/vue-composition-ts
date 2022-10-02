<script lang="ts" setup>
import { toRefs, withDefaults } from 'vue';

interface Props {
    errorList: Array<string>;
    classContainer?: Array<string> | string;
}

const props = withDefaults(defineProps<Props>(), {
    classContainer: '',
});
const { classContainer, errorList } = toRefs(props);
</script>

<template>
    <ul
        v-if="props.errorList.length"
        :class="[$style.container, classContainer]"
    >
        <li v-for="(error, i) in errorList" :key="i" :class="$style.item">
            <span>
                {{ error }}
            </span>
        </li>
    </ul>
</template>

<style lang="scss" module>
.container {
    position: relative;
    width: 100%;
    padding: 0.5rem 1.6rem;
    border-radius: 0.7rem;
    border: 1px solid $gray-100;
    //text-align: center;
}

.name {
    font-size: 1.3rem;
    color: $gray-400;
}

.item {
    margin-top: 0.3rem;
    padding: 0.5rem;
    border-bottom: 1px solid $gray-100;
    list-style: none;
    font-size: 1.2rem;
    color: $red-100;

    &:first-child {
        margin-top: 0;
    }

    &:last-child {
        border-bottom: 0;
    }
}
</style>
