<!--
/**
* Copyright (c) 2020 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2020-08-19 14:02
* Desc: config siderbar-menu
*/
 -->

<template>
  <div class="siderbar-container">
    <h2>容器服务</h2>
    <siderBar :moudleName="moudleName" :menuList="menuList"></siderBar>
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
import siderBarMixin from "@/components/layout/siderbarMixin";

import siderBar from '@/components/layout/siderbar.vue';

@Component({
  components: {
    siderBar
  },
})
export default class extends Mixins(siderBarMixin) {
  //
  // event.
  // @Emit()
  // demoEvent(type: string) { }

  //
  // state.
  // @State(state=>state.demo) demo:DEMO_TYPE;
   get inAccountPage() { return this.$route.path.includes('account') }
  get isInDetail() {
    return this.$route.path.includes('containerDetail')
  }
  get menuList() {
    return this.isInDetail ? [
      {
        title: $i18n('layouts.cloudProvider.siderbar.集群信息'),
        path: "/cloudProvider/containerDetail",
        icon: "",
      }, {
        title: $i18n('layouts.cloudProvider.siderbar.节点管理'),
        path: "/cloudProvider/containerDetail/nodeManage",
        icon: "",
      }, {
        title: $i18n('layouts.cloudProvider.siderbar.存储'),
        icon: "",
        childMenu: [
          {
            title: $i18n('layouts.cloudProvider.siderbar.存储申明'),
            path: "/cloudProvider/containerDetail/storagePVC",
          },
          {
            title: $i18n('layouts.cloudProvider.siderbar.存储卷'),
            path: "/cloudProvider/containerDetail/storageVolume",
          },
          {
            title: $i18n('layouts.cloudProvider.siderbar.存储类'),
            path: "/cloudProvider/containerDetail/storageClass",
          },
        ],
      }
    ] : this.inAccountPage ? [
      {
        title: $i18n('layouts.cloudProvider.siderbar.账号设置'),
        path: "/cloudProvider/account",
        icon: "",
      }] : [
      {
        title: $i18n('layouts.cloudProvider.siderbar.容器服务管理'),
        path: "/cloudProvider/container",
        icon: "",
        activePath: ["/cloudProvider/container/newContainer"]
      },
      {
        title: $i18n('layouts.cloudProvider.siderbar.镜像服务管理'),
        icon: "",
        childMenu: [
          {
            title: $i18n('layouts.cloudProvider.siderbar.镜像仓库'),
            path: "/cloudProvider/mirror/store",
          },
          // {
          //   title: "命名空间",
          //   path: "/cloudProvider/mirror/namespace",
          // },
          {
            title: $i18n('layouts.cloudProvider.siderbar.访问凭证'),
            path: "/cloudProvider/mirror/voucher",
          },
        ],
      },
      /* {
        title: "DNS管理",
        icon: "",
        path: "/cloudProvider/DNS",
      }, */
    ]
  }
  moudleName = "cloudProvider";

  //
  // Prop
  // @Prop({ type: number }) demo: number;

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
  created() {
  }
  mounted() { }
}
</script>
<style lang="scss" scoped>
</style>
