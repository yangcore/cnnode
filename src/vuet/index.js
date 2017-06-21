  import Vue from 'vue'
  import Vuet from 'vuet'
  import indexinfo from '../components/indexinfo'
  import indexdetails from '../components/indexdetails'
   Vue.use(Vuet);
const vuet=new Vuet({
    data(){
        return {
           
        }
    },
     modules: {
      topic: {
        list: indexinfo,
        detail: indexdetails
      }
    }
})


 vuet.beforeEach(({ path, params, state }) => {
    state.loading = true
    state.loaderr = false
  })

  vuet.afterEach((err, { path, params, state }) => {
    state.loading = false
    state.loaderr = !!err
  })

  export default vuet