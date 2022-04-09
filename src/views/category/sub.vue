<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter @changeFilter="changeFilter" />
      <!-- 排序 -->
      <div class="goods-list">
        <SubSort @sortChange="changeSort" />
        <!-- 商品列表 -->
        <ul>
          <li v-for="good in goodsList" :key="good.id">
            <GoodsItem :good="good" />
          </li>
        </ul>
        <XtxInfiniteLoading
          v-model:loading="loading"
          :finished="finished"
          @load="onLoad"
        ></XtxInfiniteLoading>
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter'
import SubSort from './components/sub-sort'
import GoodsItem from './components/goods-item'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findSubCategoryGoods } from '@/api/category'
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter, SubSort, GoodsItem },
  setup () {
    const route = useRoute()
    const loading = ref(false)
    const finished = ref(false)
    const goodsList = ref([])
    // 请求参数
    let requestParams = {
      categoryId: route.params.id,
      page: 1,
      pageSize: 20
    }

    // 请求数据
    const onLoad = async () => {
      loading.value = true
      const { result } = await findSubCategoryGoods(requestParams)
      goodsList.value = [...goodsList.value, ...result.items]
      requestParams.page++
      if (result.items.length < requestParams.pageSize) {
        // 没有更多数据
        finished.value = true
      }
      loading.value = false
    }

    // 监听二级分类id的变化
    watch(
      () => route.params.id,
      (value) => {
        if (!route.path.includes('/sub')) return
        goodsList.value = []
        requestParams = {
          page: 1,
          pageSize: 20,
          categoryId: value
        }
        onLoad()
      }
    )

    // 监听排序改变
    const changeSort = (sortParams) => {
      requestParams = { ...requestParams, ...sortParams }
      requestParams.page = 1
      goodsList.value = []
      finished.value = false
      onLoad()
    }
    // 监听筛选区改变
    const changeFilter = (filterParams) => {
      requestParams = { ...requestParams, ...filterParams }
      requestParams.page = 1
      goodsList.value = []
      finished.value = false
      onLoad()
    }

    onLoad()
    return {
      loading,
      finished,
      goodsList,
      onLoad,
      changeSort,
      changeFilter
    }
  }
}
</script>
<style lang="less" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
