import Vue from 'vue'
import Router from 'vue-router'
import indexinfo from './../components/indexinfo.vue'
import indexdetails from './../components/indexdetails.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'indexinfo',
      components:{
       a: indexinfo
      }
    },
    {
      path: '/details',
      name: 'indexdetails',
      components: {
       a : indexdetails
    }
    }
  ]
})
