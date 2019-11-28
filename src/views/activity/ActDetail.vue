<template>
  <div class="detail">
    <van-nav-bar title="日记详情" left-arrow @click-left="onClickLeft" />
    <div class="banner">
       <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in imgs" :key="index">
          <img v-lazy="domain+item" fit="cover"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="info" v-for="(item,index) of details" :key="index">
      <div class="title">
        <p>{{item.title}}</p>
      </div>
      <div class="user-info">
        <div class="left">
          <img v-lazy="domain+item.avatar" width="48" height="48" />
          <div class="desc">
            <p>{{item.uname}}</p>
            <p class="collect">288人收藏</p>
          </div>
        </div>
        <div class="date">{{dateTime}}</div>
      </div>
      <div class="detail-info">
            <p>{{item.detail}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {getDetail} from 'api/index.js'
import formateDate from 'utils/dateFormat.js'
export default {
  name: "actDetail",
  data() {
    return {
      id: "",
      imgs: [],
      domain: "http://lvxingzhe.applinzi.com/",
      details: [],
      date:''
    };
  },
  created() {
    //截取路由id后的参数
    this.id = this.$route.query.id;
    // 请求日记详情数据
    getDetail(this.id).then(res=>{
      this.details = res;
      this.imgs = res[0].pic.split("+")
      this.date = res[0].date;
    })
  },
  computed:{
    //格式化日期
    dateTime(){
      return formateDate(this.date)
    }
  },
  methods: {
    //返回上一页
    onClickLeft() {
      this.$router.goBack();
    }
  }
};
</script>

<style scoped>
.detail {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.detail .banner img {
  width: 100%;
  height: 180px;
}
.info .title {
  width: 100%;
  font-size: 16px;
  color: #333;
  padding: 10px;
  font-weight: 200;
  box-sizing: border-box
}
.user-info {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
  align-items: center;
  color: #333;
  border-bottom: 1px solid #dddddd;
  padding-bottom: 20px;
}
.user-info .left {
  display: flex;
}
.user-info .left img {
  border-radius: 50%;
}
.user-info .left .desc {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 5px;
  line-height: 20px;
}
.user-info .left .collect {
  color: #eb0b4e;
}
.user-info .date {
  margin-right: 20px;
  margin-top: 20px;
  font-size: 16px;
}
.detail-info{
    width: 100%;
    color: #333;
    font-size: 16px;
    line-height: 25px;
    padding: 16px;
    box-sizing: border-box;
}
.van-nav-bar {
    background-image: linear-gradient(to right ,#4ae0d5, #56e7ad);
}
.van-nav-bar__title {
  color: #fff;
}
.van-icon-arrow-left {
  color: rgb(255, 255, 255);
}
</style>