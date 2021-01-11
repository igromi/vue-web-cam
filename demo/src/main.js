import Vue from "vue";
import App from "./main.vue";
import axios from 'axios'
// import WebCam from "../../src";
// Vue.use(WebCam);
Vue.use(axios)

new Vue({
  el: "#app",
  render: h => h(App)
});
