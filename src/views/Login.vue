<template>
    <div class="content">
        <div class="top">
            <img class="photo" src="../assets/images/Icons8 Logo.png" alt="">
        </div>
        <div class="loginbox">
            <input v-model="uname" class="unameinput" type="text" placeholder="请输入登陆账号">
            <input v-model="upwd" class="upwdinput" type="text" placeholder="请输入登陆密码">
            <van-button @click="login" class="logininput" type="primary" size="large">登陆</van-button>
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        login(){
            var reg = /^[a-z0-9]{3,9}$/i;
            var uname = this.uname;
            var upwd = this.upwd;
            if (!reg.test(uname)) {
            this.$messagebox("消息", "用户名格式不正确");
            return;
            }
            if (!reg.test(upwd)) {
            this.$messagebox("消息", "密码格式不正确");
            return;
            }
            var obj={uname,upwd};
            this.axios.get("/user/login",{params:obj})
            .then((res)=>{
                console.log(res)
            })
            .catch((err)=>{
            })
        }
    },
    data(){
        return {
            uname:"",
            upwd:""
        }
    }
}
</script>
<style scoped>
.content{
    margin:150px 30px 0 30px;
}
.loginbox{
    margin-top: 20px;
}
.unameinput{
    width:310px;
    height:30px;
    border:none;
    border-bottom: 1px solid #e8e8e8;

}
.upwdinput{
    margin-top: 20px;
    width:310px;
    height:30px;
    border:none;
    border-bottom: 1px solid #e8e8e8;
}
.logininput{
    height:40px;
    text-align: center;
    margin-top:20px; 
    border-radius: 30px;
}
</style>

