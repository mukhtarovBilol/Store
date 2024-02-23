<script setup>
import Card from '@/components/card/Card.vue';
import { imageLikedEmpty } from '@/helpers/images';
import { useProductsStore } from "@/stores/productsStore";
import { useColorMode } from '@vueuse/core';

const productsStore = useProductsStore()

const colorMode = useColorMode({
  modes: {
    black: 'black',
    white: 'white',
  }
})

</script>

<template>
  <section class="liked">
    <div class="container">
      <div class="liked__desc">
        <h1 class="liked__title" :class="{ 'active': colorMode == 'dark' }">My desires</h1>
        <div class="liked__cards">
          <Card v-for="item in productsStore.liked" :key="item.id" :info="item" />
        </div>
      </div>
      <div class="liked__empty" v-if="productsStore.liked == ''">
        <img :src="imageLikedEmpty" alt="" class="liked__empty-image">
        <h3 class="liked__empty-title">Add what you liked</h3>
        <p class="liked__empty-txt">Click on the ♡ on a product and all your favorites will be saved.</p>
        <RouterLink to="/" class="liked__empty-link">To main</RouterLink>
      </div>
    </div>
  </section>
</template>
