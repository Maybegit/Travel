<template>
  <div>
    <van-nav-bar class="navbar" type="primary" title="我的发布" left-arrow @click-left="onClickLeft" />
    <div class="modulebox">
      <div class="left">
        <div>
          <img class="leftimg" src="../../assets/images/banner_03.png" alt />
        </div>
        <div class="leftbuttom">
          <img class="leftimg1" src="../../assets/images/jiejie.png" alt />
          <span class="busname">旅行家俱乐部</span>
        </div>
      </div>
      <div class="right">
        <div>
          <span class="title">哈哈哈</span>
          <p class="describe">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈呵呵呵呵呵呵呵呵呵呵呵呵</p>
        </div>
        <div class="rightbuttom">
          <span class="date">2019-11-16</span>
          <van-button size="mini" type="primary" class="delbtn">取消发布</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mypublish",
  methods: {
    onClickLeft() {
      this.$router.goBack();
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
</style>