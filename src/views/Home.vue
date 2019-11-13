<template>
    <div class="home">
       <div class="header">
           <div class="address_map">
               <img src="../assets/images/location.png" width="24" height="24">
               <span>广州</span>
               <img src="../assets/images/down.png" width="18" height="18">
           </div>
           <div class="search">
               <img src="../assets/images/search.png" width="24" height="24">
               搜索热门活动
           </div>
       </div>
    </div>
</template>

<script>
    export default {
        name:'home'
    }
</script>

<style scoped>
.home{
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
}
.header{
    background-color: #fff;
    padding: 16px;
    display: flex;
    align-items: center;
}
.header .address_map{
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.header .address_map img{
  margin: 0 3px;
  font-size: 18px;
}
.header .search{
    width: 270px;
    height: 24px;
    background-color: rgba(221,221,221,1);
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.header .search img{
    margin-left: 10px;
    margin-right: 10px;
}
</style>