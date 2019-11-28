import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
/* 引入better-scroll  */
import BScroll from 'better-scroll'
axios.defaults.baseURL = "http://lvxingzhe.applinzi.com/"
import './assets/api/validate.js'
//7.保存session信息
//每次ajax访问服务器将session id
//发送服务器验证使用
axios.defaults.withCredentials = true
//8.将axios注册Vue示例中
//注意顺序不能配置在vue对象后面
Vue.prototype.axios = axios;
/* 配置better-scroll */
Vue.prototype.BScroll = BScroll;
import 'lib-flexible'
import 'assets/iconfont/iconfont.css'
import {Button, Row, Col, Swipe, SwipeItem , Lazyload ,List ,Field, NavBar,Toast, Tab, Tabs,Stepper,Uploader, Cell, CellGroup,Icon,Dialog,Popup,DatetimePicker,Loading} from 'vant'

Vue.use(Field).use(NavBar).use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Toast).use(Tab).use(Tabs).use(Stepper).use(Uploader).use(Cell)
.use(CellGroup).use(Icon).use(Dialog).use(Popup).use(DatetimePicker).use(Loading)
Vue.config.productionTip = false
Vue.prototype.axios=axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
