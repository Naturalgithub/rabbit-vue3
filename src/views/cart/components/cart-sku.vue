<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle">
      <span class="ellipsis">{{ attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visible">
      <GoodsSku :goods="goods" :skuId="skuId" @changeSku="changeSku"></GoodsSku>
      <XtxButton type="primary" size="mini" class="ml60" @click="submit"
        >确认</XtxButton
      >
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { getSpecsAndSkus } from '@/api/cart'
import GoodsSku from '@/views/goods/components/goods-sku.vue'
import { Message } from '@/components'
export default {
  name: 'CartSku',
  components: { GoodsSku },
  props: {
    attrsText: {
      // 动态渲染文字
      type: String,
      default: ''
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const visible = ref(false)

    const toggle = () => {
      visible.value = !visible.value
    }

    const target = ref(null)
    // 点击box外面layer隐藏
    onClickOutside(target, () => {
      visible.value = false
    })

    const goods = ref({})
    getSpecsAndSkus(props.skuId).then(({ result }) => {
      goods.value = result
    })

    const currSku = ref({})
    const changeSku = (sku) => {
      currSku.value = sku
      console.log('change', currSku.value)
    }

    const submit = () => {
      if (currSku.value.id && currSku.value.id !== props.skuId) {
        emit('change', currSku.value)
      } else {
        Message({ text: '请修改规格', type: 'warning' })
      }
    }
    return {
      visible,
      toggle,
      target,
      goods,
      changeSku,
      submit
    }
  }
}
</script>
<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display: inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor, 50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: '';
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(0.8, 1) rotate(45deg);
    }
  }
}
.ml {
  margin-left: 60px;
}
</style>
