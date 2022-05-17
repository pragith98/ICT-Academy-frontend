import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
require('./assets/custom-globle.css');

Vue.prototype.$apiUrl="http://127.0.0.1:8000"  //////////////change this address when change the backend server

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
