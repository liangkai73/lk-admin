<!--
/**
* Copyright (c) 2020 Copyright originforest All Rights Reserved.
* Author: cli
* Date: 2020-11-30 16:48
* Desc: 账号列表
*/
 -->

<template>
  <content-view
    :gutter="false"
    :showBack="true"
    class="faas-content cp-container-content flex1"
    :title="title"
  >
    <div class="cp-head-tools flex_r_s mt10">
      <button class="bp-btn faas-btn-primary" @click="addAcct">{{ $i18n('cloudProvider.account.list.新建') }}</button>
    </div>
    <div class="cp-body">
      <table
        class="faas-table-group mt30"
        style="table-layout: fixed; word-wrap: break-all"
      >
        <thead>
          <tr>
            <th width="15%">
              <span>{{ $i18n('cloudProvider.account.list.账号') }}</span>
            </th>
            <th width="12%">
              <span>{{ $i18n('cloudProvider.account.list.地域') }}</span>
            </th>
            <th width="20%">
              <span>AccessKey ID</span>
            </th>
            <th width="20%">
              <span>AccessKey Secret</span>
            </th>
            <th width="19%">
              <span>{{ $i18n('cloudProvider.account.list.创建时间') }}</span>
            </th>
            <th width="12%">
              <span>{{ $i18n('cloudProvider.account.list.操作') }}</span>
            </th>
          </tr>
        </thead>
        <template v-if="list_acct.length > 0">
          <tr :key="item.id" v-for="item in list_acct">
            <th>
              <span>{{ item.acctName }}</span>
            </th>
            <th>
              <span>{{ item.region }}</span>
            </th>
            <th>
              <span>{{ item.accessKey }}</span>
            </th>
            <th>
              <span>{{ item.accessSecret }}</span>
            </th>
            <th>
              <span>{{ item.create_at }}</span>
            </th>
            <th>
              <!-- <button>修改</button> -->
              <button style="color: red" @click="handleDel(item)">{{ $i18n('cloudProvider.account.list.删除') }}</button>
            </th>
          </tr>
        </template>
      </table>
      <!-- <template v-if="list_acct.length > 0"> -->
      <!-- <uiPagination
        :pageSize.sync="pageData.pageSize"
        :total="pageData.total"
        @current-change="querList"
        style="padding: 15px 10px"
        v-model="pageData.pageNum"
      ></uiPagination> -->
      <!-- </template> -->

      <!-- 暂无数据 -->
      <ui-no-records v-show="list_acct.length == 0" />
    </div>

    <!-- 容器dialog -->
    <ui-dialog class="dialog-box" v-model="dialogShow" :title="$i18n('cloudProvider.account.list.新建账号')">
      <div class="dialog-inner flex_c_s">
        <div class="line1" style="margin: 0"></div>
        <ui-row class="inner-item mt10">
          <ui-col :span="24">
            <p>{{ $i18n('cloudProvider.account.list.账号') }}</p>
            <bp-input
              v-model="choose_acct.accountName"
              class="mt10 inner-input"
              :placeholder="$i18n('cloudProvider.account.list.请输入账号')"
            ></bp-input>
          </ui-col>
        </ui-row>

        <ui-row class="inner-item mt10">
          <ui-col :span="24">
            <p>{{ $i18n('cloudProvider.account.list.地域') }}</p>
            <ui-select-el
              class="mt10"
              style="width: 100%"
              :placeholder="$i18n('cloudProvider.account.list.请选择地域')"
              v-model="choose_acct.region"
            >
              <ui-option
                :key="item.id"
                :label="item.name"
                :value="item.regionCode"
                v-for="item in list_regions"
              ></ui-option>
            </ui-select-el>
          </ui-col>
        </ui-row>

        <ui-row class="inner-item mt10">
          <ui-col :span="24">
            <p>AccessKey ID</p>
            <bp-input
              v-model="choose_acct.accessKey"
              class="mt10 inner-input"
              :placeholder="$i18n('cloudProvider.account.list.请输入AccessKey_ID')"
            ></bp-input>
          </ui-col>
        </ui-row>

        <ui-row class="inner-item mt10">
          <ui-col :span="24">
            <p>AccessKey Secret</p>
            <bp-input
              v-model="choose_acct.accessSecret"
              class="mt10 inner-input"
              :placeholder="$i18n('cloudProvider.account.list.请输入AccessKey_Secret')"
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
{{ $i18n('cloudProvider.account.list.取消') }}
          </button>
          <button class="bp-btn faas-btn-primary" @click="handleSure">
{{ $i18n('cloudProvider.account.list.确定') }}
          </button>
        </div>
      </div>
    </ui-dialog>
    <!-- table -->
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
import uiStep from "@/components/ui/uiStep2.vue";
import bpui from "bpui.js";

import api from "@/api";
import filter from "@/libs/filter";

@Component({
  components: {
    contentView,
    uiPagination,
    uiDialog,
    uiStep,
    bpInput: bpui.bpInput,
  },
})
export default class extends Vue {
  pageData = {
    pageNum: 1,
    pageSize: 20,
    pages: 1,
    total: 1,
  };

  dialogShow = false;

  title = "";
  yun_code = "";

  list_acct = [];
  list_regions = [] as any;

  choose_acct = {} as any;

  constructor() {
    super();
  }

  created() {
    let query = this.$route.query as any;

    this.title = query.name;
    this.yun_code = query.code;

      this.querList();
  }

  mounted() {}

  getRegionName(code: string) {
    for (let i = 0; i < this.list_regions.length; i++) {
      if (this.list_regions[i].regionCode == code)
        return this.list_regions[i].name;
    }

    return "";
  }

  querList() {
     api.cmp.base
      .regionByProduct({ productCode: "aliyun-ask" })
      .then((data: any) => {
        this.list_regions = data;

        return api.cmp.acct.listAcct({ cloudType: this.yun_code })
      })
      .then((data: any) => {
        for (let i = 0; i < data.length; i++) {
          data[i].region = this.getRegionName(data[i].regionId);
          data[i].create_at = filter.getDateStr(new Date(data[i].createDt), 2);
        }

        this.list_acct = data;
      })
      .catch((err: any) => {
        throw err;
      });
  }

  handleDel(item: any) {
    this.$UIConfirm({
      content: $i18n('cloudProvider.account.list.确认要删除账号?'), 
      title: $i18n('cloudProvider.account.list.账号管理')
    })
      .then((e) => {
        this.$UIConfirmHide();
        api.cmp.acct
          .delAcct({ acctId: item.id })
          .then((data: any) => {
            console.log(data);
            $UIToast({
              type: "success",
              content: $i18n('cloudProvider.account.list.删除账号成功'),
            });
          })
          .catch((err: any) => {
            throw err;
          });
      })
      .catch(() => {});
  }

  // 关闭dialog
  handleDlogClose() {
    console.log(this.choose_acct);
    this.choose_acct = {
      accountName: "",
    };
    this.changeDialog(false);
  }
  // dialog =>click=>确定
  handleSure() {
    // if (this.choose_acct.id) {
    // } else {
    // }

    if (
      !this.choose_acct.accountName ||
      this.choose_acct.accountName.length == 0
    ) {
      $UIToast({
        type: "error",
        content: $i18n('cloudProvider.account.list.请填写账号'),
      });
      return;
    }

    if (!this.choose_acct.accessKey || this.choose_acct.accessKey.length == 0) {
      $UIToast({
        type: "error",
        content: $i18n('cloudProvider.account.list.请填写accessKey'),
      });
      return;
    }

    if (
      !this.choose_acct.accessSecret ||
      this.choose_acct.accessSecret.length == 0
    ) {
      $UIToast({
        type: "error",
        content: $i18n('cloudProvider.account.list.请填写accessSecret'),
      });
      return;
    }

    if (!this.choose_acct.region || this.choose_acct.region.length == 0) {
      $UIToast({
        type: "error",
        content: $i18n('cloudProvider.account.list.请选择地域'),
      });
      return;
    }

    this.choose_acct.cloud = this.yun_code;

    api.cmp.acct
      .postAcct(this.choose_acct)
      .then((data: any) => {
        this.querList();
        this.choose_acct = {};

        $UIToast({
          type: "success",
          content: $i18n('cloudProvider.account.list.新建账号成功'),
        });

        this.changeDialog(false);
      })
      .catch((err: any) => {
        throw err;
      });
  }
  // 修改dialog状态
  changeDialog(bl: boolean) {
    this.dialogShow = bl;
  }

  // 添加新容器
  addAcct() {
    this.changeDialog(true);
  }
}
</script>
<style lang="scss">
.cp-container-content {
  .cp-head-tools {
    button {
      width: 120px;
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
  .inner-step {
    padding: 15px;
  }
  .ui-step-li {
    min-width: 150px !important;
  }
  .inner-area-items {
    height: 450px;
    overflow-y: auto;
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: space-between;
    .inner-area-item1 {
      width: 100%;
      height: 60px;
      background: rgba(0, 0, 0, 0.1);
      padding: 0 25px;
      margin-top: 15px;
      cursor: pointer;
      transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1) all;
      font-size: 18px;
      i {
        font-size: 25px;
      }

      &:hover {
        background: rgba(27, 170, 245, 0.5);
      }
    }
    .inner-area-item2 {
      width: 100%;
      height: 100px;
      background: rgba(0, 0, 0, 0.1);
      padding: 0 25px;
      margin-top: 10px;
      cursor: pointer;
      transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1) all;
      font-size: 14px;
      i {
        font-size: 35px;
      }

      &:hover {
        background: rgba(27, 170, 245, 0.5);
      }
      .item2-right {
        height: 100%;
        padding: 15px;
        .item2-right-top {
          width: 100%;
        }
        .item2-right-bottom {
          color: #999;
        }
      }
    }
    .inner-area-item3 {
      float: left;
      width: 230px;
      height: 40px;
      line-height: 40px;
      background: rgba(0, 0, 0, 0.1);
      padding: 0 10px;
      margin-right: 10px;
      margin-top: 10px;
      cursor: pointer;
      transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1) all;

      &:hover {
        background: rgba(27, 170, 245, 0.5);
      }
    }
  }

  .dialog-inner {
    width: 500px;
    height: 600px;
    text-align: left;
    justify-content: start;
  }
  .dialog-box {
    .bp-dialog__main {
      padding-top: 0px;
    }
  }
}
</style>
