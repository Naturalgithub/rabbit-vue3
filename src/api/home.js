/*
 * @Date: 2022-03-24 09:12:30
 * @LastEditTime: 2022-03-24 09:12:30
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
