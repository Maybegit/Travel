<template>
  <div>
    <van-nav-bar title="发布活动"/>
    <div class="container">
      <!-- 基本信息 -->
      <div>
        <span class="title1">基本信息</span>
        <!-- 用户名 -->
        <van-cell-group>
          <van-field
            v-model="merchant"
            clearable
            label="发布者"
            placeholder="请输入发布者"
            @click-right-icon="$toast('question')"
          />
          <van-field
            v-model="price"
            clearable
            label="价格"
            placeholder="请输入活动价格"
            @click-right-icon="$toast('question')"
          />
          <van-field
            v-model="title"
            clearable
            label="标题"
            placeholder="请输入活动标题"
            @click-right-icon="$toast('question')"
          />
        </van-cell-group>
        <!-- 详情 -->
        <van-cell-group>
          <van-field
            v-model="detail"
            rows="2"
            autosize
            label="描述"
            type="textarea"
            maxlength="300"
            placeholder="请输入活动描述"
            show-word-limit
          />
        </van-cell-group>
      </div>
      <!-- 活动信息 -->
      <div>
        <span class="title1">活动开始时间</span>
        <!-- 活动开始时间 -->
        <van-cell @click="showPopup(1)" v-model="date1">{{date1}}</van-cell>
        <van-popup v-model="show1" :style="{ height: '40%' }" position="bottom">
          <van-datetime-picker
            v-model="currentDate1"
            type="date"
            @confirm="confirmFn(1)"
            @cancel="cancelFn"
          />
        </van-popup>
      </div>
      <div>
        <span class="title1">活动结束时间</span>
        <!-- 活动结束时间 -->
        <van-cell @click="showPopup(2)" v-model="date2">{{date2}}</van-cell>
        <van-popup v-model="show2" :style="{ height: '40%' }" position="bottom">
          <van-datetime-picker
            v-model="currentDate2"
            type="date"
            @confirm="confirmFn(2)"
            @cancel="cancelFn"
          />
        </van-popup>
      </div>
      <!-- 上传照片 -->
      <div class="title2 title1">上传照片</div>
      <div class="file">
        <van-uploader
          v-model="fileList"
          :before-read="beforeRead"
          multiple
          :max-count="4"
          accept="image/*"
        />
      </div>
      <div class="submit">
        <van-button class="submit-btn" @click="submit" v-if="finish">立即发布</van-button>
        <van-button class="submit-btn" loading type="info" loading-text="发布中..." v-else></van-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import {marchant} from 'api/user.js'
export default {
  data() {
    return {
      title:"",
      price:"",
      merchant: "",
      detail: "",
      fileList: [],
      show1: false,
      show2: false,
      pic: [],
      date1: "请选择活动开始时间",
      date2:"请选择活动结束时间",
      currentDate1: new Date(),
      currentDate2: new Date(),
      finish:true
    };
  },
  methods: {
    confirmFn(i) {
      if(i == 1) {
        this.date1 = this.timeFormat(this.currentDate1);
        this.show1 = false
      } else {
        this.date2 = this.timeFormat(this.currentDate2)
        this.show2 = false
      }
      if(this.date2.split("-") < this.date1.split("-")){
          this.show2 = true
          Toast("结束时间不能小于开始时间");
          return;
      }
    },
    cancelFn(){
      this.show1 = false;
      this.show2 = false;
    },
    timeFormat(time) { // 时间格式化 2019-09-08
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return year + '-' + month + '-' + day;
    },
    mounted() {
      this.timeFormat(new Date());
    },
    beforeRead(file) {
      //上传之前校验
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        Toast("只允许上传jpg/png格式的图片！");
        return false;
      }
      return true;
    },
    // 返回 Promise
    asyncBeforeRead(file) {
      return new Promise((resolve, reject) => {
        if (file.type !== "image/jpeg" && file.type !== "image/png") {
          Toast("请上传 jpg/png 格式图片");
          reject();
        } else {
          resolve();
        }
      });
    },
    showPopup(val) {
      val == 1 ? this.show1 = true: this.show2 = true;
      if(val == 2 && this.date1 == "请选择活动开始时间"){
        this.show2 = false;
        Toast("请先选择活动开始时间")
        return;
      }
    },
    submit() {
      this.finish=false
      //遍历用户上传的所有图片拿到base64格式编码 然后格式化
      var arr = this.fileList;
      for (var i = 0; i < arr.length; i++) {
        this.pic.push(arr[i].content.replace(/^data:image\/\w+;base64,/, ""));
      }
      //立即分享
      var uid = JSON.parse(sessionStorage.getItem("userInfo")).uid;
      var uname = JSON.parse(sessionStorage.getItem("userInfo")).uname;
      var avatar = JSON.parse(sessionStorage.getItem("userInfo")).avatar;
      if(this.date2.split("-") < this.date1.split("-")){
        Toast("结束时间不能小于开始时间");
        return;
      }
      if (this.title && this.detail && this.fileList && this.merchant && this.title && this.date1 !== "请选择活动开始时间" && this.date2 !== "请选择活动结束时间") {
        var data = { 
                      uid,
                      uname,
                      detail: this.detail,
                      title: this.title,
                      pic: this.pic,
                      avatar,
                      date1:this.date1,
                      date2:this.date2,
                      merchant:this.merchant,
                      price:this.price
                  }
          marchant(data)
          .then(res => {
            this.finish=true;
            Toast("活动分享成功!");
            this.$router.push("/activity");
          });
      } else {
        Toast("每项内容必须填写完整!");
      }
    }
  }
};
</script>
<style  scoped>
.container {
  padding: 10px 20px;
  background-color: #f6f6f6;
  margin-bottom: 45px;
}
.title1 {
  font-size: 15px;
}
.van-field {
  margin-top: 8px;
  margin-bottom: 10px;
}
.van-nav-bar__text {
  color: #fff;
}
.title2 {
  margin-bottom: 8px;
}
.van-cell {
  margin-top: 10px;
  margin-bottom: 12px;
}
.van-nav-bar {
    background-image: linear-gradient(to right ,#4ae0d5, #56e7ad);
}
.van-nav-bar__title {
  color: #fff;
}
.submit-btn {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-image: linear-gradient(to right ,#4ae0d5, #56e7ad);
  box-shadow: 0px 0px 2px 0px rgba(0, 163, 255, 0.5);
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  margin-bottom: 45px;
}
</style>