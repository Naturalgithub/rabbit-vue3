import { getNewCartGoods } from '@/api/cart'
import { Message } from '@/components'
export default {
  namespaced: true,
  state: {
    // 存放购物车的列表
    list: []
  },
  getters: {
    // 有效商品列表
    validList (state) {
      return state.list.filter((item) => item.stock > 0 && item.isEffective)
    },
    // 有效商品件数
    validTotal (state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0)
    },
    // 有效商品总金额
    validAmount (state, getters) {
      return (
        getters.validList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) /
        100
      )
    },
    // 无效商品列表
    invalidList (state) {
      return state.list.filter((item) => !(item.stock > 0 && item.isEffective))
    },
    // 选中商品列表
    selectedList (state, getters) {
      return getters.validList.filter((item) => item.selected)
    },
    // 选中商品件数
    selectedTotal (state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 选中商品总金额
    selectedAmount (state, getters) {
      return (
        getters.selectedList.reduce(
          (p, c) => p + c.nowPrice * 100 * c.count,
          0
        ) / 100
      )
    },
    // 是否全选
    isCheckAll (state, getters) {
      return (
        getters.validList.length === getters.selectedList.length &&
        getters.selectedList.length !== 0
      )
    }
  },
  mutations: {
    // 加入购物车
    /*
    payload的参数
    id: 商品的id
    name: 商品的名字
    picture: 商品的图片
    price： 加入时的价格
    count: 加入购物车的商品的数量
    skuId： 选择的商品的sku
    attrsText: 商品的规格的字符串  颜色：蓝色 尺寸：30cm
    selected: 商品是否选中
    nowPrice： 商品最新的价格
    stock： 商品的库存
    isEffective： 商品是否有效

    1. 判断payload中的skuId在list中是否存在
    2. 如果有，就把数量加上，，，把这件商品放到最上面
    3. 如果没有，就把这个商品放到列表的最前面。
  */
    insertCart (state, payload) {
      const index = state.list.findIndex((item) => item.skuId === payload.skuId)
      if (index > -1) {
        // 说明购物车中已经有相同的商品
        payload.count += state.list[index].count
        // 把购物车中那件商品给删除
        state.list.splice(index, 1)
      }
      state.list.unshift(payload)
    },
    // 更新购物车商品信息
    updateCart (state, goods) {
      // console.log(goods)
      const sku = state.list.find((item) => item.skuId === goods.skuId)
      Object.keys(goods).forEach((k) => {
        if (goods[k] !== null && goods[k] !== undefined && goods[k] !== '') {
          sku[k] = goods[k]
        }
      })
    },
    // 删除购物车商品
    deleteCart (state, skuId) {
      const index = state.list.findIndex((item) => item.skuId === skuId)
      state.list.splice(index, 1)
    }
  },
  actions: {
    // 添加至购物车
    insertCart (context, payload) {
      return new Promise((resolve, reject) => {
        // 判断用户是否登录，如果用户登录，发送请求，，否则提交mutaions
        if (context.rootState.user.profile.token) {
          // 用户登录账号
          // TODO 发送请求
        } else {
          context.commit('insertCart', payload)
          resolve()
        }
      })
    },
    // 更新购物车
    updateCart (ctx) {
      // 发送请求，更新购物车中所有的商品信息
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录TODO
        } else {
          // 没有登录，需要发送请求进行商品信息更新
          const requestArr = ctx.state.list.map((item) => {
            return getNewCartGoods(item.skuId)
          })
          Promise.all(requestArr).then((res) => {
            res.forEach((item, index) => {
              ctx.commit('updateCart', {
                skuId: ctx.state.list[index].skuId,
                ...item.result
              })
            })
            resolve()
          })
        }
      })
    },
    // 删除购物车商品
    deleteCart (ctx, skuId) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录TODO
        } else {
          Message({ text: '删除成功' })
          ctx.commit('deleteCart', skuId)
          resolve()
        }
      })
    },
    // 修改购物车商品属性
    updateChange (context, payload) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          // 登录TODO
        } else {
          context.commit('updateCart', payload)
        }
      })
    },
    // 选择全部反选
    checkAllCart (context, selected) {
      if (context.rootState.user.profile.token) {
        // 登录TODO
      } else {
        // 遍历有效的列表的 再去更新购物车
        context.getters.validList.forEach((item) => {
          context.commit('updateCart', { skuId: item.skuId, selected })
        })
      }
    }
  }
}
