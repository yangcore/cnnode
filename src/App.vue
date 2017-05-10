<template>
  <div id="app">
    <!--<router-view name="a"></router-view>-->
    <indexinfo v-show="indexinfoShow"></indexinfo>
    <router-view name="b"></router-view>
  </div>
</template>

<script>
import indexinfo from './components/indexinfo.vue'
export default {
  name: 'app',
  data() {
    return {
      indexinfoShow:true
    }
  },
  template: ['<indexinfo/>'],
  components: { indexinfo },
  watch: {
    '$route'(to, from) {
     if(this.$route.path=="/"){
       this.indexinfoShow=true;
     }else{
      this.indexinfoShow=false;
     }
    }
  }
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

html,
body {
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
</style>