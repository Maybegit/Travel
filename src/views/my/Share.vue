<template>
  <div>
    <van-nav-bar class="navbar" type="primary" title="我的分享" left-arrow @click-left="onClickLeft" />
    <p class="drop-down" v-if="dropDown">立即刷新...</p>
    <div class="bscroll" ref="bscroll">
      <div class="container">
        <div class="modulebox" v-for="(item,index) in list" :key="index">
          <div class="left">
            <div>
              <img class="leftimg" v-lazy="'http://lvxingzhe.applinzi.com/'+item.pic" alt />
            </div>
            <div class="leftbuttom">
              <img class="leftimg1" v-lazy="'http://lvxingzhe.applinzi.com'+item.avatar" alt />
              <span class="busname">旅行家俱乐部</span>
            </div>
          </div>
          <div class="right">
            <div>
              <span class="title">{{item.title}}</span>
              <p class="describe">{{item.detail}}</p>
            </div>
            <div class="rightbuttom">
              <div>
                <img class="loveimg" src="../../assets/images/love.png" alt />
                <span class="love">888</span>
                <img class="discussimg" src="../../assets/images/pingl.png" alt />
                <span class="discuss">1024</span>
              </div>
              <div>
                <van-button
                  @click="delData"
                  type="primary"
                  size="mini"
                  class="delbtn"
                  :data-id="item.id"
                >删除</van-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import { Dialog } from "vant";
import { share, deleteShare } from "api/user.js";
export default {
  name: "share",
  data() {
    return {
      list: [],
      //存储拆分数据
      dataArr: [],
      dropDown: false,
      start: 0,
      end: 4
    };
  },
  created() {
    //获取分享活动列表数据
    this.loadData();
  },
  mounted() {
    this.scrollFn();
  },
  methods: {
    onClickLeft() {
      this.$router.goBack();
    },
    loadData() {
      //获取session中的数据
      var userInfo = sessionStorage.getItem("userInfo");
      //将session中的数据转为对象
      userInfo = JSON.parse(userInfo);
      //获取session中的uid,作为参数请求
      var uid = userInfo.uid;
      var obj = { uid };
      share(obj)
        .then(res => {
          this.dataArr = res;
          this.list = this.dataArr.slice(0, this.end);
        })
        .catch(err => {});
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
            this.dropDown = false;
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
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            //使用refresh 方法 来更新scroll  解决无法滚动的问题
            this.loadMore();
            this.scroll.refresh();
          }
        });
      });
    },
    delData(e) {
      //交互确认提示框
      Dialog.confirm({
        title: "提示",
        message: "是否删除此活动?"
      })
        .then(() => {
          //确认的回调
          //自定义属性获取getData请求结果的id
          var id = e.target.dataset.id;
          deleteShare(id)
            .then(res => {
              location.reload();
            })
            .catch(err => {}); //取消的回调
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
.bscroll {
  overflow: hidden;
  height: 630px;
}
.van-nav-bar__text {
  color: #323233;
}
.van-icon-arrow-left {
  color: #07c160;
}
.van-icon {
  color: #ffffff;
}
.van-nav-bar__title {
  color: #fff;
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
.rightbuttom {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}
.loveimg {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  vertical-align: middle;
}
.discussimg {
  width: 19px;
  height: 19px;
  margin-left: 5px;
  margin-right: 5px;
  vertical-align: middle;
}
.delbtn {
  background-image: linear-gradient(to right, #4ae0d5, #56e7ad);
  border: none;
}
.drop-down {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  color: #ccc;
  margin-top: 45px;
}
</style>