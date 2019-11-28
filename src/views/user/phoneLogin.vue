<template>
  <div class="content">
    <div class="top">
      <div class="loginfont">登录</div>
      <span @click="jupphone">切换至账号密码登录</span>
    </div>
    <div class="loginbox">
      <input v-model="tel" type="text" class="unameinput" placeholder="请输入手机号码" />
      <input v-model="vcode" type="text" class="upwdinput" placeholder="请输入验证码" />
      <van-button @click="getvcode" class="sendinput" type="primary"  :disabled="disabled">{{sendbtn}}</van-button>
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
export default {
  data() {
    return {
      tel:"",
      vcode:"",
      vCode:"",
      selected: "-1", //select选中的值
      options: [
        { text: "请选择身份", value: "-1" },
        { text: "普通用户", value: "1" },
        { text: "商家用户", value: "0" }
      ],
      isuser: "-1",
       sendbtn:"发送验证码",
       disabled:true
    };
  },
  watch:{
    tel:function(){
      var reg = /^((\+86|0086)\s+)?1[3-9]\d{9}$/;
      if (reg.test(this.tel)) {
        this.disabled=false
      }else{
        this.disabled=true
      }
    }
  },
  methods: {
    //登录
    login() {
      if(this.selected == -1){
        Toast("请选择身份")
        return;
      }
      if(this.vcode !== this.vCode){
        Toast("验证码错误");
        return
      }else{
        var obj = {tel:this.tel,isuser:this.isuser}
        this.axios.get('/phone/login', {params:obj})
        .then(res => {
          if (res.data.code == 1) {
            //将获取到的结果转为字符串
            const userInfo = JSON.stringify(res.data.result[0]);
            //将结果保存到session中
            sessionStorage.setItem("userInfo", userInfo);
            //登录成功后跳转到我的页面
            this.$router.push("/me");
          } else {
            Toast("用户名和密码有误");
          }
        })
        .catch(err => {});
      }
    },
    //获取验证码
    getvcode() {
      var reg = /^((\+86|0086)\s+)?1[3-9]\d{9}$/;
      var tel = this.tel;
      if (!reg.test(tel)) {
        Toast("用户名格式不正确");
        return;
      }
      this.validateBtn();
      var obj = { tel };
      Toast("验证码已发送");
      this.axios.post("/getvcode", { params: tel })
        .then(res => {
          this.vCode = res.data.vcode
        })
        .catch(err => {});
    },
    getvalue(e) {
      this.isuser = e.target.value;
    },
    goregister() {
      this.$router.push("/register");
    },
    gome() {
      this.$router.push("/me");
    },
    jupphone() {
      this.$router.push("/Login");
    },
    //60秒倒计时
     validateBtn() {
      let time = 60;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          this.sendbtn = "获取验证码";
          this.disabled = false;
        } else {
          // 倒计时
          this.sendbtn = time + "秒后重试";
          this.disabled = true;
          time--;
        }
      }, 1000);
  },
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
  margin-bottom: 10px;
}
.unameinput {
  width: 310px;
  height: 30px;
  border: none;
  border-bottom: 1px solid #e8e8e8;
}
.upwdinput {
  margin-top: 40px;
  width: 199px;
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
.sendinput{
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