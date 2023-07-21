import pikaTable from "@/components/template/pika-table";
import pikaQuery from "@/components/template/pika-query";
import pikaDialog from "@/components/template/pika-dialog";
import pikaPagination from "@/components/template/pika-pagination";

const PikaComponent = {
  install: (Vue) => {
    Vue.component("pika-table", pikaTable);
    Vue.component("pika-query", pikaQuery);
    Vue.component("pika-dialog", pikaDialog);
    Vue.component("pika-pagination", pikaPagination);
  },
};
export default PikaComponent;
