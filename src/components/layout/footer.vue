<!--
/**
* Copyright (c) 2020 Copyright of All Rights Reserved.
* Author: lanck
* Date: 2020-11-21 13:46
* Desc: default - footer
*/
 -->
<style lang="scss" scoped>
.faas-foot {
  width: 100%;
  height: 100px;
  padding: 0 350px;
  font-size: 14px;
  letter-spacing: 1px;
  background: #fff;
  .foot-ul {
    list-style: none;
    li {
      cursor: pointer;
      padding: 0 30px;
    }
  }
}
</style>
<template>
  <div class="faas-foot flex_r_c">
    <span>© 2020 BPFAAS</span>
    <span class="flex1"></span>
    <ul class="flex_r_c foot-ul">
      <li>{{ $i18n('layouts.components.footer.产品') }}</li>
      <li>{{ $i18n('layouts.components.footer.价格') }}</li>
      <li>{{ $i18n('layouts.components.footer.关于我们') }}</li>
      <li>{{ $i18n('layouts.components.footer.帮助中心') }}</li>
      <li>{{ $i18n('layouts.components.footer.联系方式') }}</li>
    </ul>
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
} from 'vue-property-decorator';

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
