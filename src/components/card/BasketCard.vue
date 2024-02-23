<script setup>
import { useProductSingleStore } from '@/stores/productSingleStore';
import { useColorMode } from '@vueuse/core'
import { computed } from "vue";
import { useProductsStore } from '@/stores/productsStore'
const productSingleStore = useProductSingleStore();
productSingleStore.getFetchProducts();

const productsStore = useProductsStore()
const formatNumber = (x) => x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ' ')

const colorMode = useColorMode({
    modes: {
        black: 'black',
        white: 'white',
    }
})

const props = defineProps({
    info: {
        type: Object,
        required: true,
    }
});

const price = computed(() => {
  return Math.ceil(
    props?.info?.product?.price -
      (props?.info?.product?.price / 100) * props?.info?.product?.discountPercentage
  );
});
</script>

<template>
    <div class="basket__card" :class="{'active' : colorMode == 'dark'}">
        <div class="basket__card-product">
            <img :src="info?.product?.thumbnail" alt="" class="basket__card-image">
            <div class="basket__card-desc" :class="{'active' : colorMode == 'dark'}">
                <h3 class="basket__card-title">{{info?.product?.title }}</h3>
                <p class="basket__card-productDesc">{{ info?.product?.description }}</p>
                <p class="basket__card-discount">{{ price }} $</p>
                <p class="basket__card-price">{{ info?.product?.price }} $</p>
                <p class="basket__card-stock">Stock: {{ info?.product?.stock }}</p>
                <p class="basket__card-productCount" :class="{'active' : info?.count == info?.product?.stock}">Count: {{ info?.count == info?.product?.stock ? 'Max' : info?.count }}</p>
                <p class="basket__card-totalPrice">Total Price: {{ formatNumber(price * info?.count) }} $</p>
            </div>
        </div>
        <div class="basket__card-about" :class="{'active' : colorMode == 'dark'}">
            <span class="basket__card-count" @click="productsStore.productTotalCount('+', info?.product?.id )"><el-icon><Plus /></el-icon></span>
            <span class="basket__card-count" @click="info?.count == 1 ? info?.count : productsStore.productTotalCount('-', info?.product?.id)"><el-icon><Minus /></el-icon></span>
            <span class="basket__card-count" @click="productsStore.delBasketProduct(info?.product?.id)"><el-icon><Delete /></el-icon></span>
        </div>
    </div>
</template>
