<!--
/**
* Copyright (c) 2020 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2020-08-24 15:11
* Desc: store - detail
*/
 -->

<template>
  <content-view
    :gutter="false"
    :showBack="true"
    class="faas-content store-detail-content"
    :title="repo.name"
  >
    <ui-tabs
      :data="tabsArr"
      @handleClick="tabsClick"
      title="name"
      v-model="tabsValue"
    ></ui-tabs>
    <!-- page1 基本信息 -->
    <template v-if="tabsValue == 1">
      <div class="store-detail-base mt20">
        <div class="detail-base-info">
          <p style="font-size: 18px; font-weight: 600">{{ $i18n('cloudProvider.mirror.store.detail.基本信息') }}</p>
          <ui-row class="mt20">
            <ui-col :span="8">
              <p class="info-title">{{ $i18n('cloudProvider.mirror.store.detail.仓库名称') }}</p>
              <p>{{ repo.name }}</p>
            </ui-col>
            <!-- <ui-col :span="8">
              <p class="info-title">仓库类型</p>
              <p>私有</p>
            </ui-col>
            <ui-col :span="8">
              <p class="info-title">代码仓库</p>
              <p>无</p>
            </ui-col> -->
          </ui-row>
          <ui-row class="mt10">
            <ui-col :span="8">
              <p class="info-title">{{ $i18n('cloudProvider.mirror.store.detail.公网地址') }}</p>
              <div class="flex_r_s">
                <p>{{ repo.publicEndpoint }}</p>
                <div style="width: 10px"></div>
                <div
                  style="cursor: pointer"
                  @click="handleCopy(repo.publicEndpoint)"
                  class="flex_r_s"
                >
                  <bp-icon name="copy" style="font-size: 16px"></bp-icon>
                  <div style="color: #067bff; margin-left: 5px">{{ $i18n('cloudProvider.mirror.store.detail.复制') }}</div>
                </div>
              </div>
            </ui-col>
            <ui-col :span="8">
              <p class="info-title">{{ $i18n('cloudProvider.mirror.store.detail.专有网络') }}</p>
              <div class="flex_r_s">
                <p>{{ repo.vpcEndpoint }}</p>
                <div style="width: 10px"></div>
                <div
                  style="cursor: pointer"
                  @click="handleCopy(repo.vpcEndpoint)"
                  class="flex_r_s"
                >
                  <bp-icon name="copy" style="font-size: 16px"></bp-icon>
                  <div style="color: #067bff; margin-left: 5px">{{ $i18n('cloudProvider.mirror.store.detail.复制') }}</div>
                </div>
              </div>
            </ui-col>
            <ui-col :span="8">
              <p class="info-title">{{ $i18n('cloudProvider.mirror.store.detail.经典网络') }}</p>
              <div class="flex_r_s">
                <p>{{ repo.classEndpoint }}</p>
                <div style="width: 10px"></div>
                <div
                  style="cursor: pointer"
                  @click="handleCopy(repo.classEndpoint)"
                  class="flex_r_s"
                >
                  <bp-icon name="copy" style="font-size: 16px"></bp-icon>
                  <div style="color: #067bff; margin-left: 5px">{{ $i18n('cloudProvider.mirror.store.detail.复制') }}</div>
                </div>
              </div>
            </ui-col>
          </ui-row>
        </div>
        <ui-tabs
          :data="baseInfoTabsArr"
          title="name"
          :type="'card'"
          v-model="baseInfoTabsVal"
        ></ui-tabs>
        <!-- 操作指南 -->
        <manual v-if="baseInfoTabsVal == 1"></manual>
        <!-- 镜像描述 -->
        <describe v-if="baseInfoTabsVal == 2"></describe>
      </div>
    </template>
    <!-- page2 镜像版本 -->
    <!-- <template v-if="tabsValue == 2">
      <div class="store-detail-mirror">
        <table class="faas-table-group mt30">
          <thead>
            <tr>
              <th width="15%">
                <span>仓库名称</span>
              </th>
              <th width="15%">
                <span>命名空间</span>
              </th>
              <th width="15%">
                <span>仓库状态</span>
              </th>
              <th width="15%">
                <span>仓库类型</span>
              </th>
              <th width="15%">
                <span>仓库地址</span>
              </th>
              <th width="15%">
                <span>新建时间</span>
              </th>
              <th width="10%">
                <span>操作</span>
              </th>
            </tr>
          </thead>
          <template v-if="roleList && roleList.length > 0">
            <tr :key="item.roleId" v-for="item in roleList">
              <th>
                <span>{{ item.name }}</span>
              </th>
              <th>
                <span>{{ item.namespace }}</span>
              </th>
              <th>
                <span>{{ item.status }}</span>
              </th>
              <th>
                <span>{{ item.storeType }}</span>
              </th>
              <th>
                <span>{{ item.add }}</span>
              </th>
              <th>
                <span>{{ item.time }}</span>
              </th>
              <th>
                <button>删除</button>
              </th>
            </tr>
          </template>
        </table>
        <template v-if="roleList && roleList.length > 0">
          <uiPagination
            :pageSize.sync="pageDta.pageSize"
            :total="pageDta.total"
            @current-change="querList"
            style="padding: 15px 10px"
            v-model="pageDta.pageNum"
          ></uiPagination>
        </template>
      </div>
    </template> -->
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

import bpui from "bpui.js";
import api from "@/api";
import contentView from "@/components/layout/contentView.vue";
import siderView from "@/components/ui/uiSiderView.vue";
import uiDialog from "@/components/ui/uiDialogView.vue";
import uiTabs from "@/components/ui/uiTabs.vue";
import uiPagination from "@/components/ui/uiPagination.vue";

// 逻辑组件
import manual from "./components/manual.vue";
import describe from "./components/describe.vue";
@Component({
  components: {
    contentView,
    siderView,
    uiDialog,
    bpInput: bpui.bpInput,
    uiTabs,
    manual,
    describe,
    uiPagination,
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
  tabsArr = [
    {
      name: $i18n('cloudProvider.mirror.store.detail.基本信息'),
      value: 1,
    },
    // {
    //   name: "镜像版本",
    //   value: 2,
    // },
  ];
  tabsValue = 1; // 1 = base 2 = mirror
  // 基本信息 -tabs arr
  baseInfoTabsArr = [
    {
      name: $i18n('cloudProvider.mirror.store.detail.操作指南'),
      value: 1,
    },
    {
      name: $i18n('cloudProvider.mirror.store.detail.镜像描述'),
      value: 2,
    },
  ];
  baseInfoTabsVal = 1;
  // 镜像版本 列表
  roleList: any = [
    {
      name: "brainpoint",
      namespace: "namespace",
      status: $i18n('cloudProvider.mirror.store.detail.正常'),
      storeType: 1,
      add: "address",
      time: "2020-11-24 09.22.22",
    },
    {
      name: "brainpoint",
      namespace: "namespace",
      status: $i18n('cloudProvider.mirror.store.detail.正常'),
      storeType: 1,
      add: "address",
      time: "2020-11-24 09.22.22",
    },
  ];

  pageDta = {
    pageNum: 1,
    pageSize: 20,
    pages: 5,
    total: 85,
  };

  repo = {};
  //
  // computed.
  // get demo() { return xxxx; }

  //
  // watch.
  // @Watch('child')
  // onChildChanged(val: string, oldVal: string) { }

  //
  // lifecycle hook.
  constructor() {
    super();
  }

  created() {
    let query = this.$route.query as any;

    this.getInfo(query.id);
  }

  getInfo(id: string) {
    api.cmp.acr
      .getRepo({ crInstid: id })
      .then((data: any) => {
        console.log(data);
        this.repo = data;
      })
      .catch((err: any) => {
        throw err;
      });
  }

  tabsClick() {
    console.log(1);
  }
  querList(e: any) {
    console.log(e);
  }

  handleCopy(s: string) {
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
      content: $i18n('cloudProvider.mirror.store.detail.复制成功，可粘贴'),
    });
  }

  mounted() {}
}
</script>

<style lang="scss">
.store-detail-content {
  .store-detail-base {
    background: #fff;
  }
  .detail-base-info {
    padding: 20px;
  }
  .info-title {
    color: #8c8c8c;
    margin: 10px 0;
  }
  .faas-table-group {
    width: 100%;
  }
  .store-detail-mirror {
    background: #fff;
  }
}
</style>

