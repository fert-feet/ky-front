import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/globle.css'
import router from './router'
import request from "@/utils/request";

Vue.config.productionTip = false
Vue.prototype.request = request

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
