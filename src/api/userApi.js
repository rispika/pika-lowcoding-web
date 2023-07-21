import http from "@/utils/http";
import qs from "qs";
//POST 用户登录接口
export const login = (username, password) => {
  let data = qs.stringify({
    username: username,
    password: password,
  });
  return http({
    url: `/user/login`,
    method: `post`,
    data,
  });
};

export const logout = () => {
  return http({
    url: `/user/logout`,
    method: `post`,
  });
};

/**
 * 分页查询用户信息
 * @param {Integer} page
 * @param {Integer} size
 * @param {*} userQueryDTO
 * @returns
 */
export const queryUserPages = (page, size, userQueryDTO) => {
  return http({
    url: `/system/user/queryUserPages/${page}/${size}`,
    method: `get`,
    params: userQueryDTO,
  });
};

/**
 * 删除用户
 *
 * @param userId 用户id
 * @return {@link R}
 */
export const removeUser = (userId) => {
  return http({
    url: `/system/user/removeUser/${userId}`,
    method: `delete`,
  });
};

/**
 * 根据用户id获取用户信息
 *
 * @param userId 用户id
 * @return {@link R}
 */
export const getUserById = (userId) => {
  return http({
    url: `/system/user/getUserById/${userId}`,
    method: `get`,
  });
};

/**
 * 根据用户id更新数据
 *
 * @param user 用户
 * @return {@link R}
 */
export const updateByUserId = (user) => {
  return http({
    url: `/system/user/updateByUserId`,
    method: `post`,
    data: user,
  });
};

/**
 * 保存用户
 *
 * @param user 用户
 * @return {@link R}
 */
export const saveUser = (user) => {
  return http({
    url: `/system/user/saveUser`,
    method: `put`,
    data: user,
  });
};

export default {
  login,
  logout,
  queryUserPages,
  removeUser,
  updateByUserId,
  saveUser,
};
