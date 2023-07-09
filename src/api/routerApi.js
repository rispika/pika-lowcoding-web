import http from "@/utils/http";

// 获取侧边栏动态路由
const pikaMenu = () => {
  return http({
    url: `/system/router/pikaMenu`,
    method: `get`,
  });
};

const pikaMenuAdmin = (page, size) => {
  return http({
    url: `/system/router/pikaMenuAdmin/${page}/${size}`,
    method: `get`,
  });
};

// 获取动态路由
const pikaRouter = () => {
  return http({
    url: `/system/router/pikaRouter`,
    method: `get`,
  });
};

// 添加
const save = (data) => {
  return http({
    url: `/system/router/save`,
    method: `put`,
    data,
  });
};

// GET /router/{id} 根据id获取路由信息
const getById = (id) => {
  return http({
    url: `/system/router/${id}`,
    method: `get`,
  });
};

//GET /router/level/{level} 根据level获取路由信息
const getByLevel = (id) => {
  return http({
    url: `/system/router/level/${id}`,
    method: `get`,
  });
};

//DELETE /router/{id} 根据id删除路由信息
const removeById = (id) => {
  return http({
    url: `/system/router/${id}`,
    method: `delete`,
  });
};

//PUT /router/update 修改一个路由信息
const updateById = (data) => {
  return http({
    url: `/system/router/update`,
    method: `post`,
    data,
  });
};

export default {
  pikaMenu,
  pikaMenuAdmin,
  pikaRouter,
  getById,
  save,
  removeById,
  updateById,
  getByLevel,
};
