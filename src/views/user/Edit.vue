<template>
  <div class="edit">
    <van-nav-bar class="navbar" type="primary" title="修改个人资料" left-arrow @click-left="onClickLeft" />
    <div class="container">
      <div class="listbox">
        <div class="photobox">
          <div class="phototitle">头像</div>
          <van-uploader :before-read="beforeRead" :after-read="afterRead">
            <img class="photoimg" :src="avatar" alt />
          </van-uploader>
        </div>
        <van-cell title="用户名" is-link value="修改用户名" @click="edituname"/>
        <van-cell title="修改密码" is-link value="修改密码" @click="editpwd"/>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import {updateicon} from 'api/user.js';
export default {
  name:"Edit",
  data() {
    return {
      avatar: "",
      uid:""
    };
  },
  created() {
    
    if (sessionStorage.getItem("userInfo")) {
      //获取session中的登录凭证
      var userInfo = sessionStorage.getItem("userInfo");
      //if 将session中的数据转为对象 else 默认为this.uname
      this.userInfo = JSON.parse(userInfo);
      this.avatar = "http://lvxingzhe.applinzi.com" + this.userInfo.avatar;
      this.uid = this.userInfo.uid
    }
  },
  methods: {
    //返回页面
    onClickLeft() {
      this.$router.go(-1);
    },
    editpwd(){
      this.$router.push("/editpwd")
    },
    edituname(){
      this.$router.push("/editname")
    },
    beforeRead(file) {
      // 此时可以自行将文件上传至服务器
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        Toast("只允许上传jpg/png格式的图片！");
        return false;
      }
      return true;
    },
    asyncBeforeRead(file) {
      return new Promise((resolve, reject) => {
        if (file.type !== "image/jpeg" && file.type !== "image/png") {
          Toast("请上传 jpg/png 格式图片");
          reject();
        } else {
          resolve();
        }
      });
    },
    afterRead(file) {
      //头像的base64
      var picBase64 = file.content.replace(/^data:image\/\w+;base64,/, "");
      var obj={ 
          uid:this.uid,
          picBase64
        }
      // 此时可以自行将文件上传至服务器  在这里发请求
       updateicon(obj)
       .then(res=>{
        var path1 = res.data.path1
        var userInfo = sessionStorage.getItem("userInfo");
        //if 将session中的数据转为对象 else 默认为this.uname
        var userInfo = JSON.parse(userInfo);
        userInfo.avatar = path1;
        var userInfo = JSON.stringify(userInfo);
        //将结果保存到session中
        sessionStorage.setItem("userInfo", userInfo);
        location.reload();
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
};
</script>

<style scoped>
.edit {
  width: 100%;
  height: 100vh;
  background-color: #f6f6f6 !important;
  overflow: hidden;
}
.van-nav-bar {
  color: #fff;
  background-image: linear-gradient(to right, #4ae0d5, #56e7ad);
}
.van-nav-bar__title {
  color: #fff;
}
.van-icon-arrow-left {
  color: rgb(255, 255, 255);
}
.container {
  padding: 10px 0;
  height: 100%;
  background-color: #f6f6f6;
  margin-bottom: 45px;
}
.van-uploader {
  width: 36px;
  height: 36px;
}
.photoimg {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-left: 250px;
}

.phototitle {
  width: 50px;
  height: 44px;
  font-size: 14px;
  color: #323233;
  margin-top: 30px;
  margin-left: 8px;
}
.photobox {
  background: #fff;
  width: 100%;
  height: 44px;
  padding: 10px;
  display: flex;
  align-items: center;
}
</style>