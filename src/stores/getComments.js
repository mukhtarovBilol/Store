import { defineStore } from 'pinia'
import apiProducts from '@/helpers/api'

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    comments: null,
  }),
  actions: {
    async getComments(skip = 0, limit = 5) {
      try {
        const res = await apiProducts.getComments(skip, limit)
        this.comments = res.comments
      } catch (error) {
        console.log(error.message);
      }
    },
  }
})
