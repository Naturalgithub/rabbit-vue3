import { ref, onMounted, onUnmounted } from 'vue'
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
