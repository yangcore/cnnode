<template>
<div>
<!--<mu-tabs :value="theme" @change="changeTheme">
  <mu-tab title="LIGHT (DEFAULT)" value="light"/>
  <mu-tab title="DARK" value="dark"/>
  <mu-tab title="CARBON" value="carbon"/>
  <mu-tab title="TEAL" value="teal"/>
</mu-tabs>-->

<mu-appbar :title="title">
  <mu-icon-button icon="menu" slot="left" @click="toggle(true)"/>
</mu-appbar>

<div>
    <!--<mu-raised-button label="toggle drawer" @click="toggle()"/>-->
    <mu-drawer :open="open" :docked="docked" @close="toggle()">
      <mu-appbar title="主 题 分 类"/>
      <mu-list @itemClick="docked ? '' : toggle()">
        <mu-list-item title="全 部" @click="goIndex('All')"></mu-list-item>
        <mu-list-item title="精 华" @click="goIndex('Essence')"/>
        <mu-list-item title="分 享" @click="goIndex('Share')"/>
        <mu-list-item title="问 答" @click="goIndex('Question')"/>
        <mu-list-item title="招 聘" @click="goIndex('Recruit')"/>
        <h2>主题风格</h2>
  <mu-dropDown-menu :value="theme" @change="changeTheme">
    <mu-menu-item value="light" title="LIGHT"/>
    <mu-menu-item value="dark" title="DARK"/>
    <mu-menu-item value="carbon" title="CARBON"/>
    <mu-menu-item value="teal" title="TEAL"/>
  </mu-dropDown-menu>
      </mu-list>
    </mu-drawer>
</div>

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
      themes: {
        light,
        dark,
        carbon,
        teal
      }
    }
  },
  methods: {
    toggle (flag) {
      this.open = !this.open
      this.docked = !flag
    },
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
      this.$router.push({path:'/', query:{type:"All"}});
    }else if(param=="Essence"){
      this.title="精华"
      this.$router.push({path:'/',query:{type:"Essence"}});
    }else if(param=="Share"){
       this.title="分享"
      this.$router.push({path:'/',query:{type:"Share"}});
    }else if(param=="Question"){
      this.title="问题"
      this.$router.push({path:'/',query:{type:"Question"}});
    }else if(param=="Recruit"){
        this.title="招聘"
      this.$router.push({path:'/',query:{type:"Recruit"}});
    }
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
 .mu-appbar{
   position: fixed;
   top: 0;
   z-index: 1000;
}
.mu-appbar-title span{
  margin-left: pxx(-48)
}
.mu-list{
  margin-top: 54px;
}
</style>