<template>
  <div class="content">
    <div class="top">
      <div class="loginfont">登录</div>
      <span @click="jupphone">切换至手机号登录</span>
    </div>
    <div class="loginbox">
      <input v-model="uname" class="unameinput" type="text" placeholder="请输入登陆账号" />
      <input v-model="upwd" class="upwdinput" type="text" placeholder="请输入登陆密码" />
      <select name="chooses " id="choose" v-model="selected" @click="getvalue">
        <option v-for="(item,index) in options" :value="item.value" :key="index">{{ item.text }}</option>
      </select>
      <van-button @click="login" class="logininput" type="primary" size="large">立即登录</van-button>
    </div>
    <div class="assistlogin">
      <span @click="gome">暂不登录</span>
      <span @click="goregister">快速注册</span>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import {login} from 'api/user.js'
export default {
  data() {
    return {
      uname: "",
      upwd: "",
      selected: "-1", //select选中的值
      options: [
        { text: "请选择身份", value: "-1" },
        { text: "普通用户", value: "1" },
        { text: "商家用户", value: "0" }
      ],
      isuser: "-1"
    };
  },
  methods: {
    jupphone(){
      this.$router.push("/phoneLogin");
    },
    getvalue(e) {
      this.isuser = e.target.value;
    },
    login() {
      //判断用户名与密码
      var reg = /^[a-z0-9]{3,9}$/i;
      var uname = this.uname;
      var upwd = this.upwd;
      var isuser = this.isuser;
      if (!reg.test(uname)) {
        Toast("用户名格式不正确");
        return;
      }
      if (!reg.test(upwd)) {
        Toast("密码格式不正确");
        return;
      }
      if (isuser == -1) {
        Toast("请选择身份类型");
        return;
      }
      //发送请求
      var obj = { uname, upwd, isuser };
      login(obj)
        .then(res => {
          if (res.data.code == 1) {
            //将获取到的结果转为字符串
            const userInfo = JSON.stringify(res.data);
            //将结果保存到session中
            sessionStorage.setItem("userInfo", userInfo);
            //登录成功后跳转到我的页面
            this.$router.push("/me");
          } else {
            Toast("用户名和密码有误");
          }
        })
        .catch(err => {});
    },
    //点击登录或者注册跳转到注册页面
    goregister() {
      this.$router.push("/register");
    },
    gome() {
      this.$router.push("/me");
    }
  }
};
</script>
<style scoped>
.content {
  margin: 100px 30px 0 30px;
  text-align: center;
}
.loginbox {
  margin-top: 50px;
}
.loginfont {
  font-size: 24px;
  margin-bottom:10px;
}
.unameinput {
  width: 310px;
  height: 30px;
  border: none;
  border-bottom: 1px solid #e8e8e8;
}
.upwdinput {
  margin-top: 40px;
  width: 310px;
  height: 30px;
  border: none;
  border-bottom: 1px solid #eee;
}
.logininput {
  height: 40px;
  text-align: center;
  margin-top: 40px;
  line-height: 40px;
  border: none;
  background-image: linear-gradient(to right ,#4ae0d5, #56e7ad);
}
#choose {
  height: 30px;
  width: 310px;
  margin-top: 40px;
  line-height: 40px;
  border: none;
  border-bottom: 1px solid #e8e8e8;
}
select,
option {
  border: none;
  outline: none;
  color: #757575;
  font-size: 12px;
}
.assistlogin {
  margin: 0 10px 0 10px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.assistlogin span {
  color: #aaa;
}

</style>