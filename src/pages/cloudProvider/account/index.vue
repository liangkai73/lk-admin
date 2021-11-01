<!--
/**
* Copyright (c) 2020 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2020-11-30 16:48
* Desc: 云商管理 - 账号管理
*/
 -->

<template>
  <content-view
    :gutter="false"
    class="faas-content cp-account-content flex1"
    :title="$i18n('cloudProvider.account.index.云商访问密钥')">
    <!-- 已安装 -->
    <div class="overview-body-items">
      <div class="overview-body-item flex_c_c" @click="openDialog(false)">
        <div class="plusFlag">+</div>
        <h6>{{ $i18n('cloudProvider.account.index.添加云商访问密钥') }}</h6>
      </div>
      <div
        class="overview-body-item flex_c_c"
        v-for="item in allAcct"
        :key="item.id">
        <div class="header">
          <span>
            {{ item.alias }}
          </span>
          <span>
            <bp-icon name="edit" @click="openDialog(item)"></bp-icon>
            <bp-icon name="delete" @click="handleDel(item)"></bp-icon>
          </span>
        </div>
        <ul class="info" :class="{inEnglish:$UILibs.lang==='en'}">
          <!-- <li>
            <div>{{ $i18n('cloudProvider.account.index.云账号ID') }}</div>
            <div>{{ item.id }}</div>
          </li> -->
          <li>
            <div>{{ $i18n('cloudProvider.account.index.账号') }}</div>
            <div>{{ item.acctName }}</div>
          </li>
          <li>
            <div>Access Key ID</div>
            <div :title="item.accessKey">{{ item.accessKey }}</div>
          </li>
          <li>
            <div>{{ $i18n('cloudProvider.account.index.添加时间') }}</div>
            <div>{{ item.createDt | filterTime }}</div>
          </li>
        </ul>
        <div class="flex_r_c footerP" style="width: 100%">
          <div class="">
            <bp-icon :name="item.cloudTypeId" style=""></bp-icon>
            <span>{{ item.cloudTypeId | cloudNameMap(yunCodes) }}</span>
          </div>
          <!-- <bp-icon :name="item.cloudTypeId" style="font-size: 40px"></bp-icon> -->
          <!-- <span class="">5分钟前更新</span> -->
        </div>
      </div>
    </div>
    <ui-dialog
      class="dialog-box"
      v-model="dialogShow"
      :title="(isInedit ? $i18n('cloudProvider.account.index.修改') : $i18n('cloudProvider.account.index.添加')) +$i18n('cloudProvider.account.index.云商访问密钥')">
      <div class="dialog-inner flex_c_s">
        <div class="tip">
          <i class="el-icon-warning-outline icon"></i>
          <span>{{ $i18n('cloudProvider.account.index.调整下列阈值，进行更加精准的费用优化计算。') }}</span>
        </div>
        <div class="line1" style="margin: 0"></div>
        <ui-row class="inner-item mt10">
          <ui-col :span="24">
            <p class="redStar">{{ $i18n('cloudProvider.account.index.云账号别名') }}</p>
            <bp-input
              v-model="choose_acct.alias"
              class="mt10 inner-input"
              :placeholder="$i18n('cloudProvider.account.index.该云账号在本平台显示的名称')"></bp-input>
          </ui-col>
        </ui-row>

        <ui-row class="inner-item mt10">
          <ui-col :span="24">
            <p class="redStar">{{ $i18n('cloudProvider.account.index.云商') }}</p>
            <form-select
              v-model="choose_acct.cloud"
              :placeholder-txt="$i18n('cloudProvider.account.index.请选择云商')"
              paint-label="name"
              :disabled="isInedit"
              paint-val="code"
              :show-icon="true"
              :prop-list="yunCodes"></form-select>
          </ui-col>
        </ui-row>
        <ui-row class="inner-item mt10">
          <ui-col :span="24">
            <p class="">
              <span>AccessKey ID</span>
              <span class="linkTo" @click="openTutorials">{{ $i18n('cloudProvider.account.index.获取教程') }}</span>
            </p>
            <bp-input
              v-model="choose_acct.accessKey"
              class="mt10 inner-input"
              :placeholder="$i18n('cloudProvider.account.index.请输入AccessKey_ID')"></bp-input>
          </ui-col>
        </ui-row>

        <ui-row class="inner-item mt10">
          <ui-col :span="24">
            <p class="">AccessKey Secret</p>
            <bp-input
              v-model="choose_acct.accessSecret"
              class="mt10 inner-input"
              :placeholder="$i18n('cloudProvider.account.index.请输入AccessKey_Secret')"></bp-input>
          </ui-col>
        </ui-row>

        <span class="flex1"></span>
        <div class="inner-footer flex_r_s">
          <span class="flex1"></span>
          <button
            class="bp-btn faas-btn-black"
            style="margin-right: 10px"
            @click="handleDlogClose">
            {{ $i18n('cloudProvider.account.index.取消') }}
          </button>
          <button class="bp-btn faas-btn-primary" @click="handleSure">
            {{ $i18n('cloudProvider.account.index.确定') }}
          </button>
        </div>
      </div>
    </ui-dialog>
  </content-view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import contentView from "@/components/layout/contentView.vue";
import uiDialog from "@/components/ui/uiDialogView.vue";
import uiPopoverIcon from "@/components/ui/uiPopoverIcon.vue";
import bpui from "bpui.js";
import filter from "@/libs/filter";
import api from "@/api";
import formSelect from "@/pages/cloudProvider/container/components/formSelect.vue";
// 引导页状态修改
import * as netStore from "@/api/store/netStore";

@Component({
  components: {
    contentView,
    uiDialog,
    uiPopoverIcon,
    bpInput: bpui.bpInput,
    formSelect,
  },
  name: "accountIndex",
  filters: {
    filterTime(val: Date) {
      return filter.getDateStr(new Date(val), 2);
    },
    cloudNameMap(val: string, Arr: any = []) {
      return $i18n(Arr.find((item: any) => item.code === val)?.name);
    },
  },
})
export default class extends Vue {
  dialogShow = false;
  isInedit: boolean = false;
  list_yun_enable = [] as any;
  list_yun_disable = [] as any;
  choose_acct: any = {
    cloud: "",
    accountName: "",
    accessKey: "",
    accessSecret: "",
    alias: "",
  };

  allAcct: any = [];
  constructor() {
    super();
  }

  created() {
    this.getYunList();
  }

  mounted() { }
  openTutorials() {
    window.open("http://dev.bpfaas.com:30003/ISPconfig/configAliyun.html");
    // window.open("https://docs.qq.com/doc/DWU5FUVd6RWx5UGRz");
  }

  get yunCodes() {
    return this.list_yun_enable.map((item) => {
      return {
        name: item.name,
        code: item.code,
        disabled: ['HUAWEI', 'TENCENT', 'Azure'].includes(item.code)
      };
    });
  }
  getYunList() {
    api.cmp.acct.listAcct({}).then((data: any) => {
      this.allAcct = data;
    });
    api.cmp.base
      .list()
      .then((data: any) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].isEnable) this.list_yun_enable.push(data[i]);
          else this.list_yun_disable.push(data[i]);
        }
      })
      .catch((err: any) => {
        throw err;
      });
  }

  handleYun(yun: any) {
    this.$navbar.push({
      path:
        "/cloudProvider/account/list?name=" + yun.name + "&code=" + yun.code,
    });
  }
  openDialog(obj?) {
    if (obj) {
      this.choose_acct.accountName = obj.acctName;
      this.choose_acct.cloud = obj.cloudTypeId;
      this.choose_acct.id = obj.id;
      this.isInedit = true;
    } else {
      this.isInedit = false;
    }
    this.dialogShow = true;
  }
  handleDlogClose() {
    this.changeDialog(false);
  }
  handleSure() {
    if (
      !this.choose_acct.alias ||
      this.choose_acct.alias.length == 0
    ) {
      $UIToast({
        type: "error",
        content: $i18n('cloudProvider.account.index.请填写别名', '请填写别名'),
      });
      return;
    }

    /* if (!this.choose_acct.accessKey || this.choose_acct.accessKey.length == 0) {
      $UIToast({
        type: "error",
        content: $i18n('cloudProvider.account.index.请填写accessKey'),
      });
      return;
    }

    if (
      !this.choose_acct.accessSecret ||
      this.choose_acct.accessSecret.length == 0
    ) {
      $UIToast({
        type: "error",
        content: $i18n('cloudProvider.account.index.请填写accessSecret'),
      });
      return;
    } */
    if (!this.choose_acct.accessKey) delete this.choose_acct.accessKey
    if (!this.choose_acct.accessSecret) delete this.choose_acct.accessSecret
    // this.choose_acct.cloud = this.yun_code;
    let reqApi = this.isInedit ? api.cmp.acct.updateAcct : api.cmp.acct.postAcct
    reqApi(this.choose_acct)
      .then((data: any) => {
        this.getYunList();
        this.isInedit = false;
        $UIToast({
          type: "success",
          content: $i18n('cloudProvider.account.index.新建账号成功'),
        });
        // 成功后修改引导状态
        netStore.getNetStore("guideStatus").then((result) => {
          result.account = true;
          netStore.postNetStore("guideStatus", result);
        });

        this.changeDialog(false);
      })
      .catch((err: any) => {
        throw err;
      });
  }
  handleDel(item: any) {
    this.$UIConfirm({
      content: $i18n('cloudProvider.account.index.确认要删除账号?'),
      title: $i18n('cloudProvider.account.index.账号管理'),
    })
      .then((e) => {
        this.$UIConfirmHide();
        api.cmp.acct
          .delAcct({ acctId: item.id })
          .then((data: any) => {
            if (data) {
              $UIToast({
                type: "success",
                content: $i18n('cloudProvider.account.index.删除账号成功'),
              });
              this.getYunList();
            }
          })
          .catch((err: any) => {
            throw err;
          });
      })
      .catch(() => { });
  }
  changeDialog(bl: boolean) {
    this.choose_acct = {
      cloud: "",
      accountName: "",
      accessKey: "",
      accessSecret: "",
      alias: "",
    };
    this.dialogShow = bl;
  }
}
</script>
<style lang="scss">
@import "@/styles/var/_handle.scss";
.cp-account-content {
  .content-title {
    padding-left: 20px;
  }
  .overview-body-items {
    width: 100%;
    display: flex;
    padding-left: 10px;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
  }
  @media screen and (min-width: 1700px) {
    .overview-body-item {
      width: 23.7%;
    }
  }

  @media all and (min-width: 1422px) and (max-width: 1699px) {
    .overview-body-item {
      width: 31%;
    }
  }

  @media all and (max-width: 1421px) {
    .overview-body-item {
      width: 47%;
    }
  }

  .overview-body-item {
    @include background_color("bg_color1");
    margin: 0 20px 20px 0;
    height: 218px;
    padding: 10px 16px;
    font-size: 18px;
    transition: all 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);
    &:first-child {
      border: dashed 1px #d8d8d8;
    }
    box-shadow: 0px 1px 5px -3px rgba(152, 162, 179, 1),
      0px 2px 2px -1px rgba(152, 162, 179, 1);
    &:hover {
      box-shadow: 0px 2px 40px 0px rgba(16, 27, 79, 0.2);
    }
    div.header {
      font-size: 14px;
      font-weight: 600;
      align-self: start;
      display: flex;
      justify-content: space-between;
      align-self: stretch;
      .iconfont {
        cursor: pointer;
        font-weight: 400;
        margin-left: 10px;
        padding: 5px;
        &:hover {
          background-color: #dcdcdc;
        }
      }
    }
    ul.info {
      margin: 16px 0 10px;
      width: 100%;
      li {
        display: flex;
        font-size: 12px;
        margin-bottom: 16px;
        overflow: hidden;
        div:first-child {
          color: #666;
          flex-shrink: 0;
          width: 82px;
          margin-right: 24px;
        }
      }
    }
    .footerP {
      justify-content: space-between;
      align-items: center;
      line-height: 24px;
      .iconfont {
        vertical-align: middle;
        font-size: 24px;
        line-height: 1;
        color: #ff6300;
      }
      span {
        font-size: 14px;
        color: #000;
        font-weight: 600;
        margin-left: 8px;
      }
    }
    p {
      margin: 5px 0;
    }
    &:first-child {
      cursor: pointer;
      .plusFlag {
        font-size: 48px;
        margin-bottom: 24px;
      }
      h6 {
        font-weight: normal;
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
    height: 400px;
    text-align: left;
    font-size: 12px;
    justify-content: start;
    border-top: solid 1px rgba(0, 0, 0, 0.1);
    padding-top: 16px;
    .inner-input.bp-input {
      height: 34px;
      .bp-input__inner {
        height: 32px;
      }
    }
    .tip {
      padding: 12px 24px;
      background-color: #dfeaff;
      line-height: 1.4;
      font-size: 12px;
      color: #0046b9;
      width: 100%;
      display: flex;
      align-items: center;
      .icon {
        font-size: 22px;
        margin-right: 16px;
        vertical-align: middle;
      }
    }
    .inner-title {
      width: 100%;
    }
    .inner-item {
      p {
        padding-left: 3px;
        color: #000;
        .linkTo {
          float: right;
          color: #0077ff;
          cursor: pointer;
          font-size: 12px;
        }
      }
    }
    .inner-input {
      height: 40px;
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
