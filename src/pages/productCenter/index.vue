<!--
/**
* Copyright (c) 2020 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2020-11-30 16:48
* Desc: console 首页
*/
 -->

<template>
  <content-view
    :gutter="false"
    class="faas-content prdcenter-content flex1"
    :title="$i18n('productCenter.index.Web服务管理')"
  >
    <div class="flex_r_s prdcenter-head-tools">
      <button
        class="bp-btn faas-btn-primary"
        @click="handleOpen('app')"
        style="width: 120px"
      >
        {{ $i18n("productCenter.index.新建") }}
      </button>
      <span class="flex1"></span>
      <span style="padding: 0 15px 0 20px">{{
        $i18n("productCenter.index.运行语言环境")
      }}</span>
      <ui-select-el
        class="bp-select"
        :placeholder="$i18n('productCenter.index.请选择')"
        v-model="applistParams.runtimeId"
        style="width: 140px"
        @change="_getApplist"
      >
        <ui-option
          :key="'key2' + index"
          :label="item.runtime"
          :value="item.id"
          v-for="(item, index) in runTimeList"
        ></ui-option>
        <ui-option
          :label="$i18n('productCenter.index.全部')"
          :value="''"
        ></ui-option>
      </ui-select-el>
      <span style="padding: 0 15px 0 20px">{{
        $i18n("productCenter.index.所属分组")
      }}</span>
      <ui-select-el
        class="bp-select"
        :placeholder="$i18n('productCenter.index.请选择')"
        v-model="applistParams.catalogId"
        style="width: 140px"
        @change="_getApplist"
      >
        <ui-option
          :key="'key1' + index"
          :label="item.name"
          :value="item.id"
          v-for="(item, index) in siteGroups"
        ></ui-option>
        <ui-option
          :label="$i18n('productCenter.index.全部分组')"
          :value="''"
        ></ui-option>
      </ui-select-el>
      <!-- <span style="padding: 0 15px 0 20px">状态</span> -->
      <span style="padding: 0 15px 0 20px"></span>
      <bp-input
        class="bp-input-search"
        :placeholder="$i18n('productCenter.index.支持关键词搜索')"
        v-model="filterStr"
        suffix-icon="search"
      ></bp-input>
      <div class="icon-box" style="margin: 0 10px">
        <bp-icon name="refresh" class="font20"></bp-icon>
      </div>
      <div
        class="icon-box"
        :class="[
          {
            active_icon: listType == 1,
          },
        ]"
        @click="
          () => {
            listType = 1;
          }
        "
      >
        <bp-icon name="bulk"></bp-icon>
      </div>
      <div
        class="icon-box"
        :class="[
          {
            active_icon: listType == 2,
          },
        ]"
        @click="
          () => {
            listType = 2;
          }
        "
      >
        <bp-icon name="list"></bp-icon>
      </div>
    </div>
    <!--dns table list-->
    <div class="prdcenter-body">
      <!-- listView 1 -->
      <template v-if="listType == '1' && applist.length > 0">
        <div class="prdcenter-item">
          <!-- <siteItem
            v-for="(item, index) in applist"
            v-show="filterResource(item)"
            @click.native="showDetail(item)"
            :key="index"
            :data="item"
          >
            <ui-dropdown slot="headRight" trigger="click">
              <bp-icon
                name="more"
                @click.stop="() => {}"
                class="cur_P"
              ></bp-icon>
              <ui-dropdown-menu slot="dropdown">
                <ui-dropdown-item @click.native="removeApp(item.id)"
                  >删除</ui-dropdown-item
                >
              </ui-dropdown-menu>
            </ui-dropdown>
          </siteItem> -->
          <appItem
            v-for="(item, index) in applist"
            v-show="filterResource(item)"
            @click.native="showDetail(item)"
            :key="index"
            :data="item"
          ></appItem>
        </div>
      </template>
      <!-- listView 2 -->
      <template v-if="listType == '2'">
        <table class="faas-table-group mt30">
          <thead>
            <tr class="uselect-none">
              <th width="10%">
                <span>{{ $i18n("productCenter.index.状态") }}</span>
              </th>
              <th width="15%">
                <span>{{ $i18n("productCenter.index.名称") }}</span>
              </th>
              <th width="8%">
                <span>CPU</span>
              </th>
              <th width="8%">
                <span>{{ $i18n("productCenter.index.内存") }}</span>
              </th>
              <th width="10%">
                <span class="one-line">{{
                  $i18n("productCenter.index.服务组")
                }}</span>
              </th>
              <th width="8%">
                <span class="one-line">{{
                  $i18n("productCenter.index.运行语言环境")
                }}</span>
              </th>

              <th width="15%">
                <span>{{ $i18n("productCenter.index.修改时间") }}</span>
              </th>
              <th width="15%">
                <span>{{ $i18n("productCenter.index.创建时间") }}</span>
              </th>
              <th width="11%">
                <span>{{ $i18n("productCenter.index.操作") }}</span>
              </th>
            </tr>
          </thead>
          <template v-if="applist.length > 0">
            <tr
              :key="item.roleId"
              v-for="item in applist"
              v-show="filterResource(item)"
              class="apps-ul-li"
            >
              <th class="status-th">
                <div class="flex_r_s">
                  <div
                    class="status-th-left"
                    :style="{ background: filterStatus(item.status).color }"
                  ></div>
                  <div class="flex_r_s">
                    <bp-icon
                      :name="filterStatus(item.status).icon"
                      style="font-size: 18px; margin-left: 20px"
                      :style="{ color: filterStatus(item.status).color }"
                    ></bp-icon>
                    <span
                      class="pl10"
                      :style="{ color: filterStatus(item.status).color }"
                      >{{
                        $inEnglish
                          ? item.status
                          : filterStatus(item.status).name
                      }}</span
                    >
                  </div>
                </div>
              </th>
              <th @click="showDetail(item)" class="cur_P">
                <span>{{ item.name }}</span>
              </th>
              <th>
                <span>{{ item.limitCpu }} Core</span>
              </th>
              <th>
                <span>{{ item.limitMem }} GB</span>
              </th>
              <th>
                <span>{{ item.catalogName }}</span>
              </th>
              <th>
                <span>{{ item.runtimeName }}</span>
              </th>
              <th>
                <span class="font12">{{
                  item.updateTime | getDateStr(2)
                }}</span>
              </th>
              <th>
                <span class="font12">{{
                  item.createTime | getDateStr(2)
                }}</span>
              </th>
              <td>
                <div style="width: 88px">
                  <button @click="linkToDetail(item.appId)" class="actionBtn">
                    {{ $i18n("productCenter.index.详情") }}
                  </button>
                  <button @click="removeApp(item.appId)" class="actionBtn">
                    {{ $i18n("productCenter.index.删除") }}
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </table>
      </template>
      <!-- 分页 -->
      <template v-if="applist.length > 0">
        <uiPagination
          :pageSize.sync="applistParams.pageSize"
          :total="applistParams.total"
          @current-change="querList"
          style="padding: 15px 10px"
          v-model="applistParams.pageNo"
        ></uiPagination>
      </template>

      <!-- 暂无数据 -->
      <ui-no-records v-show="applist.length == 0" />
    </div>
    <!-- 添加域名 -->
    <ui-dialog
      class="dialog-box"
      v-model="dialogShow"
      :title="$i18n('productCenter.index.添加域名')"
    >
      <div class="dialog-inner flex_c_s">
        <div class="line1" style="margin: 0"></div>
        <ui-row class="inner-item mt10" style="margin-top: 80px">
          <ui-col :span="24">
            <p>{{ $i18n("productCenter.index.支持添加主域或子域") }}</p>
            <bp-input
              class="mt10 inner-input"
              :placeholder="$i18n('productCenter.index.请输入域名')"
            ></bp-input>
          </ui-col>
        </ui-row>
        <span class="flex1"></span>
        <div class="inner-footer flex_r_s">
          <span class="flex1"></span>
          <button
            class="bp-btn faas-btn-black"
            style="margin-right: 10px"
            @click="handleDlogClose"
          >
            {{ $i18n("productCenter.index.取消") }}
          </button>
          <button class="bp-btn faas-btn-primary" @click="handleSure">
            {{ $i18n("productCenter.index.确定") }}
          </button>
        </div>
      </div>
    </ui-dialog>
    <!-- 新建分组 -->
    <ui-dialog
      class="dialog-box"
      v-model="triggerObj.group"
      :title="$i18n('productCenter.index.新建分组')"
    >
      <div class="dialog-inner flex_c_s">
        <div class="line1" style="margin: 0"></div>
        <ui-row class="inner-item mt10" style="margin-top: 80px">
          <ui-col :span="24">
            <p>{{ $i18n("productCenter.index.新建分组") }}</p>
            <bp-input
              class="mt10 inner-input"
              :placeholder="$i18n('productCenter.index.请输入组名')"
              v-model="groupParams.name"
            ></bp-input>
          </ui-col>
        </ui-row>
        <span class="flex1"></span>
        <div class="inner-footer flex_r_s">
          <span class="flex1"></span>
          <button
            class="bp-btn faas-btn-black"
            style="margin-right: 10px"
            @click="handleDlogClose('group')"
          >
            {{ $i18n("productCenter.index.取消") }}
          </button>
          <button
            class="bp-btn faas-btn-primary"
            :disabled="!(groupParams.name.length > 0)"
            @click="handleSure('group')"
          >
            {{ $i18n("productCenter.index.确定") }}
          </button>
        </div>
      </div>
    </ui-dialog>
    <!-- siderView 网站详情 -->
    <sideViewDetail
      v-model="triggerObj.detail"
      v-if="triggerObj.detail"
      :data="activeItem"
      @updateList="updateList"
    ></sideViewDetail>
    <!-- dialog 新增web服务 -->
    <addsitedialog
      v-model="triggerObj.addSite"
      @updateList="updateList"
      v-if="triggerObj.addSite"
    ></addsitedialog>
  </content-view>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  // Prop,
  // Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";

import contentView from "@/components/layout/contentView.vue";
import uiPagination from "@/components/ui/uiPagination.vue";
import uiDialog from "@/components/ui/uiDialogView.vue";
import bpui from "bpui.js";
import api from "@/api";
// 逻辑组件
import siteItem from "./components/siteItem.vue";
import appItem from "./components/appItem.vue";
import sideViewDetail from "./components/sideViewDetail.vue";
import addsitedialog from "./components/addSiteDialog.vue";
// libs 支持
import { APP_STATUS } from "./libs";

@Component({
  components: {
    contentView,
    uiPagination,
    uiDialog,
    bpInput: bpui.bpInput,
    siteItem,
    sideViewDetail,
    addsitedialog,
    appItem,
  },
  name: "productCenter.index",
})
export default class extends Vue {
  //
  // event.
  // @Emit()
  // demoEvent(type: string) { }

  //
  // state.
  // @State(state=>state.demo) demo:DEMO_TYPE;

  //
  // Prop
  // @Prop({ type: number }) demo: number;

  //
  // data.
  // @Provide() demo:number = 1;

  filterStr = "";
  activeItem: any = {};

  dialogShow = false;

  listType = 1;

  triggerObj: any = {
    detail: false, // siderView
    addSite: false, // dialog
    group: false, // 新建分组 dialog
  };

  getAppParams = {};

  applistParams = {
    pageNo: 1,
    pageSize: 20,
    total: 1,
    // runtimeId: "",
    // catalogId: "",
  };
  applist = [];
  groupParams = {
    name: "",
  };

  // selecet
  runTimeList = [];
  siteGroups = [];

  //
  // computed.
  // get demo() { return xxxx; }

  //
  // watch.
  // @Watch('child')
  // onChildChanged(val: string, oldVal: string) { }

  // select 运行语言
  chsoseRuntime() {}

  handleChoseCp() {
    // this.changeDialog(true);
  }
  handleDlogClose(key: any) {
    this.changeDialog(key, false);
  }
  handleSure(str?: string) {
    if (str == "group") {
      this.addAppgroup().then((result: any) => {
        this.groupParams.name = "";
        $UIToast({
          type: "success",
          content: $i18n("productCenter.index.分组出创建成功"),
        });
        // 初始化
      });
    }
  }
  handleOpen(str: string) {
    if (str == "app") {
      this.changeDialog("addSite", true);
      this.$navbar.push({
        path: "/productCenter/create",
      });
    } else if (str == "group") {
      this.changeDialog("group", true);
    }
  }
  changeDialog(key: string, bl: boolean) {
    this.triggerObj[key] = bl;
  }

  addNewSite() {}
  // 新建app分组
  addAppgroup() {
    return api.app.postCatalog(this.groupParams).then((result: any) => {
      return Promise.resolve(result);
    });
  }
  // 打开详情侧边栏
  showDetail(item: any) {
    this.activeItem = item;
    this.changeDialog("detail", true);
  }
  querList(e: any) {
    this.applistParams.pageNo = e;
    this._getApplist();
  }
  removeApp(id: any) {
    this.$UIConfirm({
      content: $i18n("productCenter.index.是否删除？"),
      title: $i18n("productCenter.index.应用"),
    })
      .then(() => {
        this.$UIConfirmHide();
        api.app
          .removeApp(id)
          .then((result: any) => {
            $UIToast({
              type: "success",
              content: $i18n("productCenter.index.删除成功"),
            });
            this._getApplist();
          })
          .catch(() => {});
      })
      .catch(() => {});
  }
  // 过滤关键字
  // 过滤list
  filterResource(obj: any) {
    if (obj.name.indexOf(this.filterStr) >= 0) {
      return true;
    }
    return false;
    // return true;
  }
  // 过滤状态
  filterStatus(status: string) {
    return (APP_STATUS as any)[status] || APP_STATUS.default;
  }

  // 过滤应用状态对象
  filterStatusIcon(key: string) {
    let status: any = {
      Running: {
        color: "#0ACD7F",
        icon: "Running",
        name: $i18n("productCenter.index.运行中"),
      },
      Recovery: {
        color: "#1baaf5",
        icon: "Recovery",
        name: $i18n("productCenter.index.冷启状态"),
      },
      Initial: {
        color: "#0ACD7F",
        icon: "Initial",
        name: $i18n("productCenter.index.初始化"),
      },
      Stopped: {
        color: "#FFCC00",
        icon: "Stopped",
        name: $i18n("productCenter.index.停止"),
      },
      Failed: {
        color: "#FFCC00",
        icon: "Failed",
        name: $i18n("productCenter.index.启动失败"),
      },
      Deleting: {
        color: "#FF3B30",
        icon: "Deleting",
        name: $i18n("productCenter.index.删除中"),
      },
      Deleted: {
        color: "#FF3B30",
        icon: "Deleted",
        name: $i18n("productCenter.index.已删除"),
      },
      Updating: {
        color: "#0ACD7F",
        icon: "Updating",
        name: $i18n("productCenter.index.升级中"),
      },
      default: {
        color: "#1baaf5",
        icon: "Running",
        name: $i18n("productCenter.index.运行中"),
      },
    };
    return status[key] || status["default"];
  }

  // 获取应用列表
  _getApplist() {
    let params = this.applistParams;
    this.$timer.clearAll();
    api.app.getApplist(params).then((result: any) => {
      this.applist = result.content || [];
      this.applistParams.total = result.total
      let initialObj = this.applist.filter((node: any) => {
        return node.status == "Initial";
      });
      let runningObj = this.applist.filter((node: any) => {
        return node.status == "Running";
      });
      if (initialObj.length > 0 || runningObj.length > 0) {
        this.$timer.setTimeout(() => {
          this._getApplist();
        }, 5000);
      }
    });
  }
  // 刷新列表
  updateList() {
    this._getApplist();
    this.$timer.setTimeout(() => {
      this.changeDialog("addSite", false);
    }, 500);
  }
  copyStr(s: string) {
    var domUrl = document.createElement("input");
    domUrl.value = s;
    domUrl.id = "creatDom";
    document.body.appendChild(domUrl);
    domUrl.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    let creatDom: any = document.getElementById("creatDom");
    creatDom.parentNode.removeChild(creatDom);
    $UIToast({
      type: "success",
      content: $i18n("productCenter.index.复制成功，可粘贴"),
    });
  }
  // 获取语言环境
  _getRuntimeList() {
    api.app.getRuntimeList().then((result: any) => {
      this.runTimeList = result;
    });
  }
  // 获取分组列表
  _getGroupList() {
    api.app.getCatalog().then((result: any) => {
      this.siteGroups = result;
      //   this.addsiteParams.catalogId =
      //     this.siteGroups.length > 0 ? (this.siteGroups[0] as any).id : "";
    });
  }
  // 跳转
  linkToDetail(id: string) {
    this.$navbar.push({
      path: "/productCenter/detail",
      query: { id: id },
    });
  }

  // lifecycle hook.
  constructor() {
    super();
  }
  created() {
    this._getApplist();
    this._getRuntimeList();
    this._getGroupList();
  }
  mounted() {}
}
</script>
<style lang="scss">
.prdcenter-content {
  min-width: 1112px;
  .prdcenter-head-tools {
    margin: 20px 0.8% 0 0.8%;
  }
  .apps-ul-li {
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    &:hover {
      background: #e1e1e1;
    }
  }
  .icon-box {
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    cursor: pointer;
    background: #dcdcdc;
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    i {
      font-size: 16px;
    }
  }
  .active_icon {
    background: #1baaf5;
    color: #fff;
  }
  .bp-input {
    background: #dcdcdc;
  }
  // .el-input__inner {
  //   border-radius: 0;
  //   height: 32px;
  //   background: #dcdcdc;
  //   color: #000;
  //   padding-left: 8px;
  // }
  // .el-input__inner::placeholder {
  //   color: #909399 !important;
  // }
  // .el-input__icon {
  //   line-height: 32px !important;
  //   color: #909399 !important;
  // }
  .prdcenter-body {
    .prdcenter-item {
      margin-top: 16px;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
    }
    .faas-table-group {
      width: 100%;
      background: #fff;
      .actionBtn {
        font-weight: normal;
        &:first-child {
          margin-right: 5px;
        }
      }
      th {
        text-align: left;
      }
      .status-th {
        padding: 0;
        // padding-bottom: 10px;
        > div {
          height: 100%;
          span {
            white-space: nowrap;
          }
          .status-th-left {
            width: 3px;
            height: 100%;
            background: #ccc;
          }
        }
      }
    }
    .item-title-copy {
      padding: 0 5px;
      color: #1baaf5;
      cursor: pointer;
    }
  }
  .dialog-box {
    .bp-dialog__main {
      padding-top: 0px;
    }
  }

  .dialog-inner {
    width: 500px;
    height: 240px;
    text-align: left;
    justify-content: start;
    .inner-title {
      width: 100%;
    }
    .inner-item {
      p {
        padding-left: 3px;
        color: rgba(0, 0, 0, 0.45);
      }
    }
    .inner-input {
      height: 40px;
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
