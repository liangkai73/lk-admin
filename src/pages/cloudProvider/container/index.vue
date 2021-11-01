<!--
/**
* Copyright (c) 2020 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2020-11-30 16:48
* Desc: 云商管理  - 容器服务管理
*/
 -->

<template>
  <content-view
    :gutter="false"
    class="faas-content cp-container-content flex1"
    :title="$i18n('cloudProvider.container.index.容器服务管理')">
    <div class="cp-head-tools flex_r_s mt10">
      <button class="bp-btn faas-btn-primary" @click="addNewContainer">{{ $i18n('cloudProvider.container.index.新建') }}</button>
      <button class="bp-btn faas-btn-black" style="margin-left: 10px" @click="clusterImport">{{ $i18n('cloudProvider.container.index.导入') }}</button>
    </div>
    <div class="cp-body" ref="table11">
      <el-table class="clusterTable faas-table-group"
        :empty-text="$i18n('暂无数据')"
        :data="list_cluster">
        <el-table-column
          :label="$i18n('cloudProvider.container.index.集群名称/ID')"
          width="200">
          <template slot-scope="scope">
            <div class="clustName" @click="jumpDetail(scope.row)">
              <span>{{ scope.row.name}}</span>
              <span>/</span>
              <span>{{scope.row.clusterId }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$i18n('cloudProvider.container.index.产品类型')" width="180"> </el-table-column>
        <el-table-column prop="clusterType" :label="$i18n('cloudProvider.container.index.集群类型')">
          <template slot-scope="scope">
            {{scope.row.clusterType === 'ManagedKubernetes'?$i18n('cloudProvider.container.index.托管型'):$i18n('cloudProvider.container.index.专有型')}}
          </template>
        </el-table-column>
        <el-table-column prop="region" :label="$i18n('cloudProvider.container.index.地域')"></el-table-column>
        <el-table-column :label="$i18n('cloudProvider.container.index.集群状态')">
          <template slot-scope="{row}">
            <i class="el-icon-loading" v-if="row.status === 'initial'|| row.status.includes('ing')"></i>
            {{list_status[row.status]}}
          </template>
        </el-table-column>
        <el-table-column prop="nodeNum" width="75" :label="$i18n('cloudProvider.container.index.节点数')"> </el-table-column>
        <el-table-column prop="kubernetesVersion" :label="$i18n('cloudProvider.container.index.版本')" width="120"></el-table-column>
        <el-table-column prop="createDt" :label="$i18n('cloudProvider.container.index.创建时间')" width="160"> </el-table-column>
        <el-table-column :label="$i18n('cloudProvider.container.index.操作')" width="70">
          <template slot-scope="scope">
            <ui-dropdown trigger="hover">
              <bp-icon name="more" class="cur_P"></bp-icon>
              <ui-dropdown-menu slot="dropdown">
                <ui-dropdown-item @click.native="jumpDetail(scope.row)">{{ $i18n('cloudProvider.container.index.查看详情') }}</ui-dropdown-item>
                <ui-dropdown-item @click.native="jumpTo(scope.row)">{{ $i18n('cloudProvider.container.index.节点管理') }}</ui-dropdown-item>
                <ui-dropdown-item @click.native="jumpResult(scope.row)">{{ $i18n('cloudProvider.container.index.集群事件') }}</ui-dropdown-item>
                <ui-dropdown-item @click.native="showDeleteConfirm(scope.row)">{{ $i18n('cloudProvider.container.index.删除集群') }}</ui-dropdown-item>
              </ui-dropdown-menu>
            </ui-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <ui-dialog class="dialog-box" v-model="dialogShow2" :title="$i18n('cloudProvider.container.index.导入集群')">
      <import-storage @close-pop="dialogShow2=false"></import-storage>
    </ui-dialog>
    <ui-dialog class="dialog-box" v-model="dialogShow3" :title="$i18n('cloudProvider.container.index.删除集群')">
      <ul class="formContainer">
        <li>
          <div>{{ $i18n('cloudProvider.container.index.是否保留SLB') }}</div>
          <bp-switch class="" v-model="deleteReq.keepSlb"></bp-switch>
        </li>
        <li>
          <div>{{ $i18n('cloudProvider.container.index.是否保留所有资源') }}</div>
          <bp-switch class="" v-model="deleteReq.retainAllResources"></bp-switch>
        </li>
      </ul>
      <div class="deleteBtn2">
        <button class="bp-btn faas-btn-primary" @click="deleteCluster">{{ $i18n('cloudProvider.container.index.确认') }}</button>
        <button class="bp-btn" @click="dialogShow3=false">{{ $i18n('cloudProvider.container.index.取消') }}</button>
      </div>
    </ui-dialog>

    <!-- 容器dialog -->
    <ui-dialog class="dialog-box" v-model="dialogShow" :title="$i18n('cloudProvider.container.index.新建容器服务')">
      <div class="dialog-inner flex_c_s">
        <div class="line1" style="margin: 0"></div>
        <div class="inner-step mt20 flex_r_c">
          <ui-step :active="stepNum" :stepArr="stepArr"></ui-step>
        </div>
        <!-- dialog-page0-->
        <div class="inner-area-items" v-if="stepNum == 0">
          <div class="" v-for="item in list_yun" :key="item.cloud">
            <div
              v-if="item.isEnable"
              class="inner-area-item1 flex_r_s"
              :class="
                choose_cluster.cloud && item.code == choose_cluster.cloud
                  ? 'inner-area-choose'
                  : ''
              "
              @click="nextStep(item)">
              <bp-icon :name="item.code" style="font-size: 30px"></bp-icon>
              <p style="margin-left: 25px">{{ item.name }}</p>
            </div>
          </div>
        </div>
        <!-- dialog-page1 -->
        <div class="inner-area-items" v-if="stepNum == 1">
          <div
            class="inner-area-account flex_r_s"
            :class="
              choose_cluster.accountId && item.id == choose_cluster.accountId
                ? 'inner-area-choose'
                : ''
            "
            v-for="item in list_acct"
            :key="item.id"
            @click="nextStep(item)">
            <p>{{ item.acctName }}</p>
          </div>
        </div>
        <!-- dialog-page1 -->
        <div class="inner-area-items" v-if="stepNum == 2">
          <div
            class="inner-area-item2 flex_r_s"
            :class="
              choose_cluster.sceneId && item.id == choose_cluster.sceneId
                ? 'inner-area-choose'
                : ''
            "
            v-for="item in list_yunscene"
            :key="item.id"
            @click="nextStep(item)">
            <bp-icon name="internet"></bp-icon>
            <div class="item2-right flex_c_c" style="width: 100%">
              <div class="item2-right-top flex_r_s">
                <span style="font-size: 18px">{{ item.name }}</span>
                <span class="flex1"></span>
                <p style="color: #999">
{{ $i18n('cloudProvider.container.index.适合用户量：') }}
                  <span style="color: #000">
                    {{ "&ge;" + item.minNum }} {{ "&le;" + item.maxNum }}</span>
                </p>
              </div>
              <div class="item2-right-bottom flex_r_s" style="width: 100%">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <!-- dialog-page2 -->
        <div class="inner-area-items" v-if="stepNum == 3">
          <div
            class="inner-area-item3 action-menu-item flex_r_s"
            :class="
              choose_cluster.region && item.regionCode == choose_cluster.region
                ? 'inner-area-choose'
                : ''
            "
            v-for="item in list_regions"
            :key="item.id"
            @click="nextStep(item)">
            {{ item.name }}
          </div>
        </div>
        <!-- dialog-page3 创建中 -->
        <div
          class="inner-area-items flex_c_c"
          style="height: 400px"
          v-if="stepNum == 4">
          <bp-icon
            name="checked"
            style="font-size: 80px; margin: 15px"></bp-icon>
          <p style="font-size: 24px">{{ $i18n('cloudProvider.container.index.创建中') }}</p>
        </div>
        <!-- dialog-page3 创建中 -->
        <div
          class="inner-area-items flex_c_c"
          style="height: 400px"
          v-if="stepNum == 5">
          <bp-icon
            name="checked"
            style="font-size: 80px; margin: 15px; color: #0acd7f"></bp-icon>
          <p style="font-size: 24px">{{ $i18n('cloudProvider.container.index.成功') }}</p>
          <p class="mt10" style="font-size: 14px; color: #999999">
{{ $i18n('cloudProvider.container.index.您已成功新建容器服务') }}
          </p>
        </div>
        <!-- dialog-footer -->

        <span class="flex1"></span>
        <div class="inner-footer flex_r_s">
          <span class="flex1"></span>
          <button
            class="bp-btn faas-btn-black"
            style="margin-right: 10px"
            @click="lastStep"
            v-show="stepNum != 0">
{{ $i18n('cloudProvider.container.index.上一步') }}
          </button>
          <button
            class="bp-btn faas-btn-primary"
            @click="nextStep(null)"
            v-show="show_btn_enter"
            v-if="stepNum < 3">
{{ $i18n('cloudProvider.container.index.确定') }}
          </button>

          <button
            class="bp-btn faas-btn-primary"
            @click="handleAdd(null)"
            v-show="show_btn_enter && stepNum == 3">
{{ $i18n('cloudProvider.container.index.创建') }}
          </button>
        </div>
      </div>
    </ui-dialog>
    <!-- table -->
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
import uiStep from "@/components/ui/uiStep2.vue";

import importStorage from "./components/importStorage.vue"
import api from "@/api";
import filter from "@/libs/filter";
import bpui from "bpui.js";

@Component({
  name: 'containerIndex',
  components: {
    contentView,
    uiPagination,
    uiDialog,
    uiStep,
    importStorage,
    bpSwitch: bpui.bpSwitch,

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

  pageDta = {
    pageNum: 1,
    pageSize: 20,
    pages: 5,
    total: 85,
  };
  deleteReq: { retainAllResources: boolean, keepSlb: boolean } = {
    keepSlb: false,
    retainAllResources: false
  }
  dialogShow = false;
  dialogShow2: boolean = false;
  dialogShow3: boolean = false;

  stepNum = 0;
  stepArr = [
    { lable: $i18n('cloudProvider.container.index.选择云商'), sum: 1 },
    { lable: $i18n('cloudProvider.container.index.选择账号'), sum: 2 },
    { lable: $i18n('cloudProvider.container.index.应用场景'), sum: 3 },
    { lable: $i18n('cloudProvider.container.index.选择地域'), sum: 4 },
  ];

  list_status = {
    initial: $i18n('cloudProvider.container.index.创建中'),
    failed: $i18n('cloudProvider.container.index.创建失败'),
    running: $i18n('cloudProvider.container.index.运行中'),
    updating: $i18n('cloudProvider.container.index.升级中'),
    updating_failed: $i18n('cloudProvider.container.index.升级失败'),
    scaling: $i18n('cloudProvider.container.index.伸缩中'),
    stopped: $i18n('cloudProvider.container.index.停止运行'),
    deleting: $i18n('cloudProvider.container.index.删除中'),
    deleted: $i18n('cloudProvider.container.index.删除'),
    delete_failed: $i18n('cloudProvider.container.index.删除失败'),
  };

  list_yun = [];
  list_yunscene = [];
  list_acct = [];
  list_regions = [];

  choose_cluster = {} as any;

  show_btn_enter = false;

  list_cluster = [];
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

  mounted() {
    this.querList();
    /* this.getYunList();
    this.getYunSceneList(); */

  }

  clusterImport(): void {
    this.dialogShow2 = true
  }
  getYunList() {
    api.cmp.base
      .list()
      .then((data: any) => {
        this.list_yun = data;
      })
      .catch((err: any) => {
        throw err;
      });
  }
  jumpTo(row: any): void {
    this.setSth(row)
    this.$navbar.push({
      path: '/cloudProvider/containerDetail/nodeManage'
    })
  }
  jumpDetail(row: any) {
    this.setSth(row)
    this.$navbar.push({
      path: '/cloudProvider/containerDetail'
    })
  }
  jumpResult(row: any) {
    this.setSth(row)
    this.$navbar.push({
      path: "/cloudProvider/containerDetail/resultTable",
      query: { hidSidebar: 1 }
    });
  }
  showDeleteConfirm(row: any) {
    this.setSth(row)
    this.dialogShow3 = true
  }
  setSth(row: any) {
    let workInfo = JSON.parse(row.workerInstInfo) || undefined
    let arr = workInfo?.workerInstanceTypes[0].split('.')
    $UIStorage.namespace_session().set("workerInstanceTypes", workInfo?.workerInstanceTypes[0]);
    let temStore = $UIStorage.namespace('CLUSTER_OPS');
    temStore.set('instanceTypeFamily', arr[0] + '.' + arr[1]);
    temStore.set('clusterId', row.clusterId);
    temStore.set('vswitchIds', workInfo.vswitchIds);
    temStore.set('region', row.region);
    temStore.set('productCode', row.productCode);
    temStore.set('clusterName', row.name);
    temStore.set('accountId', row.acctId);
  }
  getYunSceneList() {
    api.cmp.scene
      .list()
      .then((data: any) => {
        this.list_yunscene = data.list;
      })
      .catch((err: any) => {
        throw err;
      });
  }

  getAcctList(cloud: any) {
    api.cmp.acct
      .listAcct({ cloudType: cloud })
      .then((data: any) => {
        this.list_acct = data;
      })
      .catch((err: any) => {
        throw err;
      });
  }

  getRegionList() {
    api.cmp.base
      .regionByProduct({ productCode: "aliyun-ask" })
      .then((data: any) => {
        this.list_regions = data;
      })
      .catch((err: any) => {
        throw err;
      });
  }

  querList() {
    api.cmp.cluster
      .clusters({ loadingDom: this.$refs.table11 })
      .then((data: any) => {
        for (let i = 0; i < data.list.length; i++) {
          data.list[i].createDt = filter.getDateStr(new Date(data.list[i].createDt), 2);
          // 
        }

        this.list_cluster = data.list;
      })
      .catch((err: any) => {
        throw err;
      });
  }

  handleSync() { // 同步集群
    api.cmp.cluster
      .sync()
      .then((data: any) => {
        $UIToast({
          type: "success",
          content: $i18n('cloudProvider.container.index.同步成功，稍后刷新页面'),
        });
      })
      .catch((err: any) => {
        throw err;
      });
  }

  // 关闭dialog
  handleDlogClose() {
    this.changeDialog(false);
  }
  // dialog =>click=>确定
  handleSure() {
    this.changeDialog(false);
  }
  // 修改dialog状态
  changeDialog(bl: boolean) {
    this.dialogShow = bl;
  }

  // 添加新容器
  addNewContainer() {
    this.changeDialog(true);
    this.$navbar.push({
      path: "/cloudProvider/container/newContainer",
    });
  }

  showBtnEnter() {
    if (this.stepNum == 0) {
      if (this.choose_cluster.cloud) return true;
    } else if (this.stepNum == 1) {
      if (this.choose_cluster.accountId) return true;
    } else if (this.stepNum == 2) {
      if (this.choose_cluster.sceneId) return true;
    } else if (this.stepNum == 3) {
      if (this.choose_cluster.region) return true;
    }

    return false;
  }

  nextStep(item: any) {
    if (item) {
      if (this.stepNum == 0) {
        this.choose_cluster.cloud = item.code;
        this.getAcctList(item.code);
      } else if (this.stepNum == 1) {
        this.choose_cluster.accountId = item.id;
      } else if (this.stepNum == 2) {
        this.getRegionList();
        this.choose_cluster.sceneId = item.id;
      } else if (this.stepNum == 3) {
        this.choose_cluster.region = item.regionCode;
      }
    }

    this.stepNum++;

    if (this.stepNum >= this.stepArr.length)
      this.stepNum = this.stepArr.length - 1;

    this.show_btn_enter = this.showBtnEnter();
  }
  deleteCluster() {
    let temStore = $UIStorage.namespace('CLUSTER_OPS');
    let productCode = temStore.get('productCode');
    let clusterId = temStore.get('clusterId');
    let req = {
      clusterId, productCode, ...this.deleteReq
    }
    api.cmp.cluster.deleteCluster(req).then((data: any) => {
      $UIStorage.namespace_session().set("resultType", 'cluster_delete');
      this.$navbar.push({
        path: "/cloudProvider/containerDetail/resultTable",
        query: { hidSidebar: 1 }
      });
    }).catch((err: any) => {
      throw err;
    });
  }
  lastStep() {
    this.stepNum--;

    if (this.stepNum < 0) this.stepNum = 0;

    this.show_btn_enter = this.showBtnEnter();
  }

  handleAdd() {
    this.stepNum = 4;

    api.cmp.cluster
      .cluster(this.choose_cluster)
      .then((data: any) => {
        this.list_acct = data;

        $UIToast({
          type: "success",
          content: $i18n('cloudProvider.container.index.创建成功！'),
        });

        this.stepNum = 0;
        this.choose_cluster = {};

        this.dialogShow = false;

        this.querList();
      })
      .catch((err: any) => {
        $UIToast({
          type: "error",
          content: $i18n('cloudProvider.container.index.创建失败!'),
        });
      });
  }
}
</script>
<style lang="scss">
.cp-container-content {
  .cp-head-tools {
    button {
      width: 120px;
    }
  }
  .cp-body {
    .clusterTable {
      margin-top: 24px;
      .clustName {
        color: #0077ff;
        cursor: pointer;
      }
    }
    background: #fff;
    .faas-table-group {
      width: 100%;

      th {
        text-align: left;
      }
    }
  }
  .inner-step {
    padding: 15px;
  }
  .ui-step-li {
    min-width: 150px !important;
  }
  .inner-area-items {
    height: 450px;
    overflow-y: auto;
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: space-between;
    .inner-area-item1 {
      width: 100%;
      height: 60px;
      background: rgba(0, 0, 0, 0.1);
      padding: 0 25px;
      margin-top: 15px;
      cursor: pointer;
      transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1) all;
      font-size: 18px;

      i {
        font-size: 25px;
      }

      &:hover {
        background: rgba(27, 170, 245, 0.5);
      }
    }

    .inner-area-account {
      width: 100%;
      height: 40px;
      background: rgba(0, 0, 0, 0.1);
      padding: 0 15px;
      margin-top: 5px;
      cursor: pointer;
      transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1) all;
      font-size: 14px;

      i {
        font-size: 20px;
      }

      &:hover {
        background: rgba(27, 170, 245, 0.5);
      }
    }

    .inner-area-choose {
      background: rgba(27, 170, 245, 0.5) !important;
    }

    .inner-area-item2 {
      width: 100%;
      height: 100px;
      background: rgba(0, 0, 0, 0.1);
      padding: 0 25px;
      margin-top: 10px;
      cursor: pointer;
      transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1) all;
      font-size: 14px;
      i {
        font-size: 35px;
      }

      &:hover {
        background: rgba(27, 170, 245, 0.5);
      }
      .item2-right {
        height: 100%;
        padding: 15px;
        .item2-right-top {
          width: 100%;
        }
        .item2-right-bottom {
          color: #999;
        }
      }
    }
    .inner-area-item3 {
      float: left;
      width: 48%;
      height: 40px;
      line-height: 40px;
      background: rgba(0, 0, 0, 0.1);
      padding: 0 10px;
      margin-right: 10px;
      margin-top: 10px;
      cursor: pointer;
      transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1) all;

      &:hover {
        background: rgba(27, 170, 245, 0.5);
      }
    }
  }

  .dialog-inner {
    width: 650px;
    height: 600px;
    text-align: left;
    justify-content: start;
  }
  .dialog-box {
    .bp-dialog__main {
      padding-top: 0px;
    }
  }
}
// 删除集群弹窗
.formContainer {
  background-color: #fff;
  padding: 16px;
  margin: 0 24px;
  li {
    display: flex;
    margin-bottom: 6px;
    justify-content: flex-start;
    > div:first-child {
      width: 145px;
      color: #8c8c8c;
      margin-top: 20px;
      text-align: left;
    }
  }
  & + .deleteBtn2 {
    text-align: right;
    margin-top: 20px;
  }
}
</style>
