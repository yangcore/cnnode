<template>
    <div class="indexdetails" v-show="hidedetails">
        <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopup">
            网络连接失败
        </mu-popup>
         <mu-appbar :title="title" class="detailsHeader">
            <mu-icon-button icon="arrow_back" slot="left" @click='gobackindex'/>
             <mu-icon-button  slot="right"/>
         </mu-appbar>
         <div v-html="detailsHtml" class="content">  
         </div>
    </div>
</template>

<script>
export default {
  name: 'indexdetails',
  data () {
    return {
      topPopup: false,
      back:'',
      title:'',
      prePath:'',
      preType:'',
      hidedetails:true,
      detailsHtml:''
    }
  },
  mounted () {
     this.getdetailsinfo(this.$route.query.id);
     this.title=this.$route.query.title;
     this.prePath=this.$route.query.path;
     this.preType=this.$route.query.type;
    },
  methods:{
      getdetailsinfo(id){
          this.$http.get("https://cnodejs.org/api/v1/topic/"+id).then(e => {
          this.topPopup=false;
          this.detailsHtml=e.body.data.content;

      }, e => {
        var _this=this;
        this.topPopup=true;
        setTimeout(function() {
           _this.topPopup=false;
        }, 2000);
      })
    },
    gobackindex(){
        this.hidedetails=false;
        if( !this.preType){
         this.$router.push({path:'/',query:{type:'All'}});
        }else{
         this.$router.push({path:'/',query:{type:this.preType}});    
        }
    }
  },
  watch:{
      '$route' (to, from) {
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
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

.indexdetails{
    position: absolute;
    top: 0;
    z-index: 101;
    background: white;
    min-height: 100%;
    width: 100%;
    /*display: none;*/
}

.markdown-text img{
    width: 90%;
    display: block;
    margin: 0 auto;
}
.content{
    width: 94%;
    padding: 2%;
    margin: 0 auto;
    background-color: #e1e1e1;
    margin-top: 60px;
}
.detailsHeader{
    position: fixed;
    top: 0;
}
</style>
