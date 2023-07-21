<template>
  <!-- 搜索栏模板 -->
  <div class="search-template">
    <div v-for="(item, index) in queryList" :key="index">
      <!-- 普通搜索 -->
      <el-input
        v-if="!item.tableColumnType"
        v-model="newQueryData[item.tableColumnProp]"
        :placeholder="`请输入${item.tableColumnLabel}`"
      ></el-input>
      <!-- 下拉框 -->
      <el-select
        v-else-if="item.tableColumnType === 'mapper'"
        v-model="newQueryData[item.tableColumnProp]"
        :placeholder="`请选择${item.tableColumnLabel}`"
      >
        <el-option value=""> </el-option>
        <el-option
          v-for="(mapper, index1) in item.mappers"
          :label="mapper.mapperLabel"
          :value="mapper.mapperValue"
          :key="index1"
        ></el-option>
      </el-select>
    </div>
    <el-button @click="$emit('query')" type="default">查 询</el-button>
    <el-button @click="resetSearchBar" type="default">重 置</el-button>
    <el-button @click="$emit('add')" type="primary">添 加</el-button>
  </div>
</template>

<script>
export default {
  props: {
    queryData: {
      type: Object,
    },
    queryList: {
      type: Array,
      required: true,
    },
  },
  computed: {
    newQueryData: {
      get() {
        return this.queryData;
      },
      set(newVal) {
        this.$emit("update:queryData", newVal);
      },
    },
  },
  methods: {
    /**
     * 搜索栏重置按钮
     */
    resetSearchBar() {
      this.newQueryData = {};
      this.$emit("query");
    },
  },
};
</script>

<style lang="scss" scoped>
// 搜索
.search-template {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  border-bottom: $--light-border;
  padding-bottom: 20px;
  ::v-deep .el-button + .el-button,
  .el-checkbox.is-bordered + .el-checkbox.is-bordered {
    margin-left: 0;
  }
  button {
    float: right;
    height: 40px;
    margin-right: 0;
  }
}
</style>
