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
    :showBack="true"
    :title="$i18n('cloudProvider.DNS.analyse.解析设置') + domainName"
  >
    <div class="mt20">
      <button class="bp-btn faas-btn-primary" @click="addNewHttp">
{{ $i18n('cloudProvider.DNS.analyse.添加记录') }}
      </button>
    </div>
    <!--dns table list-->
    <div class="cp-body">
      <table class="faas-table-group mt30">
        <thead>
          <tr>
            <th width="20%">
              <span>{{ $i18n('cloudProvider.DNS.analyse.主机记录') }}</span>
            </th>
            <th width="20%">
              <span>{{ $i18n('cloudProvider.DNS.analyse.记录类型') }}</span>
            </th>
            <th width="20%">
              <span>{{ $i18n('cloudProvider.DNS.analyse.解析线路') }}</span>
            </th>
            <th width="20%">
              <span>{{ $i18n('cloudProvider.DNS.analyse.记录值') }}</span>
            </th>
            <th width="10%">
              <span>ttl </span>
            </th>

            <th width="10%">
              <span>{{ $i18n('cloudProvider.DNS.analyse.操作') }}</span>
            </th>
          </tr>
        </thead>
        <template v-if="list_rr.length > 0">
          <tr :key="item.id" v-for="item in list_rr">
            <th>
              <span>{{ item.rr }}</span>
            </th>
            <th>
              <span>{{ item.type }}</span>
            </th>
            <th>
              <span>{{ $i18n('cloudProvider.DNS.analyse.默认') }}</span>
            </th>
            <th>
              <span>{{ item.rrValue }}</span>
            </th>
            <th>
              <span>{{ item.ttl }}</span>
            </th>
            <th>
              <!-- <button>修改</button>
              <button>暂停</button> -->
              <button @click="handleDel(item)">{{ $i18n('cloudProvider.DNS.analyse.删除') }}</button>
              <!-- <button>备注</button> -->
            </th>
          </tr>
        </template>
      </table>
      <!-- <template v-if="list_rr.length > 0"> -->
      <uiPagination
        :pageSize.sync="pageDta.pageSize"
        :total="pageDta.total"
        @current-change="querList"
        style="padding: 15px 10px 15px 0"
        v-model="pageDta.pageNum"
      >
        <!-- <div>
            <button class="bp-btn faas-btn-black" style="margin-right: 10px">
              暂停
            </button>
            <button class="bp-btn faas-btn-black" style="margin-right: 10px">
              启用
            </button>
            <button class="bp-btn faas-btn-black">删除</button>
          </div> -->
      </uiPagination>
      <!-- </template> -->
      <!-- 暂无数据 -->
      <ui-no-records v-show="list_rr.length == 0" />
    </div>

    <!-- 添加域名 -->
    <ui-dialog class="dialog-box" v-model="dialogShow" :title="$i18n('cloudProvider.DNS.analyse.添加记录')">
      <div class="dialog-inner flex_c_s" id="dialog_dns_content" ref="dialog_dns_content">
        <div class="line1" style="margin: 0"></div>
        <ui-row class="inner-item mt10" style="margin-top: 10px">
          <ui-col :span="24">
            <p>{{ $i18n('cloudProvider.DNS.analyse.记录类型') }}</p>
            <ui-select-el
              class="mt10"
              style="width: 100%"
              :placeholder="$i18n('cloudProvider.DNS.analyse.请选择记录类型')"
              v-model="choose_rr.type"
            >
              <ui-option
                :key="item.id"
                :label="item.name"
                :value="item.value"
                v-for="item in list_types"
              ></ui-option>
            </ui-select-el>
          </ui-col>
        </ui-row>
        <ui-row class="inner-item mt10">
          <ui-col :span="24">
            <p>{{ $i18n('cloudProvider.DNS.analyse.主机记录') }}</p>
            <div class="flex_r_s">
              <bp-input
                style="width: 80%"
                class="mt10 inner-input"
                :placeholder="$i18n('cloudProvider.DNS.analyse.请输入主机记录')"
                v-model="choose_rr.rr"
              ></bp-input>
              <div style="width: 20%">.{{ domainName }}</div>
            </div>
          </ui-col>
        </ui-row>
        <ui-row class="inner-item mt10">
          <ui-col :span="24">
            <p>{{ $i18n('cloudProvider.DNS.analyse.记录值') }}</p>
            <bp-input
              class="mt10 inner-input"
              :placeholder="$i18n('cloudProvider.DNS.analyse.请输入记录值')"
              v-model="choose_rr.value"
              :validator="onValidator"
            ></bp-input>
          </ui-col>
        </ui-row>
        <ui-row class="inner-item mt10">
          <ui-col :span="24">
            <p>TTL</p>
            <bp-input
              class="mt10 inner-input"
              :placeholder="$i18n('cloudProvider.DNS.analyse.请输入TTL')"
              v-model="choose_rr.ttl"
              disabled
            ></bp-input>
          </ui-col>
        </ui-row>

        <span class="flex1"></span>
        <div class="inner-footer flex_r_s" style="margin-top: 50px">
          <span class="flex1"></span>
          <button
            class="bp-btn faas-btn-black"
            style="margin-right: 10px"
            @click="handleDlogClose"
          >
{{ $i18n('cloudProvider.DNS.analyse.取消') }}
          </button>
          <button class="bp-btn faas-btn-primary" @click="handleSure">
{{ $i18n('cloudProvider.DNS.analyse.确定') }}
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

  list_types = [
    {
      id: 0,
      name: $i18n('cloudProvider.DNS.analyse.A__将域名指向一个IPV4地址'),
      value: "A",
    },
    {
      id: 1,
      name: $i18n('cloudProvider.DNS.analyse.CNAME__将域名指向另外一个域名'),
      value: "CNAME",
    },
  ];

  list_rr = [];
  domainName = "";
  accountId = "";

  pageDta = {
    pageNum: 1,
    pageSize: 20,
    pages: 1,
    total: 0,
  };

  dialogShow = false;
  choose_rr = { type: "A", ttl: "3600" } as any;

  loading = null as any;
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
    let query = this.$route.query as any;

    this.domainName = query.domainName;
    this.accountId = query.accountId;
  }

  mounted() {}
  addNewHttp() {
    this.dialogShow = true;
  }

  querList(e: any) {
    api.cmp.dns
      .listRR({ domainName: this.domainName, pageNum: 1, pageSize: 10 })
      .then((data: any) => {
        this.list_rr = data.list;
        this.pageDta.total = data.total;
      })
      .catch((err: any) => {
        throw err;
      });
  }
  checkDomain(url: string) {
    var strRegex = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
    var re = new RegExp(strRegex);
    return re.test(url);
  }

  checkValidIp(ip: string) {
    return /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/.test(
      ip
    );
  }

  onValidator(text: string, callback: any) {
    let checked = true;

    if (this.choose_rr.type == "CNAME") {
      checked = this.checkDomain(text);
    }
    if (this.choose_rr.type == "A") {
      checked = this.checkValidIp(text);
    }

    callback(checked);
  }

  handleSure() {
    if (!this.choose_rr.rr || this.choose_rr.rr.length == 0) {
      $UIToast({
        type: "error",
        content: $i18n('cloudProvider.DNS.analyse.请填写主机记录值'),
      });
      return;
    }

    if (!this.choose_rr.value || this.choose_rr.value.length == 0) {
      $UIToast({
        type: "error",
        content: $i18n('cloudProvider.DNS.analyse.请填写记录值'),
      });
      return;
    }

    if (this.choose_rr.type == "CNAME" && !this.checkDomain(this.choose_rr.value)) {
      $UIToast({
        type: "error",
        content: $i18n('cloudProvider.DNS.analyse.请输入正确的域名'),
      });
      return;
    }

    if (this.choose_rr.type == "A" && !this.checkValidIp(this.choose_rr.value)) {
      $UIToast({
        type: "error",
        content: $i18n('cloudProvider.DNS.analyse.请输入正确的IP'),
      });
      return;
    }

    this.choose_rr.accountId = this.accountId;
    this.choose_rr.domainName = this.domainName;

    api.cmp.dns
      .addRR(this.choose_rr)
      .then((data: any) => {
        $UIToast({
          type: "success",
          content: $i18n('cloudProvider.DNS.analyse.添加成功'),
        });

        this.dialogShow = false;

        this.querList(null);

        this.choose_rr = { type: "A", rr: "", value: "", ttl: "3600" } as any;

        // this.loading.close();
      })
      .catch((err: any) => {
        // this.loading.close();
        throw err;
      });
  }

  handleDlogClose() {
    this.dialogShow = false;
  }

  handleDel(item: any) {
    this.$UIConfirm({
      content: $i18n('cloudProvider.DNS.analyse.确认要删除记录?'),
      title: $i18n('cloudProvider.DNS.analyse.记录管理'),
    })
      .then((e) => {
        this.$UIConfirmHide();
        
        api.cmp.dns
          .delRR({ recordId: item.recordId })
          .then((data: any) => {
            console.log(data);
            $UIToast({
              type: "success",
              content: $i18n('cloudProvider.DNS.analyse.删除成功'),
            });

            this.querList(null);
          })
          .catch((err: any) => {
            throw err;
          });
      })
      .catch(() => {});
  }
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
        button {
          padding: 5px;
          font-size: 14px;
        }
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
