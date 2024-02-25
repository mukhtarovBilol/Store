<script setup>
import { useColorMode } from '@vueuse/core'
import { computed } from "vue";
import { useProductsStore } from '@/stores/productsStore';
import LikeIcon from '@/assets/images/LikeIcon.vue';

const productsStore = useProductsStore()
const colorMode = useColorMode({
  modes: {
    black: 'black',
    white: 'white',
  }
})

const open2 = () => {
  ElMessage({
    message: 'Successfully',
    type: 'success',
  })
}

const props = defineProps({
  info: Object,
});

const price = computed(() => {
  return Math.ceil(
    props?.info?.price -
    (props.info?.price / 100) * props?.info?.discountPercentage
  );
});
</script>

<template>
      <div class="card" :class="{ 'active': colorMode == 'dark' }">
        <div class="card__images">
          <img :src="info?.thumbnail" alt="" class="card__image" />
        </div>
        <div class="card__prices" :class="{ 'active': colorMode == 'dark' }">
          <p class="card__price">{{ info?.price }} $</p>
          <p class="card__discountPrice">{{ price }} $</p>
        </div>
        <div class="card__desc">
          <h3 class="card__title" :class="{ 'active': colorMode == 'dark' }">{{ info?.title }}</h3>
            <LikeIcon class="card__like-icon"
              :plain="true" @click="open2(), productsStore.getLikedProduct(info?.id, info)" 
              :class="{ 'active': productsStore.favIds?.find(item => item == info?.id) == info?.id }" />
          </div>
        <div class="card__btns">
          <RouterLink :to="'/product' + '/' + info?.id" class="card__info"> More </RouterLink>
          <RouterLink to="/" @click="productsStore.getBasketProducts(info?.id)" class="card__info">Add to cart</RouterLink>
        </div>
      </div>
</template>