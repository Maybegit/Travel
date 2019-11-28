<template>
  <div id="app">
    <transition :name='transition'>
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
    };
  },
  created() {
    this.getLocation();
  },
  methods: {
    getLocation() {
      const self = this;
      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息 精准定位
          //将定位信息存储到vuex
          console.log(data);
          self.$store.dispatch("setLocation", data);
          self.$store.dispatch("setAddress", data.addressComponent.city);
        }

        function onError(data) {
          // 定位出错
          console.log(data);
        }
      });
    }
  }
};
</script>

<style>
#app{
  max-width: 375px;
  margin: 0 auto;
}
.van-nav-bar .van-icon {
  color: #000;
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
