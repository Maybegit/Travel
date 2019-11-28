<template>
<div>
 <div class="imgbox">
   <img src="../assets/images/05.jpg" class="img1">
   <img class="setimg" v-show="userInfo" src="../assets/images/set.png" alt="" @click="goedit">
</div>
 <div class="content">
    <div class="top">
      <div class="photobox"><img class="photo" :src="avatar" ></div>
      <span class="text" @click="handlelogin">{{uname}}</span>
    </div>
    <div class="listbox">
      <van-cell icon="star-o" title="我的收藏" is-link value="收藏的活动" @click="gocollect" v-show="isuser"/>
      <van-cell icon="bullhorn-o" :title="title" is-link @click="goshare" />
      <van-cell icon="award-o" title="已报名活动" is-link value="待出行" @click="goactivity" v-show="isuser"/>
      <van-cell icon="logistics" title="我的行程" is-link v-show="isuser"/>
      <van-cell icon="eye-o" title="最近浏览" is-link />
      <van-cell icon="aim" title="我的目的地" is-link value="去过、想去" />
      <van-cell icon="chat-o" title="目的地评价" is-link value="评价过的目的地" />
      <van-cell icon="location-o" title="离线地图" is-link value="下载离线地图" />
    </div>
    <van-button
      v-show="userInfo"
      @click="exitlogin"
      class="exitlogin"
      type="primary"
      size="large"
    >退出登录</van-button>
  </div>
  </div>
</template>

<script>
export default {
  name: "me",
  data() {
    return {
      userInfo: "",
      avatar: require("../assets/images/photo.png"),
      uname: "点击登录/注册",
      isuser: 3,
      title: "我的分享"
    };
  },
  created() {
    if (sessionStorage.getItem("userInfo")) {
      //获取session中的登录凭证
      var userInfo = sessionStorage.getItem("userInfo");
      //if 将session中的数据转为对象 else 默认为this.uname
      this.userInfo = JSON.parse(userInfo) || this.name;
      this.avatar = "http://lvxingzhe.applinzi.com" + this.userInfo.avatar;
      this.uname = this.userInfo.uname;
      //isuser =0 商家用户 =1 普用户
      this.isuser = this.userInfo.isuser;
      this.isuser == 1 ? (this.title = "我的分享") : (this.title = "我的发布");
    }
  },
  methods: {
    handlelogin() {
      //如果sessionz中没有登录凭证的数据,就跳转到登录页
      if (!this.userInfo) {
        this.$router.push("/login");
      }
    },
    //退出登录
    exitlogin() {
      //清除保存在session中的登录凭证
      sessionStorage.clear();
      //浏览器重新从服务器请求资源,在http请求头中不会包含缓存标记
      window.location.reload();
    },
    goshare() {
      this.isuser == 1
        ? this.$router.push("/share")
        : this.$router.push("/mypublish");
    },
    gocollect() {
      this.$router.push("/collect");
    },
    goactivity() {
      this.$router.push("/myactivity");
    },
    goedit(){
      this.$router.push("/edit");
    }
  }
};
</script>
<style scoped>
.imgbox{
  position: relative;
}
.text{
  color:#ffffff;
  font-size:16px;
  font-weight:bold
}
.img1{
  width:375px;
  position: relative;
}
.setimg{
  position: absolute;
  top:10px;
  right:10px;
  width:30px;
  height: 30px;
}
.content {
  padding: 10px;
}
.top {
 /*  margin-top: 30px; */
  text-align: center;
  position:absolute;
  left:0;
  right:0;
  top:20px;
  z-index: 10;
}
.photobox {
  margin-bottom: 10px !important;
  width: 50px;
  height: 50px;
  margin: 0 auto;
}
.photobox img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.photo {
  width: 50px;
  height: 50px;
  border-radius: 50px;
}
.title {
  margin-top: 20px;
  color: #000;
  font-size: 14px;
}

.exitlogin {
  width: 330px;
  height: 40px;
  text-align: center;
  margin: 40px 15px 45px 10px;
  line-height: 40px;
  background-image: linear-gradient(to right ,#4ae0d5, #56e7ad);
  border: none;
}
</style>