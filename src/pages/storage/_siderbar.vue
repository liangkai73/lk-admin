<!--
/**
* Copyright (c) 2020 Copyright of All Rights Reserved.
* Author: lanck
* Date: 2020-08-19 14:02
* Desc: console siderbar-menu
*/
 -->

<template>
  <div class="siderbar-container">
    <p style="margin-top: 28px"></p>
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
import mainMenu from "@/components/layout/mainMenu";

@Component({
  components: {
    siderBar,
  },
})
export default class extends Mixins(siderBarMixin) {
  menuList = [
    {
      title: $i18n("产品基本信息管理"),
      path: "/storage/list1",
      icon: "rongqifuwu",
    },
    {
      title: $i18n("库位管理"),
      path: "/storage/list2",
      icon: "rongqifuwu",
    },
    {
      title: $i18n("仓储操作流程管理"),
      path: "/storage/list3",
      icon: "rongqifuwu",
    },
    {
      title: $i18n("库存管理"),
      path: "/storage/list4",
      icon: "rongqifuwu",
    },
    {
      title: $i18n("出入库管理"),
      path: "/storage/list5",
      icon: "rongqifuwu",
    },
    {
      title: $i18n("盘点管理"),
      path: "/storage/list6",
      icon: "rongqifuwu",
    },
  ];
  moudleName = "coupon";

  //
  // lifecycle hook.
  constructor() {
    super();
  }
  created() {}
  mounted() {}
}
</script>

<style lang="scss" scoped>
</style>
