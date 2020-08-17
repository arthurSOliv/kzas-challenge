import "font-awesome/css/font-awesome.css";

import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";

import "@/config/bootstrap";
import "@/config/axios";

Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
