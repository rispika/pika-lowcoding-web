<template>
  <div>
    <div>
      <p>不正常，使用div包裹</p>
      <!-- div---这个我之前测试是有问题的，可恶_(:з」∠)_ -->
      <div v-for="(item, key) in tableProps" :key="'table-' + key">
        <span v-if="isKeyArr.find((item) => item == key)">{{ key }}</span>
        <span v-else>{{ key }}</span>
      </div>
      <!-- el-table -->
      <el-table :data="mainList.data" ref="filterTable">
        <!-- 不正常，使用div包裹 -->
        <div v-for="(item, key) in tableProps" :key="'table-' + key">
          <el-table-column
            v-if="isKeyArr.find((item) => item == key)"
            :prop="key"
            :label="item.label"
            min-width="100"
            align="center"
          />

          <el-table-column
            v-else
            :prop="key"
            :label="item.label"
            min-width="100"
            align="center"
          />
        </div>
      </el-table>

      <p>正常，使用template包裹</p>
      <!-- div -->
      <div>
        <template v-for="(item, key) in tableProps">
          <span
            v-if="isKeyArr.find((item) => item == key)"
            :key="'table-' + key"
            >{{ key }}</span
          >
          <span v-else :key="'table-' + key">{{ key }}</span>
        </template>
      </div>
      <!-- el-table -->
      <el-table :data="mainList.data" ref="filterTable">
        <!-- 正常，使用template包裹 -->
        <template v-for="(item, key) in tableProps">
          <el-table-column
            v-if="isKeyArr.find((item) => item == key)"
            :key="'table-' + key"
            :prop="key"
            :label="item.label"
            min-width="100"
            align="center"
          />

          <el-table-column
            v-else
            :key="'table-' + key"
            :prop="key"
            :label="item.label"
            min-width="100"
            align="center"
          />
        </template>
      </el-table>
      <el-table :data="data">
        <template v-for="(item, key) in tables">
          <el-table-column
            min-width="100"
            align="center"
            :prop="item.name"
            :label="item.name"
            :key="key"
            >{{ item.key }}</el-table-column
          >
        </template>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "name-s",
  data() {
    return {
      tables: [
        {
          name: "xx",
        },
        {
          name: "bb",
        },
        {
          name: "cc",
        },
        {
          name: "aa",
        },
      ],
      tableProps: {
        // SCENIC_ID:{label:'区域ID'},
        SCENIC_NAME: { label: "区域名称" },
        PEOPLE_NUM1: { label: "游客" },
        PEOPLE_NUM2: { label: "常驻人数" },
        PEOPLE_NUM3: { label: "总人流" },
        TIME: { label: "时间" },
      },
      isKeyArr: ["PEOPLE_NUM3", "PEOPLE_NUM1"],
      data: [],
      mainList: {
        data: [],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
p {
  font-size: 30px;
}
span {
  margin-right: 20px;
}
</style>
