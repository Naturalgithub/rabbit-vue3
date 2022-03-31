import { ref, onMounted, onUnmounted } from 'vue'
import { useIntersectionObserver, useIntervalFn } from '@vueuse/core'

export const useWindowScroll = () => {
  const x = ref(0)
  const y = ref(0)

  const scrollFn = () => {
    x.value = document.documentElement.scrollLeft
    y.value = document.documentElement.scrollTop
  }

  onMounted(() => {
    window.addEventListener('scroll', scrollFn)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', scrollFn)
  })

  return {
    x,
    y
  }
}

/**
 * @description: 用于懒加载数据
 * @param {*} apiFn 懒加载数据的接口
 * @return {*} target: 需要绑定的DOM对象  result: 结果数据
 */
export const useLazyData = (apiFn) => {
  const target = ref(null)
  const list = ref([])
  // 需要
  // 1. 被观察的对象
  // 2. 不同的API函数
  // stop 是停止观察是否进入或移出可视区域的行为
  const { stop } = useIntersectionObserver(
    // target 是观察的目标dom容器，必须是dom容器，而且是vue3.0方式绑定的dom对象
    target,
    // isIntersecting 是否进入可视区域，true是进入 false是移出
    // observerElement 被观察的dom
    ([{ isIntersecting }], observerElement) => {
      console.log(isIntersecting)
      if (isIntersecting) {
        stop()
        // 调用API获取数据
        apiFn().then((data) => {
          list.value = data.result
        })
      }
      // 在此处可根据isIntersecting来判断，然后做业务
    },
    {
      threshold: 0
    }
  )

  return {
    target,
    list
  }
}

/**
 * 倒计时逻辑
 * @param {*} count
 * @returns
 */
export const useCountDown = () => {
  // 验证码登录
  const time = ref(0)

  const { pause, resume } = useIntervalFn(
    () => {
      /* your function */
      time.value--
      if (time.value <= 0) {
        pause()
      }
    },
    1000,
    { immediate: false }
  )

  onUnmounted(() => {
    pause() // 暂停定时器
  })

  const start = () => {
    // 开启倒计时
    time.value = 60
    resume()
  }

  return {
    time,
    start
  }
}
