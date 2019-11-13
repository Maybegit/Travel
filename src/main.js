import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
axios.defaults.baseURL = "http://176.122.15.174:3000/"
//7.保存session信息
//每次ajax访问服务器将session id
//发送服务器验证使用
axios.defaults.withCredentials = true
//8.将axios注册Vue示例中
//注意顺序不能配置在vue对象后面
Vue.prototype.axios = axios;
import 'lib-flexible'
import './assets/iconfont/iconfont.css'
import {Button, Row, Col, Swipe, SwipeItem , Lazyload ,List ,Field, NavBar,Toast, Tab, Tabs,Stepper,Cell,CellGroup} from 'vant'

Vue.use(Field).use(NavBar).use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Toast).use(Tab).use(Tabs).use(Stepper).use(Cell).use(CellGroup)
Vue.config.productionTip = false
Vue.prototype.axios=axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
