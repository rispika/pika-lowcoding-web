<!-- 生成表管理 -->
<template>
  <div>
    <!-- 编辑栏 -->
    <!-- <div class="edit-bar">
      <el-button type="primary" @click="handleAdd">添加</el-button>
    </div> -->
    <!-- 表格开始 -->
    <el-table :data="generateTables" style="width: 100%; height: 700px">
      <el-table-column
        prop="tableId"
        label="sql表id"
        align="center"
        min-width="100"
      >
      </el-table-column>
      <el-table-column
        prop="tableName"
        label="sql表名"
        align="center"
        min-width="100"
      >
      </el-table-column>
      <el-table-column
        prop="tableComment"
        label="sql表注释"
        align="center"
        min-width="100"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleQuery(scope.row)"
            >查看</el-button
          >
          <el-button size="mini" @click="handleTemplate(scope.row)"
            >生成模板</el-button
          >
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
        :page-size="this.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 分页结束 -->
    <!-- 生成模板 -->
    <el-dialog title="生成模板预览" :visible.sync="templateDialog">
      <!-- 模板 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane
          :label="tab.name"
          :name="tab.name"
          v-for="(tab, index) in tabs"
          :key="index"
        >
          <div class="code-template" v-html="codeTemplate[tab.index]"></div>
          <copy-button
            size="small"
            type="text"
            id="auto"
            :text="copyText"
            class="copy-button"
            >复 制</copy-button
          >
        </el-tab-pane>
      </el-tabs>
      <!-- 对话框脚 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="templateDialog = false">取 消</el-button>
        <el-button type="primary" @click="templateDialog = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 生成模板结束 -->
  </div>
</template>

<script>
import "highlight.js/styles/atom-one-dark.css"; //样式
import generateApi from "@/api/generateApi";
import { lineNumbers } from "@/utils/highlightUtil";
import copyButton from "@/components/copy-button.vue";
export default {
  name: `auto-page`,
  components: {
    copyButton,
  },
  data() {
    return {
      msg: "ahahah",
      activeName: "SQL预览",
      copyText: () => {
        let tmp = null;
        this.tabs.forEach((tab) => {
          if (tab.name === this.activeName) {
            tmp = tab.index;
          }
        });
        return tmp ? this.code[tmp] : "";
      },
      tabs: [
        {
          name: "SQL预览",
          index: "sql",
        },
        {
          name: "Entity预览",
          index: "entity",
        },
        {
          name: "Mapper预览",
          index: "mapper",
        },
        {
          name: "Service预览",
          index: "service",
        },
        {
          name: "ServiceImpl预览",
          index: "serviceImpl",
        },
        {
          name: "Controller预览",
          index: "controller",
        },
        {
          name: "Api预览",
          index: "api",
        },
      ],
      code: {},
      codeTemplate: {
        sql: "",
        entity: "",
        mapper: "",
        service: "",
        serviceImpl: "",
        controller: "",
      },
      templateDialog: false,
      active: 1,
      // 生成表格
      generateTables: [],
      page: 1,
      size: 10,
      total: 0,
    };
  },
  computed: {
    sqlHtml() {
      return lineNumbers(this.sql, "SQL");
      // return hljs.highlight(this.sql, { language: "sql" }).value;
    },
  },
  methods: {
    handleSizeChange(val) {
      this.size = val;
      this.renderTables();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.renderTables();
    },
    renderTables() {
      generateApi
        .queryAllGenerateTables(this.page, this.size)
        .then((res) => {
          this.generateTables = res.tables.records;
          this.total = res.tables.total;
        })
        .catch(() => {});
    },
    handleDelete(row) {
      this.$util.removeConfirm(() => {
        generateApi
          .removeGenerateTable(row.tableId)
          .then(() => {
            this.$message.success("删除成功!");
            this.renderTables();
          })
          .catch(() => {});
      });
    },
    /**
     * 生成模板按钮
     * @param {Object} row
     */
    handleTemplate(row) {
      generateApi
        .generateCode(row.tableId)
        .then((res) => {
          this.code = res;
          this.codeTemplate.sql = lineNumbers(res.sql, "sql");
          this.codeTemplate.entity = lineNumbers(res.entity, "java");
          this.codeTemplate.mapper = lineNumbers(res.mapper, "java");
          this.codeTemplate.service = lineNumbers(res.service, "java");
          this.codeTemplate.serviceImpl = lineNumbers(res.serviceImpl, "java");
          this.codeTemplate.controller = lineNumbers(res.controller, "java");
          this.codeTemplate.api = lineNumbers(res.api, "js");
          this.templateDialog = true;
        })
        .catch(() => {});
    },
    /**
     * 查看表详细信息
     * @param {Object} row
     */
    handleQuery(row) {
      this.$router.push({
        path: "/generate/col",
        query: {
          tableId: row.tableId,
        },
      });
    },
  },
  created() {
    this.renderTables();
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  text-align: center;
}
.code-template {
  position: relative;
  padding: 20px 0 20px 0;
  background-color: #24292f;
  box-sizing: border-box;
  height: 500px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(245, 245, 245, 0.4);
  }
}
.copy-button {
  position: absolute;
  z-index: 10;
  top: 10px;
  right: 20px;
}
</style>
