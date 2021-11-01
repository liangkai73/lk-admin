<template>
  <div>
    <el-table class="clusterTable faas-table-group"
      height="calc(100vh - 193px)"
      :data="tableList">
      <!-- <el-table-column 
        type="selection"
        width="55">
      </el-table-column> -->
      <el-table-column  prop="name" :label="$i18n('cloudProvider.containerDetail.components.nodeDetailSub.containerGroup.名称')"></el-table-column>
      <el-table-column  prop="namespace" :label="$i18n('cloudProvider.containerDetail.components.nodeDetailSub.containerGroup.命名空间')" ></el-table-column>
      <el-table-column  :label="$i18n('cloudProvider.containerDetail.components.nodeDetailSub.containerGroup.创建时间')">
        <div slot-scope="scope">{{scope.row.creationTimestamp | filterTime}}</div>
      </el-table-column>
      <el-table-column   :label="$i18n('cloudProvider.containerDetail.components.nodeDetailSub.containerGroup.重启次数')">
        <div slot-scope="scope">{{scope.row.status.containerStatuses[0].restartCount}}</div>
      </el-table-column>
      <el-table-column  label="Pod IP">
        <div slot-scope="scope">{{scope.row.status.podIP}}</div>
      </el-table-column>
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
import api from "@/api";

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
  handleSelectionChange(): void { }
  getPodList() {
    let id: String = this.temStore.get('clusterId');

    api.cmp.cluster
      .podList({ clusterId: id, hostIp: this.detailObj.ipAddress[0] }).then((data: any) => {
        this.tableList = data
      }).catch((err: any) => {
        throw err;
      });
  }
  //
  // data.
  // @Provide() demo:number = 1;
  detailObj: any = {}
  temStore: any = {}
  tableList: object[] = []

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
    this.temStore = $UIStorage.namespace('CLUSTER_OPS');
    let objStr: string = $UIStorage.namespace_session().get('node_detail')
    this.detailObj = JSON.parse(objStr)
    this.getPodList()
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
