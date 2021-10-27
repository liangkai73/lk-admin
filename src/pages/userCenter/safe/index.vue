<!--
/**
* Copyright (c) 2020 Copyright Originforest All Rights Reserved.
* Author: lanck
* Date: 2020-12-23 14:44
* Desc: 管理员权限
*/
 -->

<template>
  <content-view :gutter="false" class="safe-content"
    :title="$i18n('userCenter.safe.index.账号安全')">
    <ui-card class="flex_r_s safe-raw mt10" v-if="userInfo">
      <ui-icon style="padding-left: 50px; box-sizing: content-box;" width="28px" height="28px"
        color="#333" name="phone1"></ui-icon>
      <span class="uselect-none"
        style="padding-left: 50px; font-size: 14px">{{ $i18n('userCenter.safe.index.手机号') }}</span>
      <span style="padding-left: 150px">{{
        fiterTel(userInfo.telephone)
      }}</span>
      <span class="flex1"></span>
      <button @click="handleChange('tel')">
        {{ $i18n('userCenter.safe.index.修改') }}
      </button>
    </ui-card>
    <ui-card class="flex_r_s mt10 safe-raw">
      <ui-icon style="padding-left: 50px; box-sizing: content-box;" width="28px" height="28px"
        color="#333" name="unlock"></ui-icon>
      <span class="uselect-none"
        style="padding-left: 50px; font-size: 14px">{{ $i18n('userCenter.safe.index.登录密码') }}</span>
      <span class="flex1"></span>
      <button @click="linkTo('resetPw')">
        {{ $i18n('userCenter.safe.index.修改') }}
      </button>
    </ui-card>
    <!-- 修改手机号弹窗 -->
    <ui-dialog class="dialog-box" :visible.sync="dialogShow" :title="$i18n('userCenter.safe.index.修改手机号')"
      v-if="userInfo">
      <div class="dialog-inner flex_c_s">
        <div class="line1" style="margin: 0"></div>
        <!-- changeTelView1 -->
        <template v-if="changeTelView == 1">
          <ui-row class="inner-item mt10" style="margin-top: 40px">
            <ui-col :span="24">
              <p>{{ $i18n('userCenter.safe.index.手机号') }}</p>
              <!-- <ui-input
                class="mt10 inner-input"
                type="tel"
                placeholder="请输入手机号"
                v-model="getCodeParams.username"
              ></ui-input> -->
              <p class="mt10 inner-input" style="line-height: 40px; padding-left: 15px">
                {{ fiterTel(userInfo.telephone) }}
              </p>
            </ui-col>
          </ui-row>
          <ui-row class="inner-item mt10">
            <p>{{ $i18n('userCenter.safe.index.验证码') }}</p>
          </ui-row>
          <ui-row class="inner-row inner-item mt10">
            <ui-col :span="17">
              <ui-input :placeholder="$i18n('userCenter.safe.index.请输入短信验证码')" class="inner-input"
                style="marigin: 0" type="text" v-model="checkCodeParams.checkCode"></ui-input>
            </ui-col>
            <ui-col :offset="1" :span="6">
              <button :disabled="codeHide || getCodeParams.username.length == 0"
                @click="handleGetCode(getCodeParams)" class="bp-btn faas-btn-black getCodeBtn">
                <template v-if="!codeHide">{{ $i18n('userCenter.safe.index.获取验证码') }}</template>
                <template v-else>{{ limitTime + ' s' }}</template>
              </button>
            </ui-col>
          </ui-row>
        </template>
        <template v-if="changeTelView == 2">
          <!-- changeTelView2 -->
          <ui-row class="inner-item mt10" style="margin-top: 40px">
            <ui-col :span="24">
              <p>{{ $i18n('userCenter.safe.index.新手机号') }}</p>
              <ui-input class="mt10 inner-input" type="tel"
                :placeholder="$i18n('userCenter.safe.index.请输入手机号')"
                v-model="newCodeParams.username"></ui-input>
            </ui-col>
          </ui-row>
          <ui-row class="inner-item mt30">
            <p>{{ $i18n('userCenter.safe.index.验证码') }}</p>
          </ui-row>
          <ui-row class="inner-row inner-item mt10">
            <ui-col :span="17">
              <ui-input :placeholder="$i18n('userCenter.safe.index.请输入短信验证码')" class="inner-input"
                style="marigin: 0" type="text" v-model="newcheckCodeParams.checkCode"></ui-input>
            </ui-col>
            <ui-col :offset="1" :span="6">
              <button :disabled="codeHide || newCodeParams.username.length == 0"
                @click="handleGetCode(newCodeParams)" class="bp-btn faas-btn-black"
                style="height: 40px">
                <template v-if="!codeHide">{{ $i18n('userCenter.safe.index.获取验证码') }}</template>
                <template v-else>{{ limitTime }}</template>
              </button>
            </ui-col>
          </ui-row>
        </template>
        <span class="flex1"> </span>
        <div class="inner-footer flex_r_s">
          <span class="flex1"></span>
          <button info style="margin-right: 10px" @click="handleDlogClose">
            {{ $i18n('userCenter.safe.index.取消') }}
          </button>
          <button v-show="changeTelView == 1" primary
            @click="handleCheckCode(changeTelView, checkCodeParams)">
            {{ $i18n('userCenter.safe.index.下一步') }}
          </button>
          <button v-show="changeTelView == 2" primary
            @click="handleCheckCode(changeTelView, newcheckCodeParams)">
            {{ $i18n('userCenter.safe.index.确定') }}
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

  import api from "@/api";

  @Component({
    components: {
      contentView,
      uiPagination,
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
    dialogShow = false;
    codeHide = false;
    limitTime = 10;

    changeTelView = 1;
    userInfo: any = null;
    // 获取 验证码
    getCodeParams = {
      username: "", // 手机号
    };
    // 新手机号获取 验证码
    newCodeParams = {
      username: "", // 手机号
    };
    // 校验 验证码
    checkCodeParams = {
      username: "",
      checkCode: "",
    };
    // 新手机校验 验证码
    newcheckCodeParams = {
      username: "",
      checkCode: "",
    };

    //
    // computed.
    // get demo() { return xxxx; }

    // 时间轮询函数1
    _getTime(num: number) {
      let timer = num * 1000;
      if (num == 1) {
        this.$timer.setTimeout(() => {
          this.limitTime = 0;
          this.codeHide = false;
        }, 1000);
        return;
      } else {
        this.$timer.setTimeout(() => {
          this._getTime(num - 1);
          this.limitTime = num - 1;
        }, 1000);
      }
    }
    handleChoseCp() {
      this.changeDialog(true);
    }
    handleDlogClose() {
      this.getCodeParams = {
        username: "", // 手机号
      };
      // 新手机号获取 验证码
      this.newCodeParams = {
        username: "", // 手机号
      };
      // 校验 验证码
      this.checkCodeParams = {
        username: "",
        checkCode: "",
      };
      // 新手机校验 验证码
      this.newcheckCodeParams = {
        username: "",
        checkCode: "",
      };
      this.$timer.clearAll();
      this.limitTime = 10;
      this.codeHide = false;
      this.changeDialog(false);
    }
    handleSure() {
      this.changeDialog(true);
    }
    changeDialog(bl: boolean) {
      this.dialogShow = bl;
    }
    handleChange(str: any) {
      if (str == "tel") {
        this.changeDialog(true);
      }
    }
    // 修改验证码下一步
    // 过滤手机号
    fiterTel(str: string) {
      return str.slice(0, 3) + "****" + str.slice(7);
    }
    // 跳转
    linkTo(str: string) {
      if (str == "resetPw") {
        this.$navbar.push({
          path: "/resetPassWord",
        });
      }
    }

    // 逻辑 fun
    // 获取用户信息
    _getUserInfo() {
      api.user.getUserInfoNow().then((res: any) => {
        this.userInfo = res.user;
        this.getCodeParams.username = this.userInfo.telephone;
      });
    }
    // 获取验证码
    handleGetCode(params: any) {
      this.codeHide = true;
      this.limitTime = 60;
      this._getTime(this.limitTime);

      api.user.getRequestCode({
        sendScene: $UILibs.lang.indexOf('zh') == 0 ? 'RESET_PWD_CN' : 'RESET_PWD_EN',
        sendType: 'PHONE', 
        // target: params.username,
        // code: 
      }).then((result: any) => {
        if (this.changeTelView == 1) {
          this.checkCodeParams.username = params.username;
          // this.checkCodeParams.checkCode = "test";
        } else if (this.changeTelView == 2) {
          this.newcheckCodeParams.username = params.username;
          // this.newcheckCodeParams.checkCode = "test2";
        }
      });
    }
    // 校验验证码
    handleCheckCode(viewType: number, params: any) {
      api.user.postVerifyCode(params).then((result: any) => {
        if (viewType == 1) {
          this.changeTelView = 2;
          this.$timer.clearAll();
          this.codeHide = false;
          this.limitTime = 10;
        }
        if (viewType == 2) {
          let infoParams = {
            telephone: params.username,
          };
          let id = this.userInfo.userId;
          api.user.editUserInfo(id, params).then((result: any) => {
            $UIToast({
              type: "success",
              content: $i18n('userCenter.safe.index.修改成功')
            }).then((r) => {
              this.handleDlogClose();
            });
          });
        }
      });
    }

    init() {
      this._getUserInfo();
    }

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
      this.init();
    }
    mounted() {}
  }
</script>
<style lang="scss">
  .safe-content {
    height: calc(100vh - 50px);
    width: 100%;
    overflow-y: auto;

    .safe-raw {
      height: 60px;
    }

    .inner-row {
      .bp-input {
        margin: 0;
      }

      button {
        width: 100%;
        margin: 0;
      }
    }

    .dialog-box {
      .bp-dialog__main {
        padding-top: 0px;
      }
    }

    .dialog-inner {
      width: 500px;
      height: 350px;
      text-align: left;
      justify-content: start;

      .getCodeBtn {
        height: 40px;
        border: solid 1px #8791a6;
        font-weight: normal;
      }

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
        background: #dcdcdc;
      }
    }
  }
</style>
