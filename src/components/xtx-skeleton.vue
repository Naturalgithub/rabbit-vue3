<!--
 * @Date: 2022-03-23 14:24:59
 * @LastEditTime: 2022-03-30 16:28:30
 * @LastEditors: hahake
 * @Description:
 * @FilePath: \rabbit-vue3\src\components\xtx-skeleton.vue
 * 佛祖、耶稣、真主、我党保佑永无BUG！
-->
<template>
  <Transition name="down">
    <div
      class="xtx-skeleton"
      :style="{ width, height }"
      :class="{ shan: animated }"
    >
      <!-- 1 盒子-->
      <div class="block" :style="{ backgroundColor: bg }"></div>
      <!-- 2 闪效果 xtx-skeleton 伪元素 --->
    </div>
  </Transition>
</template>
<script>
export default {
  name: 'XtxSkeleton',
  // 使用的时候需要动态设置 高度，宽度，背景颜色，是否闪下
  props: {
    bg: {
      type: String,
      default: '#efefef'
    },
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: '100px'
    },
    animated: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped lang="less">
.xtx-skeleton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  .block {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
}
.shan {
  &::after {
    content: '';
    position: absolute;
    animation: shan 1.5s ease 0s infinite;
    top: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-45deg);
  }
}
@keyframes shan {
  0% {
    left: -100%;
  }
  100% {
    left: 120%;
  }
}
.down {
  &-enter {
    &-from {
      transform: translate3d(0, -75px, 0);
      opacity: 0;
    }
    &-active {
      transition: all 0.5s;
    }
    &-to {
      transform: none;
      opacity: 1;
    }
  }
}
</style>
