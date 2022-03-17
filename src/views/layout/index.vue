<template>
  <AppHeaderSticky></AppHeaderSticky>
  <AppTopnav />
  <AppHeader />
  <main class="app-body">
    <router-view></router-view>
  </main>
  <AppFooter />
</template>

<script>
import AppTopnav from './components/app-topnav'
import AppHeader from './components/app-header'
import AppFooter from './components/app-footer'
import AppHeaderSticky from './components/app-header-sticky.vue'
import { useStore } from 'vuex'
export default {
  name: 'Layout',
  components: {
    AppHeaderSticky,
    AppTopnav,
    AppHeader,
    AppFooter
  },
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style scoped lang="less">
.app-body {
  min-height: 600px;
}
</style>
