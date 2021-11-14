import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import Input from "@/shared/components/input/Input.vue";
import Select from "@/shared/components/select/Select.vue";

const app = createApp(App).use(store).use(router);
app.component("Input", Input);
app.component("Select", Select);

app.mount("#app");
