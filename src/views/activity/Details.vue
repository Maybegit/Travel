<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar title="活动详情" left-arrow @click-left="onClickLeft" />
    <div class="dingwei1"></div>
    <div class="dingwei">
      <img v-lazy="'http://lvxingzhe.applinzi.com/'+pic[0]" class="img1" v-if="isLoad" />
      <div class="top2">
        <div class="title">{{list.title}}</div>
        <div class="detailtext">{{list.detail}}</div>
        <div class="middle">
          <div class="text2">
            <div class="text2_2">人数:50</div>
          </div>
          <div class="text1">
            <div>地点:湖北省武汉市</div>
            <div>活动日期:{{dateTime}}</div>
          </div>
        </div>
      </div>
      <div class="total">
        <img class="imgshare" v-lazy="'http://lvxingzhe.applinzi.com/'+avatar" v-if="isLoad" />
        <span>{{merchant}}俱乐部</span>
        <div class="share">
          <img src="../../assets/images/share.png" class="img2" />
          <span>分享</span>
        </div>
      </div>
      <div class="total1">
        <div class="detailtext1">详情介绍</div>
        <div
          class="details1"
        >武夷山，武夷山位于江西与福建西北部两省交界处，武夷山脉北段东南麓总面积999.75平方公里，是中国著名的风景旅游区和避暑胜地。属典型的丹霞地貌，是首批国家级重点风景名胜区之一。</div>
        <img v-lazy="'http://lvxingzhe.applinzi.com/'+pic[1]" class="detail1" v-if="isLoad" />

        <div class="detailtext2">景色介绍</div>
        <div
          class="details1"
        >武夷山，武夷山位于江西与福建西北部两省交界处，武夷山脉北段东南麓总面积999.75平方公里，是中国著名的风景旅游区和避暑胜地。属典型的丹霞地貌，是首批国家级重点风景名胜区之一。</div>
        <img v-lazy="'http://lvxingzhe.applinzi.com'+pic[2]" class="detail1" v-if="isLoad" />
        <!-- 固定定位 -->
      </div>
      <div class="bottom0">
        <div class="bottom1">
          总计:
          <span class="price">¥{{price.toFixed(2)}}</span>
          <van-button type="danger" @click="showPopup">立即报名</van-button>
          <van-popup v-model="show" class="pop">
            <h1>请确认信息</h1>
            <input type="text" v-model="uname" class="unameinput" />
            <input type="text" v-model="phone" class="telinput" placeholder="请输入手机号码" />
            <div class="opt-btn">
              <button @click="cancel" class="cancel">取消</button>
              <button @click="signup" class="sure">确认</button>
            </div>
          </van-popup>
        </div>
        <div class="bottom">
          <img
            v-if="isClick==0"
            src="../../assets/images/collect1.png"
            class="collect"
            @click="change"
          />
          <img
            v-if="isClick==1"
            src="../../assets/images/collect2.png"
            class="collect"
            @click="change"
            :disabled="disabled"
          />
          <span class="text3">{{n}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import formateDate from "utils/dateFormat.js";
import { getActiveDetail, joinadd } from "api/activity.js";
import { collectadd } from "api/user.js";
export default {
  data() {
    return {
      disabled: false,
      merchant: "",
      tid: "", //1.每个接收前面的参数都要给空字符接收
      list: {},
      price: 0,
      pic: [],
      n: 0,
      isClick: "",
      isLoad: false,
      date: "",
      show: false,
      phone: "",
      uname: "",
      uid: "",
      avatar: ""
    };
  },
  created() {
    this.tid = this.$route.query.tid;
    this.uid = JSON.parse(sessionStorage.getItem("userInfo")).uid;
    getActiveDetail(this.tid).then(res => {
      console.log(res)
      this.list = res[0];
      this.price = res[0].price;
      this.date = this.list.date2;
      this.avatar = this.list.avatar;
      this.merchant = this.list.merchant;
      this.pic = this.list.pic.split("+"); //切割成数组
      this.isLoad = true;
      this.uname = JSON.parse(sessionStorage.getItem("userInfo")).uname;
      this.phone = JSON.parse(sessionStorage.getItem("userInfo")).phone;
    });
    this.axios
      .get("user/collected", {
        params: {
          uid: this.uid,
          tid: this.tid
        }
      })
      .then(res => {
        if (res.data.code == 1) {
          this.n = 1;
          this.isClick = 1;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    //格式化日期
    dateTime() {
      return formateDate(this.date);
    }
  },

  methods: {
    cancel() {
      this.show = false;
    },
    showPopup() {
      this.show = true;
    },
    signup() {
      var signphone = /^((\+86|0086)\s+)?1[3-9]\d{9}$/;
      if (!signphone.test(this.phone)) {
        this.$toast("手机号码格式不正确");
        return;
      }
      if (this.uname !== "") {
        var obj = {
          uname: this.uname,
          uid: this.uid,
          phone: this.phone,
          tid: this.tid
        };
        joinadd(obj)
          .then(res => {
            if (res.data.code == 1) {
              this.$toast("报名成功");
              this.$router.push("/myactivity");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      this.show = false;
    },
    change() {
      if (this.isClick == 0) {
        var obj = {
          uname: this.uname,
          uid: this.uid,
          tid: this.tid
        };
        collectadd(obj)
          .then(res => {
            
          })
          .catch(err => {
            console.log(err);
          });
        this.isClick = 1;
        this.clickNum = this.clickNum + 1;
        this.n += 1;
        this.$toast("已收藏");
        this.$router.push("/collect");
      }
    },
    //返回页面
    onClickLeft() {
      this.$router.goBack();
    }
  }
};
</script>
<style scoped>
.pop {
  height: 200px !important;
  padding: 20px;
}
.pop h1 {
  font-size: 16px;
}
.pop .unameinput {
  width: 80%;
  height: 20px;
  margin-top: 20px;
  border-top: none;
  border-left: none;
  border-right: none;
  font-size: 14px;
}
.pop .opt-btn {
  margin: 30px;
  color: #fff;
  font-size: 14px;
}
.pop .cancel {
  width: 100px;
  height: 30px;
  border-radius: 12px;
  background-color: #666;
  border: none;
  margin-right: 20px;
  background-color: #ee0a24;
}
.pop .sure {
  width: 100px;
  height: 30px;
  border-radius: 12px;
  background-color: #666;
  border: none;
  background-color: #27d798;
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
.total1 > .details1 {
  color: #444444;
  margin-bottom: 10px;
  font-size: 14px;
}
.total1 {
  padding: 20px 20px 20px 20px;
  margin-bottom: 45px;
}
.total {
  padding: 0px 20px 10px 20px;
  border-bottom: #eeeeee 4px solid;
}
.top {
  width: 375px;
  border-bottom: 1px solid #eeeeee;
  position: fixed;
}
.van-nav-bar__title {
  margin-left: 21.5%;
}
.van-icon-arrow-left {
  color: #444444;
}
.img1 {
  width: 100%;
  height: 200px;
}
.top2 {
  padding: 14px 20px 15px;
}

.title {
  color: #333333;
  font-size: 16px;
  font-weight: bolder;
  line-height: 22px;
  margin-bottom: 10px;
}
.detailtext {
  color: #444444;
  font-size: 14px;
  margin-bottom: 10px;
  font-weight: bolder;
  line-height: 21px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.text1 {
  color: #777777;
  font-size: 13px;
  line-height: 20px;
  width: 40%;
}
.text2 {
  color: #777777;
  font-size: 13px;
  line-height: 19px;
  float: right;
}
.text2_2 {
  margin-left: 2.5px;
}

.img2 {
  width: 18px;
  height: 18px;
  vertical-align: middle;
  margin-right: 5px;
}
.detail1 {
  width: 100%;
}
.van-button {
  background-color: #eb0b4e;
}
.price {
  color: #eb0b4e;
  font-size: 16px;
  margin-right: 8px;
}
.bottom {
  width: 48%;
  position: absolute;
  top: 32%;
  padding-left: 10px;
}
.collect {
  width: 22px;
  height: 22px;
  vertical-align: middle;
  margin-left: 8px;
}
.total > .imgshare {
  width: 27px;
  height: 27px;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 5px;
}
.middle > span {
  color: #444444;
  font-size: 13px;
  margin-top: 10px;
}
.share {
  float: right;
}
.button {
  width: 130px;
  height: 50px;
  background-color: #eb0b4e;
}
.bottom1 {
  float: right;
}
.text3 {
  margin-left: 8px;
  margin-top: 5px;
}
.bottom0 {
  position: fixed;
  bottom: 0px;
  width: 100%;
  background: #ffffff;
}
.detailtext1 {
  color: #333333;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 15px;
}
.detailtext2 {
  color: #333333;
  font-size: 15px;
  font-weight: bold;
  margin: 10px 0px;
}
.van-nav-bar {
  background-image: linear-gradient(to right, #4ae0d5, #56e7ad);
}
.van-nav-bar__title {
  color: #fff;
}
.van-icon-arrow-left {
  color: rgb(255, 255, 255);
}
</style>