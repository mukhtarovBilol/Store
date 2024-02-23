import { defineStore } from 'pinia'
import apiProducts from '@/helpers/api'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: null,
    categoryProducts: null,
    basket: [],
    isShow: false,
    liked: [],
    totalProducts: null,
    favIds: []
  }),
  actions: {
    getBasketProducts(id) {
      const productId = this.products?.find(item => item.id == id)
      const basketId = this.basket?.find(item => item.product?.id == id)
      if (basketId?.product?.id !== productId?.id) {
        this.basket.push({
          product: productId,
          count: 1,
        })
        this.toggleModal(true)
      } else {
        alert('Product is in cart');
      }
    },
    delBasketProduct(id) {
      const index = this.basket.findIndex(item => item.product?.id == id)
      this.basket.splice(index, 1)
      localStorage.removeItem('products')
    },
    async searchValue(str) {
      try {
        const res = await apiProducts.searchProducts(str)
        this.products = res.products
        this.totalProducts = res.total
      } catch (error) {
        console.log(error.message);
      }
    },
    async getFetchFilterCategory(name) {
      try {
        const res = await apiProducts.getAboutCategory(name)
        this.categoryProducts = res.products
      } catch (error) {
        console.error(error.message);
      }
    },
    toggleModal(boolean) {
      this.isShow = boolean
    },
    async getProductSingle(skip = 0) {
      try {
        const res = await apiProducts.getProductsSingle(skip)
        this.products = res.products
        this.totalProducts = res.total
      } catch (error) {
        console.error(error);
      }
    },
    productTotalCount(sym, id) {
      const basketId = this.basket?.find(item => item?.product?.id == id)
      if (sym == '+' && basketId.product?.id === id && basketId.count < basketId.product?.stock) {
        basketId.count++
      } else if (sym == '-') {
        basketId.count--
      }
    },
    getLikedProduct(id, favPro) {
      const favId = this.favIds?.find(item => item == id)
      const favIndex = this.favIds?.findIndex(item => item == id)
      const likedIndex = this.liked?.findIndex(item => item?.id == favPro.id)
      
      if (favId == id) {
        this.favIds.splice(favIndex, 1)
        this.liked?.splice(likedIndex, 1)
      } else {
        this.liked.push(favPro)
        this.favIds.push(id)
      }
    }
  },
  persist: true,
})
