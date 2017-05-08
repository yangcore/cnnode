<template>
  <div class="index" id="index">
     <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopup">
     网络连接失败
    </mu-popup>
      <mu-list>
        <mu-list-item v-for="listdata in listdatas" :key='listdata.id' :title="listdata.title" @click="gotodetails(listdata.id)">
          <mu-avatar :src="listdata.author.avatar_url" slot="leftAvatar" />
        </mu-list-item>
      </mu-list>
<!--分页-->
      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
      <mu-float-button icon="keyboard_arrow_up" @click="upindex" class="demo-float-button"/>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      listdatas: [],
      topPopup: false,
      loading: false,
      scroller: null,
      page:1,
      limit:20,
      tab:''
    }
  }, mounted() {
     this.getIndexData(this.page,this.limit);
     this.scroller = window;
  }, methods: {
    getIndexData(page,limit,callback,tab) {
      this.$http.get("https://cnodejs.org/api/v1/topics", { params: { page: page, limit: limit ,tab:tab} }).then(e => {
        this.listdatas=this.listdatas.concat(e.body.data);
            this.topPopup=false;
            if(callback){
              callback();
            }
      }, e => {
        var _this=this;
        this.topPopup=true;
        setTimeout(function() {
           _this.topPopup=false;
        }, 2000);
      })
    },
    loadMore (){
      this.page=this.page+1;
      var _this=this;
     var callback=function () {
       setTimeout(function() {
          _this.loading=false;
       }, 1000);
     }
       this.loading = true;
       this.getIndexData(this.page,this.limit,callback,this.tab);
    },
    upindex(){
      var indexObj= document.getElementById('index');
       var oPos = indexObj.offsetTop;
       window.scrollTo(0, oPos-54);
    },
    gotodetails(id){
      this.$router.push({path:'/details',query:{id:id}});
    }
  },watch: {
    '$route' (to, from) {
       this.listdatas=[];
      if(this.$route.query.type=="All"){
        this.page=1;
        this.tab=''
        this.getIndexData(this.page,this.limit,'','');
      }

      if(this.$route.query.type=="Essence"){
        this.page=1;
        this.tab='good'
        this.getIndexData(this.page,this.limit,'',this.tab);
      }
      
      if(this.$route.query.type=="Share"){
        this.page=1;
        this.tab='share'
        this.getIndexData(this.page,this.limit,'',this.tab);
      }
      
      if(this.$route.query.type=="Question"){
        this.page=1;
        this.tab='ask'
        this.getIndexData(this.page,this.limit,'',this.tab);
      }
      
      if(this.$route.query.type=="Recruit"){
        this.page=1;
        this.tab='job'
        this.getIndexData(this.page,this.limit,'',this.tab);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@charset "utf-8";
@function pxx($px, $base-font-size: 75px) {
  @if (unitless($px)) {
    @return pxx($px + 0px); // That may fail.
  }
  @else if (unit($px)==rem) {
    @return $px;
  }
  @return ($px / $base-font-size) * 1rem;
}

@mixin font-dpr($font-size) {
  font-size: $font-size / 2;

  [data-dpr="2"] & {
    font-size: $font-size;
  }

  [data-dpr="3"] & {
    font-size: $font-size * 1.5;
  }
}

@mixin px-dpr($property, $size, $others:"") {

  #{$property}: $size / 2 #{$others};

  [data-dpr="2"] & {
    #{$property}: $size #{$others};
  }

  [data-dpr="3"] & {
    #{$property}: $size * 1.5 #{$others};
  }
}
.index .mu-list>div{
  border-bottom: 1px solid #e8e8e8
}
.demo-popup-top {
  width: 100%;
  top: 0% !important;
  background:#f06292 !important;
  color:white;
  opacity: .8;
  height: 54px;
  line-height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 375px;
  font-size: 20px;
}
.index .demo-float-button{
  width: pxx(100);
  height: pxx(100);
  position: fixed;
  bottom: 10%;
  right: 5%;
}
</style>
