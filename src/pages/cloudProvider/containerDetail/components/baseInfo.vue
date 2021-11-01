<template>
  <div>
    <div class="pannel baseInfoPanel">
      <h3>{{ $i18n('cloudProvider.containerDetail.components.baseInfo.基本信息') }}</h3>
      <ul class="info5">
        <li>
          <div class="label">{{ $i18n('cloudProvider.containerDetail.components.baseInfo.集群ID:') }}</div>
          <div>{{baseInfoData.clusterId}}</div>
        </li>
        <li>
          <div :class="{running:baseInfoData.state==='running'}">{{stateEnum[baseInfoData.state]}}</div>
        </li>
        <li>
          <div class="label">{{ $i18n('cloudProvider.containerDetail.components.baseInfo.地域:') }}</div>
          <div>{{baseInfoData.regionId}}</div>
        </li>
        <li>
          <div class="label">{{ $i18n('cloudProvider.containerDetail.components.baseInfo.时区:') }}</div>
          <div>Asia/Shanghai</div>
        </li>
        <li>
          <div class="label">{{ $i18n('cloudProvider.containerDetail.components.baseInfo.删除保护') }}</div>
          <bp-switch class="switchBtn" readonly v-model="baseInfoData.deletionProtection">
          </bp-switch>
        </li>
      </ul>
    </div>
    <div class="pannel">
      <h3>{{ $i18n('cloudProvider.containerDetail.components.baseInfo.集群信息') }}</h3>
      <ul class="noflex">
        <li>
          <div>{{ $i18n('cloudProvider.containerDetail.components.baseInfo.集群类型') }}</div>
          <div>{{baseInfoData.clusterType}}</div>
        </li>
        <li>
          <div>{{ $i18n('cloudProvider.containerDetail.components.baseInfo.集群初始化版本') }}</div>
          <div>{{baseInfoData.initVersion}}</div>
        </li>
        <li>
          <div>{{ $i18n('cloudProvider.containerDetail.components.baseInfo.集群当前版本') }}</div>
          <div>{{baseInfoData.currentVersion}}</div>
        </li>
        <li>
          <div>{{ $i18n('cloudProvider.containerDetail.components.baseInfo.集群可升级版本') }}</div>
          <div>{{baseInfoData.nextVersion}}</div>
        </li>
        <li>
          <div>{{ $i18n('cloudProvider.containerDetail.components.baseInfo.集群访问地址') }}</div>
          <div>{{baseInfoData.masterUrl}}</div>
        </li>
        <li>
          <div>VPC ID</div>
          <div>{{baseInfoData.vpcId}}</div>
        </li>
        <li>
          <div>{{ $i18n('cloudProvider.containerDetail.components.baseInfo.Pod网络地址段') }}</div>
          <div>{{baseInfoData.subnetCidr}}</div>
        </li>
        <li>
          <div>{{ $i18n('cloudProvider.containerDetail.components.baseInfo.托管版集群类型') }}</div>
          <div>{{baseInfoData.clusterSpec}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import bpui from "bpui.js";

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
  @Prop({ type: Object }) baseInfoData: any;

  //
  // data.
  // @Provide() demo:number = 1;
  stateEnum = {
    initial: $i18n('cloudProvider.containerDetail.components.baseInfo.集群初始化'),
    initializing: $i18n('cloudProvider.containerDetail.components.baseInfo.集群创建中'),
    failed: $i18n('cloudProvider.containerDetail.components.baseInfo.集群创建失败'),
    running: $i18n('cloudProvider.containerDetail.components.baseInfo.集群运行中'),
    updating: $i18n('cloudProvider.containerDetail.components.baseInfo.集群升级中'),
    updating_failed: $i18n('cloudProvider.containerDetail.components.baseInfo.集群升级失败'),
    scaling: $i18n('cloudProvider.containerDetail.components.baseInfo.集群伸缩中'),
    stopped: $i18n('cloudProvider.containerDetail.components.baseInfo.集群已经停止运行'),
    deleting: $i18n('cloudProvider.containerDetail.components.baseInfo.集群删除中'),
    deleted: $i18n('cloudProvider.containerDetail.components.baseInfo.集群已经被删除'),
    delete_failed: $i18n('cloudProvider.containerDetail.components.baseInfo.集群删除失败')
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
  &.baseInfoPanel {
    height: 120px;
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
  ul.info5 {
    display: flex;
    justify-content: space-around;
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
        flex-shrink: 0;
        margin-right: 30px;
      }
    }
  }
}
</style>
