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
        base: 'http://192.168.2.21:3000',
        creations: '/api/videoList'
    },
    theme: { // 主题相关的配置
        skinColor : '#7fd2c5', // 主题颜色
        bgColor: '#f7f7f7' // 背景颜色
    }
}