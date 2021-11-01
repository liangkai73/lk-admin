<!--
/**
* Copyright (c) 2020 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2020-11-30 16:48
* Desc: 产品中心-服务组
*/
 -->

<template>
  <content-view
    :gutter="false"
    class="faas-content pdGroup-detail-content flex1"
    :title="`服务组` + (applist.length > 0 ? '-' + applist[0].catalogName : ``)"
    :showBack="true"
  >
    <!-- head -->
    <ui-card class="mt10" style="padding: 0">
      <div class="pdGroup-detail-top">
        <ui-row style="color: rgba(0, 0, 0, 0.45)" class="mt10">
          <ui-col :span="12">{{ $i18n('productCenter.group.detail.备注') }}</ui-col>
          <ui-col :span="12">{{ $i18n('productCenter.group.detail.创建时间') }}</ui-col>
        </ui-row>
        <ui-row>
          <ui-col :span="12">{{ $i18n('productCenter.group.detail.暂无') }}</ui-col>
          <ui-col :span="12">2021-4-20 18:25:36</ui-col>
        </ui-row>
      </div>
      <!-- tabs -->
      <uiTabs
        :data="tabsData"
        v-model="tabsValue"
        @handleClick="changeView"
        :type="'card'"
      ></uiTabs>
      <!-- tabsValue =1 -->
      <div class="pdGroup-detail-page" v-if="tabsValue == 1">
        <div class="mt30">
          <ui-card class="overview-head-items flex_r_c">
            <div class="overview-head-item flex1 flex_c_c" @click="handleApp">
              <strong class="overview-head-item__count" style="color: #59a8d8"
                >{{ total_app }} / {{ total_app }}</strong
              >
              <p class="overview-head-item__title">{{ $i18n('productCenter.group.detail.应用') }}</p>
            </div>
            <div class="overview-head-item flex1 flex_c_c">
              <strong
                class="overview-head-item__count"
                style="color: rgba(0, 0, 0, 0.45)"
                >0</strong
              >
              <p class="overview-head-item__title">
                <bp-icon
                  name="console-alert"
                  height="20px"
                  color="#ff443a"
                />{{ $i18n('productCenter.group.detail.紧急事件') }}
              </p>
            </div>
            <div class="overview-head-item flex1 flex_c_c">
              <strong
                class="overview-head-item__count"
                style="color: rgba(0, 0, 0, 0.45)"
                >0</strong
              >
              <p class="overview-head-item__title">
                <bp-icon
                  name="console-suspect"
                  height="20px"
                  color="#1baaf5"
                />{{ $i18n('productCenter.group.detail.可疑报告') }}
              </p>
            </div>
            <div class="overview-head-item flex1 flex_c_c">
              <strong
                class="overview-head-item__count"
                style="color: rgba(0, 0, 0, 0.45)"
                >0</strong
              >
              <p class="overview-head-item__title">
                <bp-icon
                  name="console-warning"
                  height="20px"
                  color="#ffcc00"
                />{{ $i18n('productCenter.group.detail.待处理警告') }}
              </p>
            </div>
          </ui-card>
          <div class="overview-body-items">
            <ActivityDashboardBlock></ActivityDashboardBlock>
            <CPUDashboardBlock></CPUDashboardBlock>
            <MemDashboardBlock></MemDashboardBlock>
            <ConcurrentDashboardBlock></ConcurrentDashboardBlock>
            <CostDashboardBlock></CostDashboardBlock>
          </div>
        </div>
      </div>
      <!-- tabsValue =2 -->
      <div class="pdGroup-detail-page" v-if="tabsValue == 2">
        <div class="flex_r_s prdcenter-head-tools">
          <span class="flex1"></span>
          <bp-input
            :placeholder="$i18n('productCenter.group.detail.支持关键词搜索')"
            v-model="filterStr"
            suffix-icon="search"
          ></bp-input>
          <div class="icon-box" style="margin: 0 10px">
            <bp-icon name="filter"></bp-icon>
          </div>
        </div>
        <!--dns table list-->
        <div class="prdcenter-body">
          <table class="faas-table-group mt30">
            <thead>
              <tr>
                <th width="10%">
                  <span>{{ $i18n('productCenter.group.detail.状态') }}</span>
                </th>
                <th width="15%">
                  <span>{{ $i18n('productCenter.group.detail.应用名') }}</span>
                </th>
                <th width="10%">
                  <span>{{ $i18n('productCenter.group.detail.服务组') }}</span>
                </th>
                <th width="10%">
                  <span>Runtime</span>
                </th>
                <th width="15%">
                  <span>{{ $i18n('productCenter.group.detail.外部访问地址') }}</span>
                </th>
                <th width="10%">
                  <span>{{ $i18n('productCenter.group.detail.内存') }}</span>
                </th>
                <th width="15%">
                  <span>{{ $i18n('productCenter.group.detail.创建时间') }}</span>
                </th>
                <th width="15%">
                  <span>{{ $i18n('productCenter.group.detail.修改时间') }}</span>
                </th>
              </tr>
            </thead>
            <template v-if="applist.length > 0">
              <tr
                :key="item.roleId"
                v-for="item in applist"
                v-show="filterResource(item)"
                class="cur_P apps-ul-li"
                @click="showDetail(item)"
              >
                <th>
                  <span>{{ $i18n('productCenter.group.detail.正常') }}</span>
                </th>
                <th class="one-line">
                  <span>{{ item.name }}</span>
                </th>
                <th>
                  <span>{{ item.catalogName }}</span>
                </th>
                <th>
                  <span>{{ item.runtime }}</span>
                </th>
                <th>
                  <span>{{ item.endpoint }}</span>
                </th>
                <th>
                  <span>2G</span>
                </th>
                <th>
                  <span>{{
                    new Date(item.createDt).getTime() | getDateStr(2)
                  }}</span>
                </th>
                <th>
                  <span>{{
                    new Date(item.statusDt).getTime() | getDateStr(2)
                  }}</span>
                </th>
              </tr>
            </template>
          </table>
          <!-- 分页 -->
          <template v-if="applist.length > 0">
            <uiPagination
              :pageSize.sync="applistParams.pageSize"
              :total="applistParams.total"
              @current-change="querList"
              style="padding: 15px 10px"
              v-model="applistParams.pageNum"
            ></uiPagination>
          </template>

          <!-- 暂无数据 -->
          <ui-no-records v-show="applist.length == 0" />
        </div>
      </div>
    </ui-card>
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
import uiTabs from "@/components/ui/uiTabs.vue";
import bpui from "bpui.js";
import api from "@/api";
import CPUDashboardBlock from "./components/CPUDashboardBlock.vue";
import MemDashboardBlock from "./components/MemDashboardBlock.vue";
import ConcurrentDashboardBlock from "./components/ConcurrentDashboardBlock.vue";
import ActivityDashboardBlock from "./components/ActivityDashboardBlock.vue";
import CostDashboardBlock from "./components/CostDashboardBlock.vue";

@Component({
  components: {
    contentView,
    uiPagination,
    uiDialog,
    bpInput: bpui.bpInput,
    CPUDashboardBlock,
    MemDashboardBlock,
    ConcurrentDashboardBlock,
    ActivityDashboardBlock,
    CostDashboardBlock,
    uiTabs,
  },
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
  pageDta = {
    pageNum: 1,
    pageSize: 20,
    pages: 5,
    total: 85,
  };

  dialogShow = false;

  listType = 2;

  triggerObj: any = {
    detail: false, // siderView
    addSite: false, // dialog
    group: false, // 新建分组 dialog
  };

  getAppParams = {};
  applistParams = {
    catalogId: "",
    pageNum: 1,
    pageSize: 20,
    total: 1,
  };
  applist = [];
  groupParams = {
    name: "",
  };

  total_app = 1;
  tabsValue = 1;
  tabsData = [
    { title: $i18n('productCenter.group.detail.信息概览'), value: 1 },
    { title: $i18n('productCenter.group.detail.分组应用'), value: 2 },
  ];

  //
  // computed.
  // get demo() { return xxxx; }

  //
  // watch.
  // @Watch('child')
  // onChildChanged(val: string, oldVal: string) { }

  //

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
        $UIToast({ type: "success", content: $i18n('productCenter.group.detail.分组出创建成功') });
        // 初始化
      });
    }
  }
  handleOpen(str: string) {
    if (str == "app") {
      this.changeDialog("addSite", true);
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

  querList(e: any) {
    this.applistParams.pageNum = e;
    this._getApplist();
  }
  // 过滤关键字
  // 过滤list
  filterResource(obj: any) {
    if (obj.name.indexOf(this.filterStr) >= 0) {
      return true;
    }
    return false;
  }

  // 获取应用列表
  _getApplist() {
    let params = this.applistParams;
    api.app.getApplist(params).then((result: any) => {
      this.applist = result.list || [];
    });
  }
  // 刷新列表
  updateList() {
    this._getApplist();
    this.$timer.setTimeout(() => {
      this.changeDialog("addSite", false);
    }, 500);
  }
  handleApp() {
    this.$navbar.push({
      path: "/productCenter",
    });
  }
  // 修改分组类型
  changeView(e: any) {
    if (e.value == 1) {
      // this._getGroup_Users(this.activeNum);
      console.log(e);
    }
    if (e.value == 2) {
      console.log(e);
      // this._getGroup_permission(this.activeNum);
    }
  }

  // lifecycle hook.
  constructor() {
    super();
  }
  created() {
    let { id } = (this.$route as any).query;
    this.applistParams.catalogId = id;
    this._getApplist();
  }
  mounted() {
    api.app.getApplist({ pageNum: 1, pageSize: 99999 }).then((result: any) => {
      this.total_app = result.total;
    });
  }
}
</script>
<style lang="scss">
.pdGroup-detail-content {
  min-width: 1112px;
  .prdcenter-head-tools {
    margin-top: 20px;
  }
  .apps-ul-li {
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    &:hover {
      background: #e1e1e1;
    }
  }
  .icon-box {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #8791a6;
    cursor: pointer;
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    i {
      font-size: 16px;
    }
  }
  .active_icon {
    background: #8791a6;
    color: #fff;
  }
  .prdcenter-body {
    .prdcenter-item {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
    }
    .faas-table-group {
      width: 100%;
      background: #fff;

      th {
        text-align: left;
      }
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
  .overview-head-items {
    width: calc(100% - 30px);
    padding: 0px;
    margin: 0 0 0 10px;
    height: 90px;

    .overview-head-item {
      height: 100%;
      cursor: pointer;
      /*border-right: 1px solid #e5e6ec;*/
      background: transparent;
      transition: all 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);
      position: relative;
      &:last-child {
        border-right: none;
      }
      &:hover {
        background: #f9f9f9;
      }
      b {
        font-size: 24px;
        line-height: 30px;
        letter-spacing: 1px;
        font-weight: 500;
      }
      &:after {
        content: "";
        border-right: 1px solid #e5e6ec;
        height: calc(100% - 30px);
        position: absolute;
        right: 0px;
      }
      &:nth-child(4) {
        &:after {
          height: 0px;
        }
      }

      .overview-head-item__count {
        font-size: 24px;
        font-weight: bold;
        font-stretch: normal;
        line-height: 30px;
        letter-spacing: 1px;
        user-select: none;
      }

      .overview-head-item__title {
        display: flex;
        align-items: center;
        height: 28px;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        margin-top: 5px;
        color: #000000;
        user-select: none;

        i {
          margin-right: 5px;
        }
      }
    }
  }
  .overview-body-items {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
  }
  .pdGroup-detail-top {
    padding: 20px;
  }
  .pdGroup-detail-page{
    min-height: 600px;
    padding: 10px;
  }
}
</style>
