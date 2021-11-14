import { createApp } from "vue";
import { Vue } from "vue-class-component";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import Input from "@/shared/components/input/Input.vue";

const app = createApp(App).use(store).use(router);
app.component("Input", Input);

app.mount("#app");
