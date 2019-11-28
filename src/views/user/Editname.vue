<template>
  <div>
    <van-nav-bar class="navbar" type="primary" title="修改用户名" left-arrow @click-left="onClickLeft" />
    <div class="container">
        <input
          type="text"
          placeholder="输入新用户名(3-9位字母和数字)"
          class="input1"
          v-model="uname"
        />
      <van-button size="large" @click="submit">确认修改</van-button>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant';
import {updateuname} from 'api/user.js';
export default {
  name:"Editname",
  data() {
    return {
       uname:""
    };
  },
  methods: {
    submit() {
      var reg =  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{3,9}$/;//字母和数字3-9位
      var uname = this.uname;
      var uid = JSON.parse(sessionStorage.getItem("userInfo")).uid;
       var oldname = JSON.parse(sessionStorage.getItem("userInfo")).uname;
      if(!reg.test(uname)){
         Toast("请输入3-9位数字和字母组合用户名");
         return false;
      }
      if(uname==oldname){
         Toast("新用户名不能与旧用户名一样");
         return false;
      }
    
      var obj={
          uid:uid,
          uname:this.uname
      }
      updateuname(obj)
      .then(res=>{
        console.log(res)
        this.$router.push("/login")
        sessionStorage.removeItem("userInfo")
      }).catch(err=>{
         console.log(err)
      })
    },
    onClickLeft() {
      this.$router.goBack();
    }
  }
};
</script>
<style scoped>
.fixed {
  width: 100%;
  height: 20px;
}
.van-button--primary {
  border: none;
}
.van-button {
  width: 90%;
  margin: 30px 0px 0px 20px;
  background-image: linear-gradient(to right, #4ae0d5, #56e7ad);
  color: #fff;
  border-radius: 4px;
}
.container {
  background-color: #f6f6f6;
  height: 667px;
  padding: 10px 0px;
}
.input1 {
  width: 96%;
  height: 40px;
  margin-bottom: 8px;
  border: none;
  padding-left: 15px;
  font-size: 14px;
}
.van-nav-bar__title {
  color: #fff;
}
.van-icon-arrow-left {
  color: rgb(255, 255, 255);
}
.van-nav-bar {
  width: 100%;
  height: 46px;
  background-image: linear-gradient(to right, #4ae0d5, #56e7ad);
}
</style>