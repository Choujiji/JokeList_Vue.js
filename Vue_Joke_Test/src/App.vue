<template>
  <div>
    <div class="app-header">
      <app-header></app-header>
    </div>
    <router-view id="router-view"/>
  </div>
</template>

<script>
import AppHeader, { HeaderHeight } from './components/AppHeader.vue'

export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>

<style scoped lang="">
  .app-header {
    z-index: 99999;
    width: 100%;
    height: 128px;
    position: fixed;
    top: 0;
    left: 0;
  }
  #router-view {
    margin-top: 128px;
  }
</style>
