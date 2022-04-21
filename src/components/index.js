// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
// 这就是插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展
import { h, render } from 'vue'
import XtxMessage from './xtx-message'
import XtxConfirm from './xtx-confirm.vue'

export default {
  install (app) {
    // 在app上进行扩展，app提供 component directive 函数
    // 如果要挂载原型 app.config.globalProperties 方式
    // app.component(XtxSkeleton.name, XtxSkeleton)
    // 1. 加载components下所有的vue文件
    const ctx = require.context('./', false, /\.vue$/)
    ctx.keys().forEach((item) => {
      // item: 组件的地址  ctx(item) 导入这个组件
      const component = ctx(item).default
      app.component(component.name, component)
    })

    // 图片懒加载 自定义指令
    // 定义指令
    // <img :src="item.src" alt="" />
    // <img v-lazy="item.src" alt="" />
    app.directive('lazy', {
      mounted (el, { value }) {
        // 图片的懒加载逻辑
        // 参数1：回调函数
        // 参数2：可选的配置
        const observer = new IntersectionObserver(
          ([{ isIntersecting }], observer) => {
            if (isIntersecting) {
              // 停止监听
              observer.unobserve(el)
              // 给el元素设置src属性
              el.src = value
              // 如果图片加载失败，显示默认的图片
              el.onerror = function () {
                el.src = require('@/assets/images/200.png')
              }
            }
          },
          {
            threshold: 0
          }
        )
        observer.observe(el)
      }
    })
  }
}

// 动态的给body创建一个盒子
const div = document.createElement('div')
div.setAttribute('class', 'xtx-message-container')
document.body.appendChild(div)
let timer = null
export function Message ({ type, text, duration = 2000 }) {
  // 渲染XtxMessage组件
  // <XtxMessage :type="type" :text="text"></XtxMessage>
  const vNode = h(XtxMessage, { type, text })
  render(vNode, div)

  // 开启延时器
  clearTimeout(timer)
  timer = setTimeout(() => {
    // 删除虚拟DOM
    render(null, div)
  }, duration)
}

// 动态的给body创建一个盒子
const confirmDiv = document.createElement('div')
confirmDiv.setAttribute('class', 'xtx-confrim-container')
document.body.appendChild(confirmDiv)

export function Confirm ({ title, text }) {
  return new Promise((resolve, reject) => {
    const confirmCallback = () => {
      render(null, confirmDiv)
      resolve()
    }

    const cancelCallback = () => {
      render(null, confirmDiv)
      reject(new Error('点击了取消'))
    }

    // 1. 渲染组件
    // 2. 点击确认按钮，触发resolve同时销毁组件
    // 3. 点击取消按钮，触发reject同时销毁组件
    const vnode = h(XtxConfirm, {
      title,
      text,
      confirmCallback,
      cancelCallback
    })
    render(vnode, confirmDiv)
  })
}
