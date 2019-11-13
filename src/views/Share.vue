<template>
  <div class="share">
    <div class="title">
      <van-cell-group>
        <van-field v-model="title" placeholder="请输入标题" />
      </van-cell-group>
    </div>
    <div class="content">
      <van-cell-group>
        <van-field
          v-model="message"
          rows="2"
          autosize
          label="描述"
          type="textarea"
          maxlength="50"
          placeholder="请输入活动描述"
          show-word-limit
        />
      </van-cell-group>
    </div>
    <div class="file">
      <van-uploader
        :before-read="beforeRead"
        :after-read="afterRead"
        v-model="fileList"
        class="file"
      />
    </div>
    <div class="submit">
      <input type="button" class="submit_btn" value="保存"/>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "share",
  data() {
    return {
      fileList: [],
      message: "",
      title: ""
    };
  },
  methods: {
    // 返回布尔值
    beforeRead(file) {
      if (file.type !== "image/jpeg") {
        Toast("请上传 jpg 格式图片");
        return false;
      }

      return true;
    },

    // 返回 Promise
    asyncBeforeRead(file) {
      return new Promise((resolve, reject) => {
        if (file.type !== "image/jpeg") {
          Toast("请上传 jpg 格式图片");
          reject();
        } else {
          resolve();
        }
      });
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    }
  }
};
</script>

<style scoped>
.share {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.title {
  width: 90%;
  margin: 0 auto;
}
.content {
  width: 90%;
  margin: 30px auto;
}
.file {
  width: 90%;
  margin: 20px auto;
}
.submit {
  width: 90%;
  margin: 0 auto;
}
.submit_btn {
  width: 300px;
  height: 47px;
  background: rgba(0, 163, 255, 1);
  box-shadow: 0px 0px 2px 0px rgba(0, 163, 255, 0.5);
  border-radius: 28px;
  color: #fff;
  font-size: 16px;
  border: none;
}
</style>    