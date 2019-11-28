import axios from 'axios'
import {URL} from "../serviceAPI.js"

// 活动列表页
function getActive(){
    return new Promise(
        function (resolve,reject){
            axios({
                url:URL.getActive,
                method:'get'
            }).then(res=>{
                resolve(res.data.result)
            })
        }
    )
}

//活动详情页
function getActiveDetail(tid){
    return new Promise(
        function (resolve,reject){
            axios.get(URL.getActiveDetail,{params:{tid}}).then(res=>{
                resolve(res.data.result)
            })
        }
    )
}
//报名活动接口
function joinadd(obj){
    return new Promise(
        function (resolve,reject){
            axios.get(URL.joinadd,{params:obj}).then(res=>{
                resolve(res)
            })
        }
    )
}
export{getActive,getActiveDetail,joinadd}