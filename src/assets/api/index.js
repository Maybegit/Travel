import axios from 'axios'
import { URL } from "../serviceAPI.js"

//首页旅行日记接口
function getActivities(obj) {
    return new Promise(
        function (resolve, reject) {
            axios.get(URL.getActivities, {params:obj}).then(res => {
                resolve(res)
            })
        }
    )
}
//首页旅行日记详情接口
function getDetail(id) {
    return new Promise(
        function (resolve, reject) {
            axios.get(URL.getDetail, { params: { id } }).then(res => {
                resolve(res.data.result)
            })
        }
    )
}

export { getDetail,getActivities}
