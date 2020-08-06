<!--
/**
* Copyright (c) 2021 Copyright of All Rights Reserved.
* Author: lanck
* Date: 2021-07-05 14:28
* Desc: 弹性伸缩
*/
 -->

<template>
  <content-view
    :gutter="false"
    :title="$i18n('console.yun1.云安全')"
  >
    <ui-card style="height: 80vh" class="flex_c_c">
      <ui-icon name="toast" style="font-size: 44px"></ui-icon>
      <span class="mt15">{{ $i18n('console.yun1.暂无权限') }}</span>
    </ui-card>
  </content-view>
</template>

<script lang="ts">
import {
  Component,
  Provide,
  Vue,
  // Prop,
  // Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";
import contentView from "@/components/layout/contentView.vue";
import api from "@/api";

// 逻辑组件

@Component({
  components: {
    contentView,
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
  // @Prop({ type: number }) demo: number;

  //
  // data.
  // @Provide() demo:number = 1;

  // {
  //   lable: "华为云",
  //   value: "HUAWEI",
  // },
  // {
  //   lable: "AWS",
  //   value: "AWS",
  // },

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
<style lang="scss" scoped>
</style>
