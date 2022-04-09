<template>
  <div class="top-category">
    <div class="container">
      <!-- 渲染面包屑导航 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="category.id">{{ category?.name }}</XtxBreadItem>
        </transition>
      </XtxBread>

      <!-- 轮播图 -->
      <XtxCarousel :slides="slides" style="height: 500px" auto-play />

      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in category?.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>

      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="item in subList" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <p class="tag">{{ item.desc }}</p>
          <XtxMore />
        </div>
        <div class="body">
          <GoodsItem v-for="good in item.goods" :good="good" :key="good.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { findBanner } from '@/api/home'
import GoodsItem from './components/goods-item'
import { findTopCategory } from '@/api/category'
export default {
  name: 'TopCategory',
  components: {
    GoodsItem
  },
  setup () {
    // 1. 从vuex中获取所有的分类数据
    const store = useStore()
    const route = useRoute()
    const category = computed(() => {
      return (
        // 返回分类
        store.state.category.list.find((item) => item.id === route.params.id)
      )
    })

    const slides = ref([])
    // 获取轮播图数据
    findBanner().then((res) => {
      slides.value = res.result
    })

    // 获取分类数据
    const subList = ref([])
    // 监听数据变化-发送请求获取数据
    watch(
      () => route.params.id,
      (value) => {
        // 如果切换到了2级分类，那么久不应该发送请求了
        if (route.path.includes('/sub')) return
        findTopCategory(route.params.id).then((data) => {
          subList.value = data.result.children
        })
      },
      {
        immediate: true
      }
    )

    return {
      category,
      slides,
      subList
    }
  }
}
</script>

<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}

.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>
