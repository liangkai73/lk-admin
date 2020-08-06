<!--
/**
* Copyright (c) 2021 Copyright of All Rights Reserved.
* Author: lanck
* Date: 2021-03-31 14:53
* Desc: terms of service 服务条款文档
*/
 -->
<style lang="scss">
.dialog-box {
  .bp-dialog__main {
    padding-top: 0px;
  }
}

.dialog-inner {
  width: 1040px;
  height: 520px;
  text-align: left;
  justify-content: start;
  .inner-date {
    padding: 20px;
    text-align: right;
    font-weight: 600;
  }
  .inner-content {
    padding: 10px 20px;
    height: 360px;
    font-size: 14px;
    overflow-y: auto;
  }
  .inner-title {
    width: 100%;
  }
}
</style>
<template>
  <div>
    <!-- 添加账号弹窗 -->
    <ui-dialog class="dialog-box" v-model="relVal" :title="$i18n('document.ToS.服务条款')">
      <div class="dialog-inner flex_c_s">
        <div class="line1" style="margin: 0"></div>
        <div class="inner-date mt20">
          <p>{{ $i18n('document.ToS.发布日期：2020年6月22日') }}</p>
          <p>{{ $i18n('document.ToS.生效日期：2020年6月22日') }}</p>
        </div>

        <div class="inner-content">
          <p>
{{ $i18n('document.ToS.原森科技有限公司（“我们”）非常重视用户信息的保护，并且将以勤勉和审慎的义务保护用户信息安全。您在注册、登录、使用（以下统称“使用”）原森平台（“本平台”）及相关产品、服务、解决方案时（“服务”），我们收集的您主动提供的信息，以及我们通过自动化手段收集您在使用本平台及相关服务过程中产生的信息，称为“用户信息”，包括但不限于用户向平台提供的个人信息。') }}
          </p>
        </div>
        <div class="inner-footer mt20 flex_r_c">
          <ui-button primary class="mr10"
            style="width: 180px"
            @click="handleDlogClose"
          >
{{ $i18n('document.ToS.关闭') }}
          </ui-button>
        </div>
      </div>
    </ui-dialog>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  // Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";

@Component({
  components: {
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
  @Prop({ type: Boolean, default: false }) value!: boolean;

  //
  // data.
  // @Provide() demo:number = 1;

  //
  // computed.
  get relVal() {
    return this.value;
  }

  set relVal(val) {
    this.$emit("input", val);
  }

  //
  // watch.
  // @Watch('child')
  // onChildChanged(val: string, oldVal: string) { }
  handleDlogClose() {
    this.relVal = false;
  }

  //
  // lifecycle hook.
  constructor() {
    super();
  }

  mounted() {}
}
</script>
