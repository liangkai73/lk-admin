<!--
/**
* Copyright (c) 2020 Copyright Originforest All Rights Reserved.
* Author: lanck
* Date: 2020-08-19 14:02
* Desc: console siderbar-menu
*/
 -->

<template>
  <div class="siderbar-container">
    <h2>用户中心</h2>
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
import siderBar from "@/components/layout/siderbar.vue";
import api from "@/api";

@Component({
  components: {
    siderBar,
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
  menuList = [
    {
      title: $i18n('layouts.ram.siderbar.人员管理'),
      icon: "",
      childMenu: [
        {
          title: $i18n('layouts.ram.siderbar.用户组'),
          path: "/ram/userGroup",
        },
        {
          title: $i18n('layouts.ram.siderbar.用户'),
          path: "/ram/user",
          activePath: ["/ram/user/detail"],
        },
      ],
    },
    {
      title: "权限策略管理",
      path: "/ram/permission",
      icon: "",
    },
    // {
    //   title: "RAM角色管理",
    //   path: "/ram/role",
    //   icon: "",
    // },
  ];
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
  created() {}
  mounted() {}
}
</script>
