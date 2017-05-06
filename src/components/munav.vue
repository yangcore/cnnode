<template>
<div>
<!--<mu-tabs :value="theme" @change="changeTheme">
  <mu-tab title="LIGHT (DEFAULT)" value="light"/>
  <mu-tab title="DARK" value="dark"/>
  <mu-tab title="CARBON" value="carbon"/>
  <mu-tab title="TEAL" value="teal"/>
</mu-tabs>-->

<mu-appbar title="Title">
  <mu-icon-button icon="menu" slot="left" @click="toggle(true)"/>
  <!--<mu-flat-button label="expand_more" slot="right"/>
  <mu-flat-button href="333" label="expand_more" slot="right"/>
  <mu-icon-button icon="expand_more" slot="right"/>-->
</mu-appbar>

<div>
    <!--<mu-raised-button label="toggle drawer" @click="toggle()"/>-->
    <mu-drawer :open="open" :docked="docked" @close="toggle()">
      <mu-list @itemClick="docked ? '' : toggle()">
        <mu-list-item title="Menu Item 1"/>
        <mu-list-item title="Menu Item 2"/>
        <mu-list-item title="Menu Item 3"/>
        <mu-list-item v-if="docked" @click.native="open = false" title="Close"/>
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
  }
  }
 
}
</script>


<style>
 .mu-appbar{
   position: fixed;
   top: 0;
   z-index: 1000;
}
</style>