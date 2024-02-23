import { defineStore } from 'pinia'
import apiProducts from '@/helpers/api'

export const useProductSingleStore = defineStore('product', {
  state: () => ({
    product: null,
  }),
  actions: {
    async getFetchProducts(id) {
      try {
        const res = await apiProducts.getAboutProducts(id)
        this.product = res
      } catch (error) {
        console.log(error.message);
      }
    },
  }
})
