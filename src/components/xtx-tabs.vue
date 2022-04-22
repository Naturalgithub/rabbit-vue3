<script>
import { useVModel } from '@vueuse/core'
import { provide } from 'vue-demi'
export default {
  name: 'XtxTabs',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const activeName = useVModel(props, 'modelValue', emit)

    const clickFn = (item, index) => {
      activeName.value = item.props.name
      emit('tab-click', {
        tab: item,
        index: index
      })
    }

    provide('activeName', activeName)
    return {
      activeName,
      clickFn
    }
  },
  render () {
    const slots = this.$slots.default()
    const panels = []
    slots.forEach((item) => {
      if (item.type.name === 'XtxTabsPanel') {
        panels.push(item)
      } else {
        item.children.forEach((v) => {
          panels.push(v)
        })
      }
    })
    // console.log(panels)
    // console.log(this.activeName)
    // 导航

    const arr = panels.map((item, index) => {
      return (
        <a
          class={this.activeName === item.props.name ? 'active' : ''}
          href="javascript:;"
          onClick={() => this.clickFn(item, index)}
        >
          {item.props.label}
        </a>
      )
    })

    const navs = <nav>{arr}</nav>
    return <div class="xtx-tabs">{[navs, panels]}</div>
  }
}
</script>

<style lang="less">
.xtx-tabs {
  background: #fff;
  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    > a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      &.active {
        border-top: 2px solid @xtxColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
}
</style>
