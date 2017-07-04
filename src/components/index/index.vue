<template>
  <div>
    <div id="munav">
      <mu-appbar :title="title" class="title">
        <mu-icon-button icon="menu" slot="left" @click="toggle(true)" />
        <mu-icon-menu icon="more_vert" slot="right" :value="theme" @change="changeTheme">
          <mu-menu-item value="light" title="LIGHT" />
          <mu-menu-item value="dark" title="DARK" />
          <mu-menu-item value="carbon" title="CARBON" />
          <mu-menu-item value="teal" title="TEAL" />
        </mu-icon-menu>
      </mu-appbar>
  
      <mu-tabs :value="activeTab" @change="handleTabChange" class="tabs" id="tabs">
        <mu-tab value="All" title="全部" @click="goIndex('All')" />
        <mu-tab value="Essence" title="精华" @click="goIndex('Essence')" />
        <mu-tab value="Share" title="分享" @click="goIndex('Share')" />
        <mu-tab value="Question" title="问答" @click="goIndex('Question')" />
        <mu-tab value="Recruit" title="招聘" @click="goIndex('Recruit')" />
      </mu-tabs>
      <mu-drawer :open="open" :docked="docked" @close="toggle()">
      </mu-drawer>
    </div>
    <div class="index" id="index">
      <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopup">
        网络连接失败
      </mu-popup>
      <mu-list>
        <mu-list-item v-for="listdata in listdatas" :key='listdata.id' :title="listdata.title" @click="gotodetails(listdata.id,listdata.title)">
          <mu-avatar :src="listdata.author.avatar_url" slot="leftAvatar" />
        </mu-list-item>
      </mu-list>
      <!--分页-->
      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" />
      <mu-float-button icon="keyboard_arrow_up" @click="upindex" class="demo-float-button" />
    </div>
  </div>
</template>

<script>
import light from '!raw-loader!muse-ui/dist/theme-default.css'
import dark from '!raw-loader!muse-ui/dist/theme-dark.css'
import carbon from '!raw-loader!muse-ui/dist/theme-carbon.css'
import teal from '!raw-loader!muse-ui/dist/theme-teal.css'
export default {
  name: 'index',
  data() {
    return {
      listdatas: [],
      topPopup: false,
      loading: false,
      scroller: null,
      page: 1,
      limit: 20,
      tab: '',
      open: false,
      docked: true,
      theme: 'light',
      title: '全部',
      munavobjTop: '',
      ops: '',
      scrolltop: '',
      activeTab: 'All',
      themes: {
        light,
        dark,
        carbon,
        teal
      }
    }
  }, mounted() {
    this.goIndex(this.$route.query.type);
    this.munavobjTop = document.querySelector('.mu-list').scrollTop;

    var _this = this;
    if (JSON.stringify(_this.$route.query) !== "{}") {
      this.initroute();
    } else {
      this.getIndexData(this.page, this.limit);
    }
    this.scroller = document.querySelector('.top-list');
  }, methods: {
    getIndexData(page, limit, callback, tab) {
      this.$http.get("https://cnodejs.org/api/v1/topics", { params: { page: page, limit: limit, tab: tab } }).then(e => {
        this.listdatas = this.listdatas.concat(e.body.data);
        this.topPopup = false;
        if (callback) {
          callback();
        }
      }, e => {
        var _this = this;
        this.topPopup = true;
        setTimeout(function () {
          _this.topPopup = false;
        }, 2000);
      })
    },
    loadMore() {
      this.page = this.page + 1;
      var _this = this;
      var callback = function () {
        setTimeout(function () {
          _this.loading = false;
        }, 1000);
      }
      this.loading = true;
      this.getIndexData(this.page, this.limit, callback, this.tab);
    },
    upindex() {
      document.querySelector('.top-list').scrollTop='0px';
      var x=JSON.parse(sessionStorage.getItem(this.$route.query.type));
          x.top='0';
          sessionStorage.setItem(this.$route.query.type,JSON.stringify(x));
    },
    gotodetails(id, title) {
      this.$router.push({ path: '/details', query: { id: id, title: title, path: this.$route.path, type: this.$route.query.type } });
    },
    initroute() {
      this.listdatas = [];
      if (this.$route.query.type == "All") {
        if(sessionStorage.getItem(this.$route.query.type) && JSON.parse(sessionStorage.getItem(this.$route.query.type)).data.length>0){
          var seobj=JSON.parse(sessionStorage.getItem(this.$route.query.type));
           this.page =seobj.page;
           this.listdatas=seobj.data;
           document.querySelector('.top-list').scrollTop=seobj.top;
        }else{
          this.page = 1;
          this.tab = ''
          this.getIndexData(this.page, this.limit, '', '');
        }
       
      }

      if (this.$route.query.type == "Essence") {
         if(sessionStorage.getItem(this.$route.query.type) && JSON.parse(sessionStorage.getItem(this.$route.query.type)).data.length>0){
          var seobj=JSON.parse(sessionStorage.getItem(this.$route.query.type));
           this.page =seobj.page;
           this.listdatas=seobj.data;
           document.querySelector('.top-list').scrollTop=seobj.top;
        }else{
        this.page = 1;
        this.tab = 'good'
        this.getIndexData(this.page, this.limit, '', this.tab);
        }
      }

      if (this.$route.query.type == "Share") {
         if(sessionStorage.getItem(this.$route.query.type) && JSON.parse(sessionStorage.getItem(this.$route.query.type)).data.length>0){
          var seobj=JSON.parse(sessionStorage.getItem(this.$route.query.type));
           this.page =seobj.page;
           this.listdatas=seobj.data;
           document.querySelector('.top-list').scrollTop=seobj.top;
        }else{
        this.page = 1;
        this.tab = 'share'
        this.getIndexData(this.page, this.limit, '', this.tab);
        }
      }

      if (this.$route.query.type == "Question") {
         if(sessionStorage.getItem(this.$route.query.type) && JSON.parse(sessionStorage.getItem(this.$route.query.type)).data.length>0){
          var seobj=JSON.parse(sessionStorage.getItem(this.$route.query.type));
           this.page =seobj.page;
           this.listdatas=seobj.data;
           document.querySelector('.top-list').scrollTop=seobj.top;
        }else{
        this.page = 1;
        this.tab = 'ask'
        this.getIndexData(this.page, this.limit, '', this.tab);
        }
      }

      if (this.$route.query.type == "Recruit") {
         if(sessionStorage.getItem(this.$route.query.type) && JSON.parse(sessionStorage.getItem(this.$route.query.type)).data.length>0){
          var seobj=JSON.parse(sessionStorage.getItem(this.$route.query.type));
           this.page =seobj.page;
           this.listdatas=seobj.data;
           document.querySelector('.top-list').scrollTop=seobj.top;
        }else{
        this.page = 1;
        this.tab = 'job'
        this.getIndexData(this.page, this.limit, '', this.tab);
        }
      }
    }, //选择tab
    handleTabChange(val) {
      this.activeTab = val
    },
    toggle(flag) {
      this.open = !this.open
      this.docked = !flag
    },
    //选择主题
    changeTheme(theme) {
      this.theme = theme
      const styleEl = this.getThemeStyle()
      styleEl.innerHTML = this.themes[theme] || ''
    },
    getThemeStyle() {
      const themeId = 'muse-theme'
      let styleEl = document.getElementById(themeId)
      if (styleEl) return styleEl
      styleEl = document.createElement('style')
      styleEl.id = themeId
      document.body.appendChild(styleEl)
      return styleEl
    },
    goIndex(param, event) {
      var _this = this;
      if (param == "All") {
        this.title = "全部"
        this.activeTab = param;
        this.$router.push({ path: '/', query: { type: "All" } });
      } else if (param == "Essence") {
        this.title = "精华"
        this.activeTab = param;
        this.$router.push({ path: '/', query: { type: "Essence" } });
      } else if (param == "Share") {
        this.title = "分享"
        this.activeTab = param;
        this.$router.push({ path: '/', query: { type: "Share" } });
      } else if (param == "Question") {
        this.title = "问答"
        this.activeTab = param;
        this.$router.push({ path: '/', query: { type: "Question" } });
      } else if (param == "Recruit") {
        this.title = "招聘"
        this.activeTab = param;
        this.$router.push({ path: '/', query: { type: "Recruit" } });
      }
      this.initroute();
    },
    getTop() {
      var _this = this;
      this.$nextTick(function () {
     document.querySelector('.top-list').onscroll = function () {
         this.scrolltop = document.querySelector('.top-list').scrollTop;
            if( this.scrolltop=="0"){
              if(sessionStorage.getItem(_this.$route.query.type == undefined ? 'All' : _this.$route.query.type)){
                  this.scrolltop=JSON.parse (sessionStorage.getItem(_this.$route.query.type == undefined ? 'All' : _this.$route.query.type)).top==null?"0":JSON.parse (sessionStorage.getItem(_this.$route.query.type == undefined ? 'All' : _this.$route.query.type)).top; 
              }else{
                 this.scrolltop='0';
              }
            sessionStorage.setItem(_this.$route.query.type == undefined ? 'All' : _this.$route.query.type,  JSON.stringify({'top':this.scrolltop,'data':_this.listdatas,'page':_this.page}));

          }else{
          
          sessionStorage.setItem(_this.$route.query.type == undefined ? 'All' : _this.$route.query.type,  JSON.stringify({'top':this.scrolltop,'data':_this.listdatas,'page':_this.page}));
          }
        };
      })
    }

  }, watch: {
    munavobjTop: "getTop",
    '$route'(to, from) {
      // this.initroute();
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

// .tabs-fix {
//   position: fixed !important;
//   top: 0;
// }
#munav{
  width: 100%;
  position: fixed !important;
  top: 0;
  z-index: 100;
}
.index{
  margin-top: 100px;
  height: 100%;
}
.index .mu-list>div {
  border-bottom: 1px solid #e8e8e8
}

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

.index .demo-float-button {
  width: pxx(100);
  height: pxx(100);
  position: fixed;
  bottom: 10%;
  right: 5%;
}
.mu-list{
  height: 100%;
}
</style>
