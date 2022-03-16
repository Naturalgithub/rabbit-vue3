import { createStore } from 'vuex'
import category from './modules/category'
export default createStore({
  strict: true,
  modules: { category }
})
