// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 路由
import router from './router'
// 存储
import store from './store'
// flexible
import 'lib-flexible'
// Mint
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
// 事件监听
import VueBus from './plugin/vue-bus'
import axios from 'axios'
import './libs/mock'

Vue.config.productionTip = false

Vue.use(Mint)
Vue.use(VueBus)

// Vue.prototype.$http = axios

/* eslint-disable no-new */
const vueInstance = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


// 滑动监听
let m1 = 0;     // 滚动的值
let m2 = 0;     // 对比时间的值
let lastM = 0;  // 之前的滑动位置
let timer = null;
document.onscroll = () => {
    clearTimeout(timer) // 每次滚动前 清除一次
    timer = setTimeout(() => {
      m2 = document.documentElement.scrollTop || document.body.scrollTop;
      if(m2 == m1){
        console.log('滚动结束了')
        // 输出滑动距离
        console.log('纵向滑动距离 = ', m2 - lastM)
        vueInstance.$bus.emit('scrollVerticalDidEnd', { distance: m2 - lastM })
        // 清空开始滑动位置
        lastM = 0;
      }
    }, 1000);
    m1 = document.documentElement.scrollTop || document.body.scrollTop;
    if (lastM === 0) {
      lastM = m1
    }
}