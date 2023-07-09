<template>
  <div>
    <div class="pika-header" :style="headerStyle">
      <div>
        <pika-icon
          font-size="24px"
          name="el-icon-s-operation"
          pointer
          @click="collapse"
        ></pika-icon>
        <span class="pika-title">{{ $route.name }}</span>
      </div>

      <span class="right-item"
        ><el-avatar icon="el-icon-user-solid"></el-avatar
      ></span>
    </div>
    <div class="pika-tag">
      <el-tag
        v-for="tag in tags"
        size="medium"
        :key="tag.name"
        closable
        :type="tag.type"
        @close="handleClose(tag)"
        @click="$router.push(tag.path)"
      >
        {{ tag.name }}
      </el-tag>
    </div>
  </div>
</template>

<script>
import pikaIcon from "@/components/pika-icon.vue";
export default {
  name: "pika-header",
  components: {
    pikaIcon,
  },
  props: {
    height: {
      type: String,
      default: "60px",
    },
    width: {
      type: String,
      default: "100%",
    },
  },
  data() {
    return {};
  },
  methods: {
    handleClose(tag) {
      this.$store.commit("removeRouterHistory", tag.name);
    },
    collapse() {
      this.$store.commit("setCollapse", !this.$store.state.collapse);
    },
  },
  created() {},
  computed: {
    tags() {
      return this.$store.state.routerHistory.map((route) => {
        route = {
          name: route.name,
          path: route.path,
        };
        return route;
      });
    },
    headerStyle() {
      return {
        height: this.height,
        width: this.width,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.pika-header {
  position: relative;
  border-bottom: $--light-border;
  display: flex;
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0 20px 0 20px;
  box-sizing: border-box;
  .pika-title {
    margin-left: 20px;
    font-size: 25px;
    color: $--main-text-color;
  }
}
.pika-tag {
  padding: 5px 0 5px 0;
  position: relative;
  border-bottom: $--light-border;
  cursor: pointer;
  span {
    margin-left: 3px;
  }
  .el-tag:hover {
    background-color: rgb(214, 225, 236);
  }
}
.menu-iconfont {
  font-size: 24px;
  &:hover {
    color: $--main-color;
    cursor: pointer;
  }
}
</style>
