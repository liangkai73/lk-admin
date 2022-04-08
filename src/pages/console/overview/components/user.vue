<!--
/**
* Copyright (c) 2021 Copyright of All Rights Reserved.
* Author: lanck
* Date: 2021-07-15 13:48
* Desc: 用户
*/
 -->
 <style lang="scss" scoped>
.enpenses-item {
  padding: 15px;
  height: 100%;
  .enpenses-item-title {
    font-size: 14px;
    font-weight: 600;
  }
}
.balance-item {
  .balance-body {
    // height: 185px;
    width: 100%;
  }
  .balance-footer {
    overflow-y: auto;
    height: 90px;
    width: 100%;
    .acct-item {
      height: 40px;
      line-height: 40ox;
      border-bottom: 1px solid #d8d8d8;
    }
  }
  .cline1 {
    width: 1px;
    height: 100%;
    background: #d8d8d8;
  }
  .font666 {
    font-size: 12px;
    color: #666;
  }
  .font21 {
    font-size: 21px;
    color: #000;
    display: inline-block;
    font-weight: bold;
  }
  .font30 {
    font-size: 30px;
    color: #000;
    display: inline-block;
    font-weight: bold;
  }
  .user-item {
    width: 40px;
    height: 40px;
    // margin-right: 15px;
    border-radius: 50%;
    background: #ccc;
    font-size: 16px;
    color: #fff;
  }
}
</style>

<template>
  <ui-card class="enpenses-item balance-item flex_c_s">
    <p class="enpenses-item-title">
      {{ $i18n("console.overview.components.user.用户") }}
    </p>
    <div class="balance-body mt30 flex_r_s flex1">
      <div class="flex_c_c flex1" style="padding: 10px">
        <p>
          <span class="font30 cur_P_b" @click="linkTo('group')">{{
            groupList.length || 4
          }}</span>
        </p>
        <span class="font666 mt15">{{
          $i18n("console.overview.components.user.用户组")
        }}</span>
      </div>
      <span class="cline1"></span>
      <div class="flex_c_c flex1" style="padding: 10px">
        <p>
          <span class="font30 cur_P_b" @click="linkTo('user')">{{
            userObj.total || 18
          }}</span>
        </p>
        <span class="font666 mt15">{{
          $i18n("console.overview.components.user.用户")
        }}</span>
      </div>
    </div>
    <div class="balance-footer flex_r mt20">
      <template v-for="(item, index) in userlist">
        <uiAvatar
          :key="'k1' + index"
          :id="item.userId"
          class="cur_P"
          :name="item.username || item.email"
          @click.native="linkTo('detail', { id: item.userId })"
        ></uiAvatar>
        <span class="flex1" :key="'k2' + index"></span>
      </template>
      <div
        class="user-item flex_r_c cur_P"
        style="padding-bottom: 10px"
        @click="linkTo('user')"
      >
        ...
      </div>
    </div>
  </ui-card>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  // Prop,
  // Watch,
  Provide,
  Inject,
  // Emit,
} from "vue-property-decorator";
import api from "@/api";
import uiIcon from "@/components/ui/uiCloudIcon.vue";
import uiAvatar from "@/components/ui/uiAvatar.vue";

@Component({
  components: {
    uiIcon,
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

  @Inject("ProvideObj") readonly ProvideObj!: any;

  //
  // data.
  // @Provide() demo:number = 1;
  accList = [];
  accDetail = {};
  userColor = "#3d76fc";
  groupList = [];
  //
  userlist = [];
  userObj = {};
  //
  // watch.
  // @Watch('child')
  // onChildChanged(val: string, oldVal: string) { }

  //
  // lifecycle hook.
  constructor() {
    super();
  }

  // 获取用户组
  _getGroupList() {
    let params = {
      roleName: "",
      roleCode: "",
      pageNo: "1",
      pageSize: "999",
      pageTotal: "1",
    };
    return api.user.getUserGroupList(params).then((result: any) => {
      this.groupList = result.content;
      return result;
    });
  }

  _getUserList() {
    let params = {
      username: "",
      telephone: "",
      email: "",
      pageNo: 1,
      pageSize: 4,
      sort: "createTime:desc",
      total: 1,
    };
    api.user.getUserList(params).then((result: any) => {
      this.userObj = result;
      this.userlist = result.content;
    });
  }
  filerUserName(str) {
    return str.slice(0, 1);
  }
  linkTo(url: any, query = {}) {
    if (url == "user") {
      this.$navbar.push({
        path: "/ram/user",
      });
    } else if (url == "group") {
      this.$navbar.push({
        path: "/ram/userGroup",
      });
    } else if (url == "detail") {
      this.$navbar.push({
        path: "/ram/user/detail",
        query: query,
      });
    }
  }
  init() {
    // this.getAccountDetail();
    this._getGroupList();
    this._getUserList();
  }
  created() {
    this.init();
  }

  mounted() {}
}
</script>
