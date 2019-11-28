const LOCALURL = "http://lvxingzhe.applinzi.com/";
const URL = {
    //首页旅行日记接口
    getActivities:LOCALURL+"index/share/more",
    //首页旅行日记详情页接口
    getDetail:LOCALURL+"index/share/detail",
    //活动页面接口
    getActive:LOCALURL+"active",
    //活动页面详情接口
    getActiveDetail:LOCALURL+"active/detail",
    //登录接口
    login:LOCALURL+"user/login",
    //注册接口
    register:LOCALURL+"user/register",
    //我的分享接口
    share:LOCALURL+"user/share",
    //我的收藏接口
    collect:LOCALURL+"user/collect",
    //加入收藏接口
    collectadd:LOCALURL+"user/collect/add",
    //取消收藏接口
    collectdelete:LOCALURL+"user/collect/delete",
    //删除我的分享接口
    deleteShare:LOCALURL+"user/share/delete",
    //用户分享活动接口
    addShare:LOCALURL+"user/share/add",
    //商家用户发布活动接口
    marchant:LOCALURL+"active/merchant/publish",
    //修改用户头像接口
    updateicon:LOCALURL+"user/updateicon",
    //修改用户密码接口
    updateupwd:LOCALURL+"user/updateupwd",
    //修改用户名接口
    updateuname:LOCALURL+"user/updateuname",
    //已报名的活动接口
    join:LOCALURL+"user/join",
    //取消已报名的活动接口
    joindelete:LOCALURL+"user/join/delete",
    //用户报名活动接口
    joinadd:LOCALURL+"user/join/add"

}
export {URL}