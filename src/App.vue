<template>
  <div id="app">
    <v-app id="app">
      <!--路由管道标签，任何符合某一路由(route)信息的组件都会在这个标签内展示出来 -->
      <v-container>
          <router-view></router-view>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped >

</style>
