import request from '@/utils/request'

/**
 * @description: 获取所有的分类数据
 * @return {*} Promise
 */
export const findAllCategory = () => {
  return request({
    method: 'get',
    url: '/home/category/head'
  })
}

/**
 * 获取热门品牌数据
 * @param {*} limit 获取品牌的数量
 * @returns Promise
 */
export function findBrand (limit = 6) {
  return request({
    method: 'get',
    url: '/home/brand',
    params: {
      limit
    }
  })
}
