<template>
  <!-- 表格模板 -->
  <el-table max-height="700" class="table-template" :data="tableData">
    <template v-for="(item, index) in table">
      <!-- 普通表格 -->
      <el-table-column
        v-if="!item.tableColumnType"
        :prop="item.tableColumnProp"
        :label="item.tableColumnLabel"
        :key="`table-${index}`"
        align="center"
        min-width="100"
      >
      </el-table-column>
      <!-- 映射表格 -->
      <el-table-column
        v-else-if="item.tableColumnType === 'mapper'"
        :prop="item.tableColumnProp"
        :label="item.tableColumnLabel"
        :key="`table-mapper-${index}`"
        align="center"
        min-width="100"
      >
        <template slot-scope="scope">
          <span
            v-for="(mapper, index1) in item.mappers"
            v-show="mapper.mapperValue === scope.row[item.tableColumnProp]"
            :key="index1"
          >
            {{ mapper.mapperLabel }}
          </span>
        </template>
      </el-table-column>
      <!-- 图片表格 -->
      <el-table-column
        v-else-if="item.tableColumnType === 'image'"
        :prop="item.tableColumnProp"
        :label="item.tableColumnLabel"
        :key="`table-image-${index}`"
        align="center"
        min-width="100"
      >
        <template slot-scope="scope">
          <el-avatar
            shape="square"
            :size="100"
            fit="cover"
            :src="previewImage(scope.row[item.tableColumnProp])"
          ></el-avatar>
        </template>
      </el-table-column>
    </template>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <slot :row="scope.row"></slot>
      </template>
    </el-table-column>
  </el-table>
  <!-- 表格结束 -->
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      required: true,
    },
    table: {
      type: Array,
      required: true,
    },
  },
  methods: {
    /**
     * 图片预览
     * @param {*} avatar
     */
    previewImage(avatar) {
      if (!avatar) {
        return null;
      }
      return `${
        process.env.VUE_APP_BASE_API
      }/system/io/previewImage/${window.btoa(avatar)}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.table-template {
  width: 100%;
}
</style>
