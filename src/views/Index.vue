<template>
  <div class="index">
      <transition :name='transition'>
        <router-view></router-view>
      </transition>
      <TabBar :data="tabbarData"></TabBar>
  </div>
</template>

<script>
import TabBar from "../components/Tabbar";
export default {
  name: "Index",
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      //获取sessionStorage中userInfo
      var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      //判断是否为空
      if (!userInfo) {
        this.isuser = 1;
      } else {
        //如果不为空，赋值
        this.isuser = userInfo.isuser;
        if (this.isuser == 0) {
          this.tabbarData[2].title = "发布";
          this.tabbarData[2].path = "/activitypublish";
        }
      }
    }
  },
  data() {
    return {
      tabbarData: [
        { title: "首页", icon: "home-page", path: "/home" },
        { title: "活动", icon: "qiqiu", path: "/activity" },
        { title: "分享", icon: "camera", path: "/activityShare" },
        { title: "我的", icon: "wode", path: "/me" }
      ],
      isuser: ""
    };
  },
  components: {
    TabBar
  }
};
</script>

<style>
.index{
  width: 100%;
}
/*向左滑动*/
@keyframes slideInLeft {
    from {
        transform: translate3d(100%, 0, 0);
        position: fixed;
        top: 0;
        left: 0;
        opacity: 1;
    }
    to {
        transform: translate3d(0, 0, 0);
        position: fixed;
        top: 0;
        left: 0;
        opacity: 1;
    }
}
@keyframes slideInRight {
    from {
        transform: translate3d(0%, 0, 0);
        position: fixed;
        top: 0;
        left: 0;
        opacity: 1;
    }
    to {
        transform: translate3d(-100%, 0, 0);
        position: fixed;
        top: 0;
        left: 0;
        opacity: 1;
    }
}
.slide-left-enter-active{
    position: fixed;
    top: 0;
    left: 0%;
    width: 100vw;
    height: 100vh;
    animation: slideInLeft 0.3s linear forwards;
}
.slide-left-leave-active{
    position: fixed;
    top: 0;
    left: 0%;
    width: 100vw;
    height: 100vh;
    animation: slideInRight 0.3s linear forwards;
}
/*向右滑动*/
@keyframes slideOutLeft {
    from {
        transform: translate3d(-100%, 0, 0);
        position: fixed;
        top: 0;
        left: 0;
        opacity: 1;
    }
    to {
        transform: translate3d(0%, 0, 0);
        position: fixed;
        top: 0;
        left: 0;
        opacity: 1;
    }
}
@keyframes slideOutRight {
    from {
        transform: translate3d(0%, 0, 0);
        position: fixed;
        top: 0;
        left: 0;
        opacity: 1;
    }
    to {
        transform: translate3d(100%, 0, 0);
        position: fixed;
        top: 0;
        left: 0;
        opacity: 1;
    }
}
.slide-right-enter-active{
    position: fixed;
    top: 0;
    left: 0%;
    width: 100vw;
    height: 100vh;
    animation: slideOutLeft 0.3s linear forwards;
}
.slide-right-leave-active{
    position: fixed;
    top: 0;
    left: 0%;
    width: 100vw;
    height: 100vh;
    animation: slideOutRight 0.3s linear forwards;
}
</style>