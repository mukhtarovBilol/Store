<script setup>
import { useColorMode } from "@vueuse/core";
import { useRoute } from "vue-router";
import { useProductSingleStore } from "@/stores/productSingleStore";
import { useProductsStore } from "@/stores/productsStore";
import Modal from "@/components/modal/Modal.vue";
import { computed, ref } from "vue";
import { useCommentsStore } from "@/stores/getComments";
import CommentsCard from "@/components/card/CommentsCard.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

// swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const thumbsSwiper = ref(null);
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

// swiper

const route = useRoute();
const productSingleStore = useProductSingleStore();
productSingleStore.getFetchProducts(route.params.id);
const productsStore = useProductsStore();
const commentsStore = useCommentsStore();
commentsStore.getComments(route.params.id * 30 - 30);

const open1 = () => {
  ElNotification({
    title: "Success",
    message: "Purchased✅",
    type: "success",
  });
};

const colorMode = useColorMode({
  modes: {
    black: "black",
    white: "white",
  },
});

const price = computed(() => {
  return Math.floor(
    productSingleStore?.product?.price -
      (productSingleStore?.product?.price / 100) *
        productSingleStore?.product?.discountPercentage
  );
});
</script>

<template>
  <section class="about">
    <div class="container">
      <div class="about__product-images">
        <Swiper
          :style="{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          }"
          :spaceBetween="10"
          :navigation="true"
          :thumbs="{ swiper: thumbsSwiper }"
          :modules="[FreeMode, Navigation, Thumbs, Autoplay]"
          :autoplay="{
            delay: 1500,
            disableOnInteraction: false,
          }"
          class="mySwiper2"
        >
          <SwiperSlide
            v-for="item in productSingleStore?.product?.images"
            :key="item"
          >
            <img :src="item" alt="" class="about__product-thumbnail"/>
          </SwiperSlide>
        </Swiper>
        <Swiper
          @swiper="setThumbsSwiper"
          :spaceBetween="10"
          :slidesPerView="4"
          :freeMode="true"
          :modules="[FreeMode, Navigation, Thumbs]"
          class="mySwiper"
        >
          <SwiperSlide
            v-for="item in productSingleStore?.product?.images"
            :key="item"
            class="about__several-slide"
          >
            <img :src="item" alt="" class="about__several-image"/>
          </SwiperSlide>
        </Swiper>
      </div>
      <h3
        class="about__characteristic-title"
        :class="{ active: colorMode == 'dark' }"
      >
        Characteristic
      </h3>
      <div class="about__characteristic">
        <div class="about__desc">
          <h1 class="about__title" :class="{ active: colorMode == 'dark' }">
            {{ productSingleStore?.product?.title }}
          </h1>
          <p class="about__txt" :class="{ active: colorMode == 'dark' }">
            {{ productSingleStore?.product?.description }}
          </p>
          <p class="about__rating" :class="{ active: colorMode == 'dark' }">
            <span>Rating:</span> {{ productSingleStore?.product?.rating }}
          </p>
          <p class="about__stock" :class="{ active: colorMode == 'dark' }">
            <span>Stock:</span> {{ productSingleStore?.product?.stock }}
          </p>
          <span class="about__price" :class="{ active: colorMode == 'dark' }"
            >Price: {{ price }}$</span
          >
          <div class="about__btns">
            <a
              href="#!"
              class="about__link"
              :class="{ active: colorMode == 'dark' }"
              @click="productsStore.getBasketProducts(route.params.id)"
              >Add to cart</a
            >
            <a href="#!" plain class="about__link2" @click="open1"> Buy </a>
          </div>
        </div>
        <RouterLink
          :to="'/category/' + productSingleStore?.product?.category"
          :class="{ active: colorMode == 'dark' }"
          class="about__products"
          >More products</RouterLink
        >
      </div>
      <div class="about__comments">
        <h3 class="about__comments-title">Comments</h3>
        <div class="about__comments-cards">
          <CommentsCard
            v-for="item in commentsStore.comments"
            :key="item.postId"
            :info="item"
          />
        </div>
        <p class="about__comments-empty" v-if="commentsStore.comments == ''">
          No Comment
        </p>
      </div>
    </div>
    <Teleport to="#body">
      <Modal v-show="productsStore.isShow" />
    </Teleport>
  </section>
</template>
