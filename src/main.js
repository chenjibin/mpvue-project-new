import Vue from 'vue'
import App from './App'
import request from '@/utils/request'

Vue.config.productionTip = false
Vue.prototype.$http = request
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '大变内涵图',
      navigationBarTextStyle: 'black'
    }
  }
}
