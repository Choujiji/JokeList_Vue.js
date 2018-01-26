<template>
  <div>
    <app-header></app-header>
    <router-view id="router-view" :style="contentViewStyle"/>
  </div>
</template>

<script>
import AppHeader, { HeaderHeight } from './components/AppHeader.vue'

export default {
  name: 'App',
  components: {
    AppHeader
  },
  data () {
    return {
      contentViewStyle: {
        marginTop: (HeaderHeight / 2) + 'px'
      }
    }
  }
}
</script>

<style scoped lang="">
</style>
