//发送异步请求的模块
import {
  login,
  reqCategorys
} from '../api';

export default {
  //登录的异步请求
  async login({
    commit
  }, payload) {
    const {
      username,
      password
    } = payload
    const result = await login(username, password)
    if (result.status === 0) {
      const user = result.data
      commit('login', user)
    } else {
      const error = result.msg
      commit('error', error)
    }
  },

  //获取一级或某个二级分类列表
  async getCategory({
    commit
  }, parentId) {
    const result = await reqCategorys(parentId)
    if (result.status === 0) {
      const category = result.data
      commit('category', category)
    }
  },

  //获取商品数据并生成一个用于数据可视化的数组
  async vCharts({commit}) {
    const result = await reqCategorys("0");
    if (result.status === 0) {
      const rows = result.data.map(item => {
        let number1 = parseInt((Math.random() + 1) * 5000);
        let number2 = parseInt((Math.random() + 1) * 2500);
        let index = Math.floor(Math.random() * 4)
        return {
          商品: item.name,
          访问用户: number1,
          下单用户: number2,
          下单率: number2 / number1,
          type: ['', 'success', 'info', 'warning', 'danger'][index],
          name: item.name
        };
      });
      commit('vCharts', rows)
    }
  }

}