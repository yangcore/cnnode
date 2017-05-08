<template>
  <div id="app">
    <div v-if="indexshow">
      <munav v-if="indexshow"></munav>
      <div class="contant">
      <router-view name="a"></router-view>
      </div>
    </div>
      <router-view name="b"></router-view>

    <!--<bottom></bottom>-->
  </div>
</template>

<script>
import munav from './components/munav'
import bottom from './components/bottom'
export default {
  name: 'app',
  data(){
    return {
      indexshow:true
    }
  },
  template: ['<munav/>','<bottom/>'],
  components: { munav ,bottom},
  watch: {
  '$route' (to, from) {
    console.info(this.$route.path)
    if(this.$route.path=="/"){
      this.indexshow=true;
    }else{
       this.indexshow=false;
    }
  }}
}
</script>

<style lang="scss" scoped>
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

* {
  padding: 0;
  margin: 0;
}
html,body{
  height: 100%;
  width: 100%;
}
#app {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.contant{
  margin-top:54px
}
</style>