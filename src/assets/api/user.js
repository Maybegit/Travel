import axios from 'axios'
import {URL} from "../serviceAPI.js"

//用户登录
function login(data){
    return new Promise(
        function (resolve,reject){
            axios.get(URL.login,{params:data}).then(res=>{
                resolve(res)
            })
        }
    )
}

//用户注册
function register(data){
    return new Promise(
        function (resolve,reject){
            axios.post(URL.register,{params:data}).then(res=>{
                resolve(res)
            })
        }
    )
}
//我的收藏接口
function collect(uid){
    return new Promise(
        function (resolve,reject){
            axios.get(URL.collect,{params:{uid}}).then(res=>{
                resolve(res)
            })
        }
    )
}
//加入收藏接口
function collectadd(obj){
    return new Promise(
        function (resolve,reject){
            axios.get(URL.collectadd,{params:obj}).then(res=>{
                resolve(res)
            })
        }
    )
}
//取消收藏接口
function collectdelete(aid){
    return new Promise(
        function (resolve,reject){
            axios.get(URL.collectdelete,{params:{aid}}).then(res=>{
                resolve(res)
            })
        }
    )
}
//我的分享
function share(data){
    return new Promise(
        function (resolve,reject){
            axios.get(URL.share,{params:data}).then(res=>{
                resolve(res.data.result)
            })
        }
    )
}
//删除我的分享
function deleteShare(id){
    return new Promise(
        function (resolve,reject){
            axios.get(URL.deleteShare,{params:{id}}).then(res=>{
                resolve(res.data.result)
            })
        }
    )
}

//用户分享活动接口
function addShare(data){
    return new Promise(
        function (resolve,reject){
            axios.post(URL.addShare,{params:data}).then(res=>{
                resolve(res)
            })
        }
    )
}
//商家用户发布活动接口
function marchant(data){
    return new Promise(
        function (resolve,reject){
            axios.post(URL.marchant,{params:data}).then(res=>{
                resolve(res)
            })
        }
    )
}
//修改用户头像接口
function updateicon(obj){
    return new Promise(
        function (resolve,reject){
            axios.post(URL.updateicon,{params:obj}).then(res=>{
                resolve(res)
            })
        }
    )
}
//修改用户密码接口
function updateupwd(obj){
    return new Promise(
        function (resolve,reject){
            axios.get(URL.updateupwd,{params:obj}).then(res=>{
                resolve(res)
            })
        }
    )
}
//修改用户名接口
function updateuname(obj){
    return new Promise(
        function (resolve,reject){
            axios.get(URL.updateuname,{params:obj}).then(res=>{
                resolve(res)
            })
        }
    )
}
//已报名的活动接口
function join(uid){
    return new Promise(
        function (resolve,reject){
            axios.get(URL.join,{params:{uid}}).then(res=>{
                resolve(res)
            })
        }
    )
}
//取消已报名的活动接口
function joindelete(aid){
    return new Promise(
        function (resolve,reject){
            axios.get(URL.joindelete,{params:{aid}}).then(res=>{
                resolve(res)
            })
        }
    )
}

export{login,register,share,deleteShare,addShare,collect,marchant,updateicon,updateupwd,updateuname,collectdelete,collectadd,join,joindelete}