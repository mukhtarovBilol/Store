<script setup>
import { imageHome, imageCatalog, imageBasket, imageLike } from "@/helpers/images.js";
import { useProductsStore } from "@/stores/productsStore";
import { h, ref, watch } from "vue";
import { useColorMode, useDark, useToggle } from '@vueuse/core'
import debounce from "lodash.debounce";
const productsStore = useProductsStore()

const isDark = useDark();
const toggleDark = useToggle(isDark)

const colorMode = useColorMode({
  modes: {
    black: 'black',
    white: 'white',
  }
})

const query = ref("")
const list = [
    {
        id: 1,
        txt: 'Home',
        path: '/',
        image: imageHome,
    },
    {
        id: 2,
        txt: 'Catalog',
        image: imageCatalog,
        path: '/category',
    },
    {
        id: 3,
        txt: "Like",
        path: '/like',
        image: imageLike,
    },
    {
        id: 4,
        txt: 'Basket',
        path: '/basket',
        count: '1',
        image: imageBasket,
    }, 
]

watch(query, debounce(() => {
    productsStore.searchValue(query.value)
}, 400))

const fullscreenLoading = ref(false)

const openFullScreen1 = () => {
  fullscreenLoading.value = true
  setTimeout(() => {
    fullscreenLoading.value = false
  }, 800)
}

const open = () => {
  ElNotification({
    title: colorMode.value == 'dark' ? 'Light mode' : 'Dark mode',
    message: colorMode.value == 'dark' ? 'Switched to light mode' : 'Switched to dark mode',
    position: 'top-left',
    duraction: 0,
  })
}
</script>

<template>
    <nav class="nav">
        <div class="container">
            <RouterLink to="/" class="nav__logo">
                Online Store
            </RouterLink>
            <RouterLink to="" class="nav__search">
                <form action="" class="nav__form" >
                    <input type="text" placeholder="Find"
                        class="nav__input" v-model="query">
                </form>
            </RouterLink>
            <ul class="nav__list">
                <el-button
                v-loading.fullscreen.lock="fullscreenLoading"
                type="primary"
                @click="openFullScreen1"
                >
                <RouterLink :to="item.path" class="nav__link" v-for="item in list" :key="item.id">
                    <li class="nav__item" >
                        <p class="nav__count-basket" :class="{'active' : item?.count && !productsStore.basket.length == 0}">{{ productsStore.basket.length }}</p>
                        <img :src="item.image" alt="" class="nav__image">
                        <p class="nav__txt">{{ item.txt }}</p>
                    </li>
                </RouterLink>
                </el-button>
            </ul>
            <label for="check"  class="button"  @click="toggleDark(), open()"></label>
        </div>
    </nav>
</template>

<style>
.light {
    background: #fff;
    color: black;
}

.dark {
    background: #252525;
    color: #fff;
}
</style>

