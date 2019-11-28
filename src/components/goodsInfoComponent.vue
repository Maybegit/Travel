<template>
    <div class="daily_info">
         <div class="daily_image" @click="goDetail">
            <img v-lazy="domain+dairyImage" width="100%" fit="contain"/>
        </div>
        <div class="daily_title">{{dairyTitle}}</div>
        <div class="user_info">
           <div class="user_head">
                <img :src="domain+avatar">
                <span class="username">{{uname}}</span>
           </div>
           <div class="collect" @click="like">
               <img src="../assets/images/heart.png" v-show="downIcon">
                <img src="../assets/images/heart2.png" v-show="!downIcon">
           </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"diaryInfo",
        props:[
            'dairyId',
            'dairyImage',
            'dairyTitle',
            'uname',
            'avatar'
        ],
        data() {
            return {
                domain: "http://lvxingzhe.applinzi.com",
                downIcon: true
            }
        },
        methods:{
            //获取数据
            goDetail(){
                // console.log(this.dairyId)
                //路由传日记id过去详情页
                this.$router.push({path:'/actdetail',query:{id:this.dairyId}})
            },
            // 是否点赞
            like(){
                 this.downIcon = !this.downIcon
            }
        }
    }
</script>

<style scoped>
.daily_info{
    width: 100%;
    margin-bottom: 30px;
}
.daily_info .daily_image img{
    width: 100%;
    height: 100px;
    border-radius: 8px;
}
.daily_info .daily_title{
    text-align: left;
    color: #333;
    font-size: 13px;
    margin: 10px 5px;
}
.daily_info .user_info{
    display: flex;
    justify-content: space-between;
}
.daily_info .user_info .user_head{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.daily_info .user_info .user_head img{
   width: 27px;
   height: 27px;
   border-radius: 50%;
}
.daily_info .user_info .user_head span{
    color: #333;
    margin-left: 10px;
}
.daily_info .user_info .collect img{
    width: 20px;
    height: 20px;
    margin-right: 10px;
}
</style>