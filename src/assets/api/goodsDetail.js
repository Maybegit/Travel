import axios from 'axios'
import {URL} from "../serviceAPI.js"

function getGoodsDetail(id){
    return new Promise(
        function (resolve,reject){
            axios({
                url:URL.getGoodsDetails,
                data:{goodsId:id},
                method:'post'
            }).then(res=>{
                resolve(res.data)
            })
        }
    )
}

export{getGoodsDetail}