<!--
/**
* Copyright (c) 2020 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2020-11-30 16:48
* Desc: console 首页
*/
 -->

<template>
  <content-view
    :gutter="false"
    class="faas-content cp-voucher-content flex1"
    :title="$i18n('cloudProvider.mirror.voucher.index.访问凭证')"
  >
    <ui-card>
      <p class="title_p">{{ $i18n('cloudProvider.mirror.voucher.index.获取临时密码或固定密码后，可通过登录镜像服务实例') }}</p>
      <p class="mt10">
        1.
{{ $i18n('cloudProvider.mirror.voucher.index.获取访问域名，基于当前的网络环境，选择对应的专有网络、公网或经典网络域名。') }}
      </p>
      <p>{{ $i18n('cloudProvider.mirror.voucher.index.2_在终端中访问凭证，登录Registry实例') }}</p>
      <ui-note class="mt20">
{{ $i18n('cloudProvider.mirror.voucher.index.sudo_docker_login_—username=hi3055****@originforest_com') }}
        registry.ofcs.com
      </ui-note>
    </ui-card>
  </content-view>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  // Prop,
  // Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";

import contentView from "@/components/layout/contentView.vue";

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

  mounted() {}
}
</script>
<style lang="scss">
.cp-voucher-content {
  .title_p {
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>
