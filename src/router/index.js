import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component:()=>import('../views/Index.vue'),
    children:[
      {
        path:'',
        redirect:'/home'
      },
      {
        path:'/home',
        name:'home',
        component:()=>import('../views/Home.vue')
      },
      {
        path:'/activity',
        name:'activity',
        component:()=>import('../views/Activity.vue')
      },
      {
        path:'/me',
        name:'me',
        component:()=>import('../views/Me.vue')
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
