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
