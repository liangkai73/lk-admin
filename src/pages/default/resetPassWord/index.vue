<!--
/**
* Copyright (c) 2021 Copyright of All Rights Reserved.
* Author: lanck lcs
* Date: 2021-03-26 13:50
* Desc: page for resetpassWord
*/
 -->
<style lang='scss' scoped>
  .of-resetpw-container {
    background: #fff;

    .of-resetpw-bg {
      height: 100%;

      img {
        margin-left: 100px;
      }
    }

    .of-resetpw-content {
      height: 100%;

      .resetpw-inner {
        width: 400px;
        height: 550px;
        margin: auto;
        background-color: rgba(255, 255, 255, 0.9);

        &.noPassClass {
          .ui-input {
            border: solid 1px #ff3b30;

            /deep/ .el-input__inner,
            /deep/ .ui-input__inner {
              background-color: rgba(255, 59, 48, 0.2);
            }
          }

          .errTxt {
            color: #ff3b30;
            line-height: 1;
            font-size: 14px;
          }
        }

        .splitLine {
          height: 1px;
          background-color: #e4e4e4;
          // margin-top: 20px;
        }

        .ui-input {
          border-color: transparent;

          &.ui-input__focus {
            border-color: #07f;
          }

          /deep/ .ui-input__suffixIcon {
            line-height: 20px;
            padding-left: 5px;
            position: absolute;
            right: 0;
            bottom: 12px;
          }

          /deep/ .el-input__inner,
          /deep/ .ui-input__inner {
            background-color: #f4f4f4;
            border: 0;
            height: 38px;
            width: 100%;
            box-sizing: border-box;
          }

          height: 40px;
          margin: 0;
          background-color: #f4f4f4;
        }

        .inputTitle {
          font-size: 12px;
          color: #000000;
          line-height: 12px;
          height: 12px;
          margin-bottom: 4px;
          width: 400px;

          &.span2 {
            >span:last-child {
              float: right;
            }
          }
        }
      }

      .resetpw-title {
        font-size: 36px;
      }

      .resetpw-tip {
        color: #999999;
        font-size: 14px;
      }

      .resetpw-icon {
        font-size: 50px;
      }

      .phone_code {
        width: 100%;
        height: 40px;
        color: #fff;
        background-color: #0acd7f;
        text-align: center;
        font-size: 16px;
        line-height: 40px;
        box-sizing: border-box;
        cursor: pointer;
      }

      .next-btn {
        width: 100%;
        height: 40px;
        font-size: 16px;
        margin-top: 20px;
      }

      .back_login {
        &:hover {
          background-color: #eff1f2;
        }

        color: #000;
        width: 400px;
        text-align: center;
        line-height: 40px;
        height: 40px;
        font-weight: bold;
        border: 1px solid #e1e4e8;
      }

      .icon_bg {
        display: inline-block;
        // width: 86px;
        // height: 86px;
        color: #0acd7f;
        font-size: 86px;
      }

      .success_p {
        font-size: 24px;
        letter-spacing: 0px;
        color: #000000;
      }
    }
  }
</style>

<template>
  <div class="of-resetpw-container flex_r_c">
    <!-- <div class="of-resetpw-bg flex1 flex_c_c">
      <img src="./assets/resetpw_bg.png" alt="" />
    </div> -->
    <div class="of-resetpw-content flex1">
      <!-- step1 & step2 -->
      <div class="resetpw-inner flex_c_c" :class="{noPassClass: errorTxt}" v-if="viewType < 3">
        <div class="mt20 flex_r_c">
          <img src="../../../assets/logo@3x.png" style="width: 240px;" />
        </div>
        <p class="resetpw-title mt20">重置密码</p>
        <div v-show="viewType == 1">
          <ui-row class="inner-row mt40">
            <!-- <ui-col :span="24">
              <div class="inputTitle">手机号</div>
            </ui-col> -->
            <ui-col :span="24">
              <ui-input large placeholder="手机号" type="tel" v-model="resetParams.target"></ui-input>
            </ui-col>
          </ui-row>
          <ui-row class="inner-row mt10">
            <!-- <ui-col :span="24">
              <div class="inputTitle">短信验证码</div>
            </ui-col> -->
            <ui-col :span="15">
              <ui-input large placeholder="短信验证码" type="text" v-model="resetParams.checkCode"></ui-input>
            </ui-col>
            <ui-col :offset="1" :span="8">
              <ui-button large info @click="getCode" class="phone_code" style="padding: 0">
                <template v-if="!codeHide">获取验证码</template>
                <template v-else>{{ limitTime }}</template>
              </ui-button>
            </ui-col>
            <ui-col :span="24" v-show="errorTxt">
              <div class="errTxt span2 mt10">
                <span>{{errorTxt}}</span>
                <span></span>
              </div>
            </ui-col>
          </ui-row>
          <ui-row class="inner-row mt20">
            <ui-col :span="24">
              <ui-button large primary ref="btn1" class="next-btn" @click="stepTo('setpw')">
                下一步
              </ui-button>
            </ui-col>
          </ui-row>
          <ui-row class="inner-row mt5">
            <ui-col :span="24">
              <div class="splitLine"></div>
            </ui-col>
          </ui-row>
          <ui-button info class="mt10 next-btn" @click="linkToLogin">返回登录</ui-button>
        </div>
        <template v-if="viewType == 2">
          <ui-row class="inner-row mt40">
            <!-- <ui-col :span="24">
              <div class="inputTitle">新密码</div>
            </ui-col> -->
            <ui-col :span="24">
              <ui-input placeholder="新密码" :type="eyeOpen?'text':'password'"
                :suffixIcon="eyeOpen?'openEye':'closeEye'" @click-icon="eyeOpen=!eyeOpen"
                v-model="resetParams.password"></ui-input>
            </ui-col>
          </ui-row>
          <ui-row class="inner-row mt20">
            <!-- <ui-col :span="24">
              <div class="inputTitle">确认密码</div>
            </ui-col> -->
            <ui-col :span="24">
              <ui-input placeholder="确认密码" :type="eyeOpen?'text':'password'"
                :suffixIcon="eyeOpen?'openEye':'closeEye'" @click-icon="eyeOpen=!eyeOpen"
                v-model="resetParams.password2"></ui-input>
            </ui-col>
            <ui-col :span="24" v-show="errorTxt">
              <div class="errTxt span2 mt10">
                <span>{{errorTxt}}</span>
                <span></span>
              </div>
            </ui-col>
          </ui-row>
          <ui-row class="inner-row mt20">
            <ui-col :span="24">
              <ui-button primary ref="btn1" class="next-btn" @click="stepTo('success')"
                :disabled="
                resetParams.password.length == 0 ||
                resetParams.password2.length == 0">完成</ui-button>
            </ui-col>
          </ui-row>
          <ui-row class="inner-row mt5">
            <ui-col :span="24">
              <div class="splitLine"></div>
            </ui-col>
          </ui-row>
          <ui-button info class="mt20" @click="linkToLogin">返回登录</ui-button>
        </template>
      </div>
      <!-- step3 -->
      <div v-else class="resetpw-inner flex_c_c">
        <p class="mt40"></p>
        <ui-icon class="icon_bg mt40" name="checked"></ui-icon>

        <p class="success_p mt20">重置成功！</p>
        <p class="tip_p mt20">
          <span style="color: #0077ff">{{ limitTime2 }} </span>
          后自动跳转登录页
        </p>
        <p class="mt40"></p>
        <ui-row class="inner-row mt40">
          <ui-col :span="24">
            <ui-button primary ref="btn1" class="next-btn" @click="linkToLogin">
              立即登录
            </ui-button>
          </ui-col>
        </ui-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
  } from "vue-property-decorator";
  import api from "@/api";

  @Component({
    components: {
    },
    name: 'resetPwd'
  })
  export default class extends Vue {
    viewType = 1;
    eyeOpen: boolean = false
    errorTxt: string = ''
    resetParams = {
      target: "",
      checkCode: "",
      password: "",
      password2: "",
      sendType: "",
    };

    codeHide = false;

    limitTime = 30;
    limitTime2 = 3;

    //
    // lifecycle hook.
    constructor() {
      super();
    }
    getCode() {
      api.user.getRequestCode(this.resetParams).then((result: any) => {
        this.codeHide = true;
        this.limitTime = 10;
        this._getTime(this.limitTime);
      });
    }

    mounted() {}

    stepTo(str: string) {
      // this.$timer.clearAll();
      if (str == "checktel") {
        this.viewType = 1;
      } else if (str == "setpw") {
        /* if (this.resetParams.checkCode.length == 0) {
          return
        } */
        api.user
          .postVerifyCode({
            checkCode: this.resetParams.checkCode
          })
          .then((result: any) => {
            if (result.data) {
              this.viewType = 2;
              this.errorTxt = ''
            } else {
              this.errorTxt = "请输入正确的验证码"
            }
          }).catch((err: any) => {
            this.errorTxt = "请输入正确的验证码"
          });
      } else if (str == "success") {
        if (this.resetParams.password != this.resetParams.password2) {
          this.errorTxt = "两次输入的密码不一致。"
          return;
        } else {
          this.errorTxt = ''
          api.user.postResetPwd(this.resetParams).then((result: any) => {
            this.viewType = 3;
            this.limitTime2 = 3;
            this._getTime2(this.limitTime2);
          });
        }
      }
    }
    linkTo(url: string) {
      this.$navbar.push({
        path: url,
      });
    }

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
    // 时间轮询函数2
    _getTime2(num: number) {
      let timer = num * 1000;
      if (num == 1) {
        this.$timer.setTimeout(() => {
          this.limitTime2 = 0;
          this.linkTo("/login");
        }, 1000);
        return;
      } else {
        this.$timer.setTimeout(() => {
          this._getTime2(num - 1);
          this.limitTime2 = num - 1;
        }, 1000);
      }
    }
    // 跳转到登录
    linkToLogin() {
      this.$timer.clearAll();
      this.linkTo("/login");
    }
  }
</script>
