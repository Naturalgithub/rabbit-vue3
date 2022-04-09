<template>
  <XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem v-if="category.top" :to="`/category/${category.top.id}`">
      {{ category.top.name }}
    </XtxBreadItem>
    <Transition name="fade-right" mode="out-in">
      <XtxBreadItem :key="category.sub.id" v-if="category.sub">
        {{ category.sub.name }}
      </XtxBreadItem>
    </Transition>
  </XtxBread>
</template>
<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'SubBread',
  setup () {
    // 获取顶级分类和二级分类的数据
    const store = useStore()
    const route = useRoute()
    const category = computed(() => {
      const obj = {
        sub: {},
        top: {}
      }
      store.state.category.list.forEach((item) => {
        item.children &&
          item.children.forEach((sub) => {
            if (sub.id === route.params.id) {
              obj.top = {
                id: item.id,
                name: item.name
              }
              obj.sub = {
                id: sub.id,
                name: sub.name
              }
            }
          })
      })
      return obj
    })
    return {
      category
    }
  }
}
</script>
