import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import { useProductsStore } from '@/stores/productsStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/product/:id',
      name: 'about',
      component: () => import('@/pages/AboutPage.vue'),
      beforeEnter:(to, from) => {
        const productStore = useProductsStore()
        const exists = productStore?.products?.find(product => product.id == to.params.id)
        if (!exists) {
          return {
            name: 'notFound',
            params: { pathMatch: to.path.split('/').splice(1) },
            query: to.query,
            hash: to.hash
          }
        }
      },
    },
    {
      path: '/category',
      name: 'category',
      component: () => import("@/pages/CategoryPage.vue"),
    },
    {
      path: '/category/:name',
      component: () => import("@/pages/CategoryAboutPage.vue")
    },
    {
      path: '/basket',
      name: 'basket',
      component: () => import("@/pages/BasketPage.vue")
    },
    {
      path: '/like',
      name: 'like',
      component: () => import("@/pages/LikePage.vue")
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("@/pages/NotFoundPage.vue"),
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    return {
      top: 0
    }
  }
})

export default router
