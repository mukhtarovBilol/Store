<script setup>
import { imageIconModal } from '@/helpers/images';
import { useProductsStore } from '@/stores/productsStore';
const productsStore = useProductsStore()

</script>

<template>
    <Transition name="modal">
        <div class="modal">
            <div class="modal__desc">
                <img :src="imageIconModal" alt="" class="modal__image">
                <h3 class="modal__title">Saved!</h3>
                <button class="modal__close" @click="productsStore.toggleModal(false)">OK</button>
            </div>
        </div>
    </Transition>
</template>
