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
    class="faas-content mem-list-content"
    :title="$i18n('productCenter.memory.index.内存')"
  >
    <!-- table -->
    <table class="faas-table-group warn-list">
      <thead>
        <tr>
          <!-- <th width="10%">ID</th> -->
          <th width="20%">{{ $i18n('productCenter.memory.index.名字') }}</th>
          <th width="10%">{{ $i18n('productCenter.memory.index.使用量') }}</th>
          <th width="15%">{{ $i18n('productCenter.memory.index.限制量') }}</th>
          <th width="15%">{{ $i18n('productCenter.memory.index.状态') }}</th>
          <th width="20%">{{ $i18n('productCenter.memory.index.时间') }}</th>
          <th width="10%">{{ $i18n('productCenter.memory.index.操作') }}</th>
        </tr>
      </thead>
      <tr :key="index" v-for="(item, index) in list_apps">
        <!-- <th>
          <div>
            <bp-icon
              v-if="item.relaInstType == 'App'"
              name="App"
              style="font-size: 20px; color: #ffcc00"
            ></bp-icon>
            <bp-icon
              v-if="item.relaInstType == 'Cluster'"
              name="Cluster"
              style="font-size: 20px; color: green"
            ></bp-icon>
            <bp-icon
              v-if="!item.relaInstType || item.relaInstType.length == 0"
              name="help"
              style="font-size: 20px; color: #1baaf5"
            ></bp-icon>
            <span style="margin-left: 15px">{{ item.id }}</span>
          </div>
        </th> -->
        <th>
          <bp-icon
            :name="item.status"
            style="font-size: 20px"
            :style="{ color: filterStatusIcon(item.status) }"
          ></bp-icon>

          <span style="margin-left: 10px">{{ item.name }}</span>
        </th>
        <th>
          <span>{{ item.mem }}</span>
        </th>
        <th>
          <span>{{ item.limitMem }}G</span>
        </th>
        <th>
          <span :style="{ color: filterStatusIcon(item.status) }">{{
            filterStatus(item.status)
          }}</span>
        </th>
        <th>
          <span>{{ item.mem_time }}</span>
        </th>
        <th>
          <button @click="handleDetaile(item)">{{ $i18n('productCenter.memory.index.详情') }}</button>
        </th>
      </tr>
    </table>
    <!-- <uiPagination
      :pageSize.sync="pageDta.pageSize"
      :total="pageDta.total"
      @current-change="querList"
      style="padding: 15px 10px"
      v-model="pageDta.pageNum"
    ></uiPagination> -->

    <!-- 暂无数据 -->
    <ui-no-records v-show="list_apps.length == 0" />
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
    this.getAppList(this.getAppmem);

    let self = this;
    this.timer = setInterval(() => {
      self.getAppmem();
      // 某些定时器操作
    }, 60 * 1000);
  }

  filterStatus(str: string) {
    let stuatsObj: any = {
      Initial: $i18n('productCenter.memory.index.初始化'),
      Running: $i18n('productCenter.memory.index.运行中'),
      Updating: $i18n('productCenter.memory.index.升级中'),
      Failed: $i18n('productCenter.memory.index.启动失败'),
      Stopped: $i18n('productCenter.memory.index.停止'),
      Deleting: $i18n('productCenter.memory.index.删除中'),
      Recovery: $i18n('productCenter.memory.index.冷启状态'),
      Deleted: $i18n('productCenter.memory.index.已删除'),
    };
    return stuatsObj[str];
  }

  // 过滤应用状态对象
  filterStatusIcon(key: string) {
    let status: any = {
      Running: { color: "#0ACD7F", icon: "Running", name: $i18n('productCenter.memory.index.运行中') },
      Recovery: { color: "#1baaf5", icon: "Recovery", name: $i18n('productCenter.memory.index.冷启状态') },
      Initial: { color: "#0ACD7F", icon: "Initial", name: $i18n('productCenter.memory.index.初始化') },
      Stopped: { color: "#FFCC00", icon: "Stopped", name: $i18n('productCenter.memory.index.停止') },
      Failed: { color: "#FFCC00", icon: "Failed", name: $i18n('productCenter.memory.index.启动失败') },
      Deleting: { color: "#FF3B30", icon: "Deleting", name: $i18n('productCenter.memory.index.删除中') },
      Deleted: { color: "#FF3B30", icon: "Deleted", name: $i18n('productCenter.memory.index.已删除') },
      Updating: { color: "#0ACD7F", icon: "Updating", name: $i18n('productCenter.memory.index.升级中') },
      default: { color: "#1baaf5", icon: "", name: $i18n('productCenter.memory.index.运行中') },
    };
    return status[key].color || status["default"].color;
  }

  handleDetaile(item: any) {
    this.$navbar.push({
      path: "detail?id=" + item.appId,
    });
  }

  getAppmem() { // 会报错500 先注释 将来处理
    /* api.ars.ars.app_mem(this.list_appids).then((data: any) => {
      for (let key in data) {
        let app = this.list_apps.find((item: any) => {
          return item.appId == key;
        });

        if (app) {
          let mem = parseFloat(data[key][0].value);
          app.mem = (mem / (1024 * 1024)).toFixed(2) + "MB";

          app.mem_time = filter.getDateStr(new Date(data[key][0].time), 2);
        }
      }

      this.list_apps = JSON.parse(JSON.stringify(this.list_apps));
    }); */
  }

  getAppList(callback: any) {
    this.list_apps = [];

    api.app.getApplist({ pageNum: 1, pageSize: 99999 }).then((result: any) => {
      result.content = result.content || [];
      this.list_apps = result.content;

      for (let i = 0; i < result.content.length; i++) {
        this.list_appids.push(result.content[i].appId);
      }

      if (callback) callback();

      // result.list = result.list || [];
      // this.list_apps = result.list;

      // for (let i = 0; i < result.list.length; i++) {
      //   this.list_appids.push(result.list[i].id);
      // }

      // if (callback) callback();
    });
  }
  mounted() {}
}
</script>
<style lang="scss" scoped>
.mem-list-content {
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
}
</style>
