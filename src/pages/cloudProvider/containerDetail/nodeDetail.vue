<template>
  <div class="containDetailWrap">
    <back-header :header-title="clusterName" jump-url="/cloudProvider/containerDetail/nodeManage"></back-header>
    <el-tabs v-model="activeName" @tab-click="tabsClick">
      <el-tab-pane :label="$i18n('cloudProvider.containerDetail.nodeDetail.概览')" name="first">
        <overview :event-table-data="eventTableData"></overview>
      </el-tab-pane>
      <!-- <el-tab-pane label="基本信息" name="second">
        <base-info></base-info>
      </el-tab-pane> -->
      <el-tab-pane :label="$i18n('cloudProvider.containerDetail.nodeDetail.状态')" name="third">
        <node-status></node-status>
      </el-tab-pane>
      <el-tab-pane :label="$i18n('cloudProvider.containerDetail.nodeDetail.容器组')" name="fourth">
        <container-group></container-group>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import {
  Component,
  Vue,
  Mixins,
  // Prop,
  // Watch,
  Provide,
  // Emit,
} from "vue-property-decorator";
import backHeader from './components/backHeader.vue';
import overview from './components/nodeDetailSub/overview.vue';
import baseInfo from './components/nodeDetailSub/baseInfo.vue';
import nodeStatus from './components/nodeDetailSub/nodeStatus.vue';
import containerGroup from './components/nodeDetailSub/containerGroup.vue';
import api from "@/api";

import filter from "@/libs/filter";

@Component({
  components: {
    backHeader, overview, baseInfo, nodeStatus, containerGroup
  },
  name: 'nodeDetail'

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
  activeName: string = 'first'
  clusterName: string = ''
  temStore: any = {}
  eventTableData: any = []
  baseInfoData: any = {}
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
  tabsClick() {

  }
  getclustersMgt() {
    let id: String = this.temStore.get('clusterId');
    let productCode: String = this.temStore.get('productCode');
    api.cmp.cluster
      .clustersMgt({ clusterId: id, productCode }).then((data: any) => {
        this.baseInfoData = data
      }).catch((err: any) => {
        throw err;
      });
  }
  getOpsEvent() {
    let id: String = this.temStore.get('clusterId');
    api.cmp.cluster
      .opsEvent({ clusterId: id }).then((data: any) => {
        for (let i = 0; i < data.length; i++) {
          data[i].lastTimestamp = filter.getDateStr(new Date(data[i].lastTimestamp), 2);
          // 
        }
        this.eventTableData = data
      }).catch((err: any) => {
        throw err;
      });
  }
  created() {
  }
  mounted() {
    this.temStore = $UIStorage.namespace('CLUSTER_OPS');
    this.clusterName = this.temStore.get('clusterName');
    this.getclustersMgt()
    this.getOpsEvent()
  }
  beforeDestroy() {
    // let temStore = $UIStorage.namespace('CLUSTER_OPS');
    // temStore.clear();
  }
}
</script>
<style lang="scss" scoped>
.containDetailWrap {
  padding: 16px;
  padding-top: 16px !important;
  .el-tab-pane {
    overflow: auto;
    height: calc(100vh - 193px);
  }
}
</style>
