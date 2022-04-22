import request from '@/utils/request'

/**
 * 获取新的商品信息
 * @param {String} skuId - 商品SKUID
 * @returns Promise
 */
export const getNewCartGoods = (skuId) => {
  return request({
    method: 'get',
    url: `/goods/stock/${skuId}`
  })
}

/**
 * cart展开购物车的时候根据skuId得到（specs,sku）渲染商品规格
 * 获取商品的specs和skus
 * @param {String} skuId - 商品SKUID
 * @returns Promise
 */
export const getSpecsAndSkus = (skuId) => {
  return request({
    method: 'get',
    url: `/goods/sku/${skuId}`
  })
}

/**
 * 合并购物车
 * @param {Array <object>} carList - 本地购物车组
 * @param {String} item.skuId - 商品的skuId
 * @param {Boolean} item.selected - 商品是否被选中
 * @param {Integer} item.count - 商品数量
 * @returns Promise
 */
export const mergeLocalCart = (carList) => {
  return request({
    method: 'post',
    url: '/member/cart/merge',
    data: carList
  })
}

/**
 * 获取登录后的购物车列表
 * @returns Promise
 */
export const findCartList = () => {
  return request({
    method: 'get',
    url: '/member/cart'
  })
}

/**
 * 加入购物车
 * @param {String} skuId - 商品SKUID
 * @param {Integer} count - 商品数量
 * @returns Promise
 */
export const insertCart = ({ skuId, count }) => {
  return request({
    method: 'post',
    url: '/member/cart',
    data: { skuId, count }
  })
}

/**
 * 删除商品（支持批量删除）
 * @param {Array<string>} ids - skuId集合
 * @returns Promise
 */
export const deleteCart = (ids) => {
  return request({
    method: 'delete',
    url: '/member/cart',
    data: {
      ids
    }
  })
}

/**
 * 修改购物车商品的状态和数量
 * @param {String} goods.skuId - 商品sku
 * @param {Boolean} goods.selected - 选中状态
 * @param {Integer} goods.count - 商品数量
 * @returns Promise
 */
export const updateCart = (goods) => {
  return request({
    method: 'put',
    url: '/member/cart/' + goods.skuId,
    data: goods
  })
}

/**
 * 全选反选
 * @param {Boolean} selected - 选中状态
 * @param {Array<string>} ids - 有效商品skuId集合
 * @returns Promise
 */
export const checkAllCart = ({ selected, ids }) => {
  return request({
    method: 'put',
    url: '/member/cart/selected',
    data: { selected, ids }
  })
}
