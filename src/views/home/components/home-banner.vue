<template>
  <div class="home-banner">
    <!-- 轮播图 -->
    <XtxCarousel :slides="slides" autoPlay :duration="3000"></XtxCarousel>
  </div>
</template>
<script>
import { ref } from 'vue'
import { findBanner } from '@/api/home'
export default {
  name: 'HomeBanner',
  setup () {
    const slides = ref([])
    findBanner().then((res) => {
      slides.value = res.result
    })

    return {
      slides
    }
  }
}
</script>
<style lang="less" scoped>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  :deep(.carousel-btn.prev) {
    left: 270px !important;
  }
  :deep(.carousel-indicator) {
    padding-left: 250px;
  }
  // ::v-deep {
  //   .carousel-btn.prev {
  //     left: 270px !important;
  //   }
  //   .carousel-indicator {
  //     padding-left: 250px;
  //   }
  // }
}
</style>
