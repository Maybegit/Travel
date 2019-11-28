<template>
  <div>
    <van-nav-bar class="navbar" type="primary" title="修改密码" left-arrow @click-left="onClickLeft" />
    <div class="container">
      <!--   旧密码 -->
      <div>
        <input
          v-validate="'required|npwda'"
          :class="{'input': true, 'is-danger': errors.has('npwda') }"
          name="npwda"
          type="text"
          placeholder="输入旧密码"
          class="input1"
          v-model="oldPwd"
        />
        <div class="fixed">
          <span v-show="errors.has('npwda')" class="help1 is-danger"></span>
        </div>
      </div>
      <!-- 新密码 -->
      <div>
        <input
          v-validate="'required|npwd'"
          v-model="newPwd"
          :class="{'input': true, 'is-danger': errors.has('npwd') }"
          name="npwd"
          type="text"
          placeholder="6到12位字母和数字组合新密码"
          class="input1"
        />
        <div class="fixed">
          <span v-show="errors.has('npwd')" class="help1 is-danger">{{ errors.first('npwd') }}</span>
        </div>
      </div>
      <!-- 确认密码 -->
      <div>
        <input
          v-validate="'required|npwdo'"
          v-model="againPwd"
          :class="{'input': true, 'is-danger': errors.has('npwda') }"
          name="npwdo"
          type="text"
          placeholder="确认密码"
          class="input1"
        />
        <div class="fixed">
          <span v-show="errors.has('npwdo')" class="help1 is-danger">{{errMsg}}</span>
        </div>
      </div>
      <van-button size="large" @click="submit">确认修改</van-button>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant';
import {updateupwd} from 'api/user.js';
export default {
  name:"Editpwd",
  data() {
    return {
      oldPwd: "",
      newPwd: "",
      againPwd: "",
      errMsg:""
    };
  },
  methods: {
    submit() {
      if(this.oldPwd==this.newPwd){
        Toast("新密码和旧密码不能一样");
        return false;
      }
      if (this.newPwd !== this.againPwd) {
        this.errMsg = "两次密码不一样";
        return false;
      }
      if(this.errors.first('npwd')){
         Toast("请输入6-12位数字和字母组合密码")
         return false;
      }
     var uid = JSON.parse(sessionStorage.getItem("userInfo")).uid;
      var obj={
          uid:uid,
          oldpwd:this.oldPwd,
          newpwd:this.newPwd
      }
      updateupwd(obj)
      .then(res=>{
             if(res.data.code==1){
            this.$router.push("/login")
            sessionStorage.removeItem("userInfo")
         }else if(res.data.code == -1){
            Toast("原密码不正确");
         }
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
  margin: 50px 0px 0px 20px;
  background-image: linear-gradient(to right, #4ae0d5, #56e7ad);
  color: #fff;
  border-radius: 4px;
}
.help1 {
  color: #ff0000;
  margin-left: 15px;
  font-size: 13px;
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