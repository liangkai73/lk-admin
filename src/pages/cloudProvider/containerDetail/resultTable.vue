<template>
  <div id="table-wrap">
    <back-header :header-title="$i18n('cloudProvider.containerDetail.resultTable.事件列表')">
      <div class="tableLoading"></div>
    </back-header>
    <el-tabs v-model="activeName" type="card" @tab-click="judgeReq">
      <el-tab-pane :label="$i18n('cloudProvider.containerDetail.resultTable.事件')" name="first">
        <el-table
          class="clusterTable faas-table-group"
          :data="eventData.list"
          height="calc(100vh - 200px)"
          style="width: 100%">
          <el-table-column prop="source" :label="$i18n('cloudProvider.containerDetail.resultTable.事件源')" width="130"> </el-table-column>
          <el-table-column :label="$i18n('cloudProvider.containerDetail.resultTable.事件类型')" width="130">
            <!-- <template slot-scope="scope">{{scope.row.type}}</template> -->
            <template slot-scope="scope">{{eventType[ scope.row.type]}}</template>
          </el-table-column>
          <el-table-column :label="$i18n('cloudProvider.containerDetail.resultTable.事件级别')" width="120">
            <template slot-scope="scope">{{ scope.row.data.level}}</template>
          </el-table-column>
          <el-table-column :label="$i18n('cloudProvider.containerDetail.resultTable.事件状态')" width="120">
            <template slot-scope="scope">{{ eventStatus[scope.row.data.reason]}}</template>
          </el-table-column>
          <el-table-column :label="$i18n('cloudProvider.containerDetail.resultTable.事件详情')">
            <template slot-scope="scope">{{ scope.row.data.message}}</template>
          </el-table-column>
          <el-table-column class-name="tableColume" :label="$i18n('cloudProvider.containerDetail.resultTable.事件开始时间')" width="230">
            <template slot-scope="scope">{{ scope.row.time | filterTime}}</template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="$i18n('cloudProvider.containerDetail.resultTable.日志')" name="second">
        <el-table
          class="clusterTable faas-table-group"
          :data="logData"
          height="calc(100vh - 200px)"
          style="width: 100%">
          <el-table-column class-name="tableColume" :label="$i18n('cloudProvider.containerDetail.resultTable.时间')" width="260">
            <template slot-scope="scope">{{ scope.row.created | filterTime}}</template>
          </el-table-column>
          <el-table-column :label="$i18n('cloudProvider.containerDetail.resultTable.信息')">
            <template slot-scope="{row}">{{ row.clusterLog}}</template>
          </el-table-column>
        </el-table>
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
  // Provide,
  // Emit,
} from "vue-property-decorator";
import backHeader from './components/backHeader.vue';
import api from "@/api";

import filter from "@/libs/filter";
import { Loading } from 'element-ui';
@Component({
  components: {
    backHeader,
  },
  name: 'resultTable',
  filters: {
    filterTime(val: Date) {
      return filter.getDateStr(new Date(val), 2);
    },
  },
})
export default class extends Vue {
  //
  // computed.
  // get demo() { return xxxx; }

  //
  // watch.
  // @Watch('child')
  // onChildChanged(val: string, oldVal: string) { }

  timeer: any = 0 // 事件定时器
  activeName: string = 'first'
  loadingInstance: any = null
  eventData: any = {
    list: []
  }
  logData: [] = []
  temStore: any = {}
  eventType = {
    cluster_create: $i18n('cloudProvider.containerDetail.resultTable.创建集群'),
    cluster_scaleout: $i18n('cloudProvider.containerDetail.resultTable.集群扩容'),
    cluster_delete: $i18n('cloudProvider.containerDetail.resultTable.删除集群'),
    cluster_node_delete: $i18n('cloudProvider.containerDetail.resultTable.集群缩容')
  }
  eventStatus = {
    Failed: $i18n('cloudProvider.containerDetail.resultTable.失败'),
    Success: $i18n('cloudProvider.containerDetail.resultTable.成功'),
    Started: $i18n('cloudProvider.containerDetail.resultTable.开始'),
  }

  queryResult() {
    let type = $UIStorage.namespace_session().get("resultType");
    let clusterId = this.temStore.get('clusterId');
    let accountId = this.temStore.get('accountId');
    let productCode = this.temStore.get('productCode')

    let req = {
      clusterId,
      type,
      accountId,
      productCode,
      pageSize: 100,
      pageNumber: 1,
    }
    /* 
    this.prodCode = this.temStore.get('productCode').split('::')[0] + '::ECS'
    */
    api.cmp.cluster
      .mgtEvents(req).then((data: any) => {
        this.eventData = data
        if (this.eventData.list[0].data.reason !== 'Started') {
          clearInterval(this.timeer)
          this.loadingInstance.close()
        }
      }).catch((err: any) => {
        throw err;
      });
  }
  queryLog() {
    let clusterId = this.temStore.get('clusterId');
    let productCode = this.temStore.get('productCode')
    let req = {
      clusterId,
      productCode
    }
    api.cmp.cluster
      .mgtLog(req).then((data: any) => {
        this.logData = data
      }).catch((err: any) => {
        throw err;
      });
  }
  judgeReq() {
    this.activeName === 'first' ? this.queryResult() : this.queryLog()
  }
  mounted() {
    this.loadingInstance = Loading.service({
      target: '.tableLoading',
      fullscreen: false,
      spinner: 'el-icon-loading',
      customClass: 'loadingCicle',
      background: 'transparent',
    });
    this.temStore = $UIStorage.namespace('CLUSTER_OPS');
    this.timeer = setInterval(this.judgeReq.bind(this), 10000)
    this.judgeReq()
  }
  beforeDestroy() {
    clearInterval(this.timeer)
  }
}
</script>
<style lang="scss" scoped>
/deep/ .loadingCicle {
  .el-loading-spinner i {
    color: #000;
    font-size: 20px;
  }
}
.tableLoading {
  position: absolute;
  width: 50px;
  height: 32px;
  left: 50%;
  top: 15px;
}
#table-wrap {
  padding: 16px;

  .clusterTable {
    th > .cell {
      font-weight: 400;
    }
  }
}
</style>
