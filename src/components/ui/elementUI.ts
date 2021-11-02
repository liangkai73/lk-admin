import {
  Option,
  Select,
  Table,
  TableColumn,
  TabPane,
  Tabs,
} from "element-ui";

const uiSelectEl = {
  install: function (Vue: any) {
    Vue.component("uiSelectEl", Select);
  },
};
const uiOption = {
  install: function (Vue: any) {
    Vue.component("uiOption", Option);
  },
};
const elTabs = {
  install: function (Vue: any) {
    Vue.component("elTabs", Tabs);
  },
};
const elTabPane = {
  install: function (Vue: any) {
    Vue.component("elTabPane", TabPane);
  },
};
const elTable = {
  install: function (Vue: any) {
    Vue.component("elTable", Table);
  },
};
const elTableColumn = {
  install: function (Vue: any) {
    Vue.component("elTableColumn", TableColumn);
  },
};
export default [
  uiSelectEl,
  uiOption,
  elTabPane,
  elTabs,
  elTable,
  elTableColumn,
];
