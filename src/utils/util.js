import { Message, MessageBox } from "element-ui";
export const removeConfirm = (fun) => {
  MessageBox.confirm("此操作将永久删除该数据, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      fun();
    })
    .catch(() => {
      Message.info("已取消删除");
    });
};
export default {
  removeConfirm,
};
