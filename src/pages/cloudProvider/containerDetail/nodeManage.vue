<template>
  <div class="nodeWrap">
    <back-header :header-title="$i18n('cloudProvider.containerDetail.nodeManage.节点管理')" jump-url="/cloudProvider/container"></back-header>
    <div class="searchHeader">
      <div>
        <button class="bp-btn faas-btn-primary" @click="addNewNode">{{ $i18n('cloudProvider.containerDetail.nodeManage.添加已有节点') }}</button>
        <button
          class="bp-btn faas-btn-primary"
          style="margin-left: 10px">{{ $i18n('cloudProvider.containerDetail.nodeManage.标签管理') }}</button>
      </div>
      <div class="refreshDiv">
        <bp-input
          class="bp-input-search"
          @click-icon="searchResource"
          :placeholder="$i18n('cloudProvider.containerDetail.nodeManage.搜索')"
          suffix-icon="search"></bp-input>
        <span>
          <bp-icon name="refresh" width="22px"></bp-icon>
        </span>
      </div>
    </div>
    <el-table
      ref="multipleTable"
      :data="pageData.list"
      tooltip-effect="dark"
      class="clusterTable faas-table-group"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column 
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column  class-name="tableColume"
        :label="$i18n('cloudProvider.containerDetail.nodeManage.名称/IP地址')"
        width="120">
        <template slot-scope="scope">{{ scope.row.nodeName }}</template>
      </el-table-column>
      <el-table-column  class-name="tableColume"
        :label="$i18n('cloudProvider.containerDetail.nodeManage.角色/状态')"
        width="120">
        <template slot-scope="scope">
          <div>{{scope.row.instanceRole}}</div>
          <div>{{scope.row.state}}</div>
        </template>
      </el-table-column>
      <el-table-column  class-name="tableColume" :label="$i18n('cloudProvider.containerDetail.nodeManage.配置')" show-overflow-tooltip>
        <template slot-scope="scope">
          <div>{{scope.row.instanceChargeType | filterCharge}}</div>
          <div>{{scope.row.instanceType}}</div>
          <div>{{scope.row.status.capacity.cpu.amount + $i18n('cloudProvider.containerDetail.nodeManage.核_|')+scope.row.status.capacity.memory.amount+scope.row.status.capacity.memory.format}}</div>
        </template>
      </el-table-column>
      <el-table-column  class-name="tableColume" :label="$i18n('cloudProvider.containerDetail.nodeManage.容器组(可分配量/总额)')" show-overflow-tooltip>
        <template slot-scope="scope">
          <div>{{scope.row.status.allocatable.pods.amount + '/ '+scope.row.status.capacity.pods.amount}}</div>
        </template>
      </el-table-column>
      <el-table-column  class-name="tableColume" :label="$i18n('cloudProvider.containerDetail.nodeManage.CPU(可分配量/总额)')" show-overflow-tooltip>
        <template slot-scope="scope">
          <div>{{scope.row.status.allocatable.cpu.amount + '/ '+scope.row.status.capacity.cpu.amount}}</div>
        </template>
      </el-table-column>
      <el-table-column  class-name="tableColume" :label="$i18n('cloudProvider.containerDetail.nodeManage.内存(可分配量/总额)')" show-overflow-tooltip>
        <template slot-scope="scope">
          <div>{{scope.row.status.allocatable.memory.amount + '/ '+scope.row.status.capacity.memory.amount}}</div>
        </template>
      </el-table-column>
      <el-table-column  class-name="tableColume"
        :label="$i18n('cloudProvider.containerDetail.nodeManage.创建时间')">
        <template slot-scope="scope">{{ scope.row.creationTime | filterTime}}</template>
      </el-table-column>
      <el-table-column  class-name="tableColume"
        :label="$i18n('cloudProvider.containerDetail.nodeManage.操作')">
        <template slot-scope="scope">
          <ui-dropdown trigger="hover">
            <bp-icon name="more" class="cur_P"></bp-icon>
            <ui-dropdown-menu slot="dropdown">
              <ui-dropdown-item @click.native="jumpDetail(scope.row)">{{ $i18n('cloudProvider.containerDetail.nodeManage.详情') }}</ui-dropdown-item>
              <ui-dropdown-item @click.native="deleteNode([scope.row.nodeName])">{{ $i18n('cloudProvider.containerDetail.nodeManage.删除') }}</ui-dropdown-item>
            </ui-dropdown-menu>
          </ui-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <div class="tableFooter">
      <button class="bp-btn faas-btn-primary" @click="deteleNodes">{{ $i18n('cloudProvider.containerDetail.nodeManage.批量删除') }}</button>
      <uiPagination
        :pageSize.sync="pageData.pageSize"
        :total="pageData.total"
        @current-change="queryData"
        style="padding: 15px 10px"
        v-model="pageData.pageNum"></uiPagination>
    </div>
  </div>
</template>
<script lang="ts">
import {
  Component,
  Vue,
  Mixins,
  // Prop,
  // Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";
import backHeader from './components/backHeader.vue';
import bpui from "bpui.js";
import api from "@/api";

import filter from "@/libs/filter";
import uiPagination from "@/components/ui/uiPagination.vue";

@Component({
  components: {
    backHeader,
    uiPagination,
    bpInput: bpui.bpInput,
  },
  filters: {
    filterTime(val: Date) {
      return filter.getDateStr(new Date(val), 2);
    },
    filterCharge(val: string) {
      return val === 'PostPaid' ? $i18n('cloudProvider.containerDetail.nodeManage.按量付费') : $i18n('cloudProvider.containerDetail.nodeManage.包年包月')
    },
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
  temStore: any = {}
  pageData: any = {}
  deleteNodeArr: string[] = []
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
  handleSelectionChange(arr: any) {
    this.deleteNodeArr = arr.map((item: any) => item.nodeName)
  }
  deteleNodes(arr: any) {
    if (this.deleteNodeArr.length) this.deleteNode(this.deleteNodeArr)
  }
  searchResource() {

  }
  jumpDetail(row: Object) {
    $UIStorage.namespace_session().set("node_detail", JSON.stringify(row));
    this.$navbar.push({
      path: '/cloudProvider/containerDetail/nodeDetail'
    })
  }
  // 添加新节点
  addNewNode() {
    this.$navbar.push({
      path: "/cloudProvider/containerDetail/newNode",
      query: { hidSidebar: 1 }
    });
  }
  queryData() { }
  getMgtNode() {
    let id: String = this.temStore.get('clusterId');
    let productCode: String = this.temStore.get('productCode');
    api.cmp.cluster
      .mgtNode({ clusterId: id, productCode }).then((data: any) => {
        this.pageData = data
      }).catch((err: any) => {
        throw err;
      });
  }
  deleteNode(nodes: string[]) {
    let clusterId: String = this.temStore.get('clusterId');
    let productCode: String = this.temStore.get('productCode');
    let accountId: string = this.temStore.get('accountId');

    api.cmp.cluster
      .deleteNode({
        clusterId,
        productCode,
        nodes,
        accountId,
        releaseNode: true,
      }).then((data: any) => {
        if (data === 'OK') {
          $UIStorage.namespace_session().set("resultType", 'cluster_node_delete');
          this.$navbar.push({
            path: "/cloudProvider/containerDetail/resultTable",
            query: { hidSidebar: 1 }
          });
        }
      }).catch((err: any) => {
        throw err;
      });
  }
  created() {
  }
  mounted() {
    this.temStore = $UIStorage.namespace('CLUSTER_OPS');
    this.getMgtNode()
  }
}
</script>
<style lang="scss" scoped>
.nodeWrap {
  padding: 16px;
  padding-top: 16px !important;
  .searchHeader {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;

    .refreshDiv {
      display: flex;
      align-items: center;
      > span {
        display: inline-block;
        width: 40px;
        height: 40px;
        border: 1px solid rgb(220, 223, 230);
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        margin-left: 16px;
      }
    }
  }
  .clusterTable {
    th >.cell {
      font-weight: 400;
    }
  }

  .tableFooter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    button {
      height: 36px;
    }
  }
}
</style>
