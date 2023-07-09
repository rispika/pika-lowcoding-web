import http from "@/utils/http";

const logout = () => {
  return http({
    url: `logout`,
    method: `post`,
  });
};

export default {
  logout,
};
