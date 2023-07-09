import http from "@/utils/http";

/**
 * 分页查询所有数据
 *
 * @param page 当前页
 * @param size 页大小
 * @param test 查询条件
 * @return 所有数据
 */
export const selectAll = (page, size, test) => {
  return http({
    url: `/web/test/${page}/${size}`,
    method: `get`,
    params: test,
  });
};
/**
 * 通过主键查询单条数据
 *
 * @param id 主键
 * @return 单条数据
 */
export const selectOne = (id) => {
  return http({
    url: `/web/test/${id}`,
    method: `get`,
  });
};
/**
 * 新增数据
 *
 * @param test 实体对象
 * @return 新增结果
 */
export const insert = (test) => {
  return http({
    url: `/web/test`,
    method: `post`,
    data: test,
  });
};
/**
 * 修改数据
 *
 * @param test 实体对象
 * @return 修改结果
 */
export const update = (test) => {
  return http({
    url: `/web/test`,
    method: `put`,
    data: test,
  });
};
/**
 * 删除数据
 *
 * @param idList 主键集合
 * @return 删除结果
 */
export const deleteByIds = (ids) => {
  return http({
    url: `/web/test`,
    method: `delete`,
    params: {
      idList: ids,
    },
  });
};
export default {
  selectAll,
  selectOne,
  insert,
  update,
  deleteByIds,
};
