<template>
    <div class="indexdetails">
        <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopup">
            网络连接失败
        </mu-popup>

        我是index详情页
    </div>
</template>

<script>
export default {
  name: 'indexdetails',
  data () {
    return {
      topPopup: false,
      listdatas:[],
    }
  },
  mounted () {
     this.getdetailsinfo(this.$route.query.id)
  },
  methods:{
      getdetailsinfo(id){
          this.$http.get("https://cnodejs.org/api/v1/topic/"+id).then(e => {
          this.listdatas=this.listdatas.concat(e.body.data);
          this.topPopup=false;
      }, e => {
        var _this=this;
        this.topPopup=true;
        setTimeout(function() {
           _this.topPopup=false;
        }, 2000);
      })
      }
  },watch:{
    //   '$route' (to, from) {
    //     //   this.listdatas=[];
    //     //   this.getdetailsinfo(this.$route.query.id)
    //   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo-popup-top {
    width: 100%;
    top: 0% !important;
    background: #f06292 !important;
    color: white;
    opacity: .8;
    height: 54px;
    line-height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 375px;
    font-size: 20px;
}
</style>
