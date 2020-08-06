<!--
/**
* Copyright (c) 2020 Copyright Originforest All Rights Reserved.
* Author: lanck
* Date: 2020-08-24 15:11
* Desc: user - detail
*/
 -->

<template>
  <content-view
    :gutter="false"
    class="flex1 ramUserInfo-detail"
    :title="$i18n('ram.permission.detail.策略详情')"
  >
    <ui-card>
      <ui-row gutter="20">
        <ui-col :offset="23" :span="1">
          <button @click="openEditDialog">{{ $i18n('ram.permission.detail.编辑') }}</button>
        </ui-col>
        <ui-col :span="24">
          <h3>{{ resourceInfo.resourceName }}</h3>
        </ui-col>
        <ui-col :span="24">
          <div class="faas-text-row">
            <span class="form-label">{{ $i18n('ram.permission.detail.描述') }}</span>
            <p class="form-inner-span">{{ resourceInfo.resourceDesc }}</p>
          </div>
        </ui-col>
      </ui-row>
    </ui-card>
    <ui-card class="mt20">
      <h4>{{ $i18n('ram.permission.detail.策略内容:') }}</h4>
      <ui-input
        :rows="15"
        class="mt10"
        style="width: 600px"
        type="textarea"
        v-model="resourceInfo.expression"
      ></ui-input>
    </ui-card>

    <uiDialog :maskClose="true" :title="$i18n('ram.permission.detail.编辑策略')" v-model="showDialog">
      <div class="userInfo-edit-dialog flex_c_c">
        <div class="faas-text-row">
          <span class="form-label">{{ $i18n('ram.permission.detail.策略名') }}</span>
          <div class="form-inner-span">
            <bpInput v-model="resourceInfoParams.resourceName"></bpInput>
          </div>
        </div>
        <div class="faas-text-row mt10">
          <span class="form-label">{{ $i18n('ram.permission.detail.描述') }}</span>
          <div class="form-inner-span">
            <bpInput
              :rows="4"
              type="textarea"
              v-model="resourceInfoParams.resourceDesc"
            ></bpInput>
          </div>
        </div>

        <span class="flex1"></span>
        <div>
          <ui-button info @click="editUserInfo">
{{ $i18n('ram.permission.detail.确定') }}
          </ui-button>
          <ui-button info
            @click="
              () => {
                showDialog = false;
              }
            "
          >
{{ $i18n('ram.permission.detail.取消') }}
          </ui-button>
        </div>
      </div>
    </uiDialog>
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

import api from "@/api";
import contentView from "@/components/layout/contentView.vue";
import siderView from "@/components/ui/uiSiderView.vue";
@Component({
  components: { contentView, siderView },
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
  telshow = false;
  resourceInfo: any = {};
  resourceInfoParams: any = {};
  showDialog = false;
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

  mounted() {
    this.init();
  }
  init() {
    this.resourceInfo = this.$route.query;
    console.log( this.resourceInfo)
  }
  openEditDialog() {
    this.showDialog = true;
    this.resourceInfoParams = Object.assign({}, this.resourceInfo);
  }
  editUserInfo() {
    // api.user.putRamUser(this.resourceInfoParams.userId, this.resourceInfoParams).then((res: any) => {
    //   console.log(res);
    // });
  }
}
</script>
<style lang="scss">
.ramUserInfo-detail {
  .userInfo-edit-dialog {
    width: 500px;
    height: 300px;
  }
  .faas-text-row {
    width: 350px;
    p {
      line-height: 40px;
    }
  }
  .form-label {
    text-align: left;
    width: 120px;
    line-height: 40px;
    padding: 0;
    padding-left: 10px;
  }
  .form-inner-span {
    padding: 0;
  }
}
</style>

