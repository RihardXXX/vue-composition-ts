<script lang="ts" setup></script>

<template>
    <div :class="$style.sendSection">
        <div v-if="label" :class="$style.label">
            {{ label }}
        </div>
        <input
            ref="input"
            :value="value"
            :class="$style.inputMessage"
            @input="$emit('input', $event)"
            @keyup.enter="$emit('keyup.enter')"
        />
        <div :class="$style.sendMessage" @click="$emit('click')">
            <svg-icon :name="iconName" :class="$style.sendIcon" />
        </div>
    </div>
</template>

<style lang="scss" module>
.sendSection {
    position: relative;
    display: flex;
    align-items: center;
    margin: 0.5rem;
    padding: 0.2rem 0.5rem;
    border-radius: 0.5rem;
    background-color: $white;
}

.label {
    position: absolute;
    top: -1.4rem;
    left: 0;
    padding: 0.2rem;
    border-radius: 0.2rem 0.2rem 0 0;
    background-color: $white;
}

.inputMessage {
    width: 100%;
    border: none;
    font-size: 1.4rem;

    &:focus {
        outline-style: none;
    }
}

.sendMessage {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 222;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $white;
}

.sendIcon {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    fill: $black-600;
}
</style>
