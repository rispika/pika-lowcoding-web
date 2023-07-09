<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style: none;
  // overflow: hidden;
  font-family: $--el-font-family;
}
</style>
