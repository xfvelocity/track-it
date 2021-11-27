import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store/index'

import { registerSW } from 'virtual:pwa-register'

registerSW()

createApp(App).use(store).use(router).use(vuetify).mount('#app')
