<!--
/**
* Copyright (c) 2020 Copyright of All Rights Reserved.
* Author: lanck
* Date: 2020-09-16 17:20
* Desc: login
*/
 -->

<template>
  <div class="faas-login flex_r_s">
    <div class="faas-login-content flex1 flex_c_c">
      <!-- login -->

      <div class="login-inner flex_c_c" :class="{ noPassClass }" v-if="viewType == '1'">
        <div class="login-inner-head flex1">
          <div class="mt20 flex_r_c">
            <img src="../../../assets/logo@3x.png" style="width: 240px" /><span class="pl5 pr5">|</span><span>Manager</span>
          </div>

          <ui-row class="inner-row" style="margin-top: 60px">
            <!-- <ui-col :span="24">
              <div class="inputTitle">手机号/邮箱/用户名</div>
            </ui-col> -->
            <ui-col :span="24">
              <ui-input large placeholder="手机号/邮箱/用户名" v-model="loginParams.username"></ui-input>
            </ui-col>
          </ui-row>
          <ui-row class="inner-row mt5">
            <ui-col :span="24">
              <ui-input large placeholder="密码" :type="eyeOpen ? 'text' : 'password'"
                :suffixIcon="eyeOpen ? 'openEye' : 'closeEye'" @click-icon="eyeOpen = !eyeOpen"
                v-model="loginParams.password" @keyup.enter="handleLogin('pre')"></ui-input>
            </ui-col>
            <ui-col :span="24" v-show="noPassClass">
              <div class="errTxt span2 mt10">
                <span>{{ errorTxt }}</span>
                <span></span>
              </div>
            </ui-col>
            <ui-col :span="24">
              <div class="inputTitle span2 mt20">
                <span class="pswd_forget cur_P" @click="linkTo('/resetPassWord')">忘记密码？</span>
              </div>
            </ui-col>
          </ui-row>
          <ui-row class="inner-row mt20">
            <ui-col :span="24">
              <ui-button primary ref="btn1" @click="handleLogin('pre')" class="login-btn">
                登录
              </ui-button>
            </ui-col>
          </ui-row>
          <ui-row class="inner-row mt5">
            <ui-col :span="24">
              <div class="splitLine"></div>
            </ui-col>
          </ui-row>
          <ui-row class="inner-row mt10">
            <ui-col :span="24">
              <ui-button info @click="stepTo('childLogin')" class="login-btn">
                IAM子账号登录
              </ui-button>
            </ui-col>
          </ui-row>
        </div>
        <div class="login-inner-footer flex_r_c"></div>
      </div>
      <!-- child login -->
      <div class="login-inner flex_c_c" v-if="viewType == '3'">
        <div class="login-inner-head flex1">
          <div class="mt20 flex_r_c">
            <img src="../../../assets/logo@3x.png" style="width: 240px" />
          </div>
          <!-- <p class="mt10 flex_r_c login-title">IAM子账号登录</p> -->
          <ui-row class="inner-row" style="margin-top: 40px">
            <!-- <ui-col :span="24">
              <div class="inputTitle">主账号用户名或ID</div>
            </ui-col> -->
            <ui-col :span="24">
              <ui-input large placeholder="主账号用户名或ID" v-model="loginChildParams.preUsername"></ui-input>
            </ui-col>
          </ui-row>
          <ui-row class="inner-row mt5">
            <!-- <ui-col :span="24">
              <div class="inputTitle mt20">子账号用户名</div>
            </ui-col> -->
            <ui-col :span="24">
              <ui-input large placeholder="子账号用户名" v-model="loginChildParams.username"></ui-input>
            </ui-col>
          </ui-row>
          <ui-row class="inner-row mt5">
            <!-- <ui-col :span="24">
              <div class="inputTitle span2 mt20">
                <span>子账号密码</span>
                <span class="pswd_forget cur_P" @click="linkTo('/resetPassWord')">忘记密码？</span>
              </div>
            </ui-col> -->
            <ui-col :span="24">
              <ui-input large placeholder="子账号密码" :type="eyeOpen ? 'text' : 'password'"
                :suffixIcon="eyeOpen ? 'openEye' : 'closeEye'" @click-icon="eyeOpen = !eyeOpen"
                v-model="loginChildParams.password"></ui-input>
            </ui-col>
            <ui-col :span="24" v-show="noPassClass">
              <div class="errTxt span2 mt10">
                <span>{{ errorTxt }}</span>
                <span></span>
              </div>
            </ui-col>
          </ui-row>
          <ui-row>
            <div class="pswd_forget cur_P" @click="linkTo('/resetPassWord')">
              忘记密码？
            </div>
          </ui-row>

          <ui-row class="inner-row mt20">
            <ui-col :span="24">
              <ui-button primary @click="handleLogin('child')" class="login-btn"
                ref="btn2">
                IAM子账号登录
              </ui-button>
            </ui-col>
          </ui-row>
          <ui-row class="inner-row mt5">
            <ui-col :span="24">
              <div class="splitLine"></div>
            </ui-col>
          </ui-row>
          <ui-row class="inner-row mt10">
            <ui-col :span="24">
              <ui-button info @click="stepTo('login')" class="login-btn">
                主账号登录
              </ui-button>
            </ui-col>
          </ui-row>
        </div>
        <div class="login-inner-footer flex_r_c"></div>
      </div>
      <!-- registration -->
      <div class="login-inner flex_c_c" v-if="viewType == '2'">
        <div class="login-inner-head flex1">
          <h2 class="flex_r_c login-title">注册</h2>
          <ui-row class="inner-row mt30">
            <ui-col :span="24">
              <ui-input large placeholder="用户名" v-model="registerParams.username"></ui-input>
            </ui-col>
          </ui-row>
          <ui-row class="inner-row mt10">
            <ui-col :span="24">
              <ui-input large placeholder="手机号" type="tel" v-model="registerParams.telephone"></ui-input>
            </ui-col>
          </ui-row>
          <ui-row class="inner-row mt10">
            <ui-col :span="15">
              <ui-input large placeholder="请输入短信验证码" type="text" v-model="registerParams.checkCode">
              </ui-input>
            </ui-col>
            <ui-col :offset="1" :span="8">
              <ui-button info :disabled="codeHide" @click="getCode" class="phone_code"
                style="padding: 0">
                <template v-if="!codeHide">获取验证码</template>
                <template v-else>{{ limitTime }}</template>
              </ui-button>
            </ui-col>
          </ui-row>

          <ui-row class="inner-row mt10">
            <ui-col :span="24">
              <ui-input large max="32" min="8" placeholder="请输入密码" type="password"
                v-model="registerParams.password"></ui-input>
            </ui-col>
          </ui-row>
          <ui-row class="inner-row mt10">
            <ui-col :span="24">
              <ui-input large max="32" min="8" @blur="checkPassWord" type="password"
                placeholder="请再次输入密码"></ui-input>
            </ui-col>
          </ui-row>
          <ui-row class="inner-row mt5">
            <ui-col :span="24" style="font-size: 14px; color: #606266">
              <ui-checkbox v-model="btnDisabled">
                <span style="font-size: 14px"> 已阅读并同意本公司的 </span>
              </ui-checkbox>
              <span class="faas-link-title" @click="
                  () => {
                    showTos = true;
                  }
                ">服务条款</span>
              <span>及</span>
              <span class="faas-link-title" @click="
                  () => {
                    showPrivacy = true;
                  }
                ">隐私政策</span>
            </ui-col>
          </ui-row>
          <ui-row class="inner-row mt5">
            <ui-col :span="24">
              <ui-button primary :disabled="!btnDisabled" @click="handleRegister"
                class="login-btn" style="width: 100%; height: 48px">
                注册
              </ui-button>
            </ui-col>
          </ui-row>
        </div>
        <!-- <div class="line1 mt5"></div> -->
        <div class="login-inner-footer flex_r_c">
          <span>已有账号？</span>
          <span @click="stepTo('login')" class="faas-link-title">马上登录</span>
        </div>
      </div>
      <!-- registration success -->
      <div class="login-inner flex_c_c" v-if="viewType == '4'">
        <!-- <div class="line1 mt5"></div> -->

        <ui-icon class="icon_bg" name="checked"></ui-icon>

        <p class="success_p mt20">注册成功！</p>
        <p class="tip_p mt20">
          <span style="color: #0077ff">{{ limitTime2 }} </span>
          后自动跳转登录页
        </p>
        <p class="mt40"></p>
        <ui-button primary class="login-btn" style="width: 320px; height: 48px"
          @click="stepTo('login')">
          立即登录
        </ui-button>
      </div>
    </div>
    <!-- 服务条款 弹窗 -->
    <tos v-model="showTos"></tos>
    <!-- 服务条款 弹窗 -->
    <privacy v-model="showPrivacy"></privacy>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
  } from "vue-property-decorator";
  import api from "@/api";
  import tos from "../components/ToS.vue";
  import privacy from "../components/privacy.vue";
  import userInfo_store from "@/api/store/userInfo";

  @Component({
    components: {
      tos,
      privacy,
    },
    name: "loginPage",
  })
  export default class extends Vue {
    //
    // data.
    // @Provide() demo:number = 1;
    eyeOpen: boolean = false;
    errorTxt: string = "";
    viewType = 1;

    btnDisabled = false;
    codeHide = false;
    limitTime = 30;
    limitTime2 = 3;

    loginParams: any = {
      username: "",
      password: "",
      checkCode: "test",
    };
    loginChildParams: any = {
      preUsername: "",
      username: "",
      password: "",
      checkCode: "test",
    };

    registerParams: any = {
      username: "",
      telephone: "",
      email: "",
      password: "",
      checkCode: "",
    };
    checkRegister: any = {
      password: {
        val: false,
        msg: "两次密码不一致"
      },
    };

    showTos = false;
    showPrivacy = false;
    noPassClass = false;

    //
    // computed.
    get noPass() {
      let {
        username,
        password
      } = this.loginParams;
      return !(username.length && password.length);
    }

    //
    // lifecycle hook.
    constructor() {
      super();
    }

    mounted() {
    }

    stepTo(str: string) {
      this.$timer.clearAll();
      if (str == "register") {
        this.viewType = 2;
      } else if (str == "login") {
        this.viewType = 1;
      } else if (str == "childLogin") {
        this.viewType = 3;
      } else if (str == "success") {
        this.viewType = 4;
        this.limitTime2 = 3;
        this._getTime2(this.limitTime2);
      }
    }
    linkTo(url: string) {
      if (url == "/resetPassWord") {
        this.$navbar.push({
          path: url,
        });
      } else {
        this.$navbar.push({
          path: url,
        });
      }
    }
    // 校验密码
    checkPassWord(e: any) {
      let password = e.target.value;
      this.checkRegister["password"].val =
        password == this.registerParams.password;
      this.checkRegister["password"].val ||
        $UIToast({
          type: "error",
          content: this.checkRegister["password"].msg,
        });
    }
    // 获取手机验证
    getCode() {
      this.registerParams.checkCode = "test";
      this.codeHide = true;
      this.limitTime = 10;
      this._getTime(this.limitTime);
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
          this.stepTo("login");
        }, 1000);
        return;
      } else {
        this.$timer.setTimeout(() => {
          this._getTime2(num - 1);
          this.limitTime2 = num - 1;
        }, 1000);
      }
    }
    
    // 验证注册策略
    checkParams(key ? : string) {
      if (key) {
        this.checkRegister[key].val ?
          "" :
          $UIToast({
            type: "error",
            content: this.checkRegister[key].msg
          });
        return this.checkRegister[key].val;
      } else {
        let checkRegister: any = this.checkRegister;
        for (let ckey in checkRegister) {
          if (!checkRegister[ckey].val) {
            $UIToast({
              type: "error",
              content: checkRegister[ckey].msg
            });
            return checkRegister[ckey].val;
          }
          return true;
        }
      }
    }

    // login
    handleLogin(type: string) {
      let params: any;
      // 判断登录模式
      if (type == "pre") {
        if (this.noPass) {
          this.noPassClass = true;
          this.errorTxt = "用户名或密码不能为空";
          return;
        } else {
          this.noPassClass = false;
        }
        // todo
        params = Object.assign({}, this.loginParams);
      } else if (type == "child") {
        params = {};
        params.username =
          this.loginChildParams.username +
          "@" +
          this.loginChildParams.preUsername;
        let {
          password,
          username
        } = params;
        if (!(username.length && password.length)) {
          this.noPassClass = true;
          this.errorTxt = "用户名或密码不能为空";
          return;
        } else {
          this.noPassClass = false;
        }
      }

      params.password = $Febs.crypt.sha1(params.password);
      // Login result
      api.login
        .postLogin(params)
        .then((res: any) => {
          // 存储用户信息
          api.user.getUserInfoNow().then((res) => {
            userInfo_store._setUserInfo(res);
          });
          this.$timer.setTimeout(() => {
            this.$navbar.push({
              path: "/console/overview",
            });
          }, 500);
        })
        .catch((err: any) => {
          this.noPassClass = true;
          this.errorTxt = "用户名或密码错误";
        });
    }

    // 注册
    handleRegister() {
      this.stepTo("regise");
      if (!this.checkParams()) return;
      // this.registerParams.username = this.registerParams.telephone;
      api.login.register(this.registerParams).then((result: any) => {
        $UIToast({
          type: "success",
          content: "注册成功！"
        });
        this.$timer.setTimeout(() => {
          this.stepTo("success");
        }, 500);
      });
    }
  }
</script>
<style lang="scss" scoped>

  .faas-login {
    width: 100%;
    height: 100%;

    // .faas-login-head {
    //   width: 100%;
    //   height: 60px;
    //   @include background_color('bg_color2');
    // }
    .faas-login-bg {
      width: 35%;
      min-width: 300px;
      height: 100%;
      min-height: 100vh;
      // background: url("./assets/login_bg.png") 100% 100% no-repeat;
    }

    .faas-login-content {
      // @include background_color("bg_color2");
      background-color: #fff;
      min-height: 100vh;
    }

    .login-inner {
      width: 400px;
      height: 540px;

      .bp-input {
        border-color: #f4f4f4;
        background-color: #f4f4f4;
        &.bp-input__focus {
          border-color: #07f;
        }
        /deep/ .bp-input__inner {
          background-color: #f4f4f4;
        }
      }

      &.noPassClass {
        .bp-input {
          border: solid 1px #ff3b30;
          background-color: rgb(250, 212, 211);

          /deep/ .el-input__inner,
          /deep/ .bp-input__inner {
            background-color: rgb(250, 212, 211);
          }
        }
      }

      .splitLine {
        height: 1px;
        background-color: #e4e4e4;
        // margin-top: 20px;
      }

      .errTxt {
        color: #ff3b30;
        line-height: 1;
        font-size: 14px;
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

      .login-inner-head {
        width: 100%;

        .login-title {
          font-size: 36px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
        }

        .pswd_forget {
          color: #0077ff;
          text-decoration: underline;
          text-align: right;
          cursor: pointer;
          font-size: 14px;
        }

        .login-btn {
          width: 100%;
          height: 40px;
          line-height: 40px;
          padding: 0px;
          font-size: 14px;
        }

        .phone_code {
          width: 100%;
          height: 40px;
          color: #000;
          border: solid 1px rgb(220, 223, 230);
          text-align: center;
          line-height: 40px;
          margin: 2px 0;
          box-sizing: border-box;
          cursor: pointer;
        }
      }

      .login-inner-footer {
        width: 100%;
        height: 80px;
      }

      .line1 {
        margin: 0;
      }

      .inner-col-left {
        text-align: left;
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

      .tip_p {
        font-size: 14px;
        letter-spacing: 0px;
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }
</style>
