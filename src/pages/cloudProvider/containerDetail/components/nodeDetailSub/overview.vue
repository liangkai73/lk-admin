<template>
  <div>
    <!-- <div class="pannel">
      <h3>概览</h3>
      <ul>
        <li>tu</li>
        <li>tu</li>
      </ul>
    </div> -->
    <base-info></base-info>
    <div class="pannel">
      <h3>{{ $i18n('cloudProvider.containerDetail.components.nodeDetailSub.overview.可分配资源') }}</h3>
      <ul class="chart3Container">
        <li>
          <div class="chartTitle">CPU Allocation</div>
          <pie-chart series-name="CPU Allocation"
            :data-label="[$i18n('cloudProvider.containerDetail.components.nodeDetailSub.overview.可分配'),$i18n('cloudProvider.containerDetail.components.nodeDetailSub.overview.限制')]"
            :data-arr="CPUAllocation">
          </pie-chart>
        </li>
        <li>
          <div class="chartTitle">Memory Allocation</div>
          <pie-chart :series-name="$i18n('cloudProvider.containerDetail.components.nodeDetailSub.overview.内存')"
            :data-label="[$i18n('cloudProvider.containerDetail.components.nodeDetailSub.overview.可分配'),$i18n('cloudProvider.containerDetail.components.nodeDetailSub.overview.限制')]"
            :data-arr="MemoryAllocation">
          </pie-chart>
        </li>
        <li>
          <div class="chartTitle">Pods Allocation</div>
          <pie-chart :series-name="$i18n('cloudProvider.containerDetail.components.nodeDetailSub.overview.容器组')"
            :data-label="[$i18n('cloudProvider.containerDetail.components.nodeDetailSub.overview.可分配'),$i18n('cloudProvider.containerDetail.components.nodeDetailSub.overview.限制')]"
            :data-arr="PodsAllocation">
          </pie-chart>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import {
  Component,
  Vue,
  Mixins,
  Prop,
  Inject,
  // Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";
import pieChart from '../pieChart.vue'

import baseInfo from './baseInfo.vue';

@Component({
  components: {
    pieChart, baseInfo
  },
  name: 'nodeDetail.overview'
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
  @Prop({ type: Array }) eventTableData: any;

  //
  // data.
  // @Provide() demo:number = 1;
  chartOptions = {}
  detailObj: any = {}
  //
  // computed.
  get CPUAllocation() { return [this.detailObj.status.allocatable.cpu.amount, this.detailObj.status.capacity.cpu.amount - this.detailObj.status.allocatable.cpu.amount] }
  get MemoryAllocation() { return [this.detailObj.status.allocatable.memory.amount, this.detailObj.status.capacity.memory.amount - this.detailObj.status.allocatable.memory.amount] }
  get PodsAllocation() { return [this.detailObj.status.allocatable.pods.amount, this.detailObj.status.capacity.pods.amount - this.detailObj.status.allocatable.pods.amount] }

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
    let objStr: string = $UIStorage.namespace_session().get('node_detail')
    this.detailObj = JSON.parse(objStr)
  }
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
.pannel {
  padding: 16px;
  background-color: #fff;
  margin-bottom: 16px;
  min-height: 230px;
  ul {
    display: flex;
    &.chart3Container {
      justify-content: space-around;
    }
    .chartTitle {
      text-align: center;
    }
  }
}
</style>
