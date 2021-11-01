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
    class="faas-content cp-dns-content flex1"
    :title="$i18n('cloudProvider.DNS.index.DNS管理')"
  >
    <ui-note style="width: 100%" :aboutIcon="true">
      <div>
{{ $i18n('cloudProvider.DNS.index._公告：_com/_net/_cn/_xin/_top/_xyz/_vip/_club/_shop/_wang/_ren等域名注册成功后必须进行域名实名认证，否则会造成解析不生效，实名认证审核通过后的1-2个工作日解析可恢复使用。_') }}
      </div>
    </ui-note>
    <div class="mt20">
      <button
        class="bp-btn faas-btn-black"
        style="margin-left: 10px"
        @click="handleSync"
      >
{{ $i18n('cloudProvider.DNS.index.同步') }}
      </button>
    </div>
    <!--dns table list-->
    <div class="cp-body">
      <table class="faas-table-group mt30">
        <thead>
          <tr>
            <th width="35%">
              <span>{{ $i18n('cloudProvider.DNS.index.域名') }}</span>
            </th>

            <th width="35%">
              <span>{{ $i18n('cloudProvider.DNS.index.记录数') }}</span>
            </th>
            <th width="30%">
              <span>{{ $i18n('cloudProvider.DNS.index.操作') }}</span>
            </th>
          </tr>
        </thead>
        <template v-if="list_domains.length > 0">
          <tr :key="item.domainId" v-for="item in list_domains">
            <th>
              <span>{{ item.domainName }}</span>
            </th>
            <th>
              <span>{{ item.recordCount }}</span>
            </th>
            <th>
              <button @click="handleAnalyse(item)">{{ $i18n('cloudProvider.DNS.index.解析设置') }}</button>
            </th>
          </tr>
        </template>
      </table>
      <!-- <template v-if="list_domains.length > 0">
        <uiPagination
          :pageSize.sync="pageDta.pageSize"
          :total="pageDta.total"
          @current-change="querList"
          style="padding: 15px 10px"
          v-model="pageDta.pageNum"
        ></uiPagination>
      </template> -->

      <!-- 暂无数据 -->
      <ui-no-records v-show="list_domains.length == 0" />
    </div>
    <!-- 添加域名 -->
    <ui-dialog class="dialog-box" v-model="dialogShow" :title="$i18n('cloudProvider.DNS.index.添加域名')">
      <div class="dialog-inner flex_c_s">
        <div class="line1" style="margin: 0"></div>
        <ui-row class="inner-item mt10" style="margin-top: 80px">
          <ui-col :span="24">
            <p>{{ $i18n('cloudProvider.DNS.index.支持添加主域或子域') }}</p>
            <bp-input
              class="mt10 inner-input"
              :placeholder="$i18n('cloudProvider.DNS.index.请输入域名')"
            ></bp-input>
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
{{ $i18n('cloudProvider.DNS.index.取消') }}
          </button>
          <button class="bp-btn faas-btn-primary" @click="handleSure">
{{ $i18n('cloudProvider.DNS.index.确定') }}
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

import api from "@/api";

@Component({
  components: {
    contentView,
    uiPagination,
    uiDialog,
    bpInput: bpui.bpInput,
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

  list_domains = [] as any;

  pageDta = {
    pageNum: 1,
    pageSize: 20,
    pages: 1,
    total: 1,
  };

  dialogShow = false;

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

  created() {
    this.querList();
  }

  mounted() {}

  querList() {
    api.cmp.dns
      .list()
      .then((data: any) => {
        this.list_domains = data;
      })
      .catch((err: any) => {
        throw err;
      });
  }

  handleSync() {
    api.cmp.dns
      .sync()
      .then((data: any) => {
        $UIToast({
          type: "success",
          content: $i18n('cloudProvider.DNS.index.同步成功'),
        });
      })
      .catch((err: any) => {
        throw err;
      });
  }

  handleAnalyse(item: any) {
    this.$navbar.push({
      path:
        "/cloudProvider/DNS/analyse?accountId=" +
        item.acctId +
        "&domainName=" +
        item.domainName,
    });
  }

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
  addNewHttp() {}
}
</script>
<style lang="scss">
.cp-dns-content {
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
    // height: 240px;
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
