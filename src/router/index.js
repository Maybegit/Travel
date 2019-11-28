import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
VueRouter.prototype.goBack = function () {
  window.history.go(-1)
}

const routes = [
  {
    path: '/',
    component: () => import('views/Index.vue'),
    meta: { tree: 1 },
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        //首页
        path: '/home',
        name: 'home',
        component: () => import('views/Home.vue'),
        meta: { tree: 1 }
      },
      {
        path: '/address',
        name: 'address',
        component: () => import('views/Address.vue'),
        meta: { tree: 2 }
      },
      {
        //活动页面
        path: '/activity',
        name: 'activity',
        component: () => import('views/Activity.vue'),
        meta: { tree: 3 }
      },
      {
        //商家发布活动页面
        path: '/activitypublish',
        name: 'activitypublis',
        component: () => import('views/activity/ActivityPublish.vue'),
        meta: { tree: 4 }
      },
      {
        //我的页面
        path: '/me',
        name: 'me',
        component: () => import('views/Me.vue'),
        meta: { tree: 6 }
      },
      , {
        //用户分享页面
        path: '/activityShare',
        name: 'activityShare',
        component: () => import('views/activity/ActivityShare.vue'),
        meta: { tree: 5 }
      }
    ]
  },
  {
    //编辑用户信息
    path: '/edit',
    name: 'Edit',
    component: () => import('views/user/Edit.vue'),
    meta: { tree: 7 }
  },
  {
    //修改密码
    path: '/editpwd',
    name: 'Editpwd',
    component: () => import('views/user/Editpwd.vue'),
    meta: { tree: 8 }
  },
  {
    //修改用户名
    path: '/editname',
    name: 'Editname',
    component: () => import('views/user/Editname.vue'),
    meta: { tree: 8 }
  },
  {
    //登录页面
    path: '/login',
    name: 'login',
    component: () => import('views/user/Login.vue'),
    meta: { tree: 8 }
  },
  {
    //注册页面
    path: '/register',
    name: 'register',
    component: () => import('views/user/Register.vue'),
    meta: { tree: 9 }
  },
  {
    //电话号码登录页面
    path: '/phoneLogin',
    name: 'phoneLogin',
    component: () => import('views/user/phoneLogin.vue'),
    meta: { tree: 10 }
  },
  {
    //我的活动分享页面
    path: '/share',
    name: 'share',
    component: () => import('views/my/Share.vue'),
    meta: { tree: 11 }
  },
  {
    //活动详情分享页面
    path: '/details',
    name: 'details',
    component: () => import('views/activity/Details.vue'),
    meta: { tree: 12 }
  },
  {
    //我的收藏页面
    path: '/collect',
    name: 'collect',
    component: () => import('views/my/Collect.vue'),
    meta: { tree: 13 }
  },
  {
    //已报名的活动
    path: '/myactivity',
    name: 'myactivity',
    component: () => import('views/my/Myactivity.vue'),
    meta: { tree: 14 }
  },
  {
    //旅行日记详情页
    path: '/actdetail',
    name: 'actDetail',
    component: () => import('views/activity/ActDetail.vue'),
    meta: { tree: 15 }
  },
  {
    //我的发布页面
    path: '/mypublish',
    name: 'mypublish',
    component: () => import('views/my/Mypublish.vue'),
    meta: { tree: 16 }
  }
]
const router = new VueRouter({
  routes
})
// 导航前置路由守卫 
router.beforeEach(function (to, from, next) {
  const nextRoute = ['activityShare', 'share', 'collect', 'mypublish', 'myactivity','details'];
  const userInfo = sessionStorage.getItem("userInfo")
  //跳转至上述3个页面
  if (nextRoute.indexOf(to.name) >= 0) {
    //未登录
    if (!userInfo) {
      router.push({ name: 'login' })
    }
  }
  //路由跳转前进后退动画,Vue原型上定义transition为动画效果
  Vue.prototype.transition = 'slide-none';
  if (from.meta.tree > to.meta.tree) {
    // 后退,想右滑动
    Vue.prototype.transition = 'slide-right';
    from.meta.keepAlive = false;
    to.meta.keepAlive = true;
  } else if (from.meta.tree < to.meta.tree) {
    // 前进,想左滑动
    Vue.prototype.transition = 'slide-left';
    from.meta.keepAlive = true;
    to.meta.keepAlive = false;
  } else {
    // 同一层级,无动画
    Vue.prototype.transition = 'slide-none';
    from.meta.keepAlive = true;
    to.meta.keepAlive = true;
  }
  next();
});

export default router
