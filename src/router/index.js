import Vue from 'vue'
import Router from 'vue-router'
import index from './../components/index.vue'
import hello from './../components/Hello.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    }
  ]
})
