<!--
/**
* Copyright (c) 2021 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2021-04-08 11:37
* Desc: 描述
*/
 -->

<template>
  <div class="describe-content">
      <div class="header">{{ $i18n('cloudProvider.mirror.store.components.describe.提供功能如下:') }}</div>
    <ui-note class="note">
      <div>
{{ $i18n('cloudProvider.mirror.store.components.describe.1__替换指定文件中的concourse变量') }}
      </div>
    </ui-note>
       <div class="header">{{ $i18n('cloudProvider.mirror.store.components.describe.使用方式') }}</div>
    <ui-note class="note">
      <div>
{{ $i18n('cloudProvider.mirror.store.components.describe.#__将文件deployment_yaml中的变量((k8s-namespace))替换为concourse变量，') }}
      </div>
      <div>
       covar deployment.yaml k8s-namespace ((k8s-namespace))
      </div>
    </ui-note>
  </div>
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


@Component({
  components: {},
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

<style lang='scss' scoped>
.describe-content {
  padding: 20px;

  .header {
    font-size: 16px;
    height: 30px;
  }

  .describe {
    font-size: 12px;
    height: 20px;
    color: rgba($color: #000000, $alpha: 0.58);
  }

  .note {
    color: rgba($color: #000000, $alpha: 1.0) !important;
  }
}
</style>
