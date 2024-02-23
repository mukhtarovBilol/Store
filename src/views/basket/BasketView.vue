<script setup>
import BasketCard from '@/components/card/BasketCard.vue';
import { imageBasketEmpty } from '@/helpers/images';
import { useProductsStore } from '@/stores/productsStore';
import { useColorMode } from '@vueuse/core';
import { computed } from 'vue'

const formatNumber = (x) => x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ' ')
const productsStore = useProductsStore();
const colorMode = useColorMode({
  modes: {
    black: 'black',
    white: 'white',
  }
})

const totalPrice = computed(() => {
    return Math.ceil(
        productsStore.basket?.reduce((acc, item) => acc += item.count * (item.product.price - (item.product.price / 100) * item.product.discountPercentage), 0)
    )
})

function buy() {
    alert('Purchased✅')
    productsStore.basket.length = 0
}

</script>

<template>
    <section class="basket">
        <div class="container">
            <div class="basket__empty" v-if="productsStore.basket == ''">
                <img :src="imageBasketEmpty" alt="" class="basket__empty-image">
                <h3 class="basket__empty-title">Your cart is currently no products</h3>
                <p class="basket__empty-txt">Start with the selections on the main page or find the product you need through
                    the search</p>
                <RouterLink to="/" class="basket__empty-toMain">To main</RouterLink>
            </div>
            <div class="basket__cards">
                <BasketCard v-for="item in productsStore.basket" :key="item.id" :info="item" />
            </div>
            <p class="basket__totalPrice" :class="{'active' : colorMode == 'dark'}" v-show="totalPrice" @click="buy">To pay: {{ formatNumber(totalPrice) }} $ </p>
        </div>
    </section>
</template>
