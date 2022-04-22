<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{ active: active }">
      <span class="placeholder" v-if="!fullLocation">{{ placeholder }}</span>
      <template v-else>
        <span class="value">{{ fullLocation }}</span>
      </template>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="active">
      <span
        class="ellipsis"
        v-for="item in cityList"
        :key="item.code"
        @click="selectCity(item)"
      >
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
export default {
  name: 'XtxCity',
  props: {
    fullLocation: String,
    placeholder: {
      type: String,
      default: '请选择配送地区'
    }
  },
  setup (props, { emit }) {
    const active = ref(false)

    const toggle = () => {
      active.value = !active.value
    }
    // / 点击外面，关闭弹窗
    const target = ref(null)
    onClickOutside(target, (e) => {
      active.value = false
    })

    const cityList = ref([])
    const cacheList = ref([])

    // 请求城市数据
    axios({
      url: 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json',
      method: 'get'
    }).then((res) => {
      cityList.value = res.data
      cacheList.value = res.data
    })

    // 监听关闭弹窗的处理，恢复数据
    watch(active, (value) => {
      if (!value) {
        cityList.value = cacheList.value
      }
    })

    // 选择城市
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: ''
    })

    // 点击某个市区县操作
    const selectCity = (city) => {
      if (city.level === 0) {
        // 省
        changeResult.provinceName = city.name
        changeResult.provinceCode = city.code
        cityList.value = city.areaList
      }
      if (city.level === 1) {
        // 市
        changeResult.cityName = city.name
        changeResult.cityCode = city.code
        cityList.value = city.areaList
      }
      if (city.level === 2) {
        // 县（区）
        changeResult.countyName = city.name
        changeResult.countyCode = city.code
        // 子传父，将数据传递给父组件
        emit('changeCity', changeResult)
        // 关闭弹窗
        active.value = false
      }
    }
    return {
      active,
      toggle,
      target,
      cityList,
      selectCity,
      changeResult
    }
  }
}
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
