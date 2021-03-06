import Vue from "vue";
import Vuelidate from "vuelidate";
import Paginate from "vuejs-paginate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import localizeFilter from "@/filters/localize.filter";
import tooltipdirective from "@/directives/tooltip.directive";
import messagePlugin from "@/utils/message.plugin";
import Loader from "@/components/app/Loader";

import "./registerServiceWorker";
import "materialize-css/dist/css/materialize.css";
import "materialize-css";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.filter("localize", localizeFilter);
Vue.directive("tooltip", tooltipdirective);

Vue.component("Loader", Loader);
Vue.component("Paginate", Paginate);

firebase.initializeApp({
  apiKey: "AIzaSyCHjpxJDhy8ZxHq8J9MoWAzx3bvalwlrm8",
  authDomain: "crm-vue-a60ee.firebaseapp.com",
  databaseURL: "https://crm-vue-a60ee.firebaseio.com",
  projectId: "crm-vue-a60ee",
  storageBucket: "crm-vue-a60ee.appspot.com",
  messagingSenderId: "64332018903",
  appId: "1:64332018903:web:4db54f363cc2a6ea06ac92",
  measurementId: "G-Q07YFHP990",
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
