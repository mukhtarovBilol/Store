<script setup>
import { useColorMode } from '@vueuse/core';

const props = defineProps({
    info: {
        type: Object,
        required: true,
    }
})

const colorMode = useColorMode({
  modes: {
    black: 'black',
    white: 'white',
  }
})
</script>

<template>
    <div class="comments" :class="{'active' : colorMode == 'dark'}">
        <h3 class="comments__userName">{{ info?.user.username }}</h3>
        <p class="comments__txt">{{ info?.body }}</p>
    </div>
</template>
