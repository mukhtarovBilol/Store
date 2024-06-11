<script setup>
import { ref } from "vue";
import apiProducts from "@/helpers/api";
import { useColorMode } from '@vueuse/core'

const category = ref(null);

const getFetchCategory = async () => {
  try {
    const res = await apiProducts.getCategory();
    category.value = res;
  } catch (error) {
    console.error(error);
  }
};


getFetchCategory();

const colorMode = useColorMode({
  modes: {
    black: 'black',
    white: 'white',
  }
})
</script>

<template>
  <section class="category">
    <div class="container">
      <div class="category__texts">
        <RouterLink
          :to="'/category/' + item.name"
          class="category__text"
          :class="{'active' : colorMode == 'dark'}"
          v-for="item in category">
          {{ item.name }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>
