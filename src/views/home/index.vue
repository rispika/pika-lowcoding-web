<template>
  <el-container>
    <el-aside :style="asideStyle">
      <pika-sider></pika-sider>
    </el-aside>
    <el-container>
      <el-header style="height: 104px">
        <pika-header></pika-header>
      </el-header>
      <el-main>
        <transition mode="out-in" name="el-zoom-in-center">
          <router-view />
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import pikaHeader from "@/components/pika-header";
import pikaSider from "@/components/pika-sider";
export default {
  name: `home-view`,
  components: {
    pikaHeader,
    pikaSider,
  },
  data() {
    return {
      left: "200px",
      top: "100px",
    };
  },
  created() {},
  computed: {
    asideStyle() {
      return {
        width: this.$store.state.collapse ? "180px" : "70px",
        height: "100vh",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.el-aside {
  transition: width 0.5s;
  -webkit-transition: width 0.5s;
  -moz-transition: width 0.5s;
  -webkit-transition: width 0.5s;
  -o-transition: width 0.5s;
  overflow: hidden;
}
</style>
