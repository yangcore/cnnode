import Vue from 'vue'
import Router from 'vue-router'
import index from './../components/index.vue'
import hello from './../components/Hello.vue'
import indexdetails from './../components/indexdetails.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      components:{
       a: index
      }
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
