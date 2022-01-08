import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store/index'
import { registerSW } from 'virtual:pwa-register'
import { initializeApp } from "firebase/app";
import Vue3TouchEvents from "vue3-touch-events";

const firebaseConfig = {
    apiKey: "AIzaSyCkXVGOHGuqrYX4gmuTONArkIFwkIU-6dE",
    authDomain: "track-it-7f82b.firebaseapp.com",
    databaseURL: "https://track-it-7f82b-default-rtdb.firebaseio.com",
    projectId: "track-it-7f82b",
    storageBucket: "track-it-7f82b.appspot.com",
    messagingSenderId: "518968387533",
    appId: "1:518968387533:web:9e3d28857d984c07c94684",
    measurementId: "G-ZSLWGCVJJL",
};

initializeApp(firebaseConfig);
registerSW()

createApp(App).use(store).use(router).use(Vue3TouchEvents).use(vuetify).mount('#app')
