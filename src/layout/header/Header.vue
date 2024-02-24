<script setup>
import { useProductsStore } from "@/stores/productsStore";
import Card from "@/components/card/Card.vue";
import Modal from "@/components/modal/Modal.vue";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const productsStore = useProductsStore();
productsStore.getProductSingle(+route.query.page * 30 - 30 || 0);
const currentPage = ref(+route.query.page || 1);

const handleCurrentChange = (page) => {
  if (page === 1) {
    router.push(route.path);
  } else {
    router.push(`${route.path}?page=${page}`);
  }
  productsStore.getProductSingle(page * 30 - 30);
};
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__cards">
        <Card
          v-for="item in productsStore.products"
          :key="item.id"
          :info="item"
        />
      </div>
      <el-pagination
        layout="prev, pager, next"
        :page-size="30"
        :total="productsStore.totalProducts"
        background
        :pager-count="5"
        v-model:current-page="currentPage"
        @current-change="handleCurrentChange"
        class="header__pagination"
      />
    </div>
    <Teleport to="#body">
      <Modal v-show="productsStore.isShow" />
    </Teleport>
  </header>
</template>
