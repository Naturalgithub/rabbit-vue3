<template>
  <!-- 筛选区 -->
  <div class="sub-filter">
    <!-- 品牌独立渲染 -->
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          href="javascript:;"
          v-for="item in filterData?.brands"
          :key="item.id"
          :class="{ active: item.id === filterData.brands.selected }"
          @click="changeBrand(item.id)"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
    <!-- 其他属性 -->
    <div
      class="item"
      :key="index"
      v-for="(item, index) in filterData?.saleProperties"
    >
      <div class="head">{{ item.name }}：</div>
      <div class="body">
        <a
          href="javascript:;"
          v-for="sub in item.properties"
          :key="sub.id"
          :class="{ active: item.properties.selected === sub.id }"
          @click="changeSale(item, sub.id)"
        >
          {{ sub.name }}
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { findSubCategoryFilter } from '@/api/category'
export default {
  name: 'SubFilter',
  setup (props, { emit }) {
    const route = useRoute()
    const filterData = ref(null)
    watch(
      () => route.params.id,
      (v) => {
        findSubCategoryFilter(v).then(({ result }) => {
          // 增加全部的选择
          result.brands.unshift({ id: null, name: '全部' })
          result.brands.selected = null
          result.saleProperties.forEach((item) => {
            // 增加全部的选择
            item.properties.unshift({ id: null, name: '全部' })
            item.properties.selected = null
          })
          console.log(result)

          filterData.value = result
        })
      },
      {
        immediate: true
      }
    )
    /*
      {
        brandId: null | 'id',
        arttrs: [
          {groupName: '尺码', propertyName: '73cm'},
          {groupName: '颜色', propertyName: '焕蓝条纹'}
        ]
      }
    */
    const getSelectedFilter = () => {
      // 获取所有选中的那些筛选的条件
      const filters = {
        brandId: null,
        attrs: []
      }

      // 根据filterData的selected属性去获取
      const brandId = filterData.value.brands.selected
      if (brandId) {
        filters.brandId = brandId
      }
      filterData.value.saleProperties.forEach((item) => {
        if (item.selected) {
          filters.attrs.push({
            groupName: item.name,
            propertyName: item.properties.find((v) => v.id === item.selected)
              .name
          })
        }
      })
      console.log(filters)
      return filters
    }

    const changeBrand = (id) => {
      filterData.value.brands.selected = id
      // 需要把参数传给父组件
      emit('changeFilter', getSelectedFilter())
    }
    const changeSale = (item, id) => {
      item.selected = id
      // 需要把参数传给父组件
      emit('changeFilter', getSelectedFilter())
    }
    return {
      filterData,
      changeBrand,
      changeSale
    }
  }
}
</script>
<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
