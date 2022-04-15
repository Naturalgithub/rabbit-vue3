<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.name">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img
            @click="changeSelected(item, val)"
            v-if="val.picture"
            :src="val.picture"
            :title="val.name"
            alt=""
            :class="{ selected: val.selected, disabled: val.disabled }"
          />
          <span
            @click="changeSelected(item, val)"
            :class="{ selected: val.selected, disabled: val.disabled }"
            v-else
            >{{ val.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import PowerSet from '@/vendor/power-set'
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => {}
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    // spec: 规格
    // val: 规格的值
    const changeSelected = (spec, val) => {
      // 如果按钮被禁用了，不执行逻辑
      if (val.disabled) return

      if (val.selected) {
        // 取消选中
        val.selected = false
      } else {
        // 增加一个selected
        spec.values.forEach((item) => {
          // 让所有的都不选中
          item.selected = false
        })
        // 让自己选中
        val.selected = true
      }
      updateDisableedStatus(props.goods.specs, pathMap)

      // 子传父，讲sku信息传递给父组件
      let selectedValues = getSelectedSpec(props.goods.specs)
      selectedValues = selectedValues.filter((item) => item)

      // 如果选中的值没有选全，传递空对象
      if (selectedValues.length === props.goods.specs.length) {
        const key = selectedValues.join('★')
        const selectedSkuId = pathMap[key][0]
        const selectedSku = props.goods.skus.find(
          (item) => item.id === selectedSkuId
        )
        emit('changeSku', selectedSku)
      }
    }

    // 默认选择sku
    initSelectedStatus(props.goods, props.skuId)

    // 改变按钮的禁用状态
    // updateDisableedStatus(spec, pathMap)

    // 根据商品的skus得到一个可选的路径字典（对象）
    // 1. 过滤掉没有库存的sku
    // 2. 根据sku的specs属性，得到属性的子集
    // 3. 根据这些子集组合成路径字典
    const pathMap = getPathMap(props.goods.skus)
    updateDisableedStatus(props.goods.specs, pathMap)

    return {
      changeSelected
    }
  }
}

/**
 * 获取路径字典
 */
function getPathMap (skus) {
  const pathMap = {}
  skus
    .filter((item) => item.inventory > 0) // 去掉库存为0的sku
    .forEach((item) => {
      const arr = item.specs.map((spec) => spec.valueName) // [蓝色,中国]
      const result = PowerSet(arr) // [[],[蓝色],[中国],[蓝色,中国]]
      // if(pathMap)
      result.forEach((item1) => {
        // pathMap[item] =
        const str = item1.join('★') // '','蓝色','中国','蓝色★中国'
        if (pathMap[str]) {
          pathMap[str].push(item.id)
        } else {
          pathMap[str] = [item.id]
        }
      })
      // pathMap
    })
  return pathMap
}

/**
 * 控制按钮的禁用状态
 * 核心思路：遍历所有的规格，判断规格在pathMap中是否是存在的，如果存在，说明这个按钮能够，否则这个按钮应该禁用
 */
function updateDisableedStatus (specs, pathMap) {
  specs.forEach((spec, index) => {
    spec.values.forEach((item) => {
      // 获取选中的属性  每次循环都要用新的属性
      const selectedArr = getSelectedSpec(specs)
      selectedArr[index] = item.name
      const str = selectedArr.filter((v) => v).join('★')
      item.disabled = !pathMap[str]
    })
  })
}

/**
 * 获取选中的规格的值
 * 原则：得到的结果 [undefined, undefined, undefined]
 */
function getSelectedSpec (specs) {
  const arr = []
  specs.forEach((spec, index) => {
    // 根据spec的values中查找是否有slectd为true的，把selected为true的那个name存起来
    const val = spec.values.find((item) => item.selected)
    if (val) {
      arr[index] = val.name
    } else {
      arr[index] = undefined
    }
  })
  return arr
}

const initSelectedStatus = (goods, skuId) => {
  // 找到存在的sku
  const skus = goods.skus.find((sku) => sku.id === skuId)
  console.log(goods)

  // 在规格list中找到存在的规格selected = true
  if (skus) {
    goods.specs.forEach((spec, index) => {
      const name = skus.specs[index].valueName
      spec.values.find((item) => item.name === name).selected = true
    })
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
