<template>
  <div class="containDetailWrap">
    <back-header :header-title="clusterName" jump-url="/cloudProvider/container"></back-header>
    <el-tabs v-model="activeName" @tab-click="tabsClick">
      <el-tab-pane :label="$i18n('cloudProvider.containerDetail.index.概览')" name="first">
        <overview :chart-options="chartOptions" :event-table-data="eventTableData"></overview>
      </el-tab-pane>
      <el-tab-pane :label="$i18n('cloudProvider.containerDetail.index.基本信息')" name="second">
        <base-info :base-info-data="baseInfoData"></base-info>
      </el-tab-pane>
      <el-tab-pane :label="$i18n('cloudProvider.containerDetail.index.连接信息')" name="third"></el-tab-pane>
      <el-tab-pane :label="$i18n('cloudProvider.containerDetail.index.集群资源')" name="fourth"></el-tab-pane>
      <el-tab-pane :label="$i18n('cloudProvider.containerDetail.index.集群日志')" name="fifth"></el-tab-pane>
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
  // Provide,
  // Emit,
} from "vue-property-decorator";
import backHeader from './components/backHeader.vue';
import overview from './components/overview.vue';
import baseInfo from './components/baseInfo.vue';
import api from "@/api";

import filter from "@/libs/filter";

@Component({
  components: {
    backHeader, overview, baseInfo
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
  activeName: string = 'first'
  chartOptions: any = {}
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
  getOpsStat() {
    let id: String = this.temStore.get('clusterId');
    api.cmp.cluster
      .opsStat({ clusterId: id }).then((data: any) => {
        this.chartOptions = data
      }).catch((err: any) => {
        throw err;
      });
  }
  getclustersMgt() {
    let id: String = this.temStore.get('clusterId');
    let productCode: String = this.temStore.get('productCode');
    api.cmp.cluster
      .clustersMgt({ clusterId: id, productCode}).then((data: any) => {
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
    this.getOpsStat()
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
