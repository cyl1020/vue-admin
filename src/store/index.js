import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}, //当前登录用户的信息
    error: '', //用户登录错误的信息
    header: '首页', //header信息
    category: [], //当前分类的信息
    category_first: [], //当前分类的信息
    rows: []
  },
  mutations,
  actions,
  modules: {
  }
})
