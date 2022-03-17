// 用来生成分类相关模拟数据的
import { topCategory } from '@/api/constants'
import Mock from 'mockjs'

const images = [
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(1).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(2).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(3).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(4).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(5).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(6).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(7).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(8).png'
]

const getHeadCategroy = () => {
  // 得到模拟数据，并且返回出去
  // 1. 导入常量：顶级分类
  // 2. 生成和后台数据一致的顶级分类数据
  // 3. 在每一个顶级分类下生成10二级分类
  // 注意：生成的数据要随机，例如，id保持唯一，图片随机的给 ...

  const topCategoryList = topCategory.map((item) => {
    // Mock.mock() 传入一个对象，对象的值可以使用mockjs的规则语法

    // 生成10条二级分类数据
    const children = []
    for (let index = 0; index < Mock.mock('@integer(1,10)'); index++) {
      console.log(index)

      children.push(
        Mock.mock({
          name: '@cname',
          id: '@id',
          // 预备几张图，随机取出即可
          picture: images[Mock.mock('@integer(0,7)')]
        })
      )
    }

    return Mock.mock({
      id: '@id',
      name: item,
      children
    })
  })
  return {
    msg: '获取头部分类成功',
    result: topCategoryList
  }
}

export default {
  // key ===> 生成数据的函数
  headCategory: getHeadCategroy
}
