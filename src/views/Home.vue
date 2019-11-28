<template>
  <div class="home">
    <div class="top">
      <div class="header">
      <div class="address-map" @click="$router.push({name: 'address',params: {city: city}})">
        <img src="../assets/images/location.png" width="18" height="18" />
        <span>{{address.length>0?address:'定位中'}}</span>
        <img src="../assets/images/down.png" width="18" height="18" />
      </div>
    </div>
    <!-- 搜索区域 -->
     <div class="search">
        <img src="../assets/images/search.png" width="24" height="24" />
        <input type="text" placeholder="搜索热门活动">
    </div>
  </div>
   
    <!--我的日记 -->
    <div class="my-diary">
      <div class="diary-title">我的日记</div>
      <div class="diary-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for=" (item ,index) in myDiary" :key="index">
            <div class="diary-item">
              <img :src="item.image"/>
              <div class="daily-detail">{{item.daily_Name}}</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!--旅行活动-->
    <div class="travel-diary">
      <div class="t-title">
        <div class="left">旅行日记</div>
        <div class="right">
          <span>最热</span>最新
        </div>
      </div>
      <div class="t-body">
          <van-row gutter="10">
            <van-col span="12" v-for="(item,index) in dailyInfo" :key="index">
              <goods-info
                :dairyId="item.id"
                :dairyImage="item.pic"
                :dairyTitle="item.title"
                :uname="item.uname"
                :avatar ="item.avatar"
              ></goods-info>
            </van-col>
          </van-row>
      </div>
    <div class="opt">
        <button @click="loadMore" v-if="next">加载更多</button>
        <button @click="loadMore" v-else>没有更多数据啦!</button>
    </div>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css"
import { swiper, swiperSlide } from "vue-awesome-swiper"
import goodsInfo from 'components/goodsInfoComponent'
import { Button } from 'vant'
import {getActivities} from 'api/index.js'
export default {
  name: "home",
  data() {
    return {
      slider: [],
      swiperOption: {
        slidesPerView: "3",
        loop:true,
　　　　　　autoplay:{
　　　　　　　　delay: 10000,
　　　　　　　　stopOnLastSlide: false,
　　　　　　　　/* 触摸滑动后是否继续轮播 */
　　　　　　　　disableOnInteraction: false
　　　　　　},
　　　　　　pagination: {
　　　　　　　　el: '.swiper-pagination'
　　　　　　},
      },
      myDiary: [
        {
          daily_Name: "九寨沟风景区",
          image: require("assets/images/a1.jpg")
        },
        {
          daily_Name: "肇庆七星岩风景区",
          image: require("assets/images/a2.jpg")
        },
        {
          daily_Name: "湛江湖光岩风景区",
          image: require("assets/images/a3.jpg")
        },
        {
          daily_Name: "凤凰山风景区",
          image: require("assets/images/a4.jpg")
        },
        {
          daily_Name: "泰山风景区",
          image: require("assets/images/a5.jpg")
        },
        {
          daily_Name: "桂林山水风景区",
          image: require("assets/images/a6.jpg")
        }
      ],
      dailyInfo:[],
      pno: 0,
      pageCount:'',
      next:false
    };
  },
  created() {
     // 请求旅行日记数据
    this.getActivity();
  },
  methods: {
    // 请求旅行日记数据
    getActivity() {
      this.pno++;
      var obj = { pno: this.pno };
     getActivities(obj).then(res =>{
      if(res.data.code==1&&res.data.rows!=""){
         this.next=true;
         console.log(res)
         this.dailyInfo = this.dailyInfo.concat(res.data.rows);
         this.pageCount = res.data.rows.pageCount;
      }else{
        this.next = false;  
      }
    });
   },
   //加载更多旅行日记
    loadMore(){
      if(this.next){
         this.getActivity()
      }
    }
  },
  computed: {
    address() {
      return this.$store.getters.address;
    },
    city() {
      return (
        this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.district
      );
    }
  },
  components: {
    swiper,
    swiperSlide,
    goodsInfo
  }
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background-color: #f5f5f5;
}
.top{
  width: 100%;
  height: 180px;
  background: url("../assets/images/bgc.png") no-repeat;
  background-size:cover;
  position: relative;
}
.header {
  padding: 6px;
  display: flex;
  align-items: center;

}
.header .address-map {
  width: 100%;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.header .address-map img {
  margin: 0 3px;
  font-size: 18px;
}
.header .address-map span {
  display: block;
}
.search {
  width: 90%;
  margin: 126px auto;
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 1px 5px rgba(159,159,159,0.8);
  padding: 4px;
}
.search img {
  margin-left: 10px;
  margin-right: 10px;
}
.search input{
  border: none;
  text-align: left;
  background: #fff;
}
.my-diary {
  background-color: #fff;
  padding-top: 30px;
  box-sizing: border-box;
}
.diary-title {
  font-size: 14px;
  padding: 12px 8px;
  color: #707070;
}
.diary-body {
  padding: 6px 5px 20px;
}
.diary-item {
  width: 110px;
  height: 100px; 
  background: rgba(255, 255, 255, 1);
  text-align: center;
  border-radius: 8px;
  box-shadow: 2px 2px 5px rgba(159, 159, 159, 0.5);
  margin: 2px auto;
  font-size: 12px;
}
.daily-detail {
  padding: 10px 5px;
}
.diary-item img {
  width: 100%;
  height: 60px;
  border-radius: 8px;
  border-bottom-right-radius:0;
  border-bottom-left-radius:0;
}
.travel-diary{
   background-color: #fff;
   box-sizing: border-box;
   padding: 10px 10px;
}
.t-title{
  display: flex;
  justify-content: space-between;
}
.t-title .left{
  color: #707070;
  font-size: 14px;
}
.t-title .right span{
  color: #27D798;
  margin-right: 10px;
}
.t-body{
  width: 100%;
  margin-top: 20px;
}
.t-body .list{
  width: 100%;
  text-align: center;
}

.opt button{
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-radius: 10px;
  background-image: linear-gradient(to right ,#4ae0d5, #56e7ad);
  color: #fff;
  font-size: 16px;
  border: none;
  margin-bottom: 45px;
}
</style>