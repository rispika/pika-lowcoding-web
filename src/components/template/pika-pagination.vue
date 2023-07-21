<template>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :current-page="newPagination.page"
      :page-size="newPagination.size"
      :total="newPagination.total"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    pagination: Object,
  },
  methods: {
    handleSizeChange(size) {
      this.newPagination.size = size;
      this.$emit("pagination-change");
    },
    handleCurrentChange(page) {
      this.newPagination.page = page;
      this.$emit("pagination-change");
    },
  },
  computed: {
    newPagination: {
      get() {
        return this.pagination;
      },
      set(newVal) {
        this.$emit("update:pagination", newVal);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
// 分页
.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
