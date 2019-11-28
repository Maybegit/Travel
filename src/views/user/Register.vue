<template>
  <div class="content">
    <div class="top">
      <span class="loginfont">注册</span>
    </div>
    <div class="loginbox">
      <input v-model="uname" class="unameinput" type="text" placeholder="请输入注册账号(3-9位字母和数字组合)" />
      <input v-model="upwd" class="upwdinput" type="text" placeholder="请输入登陆密码(6-12位字母和数字组合)" />
      <input v-model="phone" class="phoneinput" type="text" placeholder="请输入11位手机号码" />
      <select name="chooses " id="choose" v-model="selected" @click="getvalue">
        <option v-for="(item,index) in options" :value="item.value" :key="index">{{ item.text }}</option>
      </select>
      <van-button @click="register" class="logininput" type="primary" size="large">快速注册</van-button>
      <div class="stopregister" @click="gologin">暂不注册</div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import {register} from 'api/user.js';
export default {
  data() {
    return {
      uname: "",
      upwd: "",
      phone: "",
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
    getvalue(e) {
      this.isuser = e.target.value;
    },
    register() {
      var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{3,9}$/;//字母和数字3-9位
      var regpwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$///6-12位数字和字母组合
      var regphone = /^((\+86|0086)\s+)?1[3-9]\d{9}$/;
      var uname = this.uname;
      var upwd = this.upwd;
      var phone = this.phone;
      var isuser = this.isuser;
      if (!reg.test(uname)) {
        Toast("请输入3-9位数字和字母组合用户名");
        return;
      }
      if (!regpwd.test(upwd)) {
        Toast("请输入6-12位数字和字母组合密码");
        return;
      }
      if (!regphone.test(phone)) {
        Toast("手机号码格式不正确");
        return;
      }
      if (isuser == -1) {
        Toast("请选择身份类型");
        return;
      }
      var obj = { uname, upwd, phone, isuser };
      register(obj)
        .then(res => {
          Toast("注册成功,正在跳转登录页");
          this.$router.push("/login");
        })
        .catch(err => {});
    },
    gologin() {
      this.$router.push("/login");
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
.phoneinput {
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
.stopregister {
  color: #757575;
  margin-top: 20px;
  margin: 15px 0 0 250px;
}
</style>

