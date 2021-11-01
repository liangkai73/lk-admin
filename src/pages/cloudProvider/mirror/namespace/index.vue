<!--
/**
* Copyright (c) 2020 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2020-11-30 16:48
* Desc: 镜像服务 - 命名空间
*/
 -->

<template>
  <content-view
    :gutter="false"
    class="faas-content cp-namespace-content flex1"
    :title="$i18n('cloudProvider.mirror.namespace.index.命名空间')"
  >
    <div class="mt20 flex_r_s">
      <button class="bp-btn faas-btn-primary" @click="addNewSpace">{{ $i18n('cloudProvider.mirror.namespace.index.新建') }}</button>
      <span class="flex1"></span>
      <div class="icon-box">
        <bp-icon name="refresh"></bp-icon>
      </div>
    </div>
    <!--dns table list-->
    <div class="cp-body">
      <table class="faas-table-group mt30">
        <thead>
          <tr>
            <th width="28%">
              <span>{{ $i18n('cloudProvider.mirror.namespace.index.命名空间') }}</span>
            </th>
            <th width="28%">
              <span>{{ $i18n('cloudProvider.mirror.namespace.index.命名空间状态') }}</span>
            </th>

            <th width="28%">
              <span>{{ $i18n('cloudProvider.mirror.namespace.index.默认创建仓库') }}</span>
            </th>
            <th width="16%">
              <span>{{ $i18n('cloudProvider.mirror.namespace.index.操作') }}</span>
            </th>
          </tr>
        </thead>
        <template v-if="roleList && roleList.length > 0">
          <tr :key="item.roleId" v-for="item in roleList">
            <th>
              <span>{{ item.name }}</span>
            </th>
            <th>
              <span>{{ item.status }}</span>
            </th>
            <th>
              <bp-radio-group v-model="item.storeType">
                <bp-radio value="1">{{ $i18n('cloudProvider.mirror.namespace.index.公开') }}</bp-radio>
                <bp-radio value="2">{{ $i18n('cloudProvider.mirror.namespace.index.私有') }}</bp-radio>
              </bp-radio-group>
            </th>
            <th>
              <button>{{ $i18n('cloudProvider.mirror.namespace.index.删除') }}</button>
            </th>
          </tr>
        </template>
      </table>
      <template v-if="roleList && roleList.length > 0">
        <uiPagination
          :pageSize.sync="pageDta.pageSize"
          :total="pageDta.total"
          @current-change="querList"
          style="padding: 15px 10px"
          v-model="pageDta.pageNum"
        ></uiPagination>
      </template>

      <!-- 暂无数据 -->
      <ui-no-records v-if="roleList && roleList.length == 0" />
    </div>
    <!-- 添加域名 -->
    <ui-dialog class="dialog-box" v-model="dialogShow" :title="$i18n('cloudProvider.mirror.namespace.index.新建命名空间')">
      <div class="dialog-inner flex_c_s">
        <div class="line1" style="margin: 0"></div>
        <ui-note class="mt10" style="width: 100%; font-size: 14px">
{{ $i18n('cloudProvider.mirror.namespace.index.一个账号最多可新建3个命名空间') }}
        </ui-note>
        <ui-row class="inner-item mt10">
          <ui-col :span="24">
            <p>{{ $i18n('cloudProvider.mirror.namespace.index.命名空间') }}</p>
            <bp-input
              class="mt10 inner-input"
              max="30"
              :placeholder="$i18n('cloudProvider.mirror.namespace.index.请输入')"
            ></bp-input>
          </ui-col>
          <ui-col>
            <p class="mt5">
{{ $i18n('cloudProvider.mirror.namespace.index.设置后不可修改。长度为2～30位，可填写小写英文字母、数字，可使用分隔符“_”、“-”（分隔符不能在首位或末位）') }}
            </p>
          </ui-col>
        </ui-row>
        <span class="flex1"></span>
        <div class="inner-footer flex_r_s">
          <span class="flex1"></span>
          <button
            class="bp-btn faas-btn-black"
            style="margin-right: 10px"
            @click="handleDlogClose"
          >
{{ $i18n('cloudProvider.mirror.namespace.index.取消') }}
          </button>
          <button class="bp-btn faas-btn-primary" @click="handleSure">
{{ $i18n('cloudProvider.mirror.namespace.index.确定') }}
          </button>
        </div>
      </div>
    </ui-dialog>
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
import uiPagination from "@/components/ui/uiPagination.vue";
import uiDialog from "@/components/ui/uiDialogView.vue";
import bpui from "bpui.js";

@Component({
  components: {
    contentView,
    uiPagination,
    uiDialog,
    bpInput: bpui.bpInput,
    bpRadioGroup: bpui.bpRadioGroup,
    bpRadio: bpui.bpRadio,
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

  roleList: any = [
    {
      name: "brainpoint",
      status: $i18n('cloudProvider.mirror.namespace.index.正常'),
      storeType: 1,
      time: "2020-11-24 09.22.22",
    },
    {
      name: "brainpoint",
      status: $i18n('cloudProvider.mirror.namespace.index.不正常'),
      storeType: 1,
      time: "2020-11-24 09.22.22",
    },
  ];

  pageDta = {
    pageNum: 1,
    pageSize: 20,
    pages: 5,
    total: 85,
  };

  dialogShow = true;

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

  handleChoseCp() {
    this.changeDialog(true);
  }
  handleDlogClose() {
    this.changeDialog(false);
  }
  handleSure() {
    this.changeDialog(true);
  }
  changeDialog(bl: boolean) {
    console.log(bl);
    this.dialogShow = bl;
  }
  addNewSpace() {
    this.changeDialog(true);
  }
  querList(e: any) {
    console.log(e);
  }
}
</script>
<style lang="scss">
.cp-namespace-content {
  .icon-box {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #8791a6;
    cursor: pointer;
    i {
      font-size: 20px;
    }
  }
  .cp-body {
    background: #fff;
    .faas-table-group {
      width: 100%;

      th {
        text-align: left;
      }
    }
  }
  .dialog-box {
    .bp-dialog__main {
      padding-top: 0px;
    }
  }
  .dialog-inner {
    width: 500px;
    height: 280px;
    text-align: left;
    justify-content: start;
    .inner-title {
      width: 100%;
    }
    .inner-item {
      p {
        padding-left: 3px;
        color: rgba(0, 0, 0, 0.45);
      }
    }
    .inner-input {
      height: 40px;
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
