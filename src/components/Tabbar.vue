<template>
   <div class="tabbar">
    <router-link
      class="tab-item"
      v-for="(item,index) in data"
      :key="index"
      :to="item.path"
      active-class="is-selected"
    >
      <div class="tab-item-icon">
         <i :class="'iconfont icon-' + item.icon"></i>
      </div>
      <div class="tab-item-label">{{item.title}}</div>
    </router-link>
  </div>
</template>

<script>
    export default {
        name:'tabbar',
        props:{
            data:Array
        }
    }
</script>

<style scoped>
.tabbar{
    height: 45px;
    box-sizing: border-box;
    width: 375px;
    position: fixed;
    bottom: 0;
    display: flex;
    background-image: linear-gradient(
    180deg,
    #d9d9d9,
    #d9d9d9 50%,
    transparent 0
  );
   background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-color: #fafafa;
  text-align: center;
}
.tab-item{
    display: block;
    padding: 3px 0;
    flex: 1;
}
.tab-item-icon {
  width: 24px;
  height: 24px;
  margin: 0 auto;
}
.tab-item-icon i{
  font-size: 22px;
}
.tab-item-label {
  color: inherit;
  font-size: 10px;
  line-height: 1;
}
a {
  text-decoration: none;
  color: #8e8e8e;
}
.is-selected {
  color: #27D798;
}
</style>