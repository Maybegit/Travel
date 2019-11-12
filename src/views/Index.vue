<template>
  <div class="index">
     <router-view></router-view>
     <TabBar :data="tabbarData"></TabBar>
  </div>
</template>

<script>
import TabBar from '../components/Tabbar'
  export default {
    name:"Index",
    data() {
      return {
        tabbarData:[
                    {title:"首页",icon:'changyongicon-',path:"/home"},
                    {title:"活动",icon:'huodong',path:"/activity"},
                    {title:"我的",icon:'wode',path:"/me"}
                ]
      }
    },
    components:{
      TabBar
    }
  }
</script>

<style scoped>

</style>