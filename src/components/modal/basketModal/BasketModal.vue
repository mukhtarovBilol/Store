<script setup>
import { imageIconModal } from '@/helpers/images'
import { useProductsStore } from '@/stores/productsStore';
const date = new Date().getDate()+'.'+ (new Date().getMonth()+1)+ '.' + new Date().getFullYear()
const willComeToDate = (new Date().getDate()+3)+'.'+ (new Date().getMonth()+1)+ '.' + new Date().getFullYear()

const productsStore = useProductsStore()

</script>

<template>
    <Transition name="baket__modal">
        <div class="basket__modal">
            <div class="basket__modal-desc">
                <img :src="imageIconModal" alt="" class="basket__modal-image">
                <h3 class="basket__modal-title">Order is accepted✅</h3>
                <div class="basket__modal-orderDate">Order accepted in: <span>{{ date }}</span></div>
                <p class="basket__modal-willCome">Will come to: <span>{{ willComeToDate }}</span>  </p>
                <p class="basket__modal-orders">Orders: <span v-for="item in productsStore.basket" :key="item?.product?.id" >{{ item?.product?.title + ', ' }}</span> </p>
                <button class="modal__close" @click="productsStore.toggleModal(false), productsStore.basket.length = 0">OK</button>
            </div>
        </div>
    </Transition>
</template>
