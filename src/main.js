// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import './assets/roboto.css'
import VueResource from 'vue-resource'
import vuet from './vuet'
Vue.use(MuseUI)
Vue.use(VueResource)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuet,
  router,
  template: '<App/>',
  components: { App }
})
