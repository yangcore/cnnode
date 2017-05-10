<template>
<div id="munav">
  <mu-appbar :title="title" class="title" >
    <mu-icon-button icon="menu" slot="left" @click="toggle(true)"/>
    <mu-icon-menu icon="more_vert" slot="right" :value="theme" @change="changeTheme">
        <mu-menu-item value="light" title="LIGHT"/>
      <mu-menu-item value="dark" title="DARK"/>
      <mu-menu-item value="carbon" title="CARBON"/>
      <mu-menu-item value="teal" title="TEAL"/>
      </mu-icon-menu>
  </mu-appbar>

  <mu-tabs :value="activeTab" @change="handleTabChange" class="tabs" id="tabs">
      <mu-tab value="tab1" title="全部"  @click="goIndex('All')"/>
      <mu-tab value="tab2" title="精华" @click="goIndex('Essence')"/>
      <mu-tab value="tab3"  title="分享" @click="goIndex('Share')"/>
      <mu-tab value="tab4" title="问答" @click="goIndex('Question')"/>
      <mu-tab value="tab5"  title="招聘" @click="goIndex('Recruit')"/>
  </mu-tabs>
    <mu-drawer :open="open" :docked="docked" @close="toggle()">
    </mu-drawer>
</div>
</template>
<script>
import light from '!raw-loader!muse-ui/dist/theme-default.css'
import dark from '!raw-loader!muse-ui/dist/theme-dark.css'
import carbon from '!raw-loader!muse-ui/dist/theme-carbon.css'
import teal from '!raw-loader!muse-ui/dist/theme-teal.css'
export default {
  name:"munav",
  data () {
    return {
      open: false,
      docked: true,
      theme: 'light',
      title:'全部',
      munavobjTop:'',
      activeTab: 'tab1',
      themes: {
        light,
        dark,
        carbon,
        teal
      }
    }
  },
  mounted(){
    var munavobj=document.getElementById('munav');
    this.munavobjTop = munavobj.offsetTop;
  },
  methods: {
    //选择tab
     handleTabChange (val) {
      this.activeTab = val
    },
    toggle (flag) {
      this.open = !this.open
      this.docked = !flag
    },
     //选择主题
    changeTheme (theme) {
    this.theme = theme
    const styleEl = this.getThemeStyle()
    styleEl.innerHTML = this.themes[theme] || ''
  },
  getThemeStyle () {
    const themeId = 'muse-theme'
    let styleEl = document.getElementById(themeId)
    if (styleEl) return styleEl
    styleEl = document.createElement('style')
    styleEl.id = themeId
    document.body.appendChild(styleEl)
    return styleEl
  },
  goIndex(param,event){
    if(param=="All"){
      this.title="全部"
        window.scrollTo(0,0);
      this.$router.push({path:'/', query:{type:"All"}});
    }else if(param=="Essence"){
      this.title="精华"
      window.scrollTo(0,0);
      this.$router.push({path:'/',query:{type:"Essence"}});
    }else if(param=="Share"){
       this.title="分享"
        window.scrollTo(0,0);
      this.$router.push({path:'/',query:{type:"Share"}});
    }else if(param=="Question"){
      this.title="问题"
      window.scrollTo(0,0);
      this.$router.push({path:'/',query:{type:"Question"}});
    }else if(param=="Recruit"){
        this.title="招聘"
        window.scrollTo(0,0);
      this.$router.push({path:'/',query:{type:"Recruit"}});
    }
  },
  getTop(){
        window.onscroll = function () {  
            var top = document.documentElement.scrollTop || document.body.scrollTop;  
            if(top>=54){
              document.getElementById('tabs').classList.add('tabs-fix')
            }else{
               document.getElementById('tabs').classList.remove('tabs-fix')
            }
        };
  }
},
  watch:{
    munavobjTop:"getTop",
    '$route' (to, from) {
        // console.info(this.$route)
      }
  }
}
</script>


<style lang="scss" >
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
// .title{
//   position: fixed;
//   top: 0;
// }
.tabs-fix{
   position: fixed !important;
   top: 0;
}
</style>