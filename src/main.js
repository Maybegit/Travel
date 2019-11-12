import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'lib-flexible'
import './assets/iconfont/iconfont.css'
// import {Button, Row, Col, Swipe, SwipeItem , Lazyload ,List ,Field, NavBar,Toast, Tab, Tabs,Stepper} from 'vant'

// Vue.use(Field).use(NavBar).use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Toast).use(Tab).use(Tabs).use(Stepper)
Vue.config.productionTip = false
Vue.prototype.axios=axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
