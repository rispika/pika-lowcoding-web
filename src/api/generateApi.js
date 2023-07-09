import http from "@/utils/http";

// 添加一个生成表sql数据
export const insertGenerateTable = (data) => {
  return http({
    url: `/generate/generate/insertGenerateTable`,
    method: `put`,
    data,
  });
};

/**
 * GET /generate/queryAllTablesInfo
 * 获取所有sql信息
 */
export const queryAllTablesInfo = () => {
  return http({
    url: `/generate/generate/queryAllTablesInfo`,
    method: `get`,
  });
};

/**
 * GET
 * /generate/queryAllGenerateTables/{page}/{size}
 * 获取所有生成表sql信息
 */
export const queryAllGenerateTables = (page, size) => {
  return http({
    url: `/generate/generate/queryAllGenerateTables/${page}/${size}`,
    method: `get`,
  });
};

/**
 * 根据id删除表
 * @param {Number} tableId
 * @returns
 */
export const removeGenerateTable = (tableId) => {
  return http({
    url: `/generate/generate/removeGenerateTable/${tableId}`,
    method: `delete`,
  });
};
/**
 * 根据id删除列
 * @param {Number} colId
 * @returns
 */
export const removeCol = (colId) => {
  return http({
    url: `/generate/generate/removeCol/${colId}`,
    method: `delete`,
  });
};

/**
 * 根据表id查询列
 * @param {Number} tableId
 * @returns
 */
export const queryColsByTableId = (tableId) => {
  return http({
    url: `/generate/generate/queryColsByTableId/${tableId}`,
    method: `get`,
  });
};
/**
 * 根据列id查询列信息
 * @param {Number} colId
 * @returns
 */
export const queryColByColId = (colId) => {
  return http({
    url: `/generate/generate/queryColByColId/${colId}`,
    method: `get`,
  });
};

/**
 * 查询所有sql类型
 * @returns
 */
export const queryAllSqlTypes = () => {
  return http({
    url: `/generate/generate/queryAllSqlTypes`,
    method: `get`,
  });
};
/**
 * 插入列信息
 *
 * @param generateCol 生成列
 * @return {@link R}
 */
export const insertColInfo = (generateCol) => {
  return http({
    url: `/generate/generate/insertColInfo`,
    method: `put`,
    data: generateCol,
  });
};
/**
 * 更新列信息
 *
 * @param generateCol 生成列
 * @return {@link R}
 */
export const updateColInfo = (generateCol) => {
  return http({
    url: `/generate/generate/updateColInfo`,
    method: `post`,
    data: generateCol,
  });
};
/**
 * 生成代码
 *
 * @param tableId 表id
 * @return {@link R}
 */
export const generateCode = (tableId) => {
  return http({
    url: `/generate/generate/generateCode/${tableId}`,
    method: `post`,
  });
};
/**
 * 查询模板信息
 *
 * @param tableId 表id
 * @return {@link R}
 */
export const queryTemplateInfo = (tableId) => {
  return http({
    url: `/generate/generate/queryTemplateInfo/${tableId}`,
    method: `get`,
  });
};
export default {
  insertGenerateTable,
  queryAllTablesInfo,
  queryAllGenerateTables,
  removeGenerateTable,
  queryColsByTableId,
  queryColByColId,
  queryAllSqlTypes,
  generateCode,
  queryTemplateInfo,
};
