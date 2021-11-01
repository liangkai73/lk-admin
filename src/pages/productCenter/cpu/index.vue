<!--
/**
* Copyright (c) 2020 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2020-12-24 14:49
* Desc: 
*/
 -->

<template>
  <content-view
    :gutter="false"
    class="faas-content cpu-list-content"
    title="CPU"
  >
    <!-- table -->
    <table class="faas-table-group warn-list">
      <thead>
        <tr>
          <th width="25%">{{ $i18n('productCenter.cpu.index.名字') }}</th>
          <th width="15%">{{ $i18n('productCenter.cpu.index.使用量') }}</th>
          <th width="15%">{{ $i18n('productCenter.cpu.index.限制量') }}</th>
          <th width="15%">{{ $i18n('productCenter.cpu.index.状态') }}</th>
          <th width="20%">{{ $i18n('productCenter.cpu.index.时间') }}</th>
          <th width="10%">{{ $i18n('productCenter.cpu.index.操作') }}</th>
        </tr>
      </thead>
      <tr :key="index" v-for="(item, index) in list_apps">
        <th>
          <div>
            <bp-icon
              :name="item.status"
              style="font-size: 20px"
              :style="{ color: filterStatusIcon(item.status) }"
            ></bp-icon>
            <span style="margin-left: 10px">{{ item.name }}</span>
          </div>
        </th>
        <th>
          <span>{{ item.cpu }}</span>
        </th>
        <th>
          <span>{{ item.limitCpu }} {{ $i18n('productCenter.cpu.index.核') }}</span>
        </th>
        <th>
          <span :style="{ color: filterStatusIcon(item.status) }">{{
            filterStatus(item.status)
          }}</span>
        </th>
        <th>
          <span>{{ item.cpu_time }}</span>
        </th>
        <th>
          <button @click="handleDetaile(item)">{{ $i18n('productCenter.cpu.index.详情') }}</button>
        </th>
      </tr>
    </table>

    <!-- 暂无数据 -->
    <ui-no-records v-show="list_apps.length == 0" />
    <!-- <uiPagination
      :pageSize.sync="pageDta.pageSize"
      :total="pageDta.total"
      @current-change="querList"
      style="padding: 15px 10px"
      v-model="pageDta.pageNum"
    ></uiPagination> -->
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
import bpui from "bpui.js";
import uiPagination from "@/components/ui/uiPagination.vue";

import api from "@/api";
import filter from "@/libs/filter";

@Component({
  components: { contentView, uiPagination },
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

  //
  // computed.
  // get demo() { return xxxx; }

  //
  // watch.
  // @Watch('child')
  // onChildChanged(val: string, oldVal: string) { }

  //
  // lifecycle hook.
  pageDta = {
    pageNum: 1,
    pageSize: 10,
    pages: 1,
    total: 1,
  };

  list_apps = [] as any;
  list_appids = [] as any;

  timer = null as any;

  constructor() {
    super();
  }

  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  created() {
    this.getAppList(this.getAppCPU);

    let self = this;
    this.timer = setInterval(() => {
      self.getAppCPU();
      // 某些定时器操作
    }, 60 * 1000);
  }

  filterStatus(str: string) {
    let stuatsObj: any = {
      Initial: $i18n('productCenter.cpu.index.初始化'),
      Running: $i18n('productCenter.cpu.index.运行中'),
      Updating: $i18n('productCenter.cpu.index.升级中'),
      Failed: $i18n('productCenter.cpu.index.启动失败'),
      Stopped: $i18n('productCenter.cpu.index.停止'),
      Deleting: $i18n('productCenter.cpu.index.删除中'),
      Recovery: $i18n('productCenter.cpu.index.冷启状态'),
      Deleted: $i18n('productCenter.cpu.index.已删除'),
    };
    return stuatsObj[str];
  }
  // 过滤应用状态对象
  filterStatusIcon(key: string) {
    let status: any = {
      Running: { color: "#0ACD7F", icon: "Running", name: $i18n('productCenter.cpu.index.运行中') },
      Recovery: { color: "#1baaf5", icon: "Recovery", name: $i18n('productCenter.cpu.index.冷启状态') },
      Initial: { color: "#0ACD7F", icon: "Initial", name: $i18n('productCenter.cpu.index.初始化') },
      Stopped: { color: "#FFCC00", icon: "Stopped", name: $i18n('productCenter.cpu.index.停止') },
      Failed: { color: "#FFCC00", icon: "Failed", name: $i18n('productCenter.cpu.index.启动失败') },
      Deleting: { color: "#FF3B30", icon: "Deleting", name: $i18n('productCenter.cpu.index.删除中') },
      Deleted: { color: "#FF3B30", icon: "Deleted", name: $i18n('productCenter.cpu.index.已删除') },
      Updating: { color: "#0ACD7F", icon: "Updating", name: $i18n('productCenter.cpu.index.升级中') },
      default: { color: "#1baaf5", icon: "", name: $i18n('productCenter.cpu.index.运行中') },
    };
    return status[key].color || status["default"].color;
  }

  handleDetaile(item: any) {
    this.$navbar.push({
      path: "detail?id=" + item.appId,
    });
  }

  getAppCPU() {
    /* api.ars.ars.app_cpu(this.list_appids).then((data: any) => {
      for (let key in data) {
        let app = this.list_apps.find((item: any) => {
          return item.appId == key;
        });

        if (app) {
          let cpu = parseFloat(data[key][0].value);
          app.cpu = (cpu * 100).toFixed(2) + "%";

          app.cpu_time = filter.getDateStr(new Date(data[key][0].time), 2);
        }
      }

      this.list_apps = JSON.parse(JSON.stringify(this.list_apps));
    }); */
  }

  getAppList(callback: any) {
    this.list_apps = [];

    api.app.getApplist({ pageNum: 1, pageSize: 99999 }).then((result: any) => {
      // result.list = result.list || [];
      // this.list_apps = result.list;

      // for (let i = 0; i < result.list.length; i++) {
      //   this.list_appids.push(result.list[i].id);
      // }

      // if (callback) callback();
      result.content = result.content || [];
      this.list_apps = result.content;

      for (let i = 0; i < result.content.length; i++) {
        this.list_appids.push(result.content[i].appId);
      }

      if (callback) callback();

    });
  }
  mounted() {}
}
</script>
<style lang="scss" scoped>
.cpu-list-content {
  height: calc(100vh - 50px);
  width: 100%;
  overflow-y: auto;
  .warn-list {
    width: 100%;
    thead {
      background: #fff;
      border: none;
      // border-bottom: 1px solid #e5e6ec;
      // box-shadow: none;
      box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1);
    }
    tr {
      border: none;
      box-shadow: inset 0px -1px 0px 0px rgba(0, 0, 0, 0.1);
      background: #fff;
      transition: cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s all;
      text-align: left;
      &:hover {
        background: #f1f1f1;
        cursor: pointer;
      }
    }
  }

  // .status{
  //   .warn{
  //     color:
  //   }
  // }
}
</style>
