<template>
  <div>
    <div class="pannel">
      <h3>{{ $i18n('cloudProvider.containerDetail.components.overview.概览') }}</h3>
      <ul class="chart4Container">
        <li>
          <div class="chartTitle">{{ $i18n('cloudProvider.containerDetail.components.overview.部署') }}</div>
          <pie-chart :series-name="$i18n('cloudProvider.containerDetail.components.overview.部署')"
            :data-arr="[chartOptions.deploymentOk,chartOptions.deploymentFail || undefined]">
          </pie-chart>
        </li>
        <li>
          <div class="chartTitle">{{ $i18n('cloudProvider.containerDetail.components.overview.容器组') }}</div>
          <pie-chart :series-name="$i18n('cloudProvider.containerDetail.components.overview.容器组')"
            :data-arr="[chartOptions.podOk,chartOptions.podFail || undefined]">
          </pie-chart>
        </li>
        <li>
          <div class="chartTitle">{{ $i18n('cloudProvider.containerDetail.components.overview.有状态副本集') }}</div>
          <pie-chart :series-name="$i18n('cloudProvider.containerDetail.components.overview.有状态副本集')"
            :data-arr="[chartOptions.statefulOk,chartOptions.statefulFail || undefined]">
          </pie-chart>
        </li>
        <li>
          <div class="chartTitle">{{ $i18n('cloudProvider.containerDetail.components.overview.节点状态') }}</div>
          <pie-chart :series-name="$i18n('cloudProvider.containerDetail.components.overview.节点状态')"
            :data-arr="[chartOptions.nodeOk,chartOptions.nodeFail || undefined]">
          </pie-chart>
        </li>
      </ul>
    </div>
    <div class="pannel">
      <h3>{{ $i18n('cloudProvider.containerDetail.components.overview.事件') }}</h3>
      <el-table class="clusterTable faas-table-group"
        :data="eventTableData">
        <!-- <el-table-column
          label="集群名称/ID"
          width="200">
          <template slot-scope="scope">
            <span class="clustName" @click="jumpDetail">{{ scope.row.name}}</span>
            <span>/</span>
            <span>{{scope.row.clusterId }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column
          prop="name"
          label="类型"
          width="180">
        </el-table-column> -->
        <el-table-column
          prop="namespace"
          :label="$i18n('cloudProvider.containerDetail.components.overview.命名空间')">
        </el-table-column>
        <el-table-column
          prop="message"
          :label="$i18n('cloudProvider.containerDetail.components.overview.信息')">
        </el-table-column>
        <el-table-column
          prop="reason"
          :label="$i18n('cloudProvider.containerDetail.components.overview.原因')">
        </el-table-column>
        <el-table-column
          prop="lastTimestamp"
          width="170"
          :label="$i18n('cloudProvider.containerDetail.components.overview.时间')">
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="pannel">
      <h3>概览</h3>
      <ul>
        <li>tu</li>
        <li>tu</li>
      </ul>
    </div> -->
  </div>
</template>
<script lang="ts">
import {
  Component,
  Vue,
  Mixins,
  Prop,
  // Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";
import pieChart from './pieChart.vue'
@Component({
  components: {
    pieChart
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
  @Prop({ type: Object }) chartOptions: any;
  @Prop({ type: Array }) eventTableData: any;

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
  constructor() {
    super();
  }
  tabsClick() {

  }

  created() {
  }
  mounted() { }
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
    .chartTitle {
      text-align: center;
    }
  }
  .chart4Container{
    justify-content: space-around;
  }
  /deep/ .el-table thead{
    color: #333;
  }
    
  .clusterTable {
    th >.cell {
      font-weight: 400;
    }
  }
}
</style>
