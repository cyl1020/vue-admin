// 能发送异步ajax请求的函数模块
// 封装的是axios库
// 返回值是一个promise对象
// 优化： 统一处理异常

import axios from 'axios';

export default function ajax(url, data = {}, type = 'GET') {

  return new Promise((resolve, reject) => {
    let promise
    // 1. 执行异步ajax请求
    if (type === 'GET') { // 发GET请求
      promise = axios.get(url, { // 配置对象
        params: data // 指定请求参数
      })
    } else { // 发POST请求
      promise = axios.post(url, data)
    }
    // 2. 如果成功了, 调用resolve(value)
    promise.then(response => {
      resolve(response.data)
      // 3. 如果失败了, 不调用reject(reason), 而是提示异常信息
    }).catch(error => {
      // reject(error)
      this.$message({
        message: '请求出错了: ' + error.message,
        type: 'success'
      });
    })
  })


}