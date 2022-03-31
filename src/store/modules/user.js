/*
 * @Date: 2022-03-31 11:22:19
 * @LastEditTime: 2022-03-31 11:23:48
 * @LastEditors: hahake
 * @Description:
 * @FilePath: \rabbit-vue3\src\store\modules\user.js
 * 佛祖、耶稣、真主、我党保佑永无BUG！
 */
export default {
  namespaced: true,
  state: {
    profile: {}
  },
  mutations: {
    setProfile (state, payload) {
      state.profile = payload
    }
  }
}
