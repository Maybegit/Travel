<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar title="精彩活动"/>
    <p class="drop-down" v-if="dropDown">立即刷新...</p>
    <div class="bscroll" ref="bscroll">
      <div class="container">
        <!-- 添加一个商品 -->
        <div class="product" v-for="(item,i) of list" :key="i">
          <img
            v-lazy="'http://lvxingzhe.applinzi.com/'+item.pic"
            class="img1"
            @click="jumpdetail"
            :data-tid="item.tid"
          />
          <!-- 介绍跟文字 -->
          <div class="title">
            <span class="title1">{{item.title}}</span>
            <div class="subtitle">{{item.detail}}</div>
            <div class="date">{{item.date1}}</div>
            <!-- 喜欢跟评论和价钱 -->
            <div>
              <img src="../assets/images/heart.png" alt class="heart" />
              <span class="hearttext">880</span>
              <img src="../assets/images/talk.png" class="heart" alt />
              <span class="hearttext">5000</span>
              <span class="price">{{item.price.toFixed(2)}}</span>
            </div>
          </div>
          <!-- 头像跟俱乐部 -->
          <div class="bottom">
            <img :src="domain+item.avatar" class="img2" alt />
            <span class="club">{{item.merchant}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { getActive } from "api/activity.js";
import formateDate from "utils/dateFormat.js";
export default {
  name: "activity",
  data() {
    //接收数据库的数据
    return {
      //创建一个空的数组，这个变量与上面的变量名字要一样
      list: [],
      //存储拆分数据
      dataArr: [],
      domain: "http://lvxingzhe.applinzi.com",
      dropDown: false,
      start: 0,
      end: 4
    };
  },
  created() {
    //获取活动列表数据
    this.loadData();
  },
  mounted() {
    this.scrollFn();
  },
  methods: {
    //跳转到详情页
    jumpdetail(e) {
      var tid = e.target.dataset.tid;
      this.$router.push({ name: "details", query: { tid: tid } });
    },
    loadData() {
      getActive().then(res => {
        //格式化日期
        res.map(item => {
          item.date1 = formateDate(item.date1);
        });
        this.dataArr = res;
        this.list = this.dataArr.slice(0, this.end);
      });
    },
    //上啦加载更多
    loadMore() {
      this.start = this.end;
      this.end += 4;
      this.list = this.list.concat(this.dataArr.slice(this.start, this.end));
    },
    scrollFn() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.bscroll, {
            click: true,
            scrollY: true,
            probeType: 3
          });
        } else {
          this.scroll.refresh();
        }
        this.scroll.on("scroll", pos => {
          //如果下拉超过50px 就显示下拉刷新的文字
          if (pos.y > 50) {
            this.dropDown = true;
          } else {
            this.dropDown= false;
          }
        });
        //touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
        this.scroll.on("touchEnd", pos => {
          // 下拉动作
          if (pos.y > 45) {
              this.dropDown = false;
              this.loadData();
              this.scroll.refresh();
              this.scroll.finishPullDown();
          }
          //上拉加载 总高度>下拉的高度+10 触发加载更多
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            //使用refresh 方法 来更新scroll  解决无法滚动的问题
            this.loadMore();
            this.scroll.refresh();
          }
        });
      });
    }
  }
};
</script>
<style scoped>
.van-nav-bar__title {
  margin-left: 21.5%;
}
.van-icon-arrow-left {
  color: #444444;
}
.bscroll {
  overflow: hidden;
  height: 600px;
}
.container {
  margin-bottom: 50px;
  box-sizing: border-box;
}
.product > .img1 {
  width: 36%;
  height: 82px;
  border-radius: 8px;
  margin-bottom: 10px;
}
.product {
  overflow: hidden;
  border-bottom: 1px #eeeeee solid;
  padding: 18px 0px 18px 18px;
}
.title {
  float: right;
  width: 60%;
}
.title1 {
  font-size: 15px;
  color: "#333333";
  font-weight: bold;

  line-height: 21px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.subtitle {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  font-size: 14px;
  color: "#4E4E4E";
  margin: 5px 0px 28px 0px;
  letter-spacing: 2px;
  line-height: 16px;
}
.date {
  margin-bottom: 18px;
}
.bottom {
  padding: 5px 0px 0px 0px;
  width: 35%;
}
.bottom > .img2 {
  width: 27px;
  height: 27px;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 5px;
}
.bottom2 {
  width: 50%;
}
.heart {
  width: 21px;
  height: 21px;
  vertical-align: middle;
  margin-right: 4px;
}
.hearttext {
  margin-right: 8px;
  color: #999999;
}
.price {
  color: #eb0b4e;
  font-weight: bold;
  font-size: 16px;
  margin-left: 28px;
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
.drop-down{
    position: absolute;
    top:0px;
    lefT:0px;
    width: 100%;
    height: 50px;
    line-height:50px;
    text-align: center;
    font-size:16px;
    color:#CCC;
    margin-top: 45px;
}
</style>