<template>
  <button @click="show = !show">改变</button>
  <!-- 1. 使用transition组件包裹需要执行动画的元素 -->
  <!-- 2. 使用了transition组件包裹之后，会自动的在适当的时机给元素添加上6个类名 -->
  <!-- v-enter-from: 进入前  v-enter-to: 进入后  v-enter-active: 整个进入的过程 -->
  <!-- v-leave-from: 离开前  v-leave-to: 离开后  v-leave-active: 整个离开的过程 -->
  <Transition name="aa">
    <div v-show="show">demo</div>
  </Transition>

  <Transition name="bb">
    <div v-show="show">133</div>
  </Transition>
</template>

<script>
import { ref } from 'vue'
export default {
  setup () {
    const show = ref(true)
    return {
      show
    }
  }
}
</script>

<style scoped>
div {
  width: 100px;
  height: 100px;
  background-color: pink;
}
/* 转场动画 */
.aa-enter-from,
.aa-leave-to {
  transform: translateX(-100%);
}
.aa-enter-active,
.aa-leave-active {
  transition: all 1s;
}
.aa-enter-to,
.aa-leave-from {
  transform: translateX(0%);
}
</style>
