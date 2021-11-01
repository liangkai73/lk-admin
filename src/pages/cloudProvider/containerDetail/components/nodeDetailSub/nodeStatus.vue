<template>
  <div>
    <el-table class="clusterTable faas-table-group"
      :data="detailObj.status.conditions">
      <!-- <el-table-column   
        label="集群名称/ID"
        width="200">
        <template slot-scope="scope">
          <span class="clustName" @click="jumpDetail(scope.row)">{{ scope.row.name}}</span>
          <span>/</span>
          <span>{{scope.row.clusterId }}</span>
        </template>
      </el-table-column> -->
      <el-table-column  prop="type" :label="$i18n('cloudProvider.containerDetail.components.nodeDetailSub.nodeStatus.类型')" width="180"></el-table-column>
      <el-table-column  prop="status" :label="$i18n('cloudProvider.containerDetail.components.nodeDetailSub.nodeStatus.状态')" width="70"></el-table-column>
      <el-table-column  :label="$i18n('cloudProvider.containerDetail.components.nodeDetailSub.nodeStatus.最近心跳')" width="180">
        <div slot-scope="scope">{{scope.row.lastHeartbeatTime | filterTime}}</div>
      </el-table-column>
      <el-table-column  :label="$i18n('cloudProvider.containerDetail.components.nodeDetailSub.nodeStatus.最近更改')" width="180">
        <div slot-scope="scope">{{scope.row.lastTransitionTime | filterTime}}</div>
      </el-table-column>
      <el-table-column  prop="reason" :label="$i18n('cloudProvider.containerDetail.components.nodeDetailSub.nodeStatus.原因')"> </el-table-column>
      <el-table-column  prop="message" :label="$i18n('cloudProvider.containerDetail.components.nodeDetailSub.nodeStatus.信息')"> </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  // Mixins,
  // Prop,
  // Inject,
  // Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";

import filter from "@/libs/filter";

@Component({
  components: {
  },
  filters: {
    filterTime(val: Date) {
      return filter.getDateStr(new Date(val), 2);
    },
  },
  name: 'nodeDetail.status'
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

  //
  // data.
  // @Provide() demo:number = 1;
  detailObj: any = {}
  //
  // computed.

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

<style scoped lang="scss">
  
  .clusterTable {
    th >.cell {
      font-weight: 400;
    }
  }
</style>
