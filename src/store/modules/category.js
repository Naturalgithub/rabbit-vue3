import { findAllCategory } from '@/api/category'

export default {
  namespaced: true, // 使用模块中的mutations、getters、actions时候，要加上模块名
  state: () => {
    return {
      list: []
    }
  },
  // 加载数据成功后需要修改list所以需要mutations函数
  mutations: {
    setList (state, payload) {
      state.list = payload
    }
  },
  // 需要向后台加载数据，所以需要actions函数获取数据
  actions: {
    async getList ({ commit }) {
      const { result } = await findAllCategory()
      // 获取数据成功，提交mutations进行数据修改
      commit('setList', result)
    }
  }
}
