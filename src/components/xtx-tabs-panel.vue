<template>
  <!-- 装载是内容 -->
  <div class="xtx-tabs-panel" v-show="name === activeName">
    <slot />
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  name: 'XtxTabsPanel',
  props: {
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  setup () {
    const activeName = inject('activeName')
    return {
      activeName
    }
  }
}
</script>
