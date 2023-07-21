<template>
  <div>
    <!-- 搜索栏模板 -->
    <pika-query
      :query-data.sync="searchData"
      :query-list="searchList"
      @query="renderTable"
      @add="handleAdd"
    ></pika-query>
    <!-- 表格模板 -->
    <pika-table :table="table" :table-data="tableData">
      <!-- 操作栏 -->
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
          >删除</el-button
        >
      </template>
    </pika-table>
    <!-- 表格结束 -->
    <!-- 分页开始 -->
    <pika-pagination
      @pagination-change="renderTable"
      :pagination.sync="pagination"
    ></pika-pagination>
    <!-- 分页结束 -->
  </div>
</template>

<script>
import { queryUserPages } from "@/api/userApi";
export default {
  name: "permission-page",
  data() {
    return {
      // 分页
      pagination: {
        page: 1,
        size: 10,
        total: 0,
      },
      // 搜索栏
      searchList: [],
      searchData: {},
      // 表格
      table: [
        {
          tableColumnLabel: "用户id",
          tableColumnProp: "userId",
          tableColumnRules: [
            { required: true, message: "请输入id", trigger: "blur" },
          ],
        },
        {
          tableColumnLabel: "用户名",
          tableColumnProp: "username",
          searchFlag: true,
        },
        {
          tableColumnLabel: "用户头像",
          tableColumnProp: "avatar",
          tableColumnType: "image",
        },
        {
          tableColumnLabel: "匿名",
          tableColumnProp: "nickname",
          searchFlag: true,
        },
        {
          tableColumnLabel: "邮箱",
          tableColumnProp: "email",
          searchFlag: true,
        },
        {
          tableColumnLabel: "手机号",
          tableColumnProp: "phone",
          searchFlag: true,
        },
        {
          tableColumnLabel: "微信号",
          tableColumnProp: "weixin",
          searchFlag: true,
        },
        {
          tableColumnLabel: "签名",
          tableColumnProp: "signature",
        },
      ],
      tableData: [
        {
          id: "112312",
          routerName: "哈哈",
          isNull: true,
        },
      ],
      // 表单
      form: {
        title: "修改表单",
      },
      formData: {},
      // 编辑标识
      editFlag: true,
      // dialog隐藏标识
      dialogFormVisible: false,
    };
  },
  watch: {
    table: {
      immediate: true,
      handler() {
        this.table.forEach((column) => {
          if (column.searchFlag) {
            this.searchList.push(column);
          }
        });
      },
    },
  },
  methods: {
    /**
     * 添加
     */
    handleAdd() {},
    /**
     * 渲染表格
     */
    renderTable() {
      queryUserPages(
        this.pagination.page,
        this.pagination.size,
        this.searchData
      )
        .then((res) => {
          this.tableData = res.records;
          // 解决bug
          if (res.total < (this.pagination.page - 1) * this.pagination.size) {
            this.page = Math.floor(res.total / this.size);
            this.renderTable();
          }
          this.pagination.total = res.total;
        })
        .catch(() => {});
    },
  },
  created() {
    this.renderTable();
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 20px;
  text-align: center;
}
.edit-bar {
  border-bottom: $--light-border;
  padding-bottom: 20px;
  display: flex;
  gap: 15px;
  ::v-deep .el-button + .el-button,
  .el-checkbox.is-bordered + .el-checkbox.is-bordered {
    margin-left: 0;
  }
}
</style>
