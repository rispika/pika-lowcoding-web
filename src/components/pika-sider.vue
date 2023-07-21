<template>
  <el-menu
    :router="true"
    mode="vertical"
    :default-active="activeIndex"
    :collapse-transition="false"
    :collapse="!collapse"
    style="height: 100%; width: 99%"
  >
    <!-- 侧边栏标题 -->
    <!-- <div v-if="collapse" class="sider-title">Pika管理系统</div> -->
    <!-- 一级菜单 -->
    <div v-for="(item, index) in menu" :key="index">
      <el-submenu :index="item.index" v-if="item.children">
        <template slot="title">
          <pika-icon :name="item.icon"></pika-icon>
          <span slot="title" v-if="collapse">{{ item.name }}</span>
        </template>
        <!-- 二级菜单 -->
        <div v-for="(item2, index2) in item.children" :key="index2">
          <el-submenu v-if="item2.children" :index="item2.index">
            <template slot="title">
              <pika-icon :name="item2.icon"></pika-icon>
              <span slot="title">
                {{ item2.name }}
              </span>
            </template>
            <!-- 三级无孩子菜单 -->
            <el-menu-item
              v-for="(item3, index3) in item2.children"
              :key="index3"
              :index="item3.index"
              :route="item3.to"
            >
              <pika-icon :name="item3.icon"></pika-icon>
              <span>{{ item3.name }}</span>
            </el-menu-item>
          </el-submenu>

          <!-- 二级无孩子菜单 -->
          <el-menu-item
            v-if="!item2.children"
            :index="item2.index"
            :route="item2.to"
          >
            <pika-icon :name="item2.icon"></pika-icon>
            <span>{{ item2.name }}</span>
          </el-menu-item>
        </div>
      </el-submenu>
      <!-- 一级无孩子子菜单 -->
      <el-menu-item :index="item.index" v-if="!item.children" :route="item.to">
        <pika-icon :name="item.icon"></pika-icon>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script>
import PikaIcon from "./pika-icon.vue";
import routerApi from "@/api/routerApi";
export default {
  name: "pika-sider",
  data() {
    return {
      menu: [],
    };
  },
  components: { PikaIcon },
  computed: {
    collapse() {
      return this.$store.state.collapse;
    },
    activeIndex() {
      for (const i in this.$store.state.navTree) {
        if (this.$store.state.navTree[i].path === this.$route.path) {
          return this.$store.state.navTree[i].index;
        }
      }
      return "1-1";
    },
  },
  methods: {
    getPikaMenu() {
      routerApi
        .pikaMenu()
        .then((res) => {
          this.menu = res.menu;
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.getPikaMenu();
  },
};
</script>

<style lang="scss" scoped>
.sider-title {
  text-align: center;
  font-size: 24px;
  color: #303133;
  padding: 15px 0 15px 0;
  border-bottom: 1px solid #dcdfe6;
}
</style>
