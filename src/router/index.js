import Vue from 'vue'
import Router from 'vue-router'
import indexdetails from './../components/indexdetails.vue'
import App from './../App.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component:App
    },
    {
      path: '/details',
      name: 'indexdetails',
      components: {
       b : indexdetails
      }
    }
  ]
})
