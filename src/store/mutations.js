/*
直接更新state的多个方法的对象
*/

export default {

  //用户登录
  login(state, user) {
    state.user = user
  },
  
  //接受错误信息
  error(state, error) {
    state.error = error
  },

  //接受头部信息
  header(state, header) {
    state.header = header
  },

  // //接受当前选中的路径
  // path(state, path) {
  //   state.path = path
  // },

  //接收分类的数组
  category(state, category) {
    state.category = category
    if( category.length > 0 && category[0].parentId === '0') {
      state.category_first = category
    }
  },

  //接收数据可视化的数组
  vCharts(state, rows) {
    state.rows = rows
  }


}