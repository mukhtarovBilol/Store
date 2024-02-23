import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueImageZoomer from 'vue-image-zoomer'
import 'vue-image-zoomer/dist/style.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(VueImageZoomer);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.mount('#app')

