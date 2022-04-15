<template>
  <div class="xtx-carousel" @mouseenter="stop" @mouseleave="play">
    <ul class="carousel-body">
      <li
        class="carousel-item"
        :class="{ fade: active === index }"
        v-for="(item, index) in slides"
        :key="item.id"
      >
        <RouterLink v-if="item.hrefUrl" :to="item.hrefUrl">
          <img :src="item.imgUrl" alt="" />
        </RouterLink>

        <div v-else class="slider">
          <RouterLink
            v-for="goods in item"
            :key="goods.id"
            :to="`/product/${goods?.id}`"
          >
            <img :src="goods.picture" alt="" />
            <p class="name ellipsis">{{ goods.name }}</p>
            <p class="price">&yen;{{ goods.price }}</p>
          </RouterLink>
        </div>
      </li>
    </ul>
    <a href="javascript:;" class="carousel-btn prev" @click="prev">
      <i class="iconfont icon-angle-left"></i>
    </a>
    <a href="javascript:;" class="carousel-btn next" @click="next">
      <i class="iconfont icon-angle-right"></i>
    </a>
    <div class="carousel-indicator">
      <span
        v-for="(item, index) in slides"
        :key="item.id"
        :class="{ active: active === index }"
        @mouseenter="active = index"
      ></span>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
export default {
  name: 'XtxCarousel',
  props: {
    slides: {
      type: Array,
      default: () => []
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  setup (props) {
    const active = ref(0)

    let timer = null

    // 轮播图播放逻辑
    const play = () => {
      // 防止开启多个定时器
      stop()
      timer = setInterval(() => {
        if (active.value >= props.slides.length - 1) {
          active.value = 0
        } else {
          active.value++
        }
      }, props.duration)
    }

    // 轮播图关闭
    const stop = () => {
      clearInterval(timer)
    }

    // 组件渲染时，开启轮播图
    onMounted(() => {
      play()
    })

    // 组件销毁时，关闭轮播图
    onUnmounted(() => {
      stop()
    })

    // 左右箭头
    const prev = () => {
      if (active.value <= props.slides.length - 1) {
        active.value = 0
      } else {
        active.value--
      }
    }

    const next = () => {
      if (active.value >= props.slides.length - 1) {
        active.value = props.slides.length - 1
      } else {
        active.value++
      }
    }
    return {
      active,
      play,
      stop,
      prev,
      next
    }
  }
}
</script>
<style scoped lang="less">
// fade 类：用于控制图片的显示和隐藏
// active 类：用于控制小圆点高亮
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
        z-index: 3;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}

// 轮播商品
.slider {
  display: flex;
  justify-content: space-around;
  padding: 0 40px;
  > a {
    width: 240px;
    text-align: center;
    img {
      padding: 20px;
      width: 230px !important;
      height: 230px !important;
    }
    .name {
      font-size: 16px;
      color: #666;
      padding: 0 40px;
    }
    .price {
      font-size: 16px;
      color: @priceColor;
      margin-top: 15px;
    }
  }
}
</style>
