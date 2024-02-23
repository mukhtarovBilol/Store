<script setup>
import { image404 } from "@/helpers/images";
</script>

<template>
    <div class="desc">
        <img :src="image404" alt="" class="notFoundPage">
        <h1 class="desc__title">Page Not Found</h1>
        <p class="desc__txt">We're sorry, the page you requested could not be found Please go back to the homepage</p>
        <RouterLink to="/" class="desc__button">Go home</RouterLink>
    </div>
</template>

<style scoped>
.desc {
    display: grid;
    place-items: center;
    gap: 16px; 
}
.notFoundPage {
    margin: 0 auto;
    max-width: 500px;
    width: 100%;
}

.desc__title {
    font-size: clamp(40px, 3vw, 55px);
}

.desc__txt {
    font-size: clamp(16px, 3vw, 19px);
    max-width: 420px;
    width: 100%;
    text-align: center;
}

.desc__button {
    font-size: clamp(16px, 3vw, 20px);
    background: #286783;
    padding: 10px;
    border-radius: 12px;
    color: #fff;
    display: inline-block;
}
</style>