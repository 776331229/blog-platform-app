/**
 * Created by zhangcheng on 29/05/2017.
 */

module.exports = {
    header:{
        method: 'POST',
        A:'1',
        headers:{
            // 'Content-Type': 'application/json;charset=utf-8',
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    },
    api: {
        base1: 'http://rapapi.org/mockjs/19824',
        base: 'http://192.168.2.75:3000',
        creations: '/api/videoList'
    }
}