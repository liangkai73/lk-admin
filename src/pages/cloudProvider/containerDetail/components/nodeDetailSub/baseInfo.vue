<template>
  <div>
    <div class="pannel baseInfoPanel">
      <h3>{{ $i18n('cloudProvider.containerDetail.components.nodeDetailSub.baseInfo.基本信息') }}</h3>
      <br>
      <ul class="infoPannel">
        <li>
          <div class="label">{{ $i18n('cloudProvider.containerDetail.components.nodeDetailSub.baseInfo.名称:') }}</div>
          <div>{{detailObj.nodeName}}</div>
        </li>
        <li>
          <div class="label">{{ $i18n('cloudProvider.containerDetail.components.nodeDetailSub.baseInfo.创建时间:') }}</div>
          <div>{{detailObj.creationTime | filterTime}}</div>
        </li>
      </ul>
      <ul class="infoPannel">
        <li>
          <div class="label">{{ $i18n('cloudProvider.containerDetail.components.nodeDetailSub.baseInfo.主机名:') }}</div>
          <div>{{detailObj.hostName}}</div>
        </li>
        <li>
          <div class="label">{{ $i18n('cloudProvider.containerDetail.components.nodeDetailSub.baseInfo.过期时间:') }}</div>
          <div>{{detailObj.expiredTime | filterTime}}</div>
        </li>
      </ul>
      <ul class="infoPannel">
        <li>
          <div class="label">{{ $i18n('cloudProvider.containerDetail.components.nodeDetailSub.baseInfo.付费类型:') }}</div>
          <div>{{detailObj.instanceChargeType | filterCharge}}</div>
        </li>
        <li>
          <div class="label">{{ $i18n('cloudProvider.containerDetail.components.nodeDetailSub.baseInfo.节点名称:') }}</div>
          <div>{{detailObj.instanceName}}</div>
        </li>
      </ul>
      <ul class="infoPannel">
        <li>
          <div class="label">{{ $i18n('cloudProvider.containerDetail.components.nodeDetailSub.baseInfo.节点实例状态:') }}</div>
          <div>{{detailObj.instanceStatus}}</div>
        </li>
        <li>
          <div class="label">{{ $i18n('cloudProvider.containerDetail.components.nodeDetailSub.baseInfo.节点实例类型:') }}</div>
          <div>{{detailObj.instanceType}}</div>
        </li>
      </ul>
      <ul class="infoPannel">
        <li>
          <div class="label">{{ $i18n('cloudProvider.containerDetail.components.nodeDetailSub.baseInfo.节点创建方式:') }}</div>
          <div>{{detailObj.source}}</div>
        </li>
        <li>
          <div class="label">{{ $i18n('cloudProvider.containerDetail.components.nodeDetailSub.baseInfo.节点状态:') }}</div>
          <div>{{detailObj.nodeStatus}}</div>
        </li>
      </ul>
      <ul class="infoPannel">
        <li>
          <div :class="{running:detailObj.state==='running'}">{{stateEnum[detailObj.state]}}</div>
        </li>
        <li>
          <div class="label">{{ $i18n('cloudProvider.containerDetail.components.nodeDetailSub.baseInfo.节点池ID:') }}</div>
          <div>{{detailObj.nodepoolId}}</div>
        </li>
        <!-- <li>
          <div class="label">删除保护</div>
          <bp-switch class="switchBtn" readonly v-model="detailObj.deletionProtection">
          </bp-switch>
        </li> -->
      </ul>
      <ul class="infoPannel">
        <li>
          <div class="label">{{ $i18n('cloudProvider.containerDetail.components.nodeDetailSub.baseInfo.错误信息说明:') }}</div>
          <div>{{detailObj.errorMessage}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import bpui from "bpui.js";

import filter from "@/libs/filter";

import {
  Component,
  Vue,
  Mixins,
  Prop,
  // Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";
@Component({
  components: {
    bpSwitch: bpui.bpSwitch,
  },
  filters: {
    filterTime(val: Date) {
      return filter.getDateStr(new Date(val), 2);
    },
    filterCharge(val: string) {
      return val === 'PostPaid' ? $i18n('cloudProvider.containerDetail.components.nodeDetailSub.baseInfo.按量付费') : $i18n('cloudProvider.containerDetail.components.nodeDetailSub.baseInfo.包年包月')
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
  detailObj: any = {}
  //
  // data.
  // @Provide() demo:number = 1;
  stateEnum = {
    initial: $i18n('cloudProvider.containerDetail.components.nodeDetailSub.baseInfo.节点初始化'),
    initializing: $i18n('cloudProvider.containerDetail.components.nodeDetailSub.baseInfo.节点创建中'),
    failed: $i18n('cloudProvider.containerDetail.components.nodeDetailSub.baseInfo.节点创建失败'),
    running: $i18n('cloudProvider.containerDetail.components.nodeDetailSub.baseInfo.节点运行中'),
    updating: $i18n('cloudProvider.containerDetail.components.nodeDetailSub.baseInfo.节点升级中'),
    updating_failed: $i18n('cloudProvider.containerDetail.components.nodeDetailSub.baseInfo.节点升级失败'),
    scaling: $i18n('cloudProvider.containerDetail.components.nodeDetailSub.baseInfo.节点伸缩中'),
    stopped: $i18n('cloudProvider.containerDetail.components.nodeDetailSub.baseInfo.节点已经停止运行'),
    deleting: $i18n('cloudProvider.containerDetail.components.nodeDetailSub.baseInfo.节点删除中'),
    deleted: $i18n('cloudProvider.containerDetail.components.nodeDetailSub.baseInfo.节点已经被删除'),
    delete_failed: $i18n('cloudProvider.containerDetail.components.nodeDetailSub.baseInfo.节点删除失败')
  }
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
    let objStr: string = $UIStorage.namespace_session().get('node_detail')
    this.detailObj = JSON.parse(objStr)
  }
}
</script>
<style lang="scss" scoped>
.pannel {
  padding: 16px;
  background-color: #fff;
  margin-bottom: 16px;
  &.baseInfoPanel {
    .running::before {
      content: "";
      display: inline-block;
      width: 10px;
      height: 10px;
      background-color: #0acd7f;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
  ul.infoPannel {
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px #e5e5e5;
    margin-bottom: 10px;
    li {
      width: 45%;
      height: 48px;
      .label+div{
        color: #666;
      }
      >div:first-child{
        width: 100px;
        color: #333;
      }
    }
  }
  li {
    display: flex;
    align-items: center;
    font-size: 14px;
    .switchBtn {
      transform: translateY(-5px);
    }
    div:first-child {
      margin-right: 5px;
    }
    .label {
      color: #999999;
    }
  }
  .noflex {
    min-height: 230px;
    margin-top: 56px;
    li {
      height: 44px;
      line-height: 44px;
      border-bottom: solid 1px #e5e5e5;
      div:first-child {
        width: 180px;
        margin-right: 200px;
      }
    }
  }
}
</style>
