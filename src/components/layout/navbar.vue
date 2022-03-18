<!--
/**
* Copyright (c) 2020 Copyright of All Rights Reserved.
* Author: lanck
* Date: 2020-08-11 14:20
* Desc: console -导航栏
*/
 -->

<template>
  <div class="navbar flex_r_c">
    <div @click="emitSiderbarStatus" class="navbar-mune flex_c_c">
      <div
        class="sidebar-toggler flex_c_c"
        :class="[
          {
            'toggler-close': siderStatus,
          },
        ]"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div @click="window.location.href = '/'">
      <img
        alt
        src="../../assets/logo@2x.png"
        style="width: 140px; margin-left: 20px; cursor: pointer"
      />
    </div>
    <!-- <ui-icon name="logoNew" @click="window.location.href = '/console/overview'"
      style="margin-left: 10px; cursor: pointer; color: #fff"></ui-icon> -->
    <!-- <span class="logoText">|</span> -->
    <!-- <span class="logoText">Manager</span> -->
    <div
      @mouseenter="addHoverClass"
      @mouseleave="removeHoverClass"
      class="navbar-menu"
      v-if="false"
    >
      <span
        class="cur_P"
        style="display: inline-block; height: 100%; padding: 0 15px"
        >{{ $i18n("layouts.components.navbar.云产品") }}</span
      >
      <div class="li-inner navbar-menuinner theme_container">
        <span @click="linkTo('/scf/list')" class="cur_P">{{
          $i18n("layouts.components.navbar.云函数")
        }}</span>
      </div>
    </div>
    <!--navbar menu -->
    <ui-icon
      :name="arrowNavName"
      :title="
        $i18n(arrowNavName === 'quzuoce' ? '隐藏菜单' : '显示菜单') +
        ' (Ctrl+Enter)'
      "
      class="arrowNav"
      @click="triggerSideBar"
    ></ui-icon>
    <div class="flex1"></div>

    <!-- <div id="languageDiv">
      <ui-select v-model="language" :datasource="languageList" :clearable="false"></ui-select>
    </div> -->

    <!-- 消息中心 -->
    <messagetips style="margin-left: 24px"></messagetips>
    <span style="padding-left: 10px"></span>

    <ul class="navbar-account flex_r_c">
      <li class="navbar-account-li">
        <ui-icon name="set" color="#222" width="22px"></ui-icon>
        <ui-popover trigger="hover">
          <ui-popover-cell @click.native="linkTo('/userCenter/safe')">
            {{ $i18n("layouts.components.navbar.安全设置") }}
          </ui-popover-cell>
          <ui-popover-cell @click.native="linkTo('/ram/user')">
            {{ $i18n("layouts.components.navbar.用户管理") }}
          </ui-popover-cell>
          <!-- <ui-popover-cell @click.native="linkTo('/cloudProvider/account')">
            {{ $i18n('layouts.components.navbar.云商访问密钥') }}
          </ui-popover-cell> -->
        </ui-popover>
      </li>
    </ul>
    <ul class="navbar-account flex_r_c">
      <li v-show="false" class="navbar-account-li">
        {{ $i18n("layouts.components.navbar.费用") }}
      </li>
      <!-- userinfo -->
      <li class="navbar-account-li">
        <uiAvatar
          v-show="userInfo.username || userInfo.email"
          :name="userInfo.username || userInfo.email"
          :id="userInfo.userId"
          :size="32"
        ></uiAvatar>
        <ui-popover trigger="hover">
          <ui-popover-cell
            @click.native="linkTo('/userCenter/info')"
            v-if="userInfo.username || userInfo.email"
          >
            <div class="user-info-head cur_P flex_r_c">
              <uiAvatar
                class="ueser-info-img flex_c_c"
                :name="userInfo.username || userInfo.email"
                :id="userInfo.userId"
                :size="32"
                style="margin-left: -5px"
              ></uiAvatar>
              <div
                class="flex1 flex_c_c ueser-info-name"
                style="margin-left: 5px"
              >
                <span>{{ userInfo.username || userInfo.email }}</span>
                <!-- <span>{{ $i18n('layouts.components.navbar.(未实名)') }}</span> -->
              </div>
            </div>
          </ui-popover-cell>
          <ui-popover-cell @click.native="postLogout">
            <ui-icon name="loginOut" width="20px" />
            <span style="padding-left: 10px">{{
              $i18n("layouts.components.navbar.退出登录")
            }}</span>
          </ui-popover-cell>
        </ui-popover>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  // Prop,
  Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";
import api from "@/api";
import avatar from "@/components/ui/uiAvatar.vue";
import messagetips from "@/components/messagetips.vue";
import uiAvatar from "@/components/ui/uiAvatar.vue";
import * as netStore from "@/api/store/netStore";

@Component({
  components: {
    messagetips: messagetips,
    avatar,
    uiAvatar,
  },
  name: "topNavbar",
})
export default class extends Vue {
  window = window;
  hoverTimer: any = null;
  siderStatus = false;
  userInfo: any = {};
  arrowNavName: string = "quzuoce";
  avatarImg = require("@/assets/defaultAvatar.svg");
  languageList: any[] = [
    {
      label: "中文",
      value: "zh-cn",
    },
    {
      label: "  EN",
      value: "en",
    },
  ];
  language = "zh-cn";
  guideStatus = {
    account: true,
    store: true,
    expense: true,
    info: true,
    addUser: true,
  };
  //
  // computed.
  // get demo() { return xxxx; }
  get guideObj() {
    const { guideStatus } = this;
    let keyArr = ["account", "store", "info", "addUser"];
    let isOk = true;
    let num = 0;
    keyArr.map((key) => {
      if (!guideStatus[key]) {
        num++;
      }
      isOk = isOk && guideStatus[key];
    });

    let url = this.$route.path;
    if (url.indexOf("/console/") < 0) {
      isOk = true;
    }

    return {
      isShow: !isOk,
      num,
    };
  }
  //
  // watch.

  @Watch("language")
  watch1(val: string, oldVal: string) {
    if (!val) return;
    if ($UILibs.lang !== val) {
      $UILibs.lang = val;
      location.reload();
    }
  }

  // hover事件
  emitSiderbarStatus() {
    // this.$emit("changeSidebarStatus", true);
    // this.siderStatus = !this.siderStatus;
    // 侧边栏响应
    this.$root.$emit("left-menu");
  }
  addHoverClass(e: any) {
    if (this.hoverTimer) {
      this.$timer.clearAll();
    }
    e.target.classList.add("li-hover");
  }
  removeHoverClass(e: any) {
    this.hoverTimer = this.$timer.setTimeout(() => {
      e.target.classList.remove("li-hover");
    }, 200);
  }

  linkTo(url: string, params: any) {
    this.$navbar.push({
      path: url,
      query: params,
    });
  }
  // 获取用户信息
  _getUserInfo() {
    api.user.getUserInfoNow().then((res: any) => {
      this.userInfo = res.user;
    });
  }

  // 退出登录
  postLogout() {
    api.login.postLogout().then((result: any) => {
      // location.reload();
      this.$navbar.replace({
        path: "/login",
      });
    });
  }

  emitShowGuide() {
    this.$emit("emitShowGuide", true);
  }
  triggerSideBar() {
    this.arrowNavName = this.arrowNavName === "quzuoce" ? "quyouce" : "quzuoce";
    this.$root.$emit("trigger-sidebar");
  }
  hideSideBar() {
    this.arrowNavName = "quyouce";
    (this.$root as any).$changeSiderBar(false);
  }

  //
  // lifecycle hook.
  constructor() {
    super();
  }
  created() {
    this._getUserInfo();

    netStore.getNetStore("guideStatus").then((result) => {
      this.guideStatus = result;
    });
  }
  mounted() {
    // 全局 menu change事件监听
    this.$root.$on("changeMenu", (e) => {
      this.siderStatus = e;
    });

    (window as any).$sys_navbar = this;
  }
}
</script>

<style lang="scss">
@import "~@bpui/ui/style/common/flex";
.layout-container {
  @extend .flex_r_c;
  padding-top: 50px !important;
  height: auto;
}

.navbar {
  width: 100%;
  height: 50px;
  // @include background_color("bg_color1");
  background:#fff;
  // background: #222222;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 20px 0 0;
  z-index: 999;
  box-sizing: border-box;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.4);

  .logoText {
    color: #fff;
    font-size: 16px;
    margin-left: 5px;
  }

  #languageDiv {
    width: 80px;

    .bp-select {
      background-color: transparent;
      border: none;
      min-width: 10px;
      .bp-select__label {
        color: #fff;
      }
      .ui-icon {
        color: #fff;
      }
    }
  }

  .arrowNav {
    color: #222;
    margin-left: 15px;
    cursor: pointer;
  }

  // @include border_color("border1");
  .navbar-mune {
    width: 50px;
    height: 49px;
    cursor: pointer;
    // @include background_color("bg_color3");
  }

  .navbar-title {
    padding-left: 10px;
    width: 150px;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 2px;
  }

  .navbar-account {
    height: 100%;
    padding-left: 15px;

    .navbar-account-li {
      // float: left;
      // height: 100%;
      padding: 0 10px;
      // line-height: 60px;
      cursor: pointer;
    }
  }

  .li-hover {
    .li-inner {
      display: inline-block;
    }
  }

  .navbar-menu {
    height: 100%;
    line-height: 50px;
    position: relative;
  }

  .sidebar-toggler {
    cursor: pointer;
    width: 18px;
    height: 18px;

    span {
      display: block;
      width: 18px;
      border-radius: 3px;
      height: 2px;
      background: #222;
      transition: all 0.2s;
      position: relative;
    }

    span:nth-child(1) {
      animation: top8 0.4s ease forwards;
    }

    span:nth-child(2) {
      display: block;
      top: 0;
    }

    span:nth-child(3) {
      animation: bottom8 0.4s ease forwards;
    }
  }

  .toggler-close {
    span:nth-child(1) {
      animation: top 0.4s ease forwards;
    }

    span:nth-child(2) {
      display: none;
    }

    span:nth-child(3) {
      animation: bottom 0.4s ease forwards;
    }
  }

  .help_icon {
    position: relative;

    &:after {
      content: "";
      height: 6px;
      width: 6px;
      background: red;
      border-radius: 50%;
      position: absolute;
      top: 0;
      right: -2px;
    }
  }

  @keyframes top {
    0% {
      top: 8px;
      transform: rotate(0);
    }

    50% {
      top: 1px;
      transform: rotate(0);
    }

    to {
      top: 1px;
      transform: rotate(45deg);
    }
  }

  @keyframes top8 {
    0% {
      top: 1px;
      transform: rotate(45deg);
    }

    50% {
      top: 1px;
    }

    to {
      top: 8px;
      transform: rotate(0deg);
    }
  }

  @keyframes bottom {
    0% {
      top: -8px;
      transform: rotate(0);
    }

    50% {
      top: -1px;
      transform: rotate(0);
    }

    to {
      top: -1px;
      transform: rotate(-45deg);
    }
  }

  @keyframes bottom8 {
    0% {
      top: -1px;
      transform: rotate(-45deg);
    }

    50% {
      top: -1px;
      transform: rotate(0);
    }

    to {
      top: -8px;
      transform: rotate(0);
    }
  }

  // nav 目录
  .navbar-menuinner {
    display: none;
    width: 1280px;
    height: calc(100vh - 50px);
    padding: 15px 30px;
    line-height: normal;
    box-shadow: 0px 2px 40px 0px rgba(16, 27, 79, 0.2);
    position: absolute;
    z-index: 10000;
    top: 50px;
    left: -150px;
    animation: mainDown 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  // 用户信息
  .user-infos {
    display: none;
    width: 200px;
    color: #222;
    line-height: normal;
    box-shadow: 0px 2px 40px 0px rgba(16, 27, 79, 0.2);
    position: absolute;
    z-index: 10000;
    top: 52px;
    right: 0;
    animation: mainDown 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);

    .user-info-ul {
      //@include border_color("color1");
      user-select: none;
      padding: 0;

      li {
        height: 40px;
        line-height: 40px;
        width: 100%;
        padding: 0 10px;

        &:hover {
          background: #efefef;
        }
      }

      font-size: 13px;
    }
  }
}

.el-dropdown-menu.dropDownUl {
  &.w200 {
    width: 200px;

    .user-info-head {
      padding: 10px 0;
      justify-content: space-between;
      display: flex;

      .ueser-info-img {
        height: 40px;
        width: 40px;
        margin-right: 10px;
        flex-shrink: 0;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .ueser-info-name {
        align-items: start;
        line-height: 18px;

        & > span:nth-child(1):hover {
          text-decoration: underline;
          color: #1baaf5;
        }

        & > span:nth-child(2) {
          color: #f5a623;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
