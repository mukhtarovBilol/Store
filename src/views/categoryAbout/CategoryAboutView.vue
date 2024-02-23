<script setup>
import Card from '@/components/card/Card.vue';
import { useProductsStore } from '@/stores/productsStore';
import { useRoute } from 'vue-router';

const route = useRoute()
const productsStore = useProductsStore()

productsStore.getFetchFilterCategory(route.params.name)

</script>

<template>
    <section class="category__about">
        <div class="container">
            <h2 class="category__about-title">{{ route.params.name }}</h2>
            <div class="category__about-cards">
                <RouterLink v-for="item in productsStore.categoryProducts" :key="item.id" :to="'/' + item.id">
                    <Card :info="item"/>
                </RouterLink>
            </div>
        </div>
    </section>
</template>
