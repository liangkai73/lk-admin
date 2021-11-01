<!--
/**
* Copyright (c) 2020 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2020-08-21 16:15
* Desc: dialog for (console)
*/
 -->

<template>
  <bp-dialog
    :maskClose="maskClose"
    :title="title"
    :visible.sync="relVisible"
    v-bind="$attrs"
  >
    <!-- content -->
    <slot></slot>
  </bp-dialog>
</template>

<script lang="ts">
import {
  Component,
  Prop
} from 'vue-property-decorator';
import bpui from 'bpui.js';
import uiDialogViewBase from './uiDialogViewBase';

@Component({
  components: {
    bpDialog: bpui.bpDialog
  }
})
export default class extends uiDialogViewBase {
  //
  // Prop
  @Prop({ type: String }) title: string | undefined;
  @Prop({ type: Boolean }) maskClose: boolean | undefined;

  //
  // lifecycle hook.
  constructor() {
    super();
  }

  mounted() {}
}
</script>
