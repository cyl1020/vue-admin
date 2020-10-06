/*
包含n个日期时间处理的工具函数模块
*/

/*
  格式化日期
*/
export function formateDate(time) {
  if (!time) return ''
  let date = new Date(time)
  let getMonth = date.getMonth()  < 9 ? '0' + (date.getMonth() + 1) : date.getMonth()
  let getMinutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  let getSeconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  
  return date.getFullYear() + '-' + getMonth + '-' + date.getDate()
    + ' ' + date.getHours() + ':' + getMinutes + ':' + getSeconds
}