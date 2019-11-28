<template>
  <div>
    <van-nav-bar class="navbar" type="primary" title="我的活动" left-arrow @click-left="onClickLeft" />
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
          <van-button size="mini" type="primary" class="delbtn" @click="cancel" :data-aid="item.aid">取消报名</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {join,joindelete} from 'api/user.js';
export default {
  name: "myactivity",
  data() {
    return {
      list: []
    };
  },
  created() {
    this.onload();
  },
  methods: {
    formateDate(datetime) {
      function addDateZero(num) {
          return (num < 10 ? "0" + num : num);
      }
      let d = new Date(datetime);
      let formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate());
      return formatdatetime;
    },
    cancel(e){
      var aid = e.target.dataset.aid;
      joindelete(aid)
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
        join(uid)
        .then(res => {
          if(res.data.code == -1){
            this.$toast("没有参加的活动");
            setTimeout(()=>{
              this.$router.push("/activity")
            },2000)
          }
          this.list = res.data.result;
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
</style>