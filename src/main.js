import Vue from 'vue'
import App from './App.vue'
import router from '@/_router/router'
import store from '@/_store/store'
import vuetify from './plugins/vuetify';

import VueIziToast from 'vue-izitoast';
import 'izitoast/dist/css/iziToast.css';
Vue.use(VueIziToast)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
