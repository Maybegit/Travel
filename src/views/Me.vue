<template>
<div class="content">
    <div class="top">
        <img class="photo" src="../assets/images/photo.png" alt="">
        <span class="title" @click="handlelogin">点击登陆或者注册</span>
    </div>
    <div class="listbox">
        <van-cell icon="star-o" title="我的收藏" is-link value="收藏行程、地点、脚印" />
        <van-cell icon="logistics" title="我的行程" is-link />
        <van-cell icon="eye-o" title="最近浏览" is-link />
        <van-cell icon="aim" title="我的目的地" is-link value="去过、想去" />
        <van-cell icon="chat-o" title="目的地评价" is-link value="评价过的目的地" />
        <van-cell icon="location-o" title="离线地图" is-link value="下载离线地图" />
        <van-cell icon="award-o" title="我的活动" is-link  />
        <van-cell icon="friends-o" title="我的约伴" is-link  />
    </div>
</div>
</template>

<script>
export default {
    name:'me',
    methods: {
        handlelogin(){
            this.$router.push("/login")
        }
    },
}
</script>
<style scoped>
.content{
    padding: 10px
} 
.top{
    margin-top:30px;
    text-align: center;
}
.photo{
    display: block;
    margin:0 auto;
    margin-bottom:20px;
    /* vertical-align: middle; */
}
.title{
    margin-top:20px;
    color: #000;
    font-size:14px;
}
.listbox{
    margin-top: 40px;
}
</style>