<template>
  <div class="not-found">
    <span class="title">404</span>
    <span class="tip">没有权限访问该地址或不存在该地址</span>
  </div>
</template>

<script>
export default {
  name: "page-404",
};
</script>

<style lang="scss" scoped>
.not-found {
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .title {
    font-size: 150px;
    color: azure;
    font-family: "华文琥珀";
  }
  .tip {
    font-size: 30px;
    color: azure;
    font-family: "华文楷体";
  }
}
</style>
