import { createStore } from 'vuex'
import category from './modules/category'
import user from './modules/user'
import cart from './modules/cart'
import createPersistedState from 'vuex-persistedstate'
export default createStore({
  strict: true,
  modules: { category, user, cart },
  plugins: [
    // 默认存储在localstorage中
    createPersistedState({
      key: 'rabbit-vue',
      paths: ['user', 'cart']
    })
  ]
})
