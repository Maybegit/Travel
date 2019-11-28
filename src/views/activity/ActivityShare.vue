<template>
  <div>
    <van-nav-bar title="分享活动"/>
    <div class="share">
      <div class="title">
        <van-cell-group>
          <van-field v-model="title" placeholder="请输入活动标题" label="分享名称" left-icon="label-o" />
        </van-cell-group>
      </div>
      <div class="content">
        <van-cell-group>
          <van-field
            v-model="detail"
            rows="2"
            autosize
            label="分享描述"
            type="textarea"
            maxlength="300"
            placeholder="请输入活动描述"
            show-word-limit
            left-icon="notes-o"
          />
          <!-- 上传照片 -->
          <div class="title2 title1">
            <van-uploader
              v-model="fileList"
              :before-read="beforeRead"
              multiple
              :max-count="4"
              accept="image/*"
            />
          </div>
        </van-cell-group>
      </div>
     <!--<van-loading size="24px" type="spinner" color="#1989fa">活动分享中...</van-loading> -->
     <!-- 按钮 -->
      <div class="submit">
        <van-button class="submit-btn" @click="submit" v-if="finish">立即分享</van-button>
        <van-button class="submit-btn" loading type="info" loading-text="分享中..." v-else></van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast,Loading} from "vant";
import {addShare} from 'api/user.js';
export default {
  name: "activityShare",
  data() {
    return {
      detail: "",
      title: "",
      fileList: [],
      pic: [],
      finish:true
    };
  },
  methods: {
    //返回上一级
    onClickLeft() {
      this.$router.push("/");
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
    submit() {
      //遍历用户上传的所有图片拿到base64格式编码 然后格式化
      this.finish=false
      var arr = this.fileList;
      for (var i = 0; i < arr.length; i++) {
        this.pic.push(arr[i].content.replace(/^data:image\/\w+;base64,/, ""));
      }
      //立即分享
      var uid = JSON.parse(sessionStorage.getItem("userInfo")).uid;
      var uname = JSON.parse(sessionStorage.getItem("userInfo")).uname;
      var avatar = JSON.parse(sessionStorage.getItem("userInfo")).avatar;
      if (this.title && this.detail && this.fileList) {
        var data = {
                      uid,
                      uname,
                      detail: this.detail,
                      title: this.title,
                      pic: this.pic,
                      avatar
                    }
          addShare(data)
          .then(res => {
            this.finish=false;
            Toast("活动分享成功!");
            this.$router.push("/home");
          });
      } else {
        Toast("每项内容必须填写完整!");
      }
    }
  }
};
</script>

<style scoped>
.van-nav-bar__text {
  color: #ffffff;
  font-weight: bold;
}
.share {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background-color: #f7f7f7;
  padding-top: 20px;
  margin-bottom: 45px;
}
.title {
  width: 100%;
  margin-top: 10px auto;
}
.content {
  width: 100%;
  margin: 10px auto 0;
}
.file {
  width: 100%;
  margin: 10px auto;
}
.submit {
  width: 90%;
  margin: 100px auto;
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
}
.title1 {
  font-size: 14px;
  padding: 0px 18px;
  color: #323233;
}
.title2 {
  margin: 15px 0 0;
}
.title {
  margin-bottom: 5px;
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