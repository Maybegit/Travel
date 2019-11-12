import axios from 'axios'
import {URL} from "../serviceAPI.js"

function getIndexdata(){
    return new Promise(
        function (resolve,reject){
            axios({
                url:URL.getShoppingMallInfo,
                method:'get'
            }).then(res=>{
                resolve(res.data.message.data)
            })
        }
    )
}

export{getIndexdata}