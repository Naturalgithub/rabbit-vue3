/*
 * @Date: 2022-03-17 14:13:13
 * @LastEditTime: 2022-03-17 14:21:15
 * @LastEditors: hahake
 * @Description:
 * @FilePath: \rabbit-vue3\src\mock\index.js
 * 佛祖、耶稣、真主、我党保佑永无BUG！
 */
import Mock from 'mockjs'

Mock.setup({
  // 设置一个延迟时间区间
  timeout: '500-1000'
})

// 参数1：url地址，需要正则匹配
// 参数2：请求方式
// 参数3：生成数据的函数
Mock.mock()
