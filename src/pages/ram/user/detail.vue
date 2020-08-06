<!--
/**
* Copyright (c) 2020 Copyright Originforest All Rights Reserved.
* Author: lanck
* Date: 2020-12-23 14:44
* Desc: 管理员权限
*/
 -->

<template>
  <content-view :gutter="false" class="ram-userdetail" :title="userInfo.username"
    :showBack="true">
    <div slot="titleRight">
      <!-- <ui-dropdown trigger="click">
        <ui-icon name="more" class="cur_P" style="font-size: 25px"></ui-icon>
        <ui-dropdown-menu slot="dropdown">
          <ui-dropdown-item @click.native="handleChanegType(2)"
            >修改</ui-dropdown-item
          >
        </ui-dropdown-menu>
      </ui-dropdown> -->
      <ui-button @click="handleChanegType(2)">{{ $i18n('ram.user.detail.编辑') }}</ui-button>
    </div>
    <!-- 个人详情  -->
    <div class="detail-head-table mt20">
      <table style="width:100%;">
        <thead>
          <tr>
            <th width="20%">{{ $i18n('ram.user.detail.邮箱') }}</th>
            <th width="20%">{{ $i18n('ram.user.detail.手机') }}</th>
            <th width="20%">{{ $i18n('ram.user.detail.创建时间') }}</th>
            <th width="40%">{{ $i18n('ram.user.detail.备注') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span v-if="viewType == 1">{{ userInfo.email }}</span>
              <ui-input v-else type="email" v-model="userInfo.email"></ui-input>
            </td>

            <td>
              <span v-if="viewType == 1">{{ userInfo.telephone }}</span>
              <ui-input v-else type="tel" v-model="userInfo.telephone"></ui-input>
            </td>
            <td>{{ userInfo.createTime | getDateStr(2) }}</td>
            <td style="max-width: 350px">
              <span v-if="viewType == 1">{{ userInfo.remark }}</span>
              <ui-input v-else v-model="userInfo.remark"></ui-input>
            </td>
          </tr>
        </tbody>
      </table>
      <div style="text-align: right; padding: 0 10px">
        <ui-button v-show="viewType == 2" class="mt10"
          @click="handleChanegType(1)" style="margin: 20px 0 0 8px">
          {{ $i18n('ram.user.detail.取消') }}
        </ui-button>
        <ui-button primary v-show="viewType == 2" @click="handlePutUserInfo"
          class="mt10" style="margin: 20px 0 0 8px">
          {{ $i18n('ram.user.detail.确认修改') }}
        </ui-button>
      </div>
    </div>
    <!-- detail body -->
    <div class="detail-body mt30" v-show="viewType == 1">
      <!--  body  tabs-->
      <uiTabs :data="tabsData" v-model="tabsValue" @handleClick="changeView"></uiTabs>
      <!-- tabs 1 -->
      <ui-card class="mt10" v-show="tabsValue == 1">
        <div class="detail-head-table mt10 pl5">
          <h3 class="mt10">{{ $i18n('ram.user.detail.控制台登录管理') }}</h3>
          <table class="mt20">
            <thead>
              <tr>
                <th width="20%">{{ $i18n('ram.user.detail.控制台访问') }}</th>
                <th width="20%">{{ $i18n('ram.user.detail.必须开启多因素认证') }}</th>
                <th width="20%">{{ $i18n('ram.user.detail.上次登录控制台时间') }}</th>
                <th width="40%">{{ $i18n('ram.user.detail.下次登录重置密码') }}</th>
              </tr>
            </thead>
            <tr>
              <th>{{ $i18n('ram.user.detail.已开启') }}</th>
              <th>-</th>
              <th>{{ $i18n('ram.user.detail.2021年5月21日15:31:34') }}</th>
              <th style="max-width: 350px">-</th>
            </tr>
          </table>
        </div>
        <span class="line1"></span>
        <p class="mt10"></p>
        <button class="bp-btn faas-btn-primary">{{ $i18n('ram.user.detail.创建AccessKey') }}</button>
        <div style="padding: 0" class="mt20">
          <div class="user-im flex_r_s">
            <!-- AccessKey list -->
            <div class="user-im-right flex1">
              <div class="right-user-list">
                <table class="faas-table-group warn-list mt20">
                  <thead>
                    <tr>
                      <th width="5%">
                        <ui-checkbox></ui-checkbox>
                      </th>
                      <th width="25%">AccessKey ID</th>
                      <th width="20%">{{ $i18n('ram.user.detail.状态') }}</th>
                      <th width="20%">{{ $i18n('ram.user.detail.最后使用时间') }}</th>
                      <th width="20%">{{ $i18n('ram.user.detail.创建时间') }}</th>
                      <th width="10%">{{ $i18n('ram.user.detail.操作') }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr :key="index" v-for="(item, index) in 10">
                      <th>
                        <ui-checkbox></ui-checkbox>
                      </th>
                      <th>
                        <span>LTAI5tAhxVL7dwo1QqfzCHnL</span>
                      </th>
                      <th>
                        <span>{{ $i18n('ram.user.detail.已启用') }}</span>
                      </th>
                      <th>
                        <span>{{ $i18n('ram.user.detail.——') }}</span>
                      </th>
                      <th>
                        <span>{{ $i18n('ram.user.detail.2021年3月30日_15:07:33') }}</span>
                      </th>
                      <th style="min-width: 132px">
                        <button>{{ $i18n('ram.user.detail.禁用') }}</button>
                        <button
                          class="user-detail-warn-color">{{ $i18n('ram.user.detail.删除') }}</button>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <uiPagination :pageSize.sync="pageDta.pageSize" :total="pageDta.total"
            @current-change="querList" style="padding: 15px 10px" v-model="pageDta.pageNum">
            <div class="pagination-btns">
              <button class="bp-btn faas-btn-black">{{ $i18n('ram.user.detail.禁用') }}</button>
              <button class="bp-btn faas-btn-black">{{ $i18n('ram.user.detail.启用') }}</button>
              <button class="bp-btn faas-btn-black user-detail-warn-color">
                {{ $i18n('ram.user.detail.删除') }}
              </button>
            </div>
          </uiPagination>
        </div>
      </ui-card>
      <!-- tab 2 -->
      <ui-card class="mt10" v-show="tabsValue == 2" style="padding: 0">
        <detailGroup :userId="userId"></detailGroup>
      </ui-card>
    </div>

    <!-- 创建AccesssKey Dialog -->
    <ui-dialog class="dialog-box" v-model="dialogShow" :title="$i18n('ram.user.detail.创建用户')">
      <div class="dialog-inner flex_c_c">
        <div class="line1" style="margin: 0"></div>
        <ui-icon name="checked" class="inner-success-icon"></ui-icon>
        <p class="mt20" style="font-size: 24px">{{ $i18n('ram.user.detail.创建成功') }}</p>
        <p style="font-size: 14px; color: #999; padding: 20px">
          {{ $i18n('ram.user.detail.请及时保存，弹窗关闭后将无法再去获取改信息，但您可以随时创建新的AccessKey。') }}
        </p>
        <div class="inner-key-box mt40">
          <ui-row>
            <ui-col :span="8"> AccessKey ID </ui-col>
            <ui-col :span="16"> cxkedjweicjwoiefjdklscjwik </ui-col>
          </ui-row>
          <ui-row>
            <ui-col :span="8"> AccessKey Secret </ui-col>
            <ui-col :span="16"> cxkedjweicjwoiefjdklscjwiksdfcdcsdc </ui-col>
          </ui-row>
        </div>

        <span class="flex1"></span>
        <div class="inner-footer flex_r_s">
          <span class="flex1"></span>
          <button class="bp-btn faas-btn-primary" @click="handleSure">
            {{ $i18n('ram.user.detail.关闭') }}
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
  import bpui from "bpui.js";
  import uiPagination from "@/components/ui/uiPagination.vue";
  import uiTabs from "@/components/ui/uiTabs.vue";
  import detailGroup from "./components/detailGroups.vue";
  import api from "@/api";

  @Component({
    components: {
      contentView,
      uiPagination,
      uiTabs,
      detailGroup,
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
    pageDta = {
      pageNum: 1,
      pageSize: 20,
      pages: 5,
      total: 85,
    };

    dialogShow = false;
    userInfo = {};
    viewType: 1 | 2 = 1; // 页面是否修改中
    userId = "1";

    tabsValue = 2;
    tabsData = [{
        title: $i18n('ram.user.detail.加入的组'),
        value: 2
      },
      // { title: "加入的组", value: 2 },
    ];

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
    handleDlogClose() {
      this.dialogShow = false;
    }
    handleSure() {
      this.dialogShow = true;
    }
    querList() {}
    //  获取用户详情
    _getUserDetail(id: string) {
      api.user.getUserInfo(id).then((result: any) => {
        this.userInfo = result;
      });
    }
    //  修改用户资料
    handlePutUserInfo() {
      api.user.editUserInfo(this.userId, this.userInfo).then((result: any) => {
        $UIToast({
          type: "success",
          content: $i18n('ram.user.detail.修改成功！')
        });
        this.handleChanegType(1);
      });
    }
    // 修改页面类型
    handleChanegType(type: 1 | 2) {
      if (type == 1) {
        this._getUserDetail(this.userId);
      }
      this.viewType = type;
    }

    // tabs切换
    changeView(e: any) {
      console.log(e);
    }
    init() {
      let {
        id
      }: any = this.$route.query;
      this.userId = id;
      this._getUserDetail(id);
    }
    created() {
      this.init();
    }
    mounted() {}
  }
</script>
<style lang="scss">
  @import '~@bpui/ui/var';

  .ram-userdetail {
    height: calc(100vh - 50px);
    width: 100%;
    overflow-y: auto;

    .user-detail-warn-color {
      @include ui-theme-font-color("warn");
    }

    .detail-head-table {

      // margin-bottom: 40px;
      // reset
      .bp-input {
        margin: 0;
      }
    }

    .user-im {
      width: 100%;
      height: 350px;
    }

    .user-im-right {
      height: 100%;

      .right_top {
        width: 100%;
        height: 50px;
        padding: 0 15px;
        background: #ccc;

        button {
          height: 32px;
        }
      }

      .right-user-list {
        overflow-y: auto;
        height: 100%;
      }

      .userItem-head-img {
        width: 40px;
        height: 40px;
        background: #ccc;
        margin-right: 15px;
      }

      .user-tip {
        background: #0078ff;
        height: 18px;
        color: #fff;
        font-size: 14px;
        padding: 5px 20px;
        border-radius: 2px;
        margin-left: 15px;
      }
    }

    .pagination-btns {
      margin-left: 100px;

      button {
        margin-right: 15px;
      }
    }

    .dialog-box {
      .bp-dialog__main {
        padding-top: 0px;
      }
    }

    .dialog-inner {
      width: 500px;
      height: 500px;
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

      .inner-success-icon {
        font-size: 80px;
        color: #0acd7f;
        margin-top: 40px;
      }

      .inner-key-box {
        width: 100%;
        //   height: 60px;
        line-height: 24px;
        font-size: 16px;
        background: #e5e5e5;
      }
    }
  }
</style>
