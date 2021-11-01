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
    :title="$i18n('cloudProvider.mirror.store.index.镜像仓库')"
  >
    <div class="mt20 flex_r_s">
      <button class="bp-btn faas-btn-primary" @click="addNewSpace">{{ $i18n('cloudProvider.mirror.store.index.新建') }}</button>
      <span class="flex1"></span>
      <!-- <div class="icon-box">
        <bp-icon name="refresh"></bp-icon>
      </div> -->
    </div>
    <!--dns table list-->
    <div class="cp-body">
      <table class="faas-table-group mt30">
        <thead>
          <tr>
            <th >
              <span style="width:130px;display:inline-block">{{ $i18n('cloudProvider.mirror.store.index.仓库名称') }}</span>
            </th>
            <th width="15%">
              <span>{{ $i18n('cloudProvider.mirror.store.index.账号') }}</span>
            </th>
            <th width="15%">
              <span>{{ $i18n('cloudProvider.mirror.store.index.密码') }}</span>
            </th>
            <th width="15%">
              <span>{{ $i18n('cloudProvider.mirror.store.index.公网地址') }}</span>
            </th>
            <th width="15%">
              <span>{{ $i18n('cloudProvider.mirror.store.index.专有网络') }}</span>
            </th>
            <th width="15%">
              <span>{{ $i18n('cloudProvider.mirror.store.index.经典网络') }}</span>
            </th>
            <th width="10%">
              <span>{{ $i18n('cloudProvider.mirror.store.index.操作') }}</span>
            </th>
          </tr>
        </thead>
        <template v-if="list_repos && list_repos.length > 0">
          <tr :key="item.id" v-for="item in list_repos">
            <th class="cur_P">
              <span @click="linkTo('detail', item)">{{ item.name }}</span>
            </th>
            <th>
              <span>{{ item.authUser }}</span>
            </th>
            <th>
              <span>{{ item.authPwd }}</span>
            </th>
            <th>
              <span>{{ item.publicEndpoint }}</span>
            </th>
            <th>
              <span>{{ item.vpcEndpoint }}</span>
            </th>
            <th>
              <span>{{ item.classEndpoint }}</span>
            </th>
            <th>
              <button @click="handleDel(item)" style="font-size:12px">{{ $i18n('cloudProvider.mirror.store.index.删除') }}</button>
            </th>
          </tr>
        </template>
        <tr v-else>
          <td colspan="7" style="text-align:center">
            <ui-no-records  style="height:200px"/>
          </td>
        </tr>
      </table>
      <template v-if="list_repos && list_repos.length > 0">
        <!-- <uiPagination
          :pageSize.sync="pageDta.pageSize"
          :total="pageDta.total"
          @current-change="querList"
          style="padding: 15px 10px"
          v-model="pageDta.pageNum"
        ></uiPagination> -->
      </template>
    </div>
    <!-- 添加域名 -->
    <ui-dialog class="dialog-box" v-model="dialogShow" :title="$i18n('cloudProvider.mirror.store.index.新建命名空间')">
      <div class="dialog-inner flex_c_s">
        <div class="line1" style="margin: 0"></div>

        <ui-row class="inner-item mt10">
          <ui-col :span="24">
            <p>{{ $i18n('cloudProvider.mirror.store.index.仓库名称') }}</p>
            <bp-input
              class="inner-input"
              max="64"
              :placeholder="$i18n('cloudProvider.mirror.store.index.请输入仓库名称')"
              v-model="choose_arc.name"
            ></bp-input>
          </ui-col>
          <ui-col>
            <p class="mt5" style="font-size: 12px">
{{ $i18n('cloudProvider.mirror.store.index.长度为2～64位，可填写小写英文字母、数字，可使用分隔符“_”、“-”（分隔符不能在首位或末位）') }}
            </p>
          </ui-col>
        </ui-row>

        <ui-row class="inner-item mt10">
          <ui-col :span="24">
            <p>{{ $i18n('cloudProvider.mirror.store.index.账号') }}</p>
            <bp-input
              class="inner-input"
              max="30"
              :placeholder="$i18n('cloudProvider.mirror.store.index.请输入账号')"
              v-model="choose_arc.authUser"
            ></bp-input>
          </ui-col>
        </ui-row>

        <ui-row class="inner-item mt10">
          <ui-col :span="24">
            <p>{{ $i18n('cloudProvider.mirror.store.index.密码') }}</p>
            <bp-input
              password
              class="inner-input"
              max="30"
              :placeholder="$i18n('cloudProvider.mirror.store.index.请输入密码')"
              v-model="choose_arc.authPwd"
            ></bp-input>
          </ui-col>
        </ui-row>

        <ui-row class="inner-item mt10">
          <ui-col :span="24">
            <p>{{ $i18n('cloudProvider.mirror.store.index.公网地址') }}</p>
            <bp-input
              class="inner-input"
              max="30"
              :placeholder="$i18n('cloudProvider.mirror.store.index.请输入公网地址')"
              v-model="choose_arc.publicEndpoint"
            ></bp-input>
          </ui-col>
        </ui-row>

        <ui-row class="inner-item mt10">
          <ui-col :span="24">
            <p>{{ $i18n('cloudProvider.mirror.store.index.专有网络') }}</p>
            <bp-input
              class="inner-input"
              max="30"
              :placeholder="$i18n('cloudProvider.mirror.store.index.请输入专有网络')"
              v-model="choose_arc.vpcEndpoint"
            ></bp-input>
          </ui-col>
        </ui-row>

        <ui-row class="inner-item mt10">
          <ui-col :span="24">
            <p>{{ $i18n('cloudProvider.mirror.store.index.经典网络') }}</p>
            <bp-input
              class="inner-input"
              max="30"
              :placeholder="$i18n('cloudProvider.mirror.store.index.请输入经典网络')"
              v-model="choose_arc.classEndpoint"
            ></bp-input>
          </ui-col>
        </ui-row>

        <ui-row class="inner-item mt10">
          <ui-col :span="24">
            <p>{{ $i18n('cloudProvider.mirror.store.index.概述信息') }}</p>
            <bp-input
              type="textarea"
              :rows="5"
              class="inner-input-area"
              :placeholder="$i18n('cloudProvider.mirror.store.index.请输入概述信息')"
              v-model="choose_arc.descn"
            ></bp-input>
          </ui-col>
        </ui-row>

        <span class="flex1"></span>
        <div class="inner-footer flex_r_s mt10">
          <span class="flex1"></span>
          <button
            class="bp-btn faas-btn-black"
            style="margin-right: 10px"
            @click="handleDlogClose"
          >
{{ $i18n('cloudProvider.mirror.store.index.取消') }}
          </button>
          <button class="bp-btn faas-btn-primary" @click="handleSure">
{{ $i18n('cloudProvider.mirror.store.index.确定') }}
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
    bpRadioGroup: bpui.bpRadioGroup,
    bpRadio: bpui.bpRadio,
  },
  name: 'mirror-store'
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
      namespace: "namespace",
      status: $i18n('cloudProvider.mirror.store.index.正常'),
      storeType: 1,
      add: "address",
      time: "2020-11-24 09.22.22",
    },
    {
      name: "brainpoint",
      namespace: "namespace",
      status: $i18n('cloudProvider.mirror.store.index.正常'),
      storeType: 1,
      add: "address",
      time: "2020-11-24 09.22.22",
    },
  ];

  pageDta = {
    pageNum: 1,
    pageSize: 20,
    pages: 1,
    total: 1,
  };

  list_repos = [] as any;

  dialogShow = false;

  choose_arc = {} as any;

  // "name": "string",
  // "authUser": "string",
  // "authPwd": "string",
  // "publicEndpoint": "string",
  // "vpcEndpoint": "string"
  // "classEndpoint": "string",
  // "descn": "string",

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

  handleChoseCp() {
    this.changeDialog(true);
  }

  handleDlogClose() {
    this.changeDialog(false);
  }

  querList() {
    api.cmp.acr
      .list_repos()
      .then((data: any) => {
        console.log(data);
        this.list_repos = data;
      })
      .catch((err: any) => {
        throw err;
      });
  }

  handleSure() {
    api.cmp.acr
      .addRepo(this.choose_arc)
      .then((data: any) => {
        $UIToast({
          type: "success",
          content: $i18n('cloudProvider.mirror.store.index.添加成功'),
        });

        this.querList();

        this.changeDialog(false);
      })
      .catch((err: any) => {
        throw err;
      });
  }
  changeDialog(bl: boolean) {
    console.log(bl);
    this.dialogShow = bl;
  }
  addNewSpace() {
    this.changeDialog(true);
  }

  linkTo(str: string, item: any) {
    if (str == "detail") {
      this.$navbar.push({
        path: "detail?id=" + item.id,
      });
    }
  }

  handleDel(item: any) {
    this.$UIConfirm({
      content: $i18n('cloudProvider.mirror.store.index.确认要删除镜像仓库?')
    })
      .then((e) => {
        this.$UIConfirmHide();
        api.cmp.acr
          .delRepo({ repoId: item.id })
          .then((data: any) => {
            console.log(data);
            $UIToast({
              type: "success",
              content: $i18n('cloudProvider.mirror.store.index.删除成功'),
            });

            this.querList();
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
    height: auto;
    text-align: left;
    justify-content: start;
    .inner-title {
      width: 100%;
    }
    .inner-item {
      p {
        padding-left: 3px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.9);
      }
    }
    .inner-input {
      background: rgba(0, 0, 0, 0.1);
      .bp-input__inner{
        height: 32px;
        font-size: 12px;
      }
    }

    .inner-input-area {
      background: rgba(0, 0, 0, 0.1);
      font-size: 12px;
    }
  }
}
</style>
