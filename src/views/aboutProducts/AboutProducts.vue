<script setup>
import { useColorMode } from '@vueuse/core'
import { useRoute } from "vue-router";
import { useProductSingleStore } from "@/stores/productSingleStore";
import { useProductsStore } from '@/stores/productsStore'
import Modal from '@/components/modal/Modal.vue';
import { computed } from 'vue'
import { useCommentsStore } from "@/stores/getComments";
import CommentsCard from '@/components/card/CommentsCard.vue';
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from 'swiper/modules';

import "swiper/css";
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';


const open1 = () => {
  ElNotification({
    title: 'Success',
    message: 'Purchased✅',
    type: 'success',
  })
}

const colorMode = useColorMode({
    modes: {
        black: 'black',
        white: 'white',
    }
})
const route = useRoute();
const productSingleStore = useProductSingleStore();
productSingleStore.getFetchProducts(route.params.id);
const productsStore = useProductsStore()
const commentsStore = useCommentsStore()
commentsStore.getComments(route.params.id * 30 - 30)

const price = computed(() => {
  return Math.floor(
    productSingleStore?.product?.price -
    (productSingleStore?.product?.price / 100) * productSingleStore?.product?.discountPercentage
  );
});

</script>

<template>
  <section class="about">
    <div class="container">
        <Swiper class="about__images"
        :modules="[Autoplay, Pagination] "
        :centeredSlides="true"
        :autoplay="{
          delay: 1500,
          disableOnInteraction: false,
        }"
        :pagination="{
        dynamicBullets: true,
        clickable: true,
        }"
        >
          <Swiper-Slide class="about__product-image" v-for="item in productSingleStore?.product?.images" :key="item" @click="image = item">
           <img :src="item" alt="" class="about__product-thumbnail">
          </Swiper-Slide>
        </Swiper>
      <h3 class="about__characteristic-title" :class="{'active' : colorMode == 'dark'}">Characteristic</h3>
      <div class="about__characteristic">
        <div class="about__desc">
          <h1 class="about__title" :class="{'active' : colorMode == 'dark'}">{{ productSingleStore?.product?.title }}</h1>
          <p class="about__txt" :class="{'active' : colorMode == 'dark'}">{{ productSingleStore?.product?.description }}</p>
          <p class="about__rating" :class="{'active' : colorMode == 'dark'}"><span>Rating:</span> {{ productSingleStore?.product?.rating }}</p>
          <p class="about__stock" :class="{'active' : colorMode == 'dark'}"><span>Stock:</span> {{ productSingleStore?.product?.stock }}</p>
          <span class="about__price" :class="{'active' : colorMode == 'dark'}">Price: {{ price }}$</span>
          <div class="about__btns">
              <a href="#!" class="about__link" :class="{'active' : colorMode == 'dark'}" @click="productsStore.getBasketProducts(route.params.id)">Add to cart</a>
              <a href="#!" plain class="about__link2" @click="open1"> Buy </a>
            </div>
        </div>
        <RouterLink :to="'/category/' + productSingleStore?.product?.category" :class="{'active' : colorMode == 'dark'}" class="about__products">More products</RouterLink>
      </div>
      <div class="about__comments">
        <h3 class="about__comments-title">Comments</h3>
        <div class="about__comments-cards">
          <CommentsCard v-for="item in commentsStore.comments" :key="item.postId" :info="item" />
        </div>
        <p class="about__comments-empty" v-if="commentsStore.comments == ''">No Comment</p>
      </div>
    </div>
    <Teleport to='#body'>
      <Modal v-show="productsStore.isShow" />
    </Teleport>
  </section>
</template>
