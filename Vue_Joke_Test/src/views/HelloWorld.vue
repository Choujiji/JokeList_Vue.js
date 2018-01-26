<template>
  <div class="hello">
    <router-link 
      class="router-link"
      :to="'/test'"
    >进入test页面</router-link>
    <router-link 
      class="router-link"
      :to="'/joke-list'"
    >段子列表</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  // $pageBackgroundColor: light-gray;
  $linkBackgroundColor: #e1e2e3;

  .hello {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center
  }
  .router-link {
    text-decoration: none;
    background: $linkBackgroundColor;
    padding: 5px 10px;
    margin: 10px;
    border-radius: 5px;
    box-shadow: 2px solid light-gray;
    color: black;
  }
</style>
