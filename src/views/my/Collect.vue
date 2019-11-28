<template>
  <div>
    <van-nav-bar class="navbar" type="primary" title="我的收藏" left-arrow @click-left="onClickLeft" />
    <div class="modulebox" v-for="(item,i) in list" :key="i">
      <div class="left">
        <div>
          <img class="leftimg" v-lazy="'http://lvxingzhe.applinzi.com'+item.pic" alt />
        </div>
        <div class="leftbuttom">
          <img class="leftimg1" v-lazy="'http://lvxingzhe.applinzi.com'+item.avatar" alt />
          <span class="busname">{{item.merchant}}俱乐部</span>
        </div>
      </div>
      <div class="right">
        <div>
          <span class="title">{{item.title}}</span>
          <p class="describe">{{item.detail}}</p>
        </div>
        <div class="rightbuttom">
          <span class="date">{{formateDate(item.date1)}}</span>
          <van-button size="mini" type="primary" class="delbtn" @click="cancel" :data-aid="item.aid">取消收藏</van-button>
          <van-button size="mini" type="primary" class="delbtn" @click="showPopup" :data-atid="item.atid">立即报名</van-button>
         <van-popup v-model="show" class="pop">
            <h1>请确认信息</h1>
            <input type="text" v-model="uname" class="unameinput">
            <input type="text"  v-model="phone" class="telinput" placeholder="请输入手机号码">
            <div class="opt-btn">
               <button @click="makeno" class="cancel">取消</button>
               <button @click="signup" class="sure">确认</button>
            </div>
          </van-popup>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {collect,collectdelete} from 'api/user.js';
import {joinadd} from 'api/activity.js';
export default {
  name: "myactivity",
  data() {
    return {
      tid:"",
      phone:"",
      uname:"",
      show:false,
      list: []
    };
  },
  created() {
    this.onload();
  },
  methods: {
    makeno(){
      this.show = false;
    },
    formateDate(datetime) {
      function addDateZero(num) {
        return (num < 10 ? "0" + num : num);
      }
      let d = new Date(datetime);
      let formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate());
      return formatdatetime;
    },
    showPopup(e){
      this.tid = e.target.dataset.atid;
      this.show = true;
    },
    hidePopup(){
      this.show =false;
    },
    signup(){
      var uid = JSON.parse(sessionStorage.getItem("userInfo")).uid
      var uname = JSON.parse(sessionStorage.getItem("userInfo")).uname
      var phone = this.phone;
      var tid = this.tid;
      var obj={uid,uname,phone,tid}
     joinadd(obj)
      .then(res=>{
        if(res.data.code == 1){
          this.$toast("报名成功");
          this.$router.push("/myactivity")
        }else{
          this.$toast("出现了点小问题");
        }
      })
      .catch(err=>{
        console.log(err)
      })
    },
    cancel(e){
      var aid = e.target.dataset.aid;
     collectdelete(aid)
      .then(res=>{
        this.$toast("取消成功")
        this.onload()
      })
      .catch(err=>{
        console.log(err)
      })
    },
    onload() {
      var uid = JSON.parse(sessionStorage.getItem("userInfo")).uid;
      collect(uid)
        .then(res => {
          console.log(res)
          if(res.data.code == -1){
            this.$toast("没有收藏的活动");
            setTimeout(()=>{
              this.$router.push("/activity")
            },2000)
          }
          this.list = res.data.result;
          this.uname = JSON.parse(sessionStorage.getItem("userInfo")).uname;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onClickLeft() {
      this.$router.push("/me");
    }
  }
};
</script>

<style scoped>
.van-nav-bar__text {
  color: #323233;
}
.van-icon-arrow-left {
  color: #07c160;
}
.van-icon {
  color: #07c160;
}
.van-nav-bar {
  background-image: linear-gradient(to right, #4ae0d5, #56e7ad);
}
.modulebox {
  margin: 33px 14px 0 22px;
  padding: 5px;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  justify-content: space-between;
}
.leftbuttom {
  margin-top: 10px;
}
.leftimg {
  width: 122px;
  height: 92px;
  border-radius: 10px;
}
.leftimg1 {
  width: 27px;
  height: 27px;
  vertical-align: middle;
  border-radius: 50px;
}
.busname {
  margin-left: 8px;
  font: 12px PingFang SC;
  color: #4e4e4e;
}
.right {
  flex-direction: column !important;
}
.title {
  font: 15px PingFang SC;
  color: #000;
}
.describe {
  font: 15px PingFang SC;
  color: #4e4e4e;
  width: 199px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin-top: 8px;
}
.date {
  font: 12px PingFang SC;
  color: #4e4e4e;
}
.rightbuttom {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}
.van-nav-bar__title {
  color: #fff;
}
.van-icon-arrow-left {
  color: rgb(255, 255, 255);
}
.delbtn {
  width: 60px;
  height: 30px;
  border-radius: 3px;
  border: none;
  background-image: linear-gradient(to right, #4ae0d5, #56e7ad);
}
.pop{
  height: 200px !important;
  padding: 20px;
}
.pop h1{
  font-size: 16px;
}
.pop .unameinput{
  width: 80%;
  height: 20px;
  margin-top: 20px;
  border-top: none;
  border-left: none;
  border-right: none;
  font-size: 14px;
}
.pop .opt-btn{
  margin: 30px;
  color: #fff;
  font-size: 14px;
}
.pop .cancel{
  width: 100px;
  height: 30px;
  border-radius: 12px;
  background-color: #666;
  border: none;
  margin-right: 20px;
  background-color: #ee0a24;
}
.pop .sure{
  width: 100px;
  height: 30px;
  border-radius: 12px;
  background-color: #666;
  border: none;
  background-color: #27D798;
}

.telinput {
  width: 310px;
  height: 30px;
  margin-top: 20px;
  border-top: none;
  border-left: none;
  border-right: none;
  font-size: 14px;
}
</style>