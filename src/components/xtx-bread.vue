<script>
import { h } from 'vue'
export default {
  name: 'XtxBread',
  props: {
    separatorClass: {
      type: String,
      default: 'icon-angle-right'
    }
  },
  render () {
    // 获取所有子slots
    const items = this.$slots.default()
    const dymanicItems = []
    items.forEach((item, index) => {
      dymanicItems.push(item)
      // 最后一个不加icon
      index < items.length - 1 &&
        dymanicItems.push(
          h('icon', { class: `iconfont ${this.separatorClass}` })
        )
    })
    return h('div', { class: 'xtx-bread' }, dymanicItems)
  }
}
</script>

<style scoped lang="less">
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
