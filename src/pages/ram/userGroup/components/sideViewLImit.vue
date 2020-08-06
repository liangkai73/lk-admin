<!--
/**
* Copyright (c) 2021 Copyright Originforest All Rights Reserved.
* Author: lanck
* Date: 2021-04-02 16:14
* Desc: 展开侧边栏 - 权限管理
*/
 -->
 <style lang='scss'>

 @import '~@bpui/ui/var';


.inner-limit-list {
  width: 100%;
  height: calc(100% - 50px);
  // border: solid 1px rgba(0, 0, 0, 0.1);
  @include ui-theme-border-bottom("border");
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
      height: 64px;
      // border-bottom: solid 1px rgba(0, 0, 0, 0.1);
      @include ui-theme-border-bottom("border");

      transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
      padding: 0 20px;

      .bp-checkbox__label {
        display: inline-block;
        height: 100%;
      }
      .left-li-inner {
        font-size: 14px;
        margin-left: 15px;
        padding: 10px 0;
        box-sizing: border-box;
        height: 64px;
        justify-content: space-between;
      }
      label {
        width: 100%;
        height: 100%;
        line-height: 64px;
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
      height: 64px;
      padding: 0 15px;
      // border-bottom: solid 1px rgba(0, 0, 0, 0.1);
      @include ui-theme-border-bottom("border");
      transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
      background: #fff;
      color: #606266;
      .right-li-inner {
        margin-left: 15px;
        padding: 10px 0;
        box-sizing: border-box;
        height: 64px;
      }
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
    :title="$i18n('ram.userGroup.components.sideViewLImit.添加权限')"
    :closeOnClickModal="true"
    :width="850"
    ref="permissionView"
  >
    <div class="inner-limit-list">
      <ui-row style="width: 100%; height: 100%">
        <!-- left -->
        <ui-col class="user-list-left" :span="12">
          <ui-input
            class="bp-input-search left-input-search"
            suffix-icon="search"
          ></ui-input>
          <ul class="list-left-ul">
            <li
              class="list-left-li flex1"
              v-for="(item, index) in permisssionList"
              :key="index"
            >
              <label class="flex_r_s">
                <ui-checkbox v-model="item.checked">
                  <div class="left-li-inner flex_c_s">
                    <span style="color: #000">{{ item.code }}</span>
                    <!-- <span class="flex1"></span> -->
                    <span>{{ item.description }}</span>
                  </div>
                </ui-checkbox>
              </label>
            </li>
          </ul>
        </ui-col>
        <!-- right -->
        <ui-col class="user-list-right" :span="12">
          <div class="right-top-tool flex_r_s">
            <span>{{ $i18n('ram.userGroup.components.sideViewLImit.已选：') }}</span>
            <span>{{ choseList.length }}</span>
            <span>{{ $i18n('ram.userGroup.components.sideViewLImit.条') }}</span>
            <span class="flex1"></span>
            <span class="cur_P" @click="removeChose('all')">{{ $i18n('ram.userGroup.components.sideViewLImit.清空') }}</span>
          </div>
          <ul class="list-right-ul">
            <li
              class="list-right-li flex_r_s"
              v-for="(node, index) in choseList"
              :key="index"
            >
              <div class="right-li-inner flex_c_s">
                <span style="color: #000">{{ node.code }}</span>
                <span class="flex1"></span>
                <span style="color: #606266">{{ node.description }}</span>
              </div>
              <span class="flex1"></span>
              <ui-icon
                class="cur_P"
                name="close3"
                style="font-size: 14px"
                @click="removeChose(node.code)"
              ></ui-icon>
            </li>
          </ul>
        </ui-col>
      </ui-row>
      <div class="view-footer">
        <ui-button @click="cancelView">{{ $i18n('ram.userGroup.components.sideViewLImit.取消') }}</ui-button>
        <ui-button primary @click="addPermission">
{{ $i18n('ram.userGroup.components.sideViewLImit.确定') }}
        </ui-button>
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
  @Prop({ type: Array })  checkedList!: Array<any>;

  @Watch('value')
  onValueChange(v) {
    if (v) {
      this.permisssionList.forEach((node) => {
        let i = 0;
        for (i = 0; i < this.checkedList.length; i++) {
          if (this.checkedList[i].policyId == node.policyId) {
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
  permisssionList = [];

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
    this.permisssionList.forEach((node: any) => {
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
  // 获取权限列表

  getPermission() {
    api.policy.getPolicyList({}).then((result: any) => {
      this.permisssionList = result.content;
      this.permisssionList.forEach((node) => {
        this.$set(node, "checked", false);
      });
    });
  }
  removeChose(id: any) {
    if (id != "all") {
      this.permisssionList.forEach((node: any) => {
        if (node.code == id) {
          node.checked = false;
        }
      });
    } else {
      this.permisssionList.forEach((node: any) => {
        node.checked = false;
      });
    }
  }
  // 新增策略
  addPermission() {
    let arr: any[] = [];
    this.choseList.forEach((node: any) => {
      arr.push(node.code);
    });
    api.user.postGroup_permissions(this.roleId, arr).then((result: any) => {
      this.$emit("updatePermission", result);
      $UIToast({ type: "success", content: $i18n('ram.userGroup.components.sideViewLImit.添加成功') });
      this.cancelView();
    });
  }
  // 关闭
  cancelView() {
    (this.$refs.permissionView as any).close();
  }
  // lifecycle hook.
  constructor() {
    super();
  }
  created() {
    this.getPermission();
  }

  mounted() {}
}
</script>
