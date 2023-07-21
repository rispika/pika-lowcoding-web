import http from "@/utils/http";

/**
 * 预览图片
 *
 * @param image 图片
 * @return {@link R}
 */
export const previewImage = (image) => {
  return http({
    url: `/system/io/previewImage/${window.btoa(image)}`,
    method: `get`,
  });
};

export default {
  previewImage,
};
