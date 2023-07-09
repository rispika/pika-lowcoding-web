<template>
  <div>
    <!-- 搜索栏模板 -->
    <div class="search-template">
      <div v-for="(item, index) in searchList" :key="index">
        <el-input
          v-if="!item.tableColumnType"
          v-model="searchData[item.tableColumnProp]"
          :placeholder="`请输入${item.tableColumnLabel}`"
        ></el-input>
        <el-select
          v-else-if="item.tableColumnType === 'mapper'"
          v-model="searchData[item.tableColumnProp]"
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
      <el-button @click="renderTable" type="default">查 询</el-button>
      <el-button @click="resetSearchBar" type="default">重 置</el-button>
      <el-button @click="handleAdd" type="primary">添 加</el-button>
    </div>
    <!-- 表格模板 -->
    <el-table max-height="700" class="table-template" :data="tableData">
      <template v-for="(item, index) in table">
        <el-table-column
          v-if="!item.tableColumnType"
          :prop="item.tableColumnProp"
          :label="item.tableColumnLabel"
          :key="`table-${index}`"
          align="center"
          min-width="100"
        >
        </el-table-column>
        <el-table-column
          v-else-if="item.tableColumnType === 'mapper'"
          :prop="item.tableColumnProp"
          :label="item.tableColumnLabel"
          :key="`table-${index}`"
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
      </template>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格结束 -->
    <!-- 分页开始 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 分页结束 -->
    <!-- 对话框 -->
    <el-dialog
      @closed="dialogClosed"
      :title="form.title"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="form"
        label-position="right"
        label-width="120px"
        :model="formData"
      >
        <div
          v-for="(item, index) in table"
          v-show="item.tableColumnProp !== 'id'"
          :key="index"
        >
          <el-form-item
            :label="item.tableColumnLabel"
            :prop="item.tableColumnProp"
            :rules="item.tableColumnRules"
            v-if="!item.tableColumnType"
          >
            <el-input
              v-model="formData[item.tableColumnProp]"
              autocomplete="off"
              :placeholder="`请输入${item.tableColumnLabel}`"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="item.tableColumnLabel"
            :prop="item.tableColumnProp"
            :rules="item.tableColumnRules"
            v-else-if="item.tableColumnType === 'mapper'"
          >
            <el-select
              v-model="formData[item.tableColumnProp]"
              :placeholder="`请选择${item.tableColumnLabel}`"
            >
              <el-option
                v-for="(mapper, index1) in item.mappers"
                :label="mapper.mapperLabel"
                :value="mapper.mapperValue"
                :key="index1"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 对话框结束 -->
  </div>
</template>

<script>
import { queryTemplateInfo } from "@/api/generateApi";
import {
  selectAll,
  selectOne,
  insert,
  update,
  deleteByIds,
} from "@/api/auto/testApi";
export default {
  name: "default-template",
  data() {
    return {
      // 分页
      page: 1,
      size: 10,
      total: 0,
      // 搜索栏
      searchList: [],
      searchData: {},
      // 表格
      table: [
        {
          tableColumnLabel: "路由id",
          tableColumnProp: "id",
          tableColumnRules: [
            { required: true, message: "请输入id", trigger: "blur" },
          ],
        },
        {
          tableColumnLabel: "路由名称",
          tableColumnProp: "routerName",
        },
        {
          tableColumnLabel: "是否为null",
          tableColumnProp: "isNull",
          tableColumnType: "mapper",
          mappers: [
            {
              mapperLabel: "是",
              mapperValue: true,
            },
            {
              mapperLabel: "否",
              mapperValue: false,
            },
          ],
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
      editFlag: true,
      dialogFormVisible: false,
    };
  },
  methods: {
    /**
     * 渲染模板信息
     */
    renderTemplate() {
      queryTemplateInfo("1")
        .then((res) => {
          this.table = res.tableColumns;
          res.tableColumns.forEach((column) => {
            if (column.searchFlag) {
              this.searchList.push(column);
            }
          });
        })
        .catch(() => {});
    },
    /**
     * 渲染表格信息
     */
    renderTable() {
      selectAll(this.page, this.size, this.searchData)
        .then((res) => {
          this.tableData = res.records;
          // 解决bug
          if (res.total < (this.page - 1) * this.size) {
            this.page = Math.floor(res.total / this.size);
            this.renderTable();
          }
          this.total = res.total;
        })
        .catch(() => {});
    },
    /**
     * 搜索栏重置按钮
     */
    resetSearchBar() {
      this.searchData = {};
      this.renderTable();
    },
    /**
     * 处理编辑按钮点击事件
     * @param {Object} row
     */
    handleEdit(row) {
      selectOne(row.id)
        .then((res) => {
          this.formData = res.data;
        })
        .catch(() => {});
      this.editFlag = true;
      this.dialogFormVisible = true;
    },
    /**
     * 处理删除按钮点击事件
     * @param {Object} row
     */
    handleDelete(row) {
      this.$util.removeConfirm(() => {
        deleteByIds(row.id)
          .then(() => {
            this.$message.success("删除成功!");
            this.renderTable();
          })
          .catch(() => {});
      });
    },
    /**
     * 处理添加按钮
     */
    handleAdd() {
      this.editFlag = false;
      this.dialogFormVisible = true;
    },
    /**
     * 对话框关闭触发钩子
     * 默认用于重置表单信息
     */
    dialogClosed() {
      this.$refs["form"].resetFields();
    },
    /**
     * 提交表单
     */
    submitForm() {
      if (this.editFlag) {
        // 编辑
        update(this.formData)
          .then(() => {
            this.$message.success("修改成功!");
            this.renderTable();
            this.dialogFormVisible = false;
          })
          .catch(() => {});
      } else {
        // 添加
        insert(this.formData)
          .then(() => {
            this.$message.success("添加成功!");
            this.renderTable();
            this.dialogFormVisible = false;
          })
          .catch(() => {});
      }
    },
    handleSizeChange(val) {
      this.size = val;
      this.renderTable();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.renderTable();
    },
  },
  created() {
    this.renderTemplate();
    this.renderTable();
  },
};
</script>

<style lang="scss" scoped>
// 分页
.pagination {
  margin-top: 20px;
  text-align: center;
}
// 搜索
.search-template {
  // margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  border-bottom: $--light-border;
  padding-bottom: 20px;
  // ::v-deep .el-select-dropdown {
  //   width: 200px;
  // }
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
.table-template {
  width: 100%;
}
</style>
