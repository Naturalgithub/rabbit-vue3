/*
 * @Date: 2022-03-24 09:12:30
 * @LastEditTime: 2022-03-28 14:09:37
 * @LastEditors: hahake
 * @Description:
 * @FilePath: \rabbit-vue3\src\api\home.js
 * 佛祖、耶稣、真主、我党保佑永无BUG！
 */
import request from '@/utils/request'
/**
 * 获取首页轮播图数据
 * @returns Promise
 */
export function findBanner () {
  return request({
    method: 'get',
    url: '/home/banner'
  })
}

/**
 * 新鲜好物
 * @returns Promise
 */
export function findNew () {
  return request({
    method: 'get',
    url: 'home/new'
  })
}

/**
 * 人气推荐
 * @returns Promise
 */
export function findHot () {
  return request({
    method: 'get',
    url: 'home/hot'
  })
}

/**
 * 获取商品数据
 * @returns Promise
 */
export function findGoods () {
  return request({
    method: 'get',
    url: 'home/goods'
  })
}

/**
 * 获取专题数据
 * @returns Promise
 */
export function findSpecial () {
  return request({
    method: 'get',
    url: 'home/special'
  })
}
