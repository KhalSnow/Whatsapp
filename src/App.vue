<template>
  <div id="app">
    <el-container>
      <el-aside width='200px'><VerticalMenu></VerticalMenu></el-aside>
      <el-main><router-view/></el-main>
    </el-container>
  </div>
</template>

<script>
import VerticalMenu from "@/components/Menu/VerticalMenu.vue"

export default {
  name: 'App',
  components: {
    VerticalMenu
  }
}
</script>

<style>
</style>
