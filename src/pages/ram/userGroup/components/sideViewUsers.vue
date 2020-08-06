<!--
/**
* Copyright (c) 2021 Copyright Originforest All Rights Reserved.
* Author: lanck
* Date: 2021-04-02 16:14
* Desc: 展开侧边栏 - 添加用户
*/
 -->
 <style lang='scss'>

 @import '~@bpui/ui/var';

.inner-user-list {
  width: 100%;
  height: calc(100% - 50px);
  border: solid 1px rgba(0, 0, 0, 0.1);
  .user-list-left {
    height: 100%;
    // border-right: solid 1px rgba(0, 0, 0, 0.1);
    @include ui-theme-border-right("border");
    .left-input-search {
      height: 32px;
      margin: 15px 15px 0 15px;
    }
    .list-left-ul {
      padding: 20px 0;
      height: calc(100vh - 160px);
      overflow-y: auto;
    }
    .list-left-li {
      height: 40px;
      padding: 0 10px;
      // border-bottom: solid 1px rgba(0, 0, 0, 0.1);
      @include ui-theme-border-bottom("border");
      transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
      label {
        .bp-checkbox .bp-checkbox__input .bp-checkbox__inner {
          border-color: #c4cdd5;
        }
        width: 100%;
        height: 100%;
        line-height: 40px;
        cursor: pointer;
      }
      &:hover {
        background: #f1f1f1;
        @include ui-theme-border-bottom("border");
      }
    }
  }
  .user-list-right {
    height: 100%;
    .right-top-tool {
      margin: 15px 15px 0 15px;
      height: 32px;
    }
    .list-right-ul {
      padding: 20px 0;
      height: calc(100vh - 160px);
      overflow-y: auto;
    }
    .list-right-li {
      height: 40px;
      padding: 0 15px;
      // border-bottom: solid 1px rgba(0, 0, 0, 0.1);
      @include ui-theme-border-bottom("border");
      transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
      background: #fff;
      color: #606266;
      &:hover {
        background: #f1f1f1;
        @include ui-theme-border-bottom("border");
      }
    }
  }
  .view-footer {
    padding-left: 10px;
    margin-top: 5px;
    button {
      width: 120px;
    }
  }
}
</style>

<template>
  <uiSiderView
    v-model="relVale"
    :title="$i18n('ram.userGroup.components.sideViewUsers.添加用户')"
    :closeOnClickModal="true"
    :width="850"
    ref="userView"
  >
    <div class="inner-user-list">
      <ui-row style="width: 100%; height: 100%">
        <!-- left -->
        <ui-col class="user-list-left" :span="12">
          <ui-input
            class="bp-input-search left-input-search"
            v-model="filterStr"
            suffix-icon="search"
          ></ui-input>
          <ul class="list-left-ul">
            <li
              class="list-left-li"
              v-for="(item, index) in userList"
              v-show="filterResource(item)"
              :key="index"
            >
              <label class="flex_r_s">
                <ui-checkbox v-model="item.checked">
                  <p>{{ item.username }}</p>
                </ui-checkbox>
              </label>
            </li>
          </ul>
        </ui-col>
        <!-- right -->
        <ui-col class="user-list-right" :span="12">
          <div class="right-top-tool flex_r_s">
            <span>{{ $i18n('ram.userGroup.components.sideViewUsers.已选：') }}</span>
            <span>{{ choseList.length }}</span>
            <span>{{ $i18n('ram.userGroup.components.sideViewUsers.名用户') }}</span>
            <span class="flex1"></span>
            <span class="cur_P" @click="removeChose('all')">{{ $i18n('ram.userGroup.components.sideViewUsers.清空') }}</span>
          </div>
          <ul class="list-right-ul">
            <li
              class="list-right-li flex_r_s"
              v-for="(node, index) in choseList"
              :key="index"
            >
              <p>{{ node.username }}</p>
              <span class="flex1"></span>
              <ui-icon
                class="cur_P"
                name="close3"
                style="font-size: 14px"
                @click="removeChose(node.userId)"
              ></ui-icon>
            </li>
          </ul>
        </ui-col>
      </ui-row>
      <div class="view-footer">
        <ui-button @click="cancelView">{{ $i18n('ram.userGroup.components.sideViewUsers.取消') }}</ui-button>
        <ui-button primary @click="addUsers">{{ $i18n('ram.userGroup.components.sideViewUsers.确定') }}</ui-button>
      </div>
    </div>
  </uiSiderView>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Watch,
  // Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";

import uiSiderView from "@/components/ui/uiSiderView.vue";
import bpui from "bpui.js";
import api from "@/api";

@Component({
  components: {
    uiSiderView,
    bpInput: bpui.bpInput,
    bpCheckbox: bpui.bpCheckbox,
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
  @Prop({ type: Boolean }) value!: boolean;
  @Prop({ type: String }) roleId!: string;
  @Prop({ type: Array }) checkedList!: Array<any>;

  @Watch('value')
  onValueChange(v) {
    if (v) {
      this.userList.forEach((node) => {
        let i = 0;
        for (i = 0; i < this.checkedList.length; i++) {
          if (this.checkedList[i].userId == node.userId) {
            break;
          }
        }

        this.$set(node, "checked", i < this.checkedList.length);
      });
    }
  }

  //
  // data.
  // @Provide() demo:number = 1;
  showSiderView = true;
  userList = [];

  filterStr = "";
  //
  // computed.
  get relVale() {
    return this.value;
  }
  set relVale(val) {
    this.$emit("input", val);
    // this.$emit("handleChangeView", val);
  }
  get choseList() {
    let arr: any = [];
    this.userList.forEach((node: any) => {
      if (node.checked) {
        arr.push(node);
      }
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

  // 过滤group
  filterResource(obj: any) {
    if (obj.username.indexOf(this.filterStr) >= 0) {
      return true;
    }
    return false;
  }
  getRoleList() {
    let params = {
      pageSize: "999",
    };
    api.user.getUserList(params).then((result: any) => {
      this.userList = result.content;
      this.userList.forEach((node) => {
        this.$set(node, "checked", false);
      });
    });
  }
  removeChose(id: any) {
    if (id != "all") {
      this.userList.forEach((node: any) => {
        if (node.userId == id) {
          node.checked = false;
        }
      });
    } else {
      this.userList.forEach((node: any) => {
        node.checked = false;
      });
    }
  }
  addUsers() {
    let arr: any[] = [];
    this.choseList.forEach((node: any) => {
      arr.push(node.userId);
    });
    api.user.postGroup_users(this.roleId, arr).then((result: any) => {
      this.$emit("updateGroupUsers", result);
      $UIToast({ type: "success", content: $i18n('ram.userGroup.components.sideViewUsers.添加成功') });
      (this.$refs.userView as any).close();
    });
  }
  cancelView() {
    (this.$refs.userView as any).close();
  }
  created() {
    this.getRoleList();
  }
  mounted() {}
}
</script>
