import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test/',
      name: '测试页面~',
      component: (resolve) => require(['../views/TestPage.vue'], resolve)
    },
    {
      path: '/joke-list/',
      name: '段子列表',
      meta: {
        title: '段子列表'
      },
      component: (resolve) => require(['../views/JokeList.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
