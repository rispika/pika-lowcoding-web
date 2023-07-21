<template>
  <div>
    <div class="pika-loading" :class="{ 'loading-anim': inAnimation }"></div>
    <div class="pika-header" :style="headerStyle">
      <div style="display: flex; align-items: center; gap: 20px">
        <pika-icon
          font-size="24px"
          name="el-icon-s-operation"
          pointer
          @click="collapse"
        ></pika-icon>
        <!-- <span class="pika-title">{{ $route.name }}</span> -->
        <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">
            首页
          </el-breadcrumb-item>
          <el-breadcrumb-item
            v-if="$route.path !== '/home'"
            :to="{ path: $route.path }"
            >{{ $route.name }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>

      <span class="right-item"
        ><el-avatar icon="el-icon-user-solid"></el-avatar
      ></span>
    </div>
    <div class="pika-tag">
      <el-tag
        size="small"
        v-for="(tag, index) in tags"
        :key="tag.name + index"
        :closable="tag.name !== 'home'"
        :disable-transitions="false"
        @close="handleClose(tag)"
        @click="$router.push(tag.path)"
        :effect="$route.name === tag.name ? 'dark' : 'plain'"
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
  watch: {
    $route() {
      this.inAnimation = false;
      setTimeout(() => {
        this.inAnimation = true;
      }, 100);
    },
  },
  data() {
    return {
      inAnimation: false,
    };
  },
  methods: {
    handleClose(tag) {
      if (tag.path === this.$route.path) {
        this.$router.go(-1);
      }
      this.$store.commit("removeRouterHistory", tag.name);
    },
    collapse() {
      this.$store.commit("setCollapse", !this.$store.state.collapse);
    },
  },
  created() {
    // console.log(this.$router);
  },
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
.breadcrumb {
  font-size: 18 px;
}
.pika-tag {
  padding: 15px 0 15px 0;
  position: relative;
  span {
    margin-left: 3px;
  }
  .el-tag:hover {
    background-color: #409eff;
    color: #ffffff;
    cursor: pointer;
    ::v-deep .el-tag__close {
      color: #ffffff;
    }
  }
}
.menu-iconfont {
  font-size: 24px;
  &:hover {
    color: $--main-color;
    cursor: pointer;
  }
}
.pika-loading {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background-color: $--pika-color;
}
.loading-anim {
  animation: forwards loading 0.8s ease-out;
}
@keyframes loading {
  0% {
    width: 0;
    opacity: 1;
  }
  50% {
    width: 100%;
    opacity: 1;
  }
  100% {
    width: 100%;
    opacity: 0;
  }
}
</style>
