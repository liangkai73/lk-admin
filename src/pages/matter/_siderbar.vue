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
      title: $i18n("供应商管理"),
      path: "/matter/list",
      icon: "rongqifuwu",
    },
    {
      title: $i18n("客户管理"),
      path: "/matter/list1",
      icon: "rongqifuwu",
    },
    {
      title: $i18n("生产管理"),
      path: "/matter/list2",
      icon: "rongqifuwu",
    },
    {
      title: $i18n("物料库存管理"),
      path: "/matter/list3",
      icon: "rongqifuwu",
    },
    {
      title: $i18n("生产BOM管理"),
      path: "/matter/list4",
      icon: "rongqifuwu",
    },
    {
      title: $i18n("出入库管理"),
      path: "/matter/list5",
      icon: "rongqifuwu",
    },
    {
      title: $i18n("生产管理"),
      path: "/matter/list6",
      icon: "rongqifuwu",
    },
    {
      title: $i18n("数据报表"),
      path: "/matter/list7",
      icon: "rongqifuwu",
    },
    {
      title: $i18n("操作员管理"),
      path: "/matter/list8",
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
