<!--
/**
* Copyright (c) 2020 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2020-12-23 14:44
* Desc: 管理员权限
*/
 -->

<template>
  <content-view
    :gutter="false"
    class="faas-content ram-user-content"
    :title="$i18n('ram.user.index.用户')"
  >
    <button
      class="bp-btn faas-btn-primary"
      id="guide-ram-btn-1"
      @click="handleAddUser"
    >
      {{ $i18n("ram.user.index.创建用户") }}
    </button>
    <!-- 用户列表 -->
    <ui-card style="padding: 0" class="mt20">
      <div class="user-im">
        <!-- right部分 -->
        <div class="user-im-right flex1">
          <div class="right-user-list">
            <table
              class="faas-table-group warn-list mt20"
              v-if="userlist.length > 0"
            >
              <thead>
                <tr>
                  <th width="5%">
                    <bp-checkbox @change="choseAllUsers"></bp-checkbox>
                  </th>
                  <th width="20%" style="min-width: 300px">
                    {{ $i18n("ram.user.index.成员") }}
                  </th>
                  <th width="40%">{{ $i18n("ram.user.index.备注") }}</th>
                  <th width="20%">{{ $i18n("ram.user.index.加入时间") }}</th>
                  <th width="10%">{{ $i18n("ram.user.index.操作") }}</th>
                </tr>
              </thead>
              <tr :key="index" v-for="(item, index) in userlist">
                <th>
                  <bp-checkbox v-model="item.isChecked"></bp-checkbox>
                </th>
                <th>
                  <div
                    class="userItem-head-box cur_P flex_r_s"
                    @click="linkTo('detail', { id: item.userId })"
                  >
                    <!-- <div class="userItem-head-img">
                      <img :src="avatarImg" alt="" />
                    </div> -->
                    <uiAvatar
                      :id="item.userId"
                      :name="item.username || item.email"
                    ></uiAvatar>
                    <span
                      class="userItem-head-name"
                      style="padding-left: 20px"
                      >{{ item.username }}</span
                    >
                    <!-- <span class="user-tip flex_r_c">子账号</span> -->
                  </div>
                </th>
                <th>
                  <span>{{ item.remark }}</span>
                </th>
                <th>
                  <span>{{ item.createTime | getDateStr(2) }}</span>
                </th>
                <th>
                  <button
                    class="user-warn-color"
                    @click="handleRemoveUser([item.userId])"
                  >
                    {{ $i18n("ram.user.index.删除") }}
                  </button>
                </th>
              </tr>
            </table>
            <ui-no-records style="height: 200px" v-else />
            <uiPagination
              :pageSize.sync="getUserParams.pageSize"
              :total="getUserParams.total * 1"
              @current-change="querList"
              style="padding: 15px 10px"
              v-model="getUserParams.pageNo"
            >
              <button
                class="bp-btn faas-btn-primary"
                :disabled="choseArr.length == 0"
                @click="removeArr"
              >
                {{ $i18n("ram.user.index.批量删除") }}
              </button>
            </uiPagination>
          </div>
        </div>
      </div>
    </ui-card>
    <!-- 创建弹窗 -->
    <!-- 添加账号弹窗 -->
    <ui-dialog
      class="dialog-box"
      v-model="dialogShow"
      :title="$i18n('ram.user.index.创建用户')"
    >
      <div class="dialog-inner flex_c_s">
        <div class="line1" style="margin: 0"></div>
        <ui-row class="inner-item mt20">
          <ui-col :span="24">
            <p class="input_require flex_r_s">
              <span>{{ $i18n("ram.user.index.用户登录名") }}</span>
              <span class="flex1"></span>
              <span style="font-size: 12px; color: #666">
                {{ $i18n("ram.user.index.用户登录名个数必须在3和32之间") }}
              </span>
            </p>
            <p class="mt10"></p>
            <bp-input
              class="inner-input"
              :placeholder="$i18n('ram.user.index.请输入用户登录名')"
              v-model="addUserParams.username"
            ></bp-input>
          </ui-col>
        </ui-row>
        <ui-row class="inner-item mt10">
          <ui-col :span="24">
            <p class="input_require flex_r_s">
              <span>{{ $i18n("ram.user.index.登录密码") }}</span>
              <span class="flex1"></span>
              <span style="font-size: 12px; color: #666">
                { {{ $i18n("ram.user.index.密码长度必须8～32位") }}
              </span>
            </p>
            <p class="mt10"></p>
            <bp-input
              class="inner-input"
              :placeholder="$i18n('ram.user.index.请输入用户登录密码')"
              v-model="addUserParams.password"
              @isValid="test"
              :type="'password'"
              :validator="
                (text, callback) => {
                  if (text.length >= 8) callback(true);
                  else callback(false);
                }
              "
            ></bp-input>
          </ui-col>
        </ui-row>
        <!-- <ui-row class="inner-item mt10">
          <ui-col :span="24">
            <p class="input_require">{{ $i18n("ram.user.index.手机号") }}</p>
            <p class="mt10"></p>
            <bp-input
              class="inner-input"
              :placeholder="$i18n('ram.user.index.请输入用户电话')"
              type="tel"
              v-model="addUserParams.telephone"
            ></bp-input>
          </ui-col>
        </ui-row> -->
        <ui-row class="inner-item mt20">
          <ui-col :span="24">
            <p>{{ $i18n("ram.user.index.备注") }}</p>
            <p class="mt10"></p>
            <bp-input
              class="inner-input"
              :rows="7"
              style="height: auto"
              type="textarea"
              v-model="addUserParams.remark"
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
            {{ $i18n("ram.user.index.取消") }}
          </button>
          <button
            class="bp-btn faas-btn-primary"
            :disabled="isAddDisable"
            @click="handleSure"
          >
            {{ $i18n("ram.user.index.确定") }}
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
import uiDialog from "@/components/ui/uiDialogView.vue";
import api from "@/api";
import uiAvatar from "@/components/ui/uiAvatar.vue";
import * as netStore from "@/api/store/netStore";

@Component({
  components: {
    contentView,
    uiPagination,
    bpInput: bpui.bpInput,
    bpCheckbox: bpui.bpCheckbox,
    uiDialog,
    uiAvatar,
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
  userlist = [];

  getUserParams = {
    username: "",
    telephone: "",
    email: "",
    pageNo: 1,
    pageSize: 20,
    sort: "",
    total: 1,
  };

  addUserParams = {
    username: "",
    telephone: "",
    imageId: "",
    email: "",
    remark: "",
    password: "",
  };

  avatarImg = require("@/assets/defaultAvatar.svg");

  //
  // computed.
  get isAddDisable() {
    if (this.addUserParams.username.length <= 0) {
      return true;
    }
    if (this.addUserParams.password.length <= 0) {
      return true;
    }
    // if (this.addUserParams.telephone.length <= 0) {
    //   return true;
    // }
    return false;
  }

  get choseArr() {
    let arr = [];
    this.userlist.forEach((item) => {
      item.isChecked ? arr.push(item.userId) : "";
    });
    return arr;
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
  test(e) {
    return true;
  }
  choseAllUsers(e) {
    this.userlist.forEach((node) => {
      node.isChecked = e;
    });
  }
  removeArr() {
    this.handleRemoveUser(this.choseArr);
  }

  handleDlogClose() {
    this.dialogShow = false;
  }
  linkTo(str: "detail", query: object) {
    if (str == "detail") this.$navbar.push({ path: "detail", query });
  }

  _getUserList() {
    let params = this.getUserParams;
    api.user.getUserList(params).then((result: any) => {
      result.content.forEach((node) => {
        node.isChecked = false;
      });
      this.userlist = result.content;
      this.getUserParams.total = result.total;
    });
  }
  // 创建用户
  handleAddUser() {
    this.dialogShow = true;
  }
  // 确定创建
  handleSure() {
    let params = $Febs.utils.mergeMap(this.addUserParams);
    if (params.username.length < 3) {
      $UIToast("Error username");
      return;
    }

    params.password = $Febs.crypt.sha1(params.password);

    api.user.postUser(params).then((result: any) => {
      $UIToast({ type: "success", content: $i18n("ram.user.index.创建成功") });
      this.addUserParams = {
        username: "",
        telephone: "",
        imageId: "",
        email: "",
        remark: "",
        password: "",
      };
      this._getUserList();
      // 成功后修改引导状态
      netStore.getNetStore("guideStatus").then((result) => {
        result.addUser = true;
        netStore.postNetStore("guideStatus", result);
      });

      this.$timer.setTimeout(() => {
        this.dialogShow = false;
      }, 500);
    });
  }
  querList(e: number) {
    this.getUserParams.pageNo = e;
    this._getUserList();
  }
  // 移除
  handleRemoveUser(arr) {
    this.$UIConfirm({
      content: $i18n("ram.user.index.是否删除？"),
      title: $i18n("ram.user.index.用户"),
    })
      .then(() => {
        this.$UIConfirmHide();

        api.user.deleteUser(arr).then((result: any) => {
          $UIToast({
            type: "success",
            content: $i18n("ram.user.index.删除成功！"),
          });
          this._getUserList();
        });
      })
      .catch(() => {});
  }

  // 初始化
  created() {
    this._getUserList();
  }
  mounted() {}
}
</script>
<style lang="scss">
@import "@/styles/var/_handle.scss";

.ram-user-content {
  height: calc(100vh - 50px);
  width: 100%;
  overflow-y: auto;

  .user-warn-color {
    @include font_color("font_color_warn");
  }

  .user-im {
    width: 100%;
    min-height: calc(100vh - 182px);
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
    .faas-table-group {
      width: 100%;
      margin: 0;
      box-shadow: none;
      border-right: none;
      border-left: none;
      th {
        text-align: left;
      }
    }
    .userItem-head-img {
      width: 40px;
      height: 40px;
      margin-right: 15px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .userItem-head-name {
      display: inline-block;
      min-width: 70px;
      color: #31aaf5;
      &:hover {
        text-decoration: underline;
      }
    }

    .user-tip {
      background: #31aaf5;
      height: 18px;
      color: #fff;
      font-size: 14px;
      padding: 5px 20px;
      border-radius: 2px;
      margin-left: 15px;
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
    // .inner-item {
    //   p {
    //     padding-left: 3px;
    //     color: rgba(0, 0, 0, 0.45);
    //   }
    // }
    .input_require {
      &:before {
        content: "*";
        color: red;
        display: inline-block;
        padding-right: 3px;
        font-size: 16px;
        position: relative;
        top: 3px;
      }
    }
  }
}
</style>
