<!--
/**
* Copyright (c) 2020 Copyright Originforest All Rights Reserved.
* Author: lanck
* Date: 2020-08-25 11:27
* Desc: 策略
*/
 -->

<template>
  <content-view
    class="flex1 resource-page"
    :title="$i18n('ram.permission.index.权限策略管理')"
  >
    <ui-note
      >{{ $i18n('ram.permission.index.用户或者用户组与策略关联后，即可获得策略所描述的操作权限。') }}</ui-note
    >
    <div class="flex_r_c">
      <ui-button primary
        @click="linkTo('/ram/permission/create2')"
      >
{{ $i18n('ram.permission.index.新建自定义策略') }}
      </ui-button>
      <span class="flex1"></span>
      <ui-input
        class="bp-input-search"
        @click-icon="searchResource"
        :placeholder="$i18n('ram.permission.index.支持搜索策略名称')"
        suffix-icon="search"
        v-model="filterStr"
      ></ui-input>
    </div>
    <ui-card class="mt10">
      <table class="faas-table-group">
        <thead>
          <tr>
            <th width="25%">
              <bpCheckbox @change="handlechoseAll">{{ $i18n('ram.permission.index.权限策略名称') }}</bpCheckbox>
            </th>
            <th width="25%">{{ $i18n('ram.permission.index.备注') }}</th>
            <th width="25%">{{ $i18n('ram.permission.index.权限策略类型') }}</th>
            <th width="25%">
              <span>{{ $i18n('ram.permission.index.操作') }}</span>
            </th>
          </tr>
        </thead>
        <tr
          :key="index"
          v-for="(item, index) in resourceList"
          v-show="filterResource(item)"
        >
          <th>
            <bpCheckbox
              @change="showchange(item)"
              v-model="item.checked"
            ></bpCheckbox>
            <button>
              {{ item.code }}
            </button>
          </th>
          <th>
            <span>{{ item.description }}</span>
          </th>
          <th>
            <span>{{ item.type == 1 ? $i18n('ram.permission.index.系统') : $i18n('ram.permission.index.自定义') }}</span>
          </th>
          <!-- <th>
              <button @click="handleDialogOpen">关联用户/组</button>
            </th> -->
          <th>
            <button @click="handleRemoveList(item)">{{ $i18n('ram.permission.index.删除') }}</button>
          </th>
        </tr>
      </table>
      <uiPagination
        :pageSize.sync="getPolicyParams.pageSize"
        :total="getPolicyParams.total * 1"
        @current-change="querList"
        style="padding: 15px 10px"
        v-model="getPolicyParams.pageNum"
      ></uiPagination>
    </ui-card>
  </content-view>
</template>

<script lang="ts">
import contentView from "@/components/layout/contentView.vue";
import api from "@/api";
import bpui from "bpui.js";
import {
  Component,
  Vue,
  // Prop,
  // Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";

import uiPagination from "@/components/ui/uiPagination.vue";

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
  resourceList = [];
  filterStr = "";
  showDialog = false;

  dialogData = {
    listType: "user", // group
  };

  userList: any = [];
  groupList: any = [];
  getPolicyParams = {
    code: "",
    title: "",
    pageNum: 1,
    pageSize: 20,
    total: 1,
  };

  get relTactic() {
    let arr = this.userList.filter((item: any) => {
      return item.checked;
    });
    console.log(arr);
    return arr;
  }

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

  mounted() {
    this.init();
  }
  searchResource() {
    console.log("serch");
  }
  init() {
    this.getPolicyList();
  }
  getPolicyList() {
    api.policy.getPolicyList(this.getPolicyParams).then((res: any) => {
      this.resourceList = res.content;
      this.resourceList.forEach((node) => {
        this.$set(node, "checked", false);
        this.getPolicyParams.pageNum = res.pageNo * 1;
        this.getPolicyParams.total = res.pageTotal * 1;
      });
    });
  }
  // 过滤list
  filterResource(obj: any) {
    if (obj.code.indexOf(this.filterStr) >= 0) {
      return true;
    }
    return false;
  }
  // 全选列表
  handlechoseAll(e: boolean) {
    this.resourceList.forEach((node: any) => {
      node.checked = e;
    });
  }
  // 删除策略
  handleRemoveList(item: any) {
    this.$UIConfirm({
      content: $i18n('ram.permission.index.是否删除？'),
      title: $i18n('ram.permission.index.自定义策略')
    })
      .then(() => {
        this.$UIConfirmHide();
        
        let temArr = [item.code];
        api.policy.deletePolicy(temArr).then((result: any) => {
          $UIToast({ type: "success", content: $i18n('ram.permission.index.删除成功！') });
          this.getPolicyList();
        });
      })
      .catch(() => {});
  }

  showchange(obj: any) {
    console.log(obj);
  }

  linkTo(url: string, query: any) {
    this.$navbar.push({
      path: url,
      query: query,
    });
  }
  // 分页请求
  querList(e: number) {
    this.getPolicyParams.pageNum = e;
    this.getPolicyList();
  }
  // dialog 打开
  // handleDialogOpen() {
  //   this.getUserlist(this.dialogData.listType);
  //   this.showDialog = true;
  // }
  // 取消已选择的策略
  // cabcelChose(tid: any) {
  //   this.userList.forEach((item: any) => {
  //     if (item.tid == tid) {
  //       item.checked = false;
  //     }
  //   });
  // }
  // 获取用户列表
  // getUserlist(str: string): any {
  //   if (str == "user") {
  //     return api.user.getRamUser().then((result: any) => {
  //       result.list.forEach((item: any) => {
  //         this.$set(item, "checked", false);
  //       });
  //       this.userList = result.list;
  //       return Promise.resolve("");
  //     });
  //   } else {
  //     return api.group.getRamGroup().then((result: any) => {
  //       result.forEach((item: any) => {
  //         this.$set(item, "checked", false);
  //       });
  //       this.groupList = result;
  //       return Promise.resolve("");
  //     });
  //   }
  // }
  // dialog 全选用户
  // choseAllUser(e: boolean) {
  //   console.log(e);
  //   this.userList.forEach((node: any) => {
  //     node.checked = e;
  //   });
  // }
  // // dialog 切换用户组
  // changeListType(str: string) {
  //   this.getUserlist(str).then((r: any) => {
  //     this.dialogData.listType = str;
  //   });
  // }
}
</script>

<style lang="scss" scoped>
.resource-page {
  .resource-uers {
    width: 900px;
    height: 450px;
  }
  .role-tactic-p {
    width: 100%;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    display: inline-block;
    span {
      display: inline-block;
      width: 50%;
      text-align: left;
      padding-left: 20px;
      &:last-child {
        padding-left: 0px;
      }
    }
  }
  .role-tactic-group {
    list-style: none;
    border: 1px solid #ccc;
    height: 320px;
    overflow-y: auto;
    border-top: none;
    .role-tactic-li {
      height: 45px;
      padding: 0 5px;
      border-bottom: 1px solid #ccc;
      &:hover {
        background: #f1f1f1;
      }
    }
    .tactic-li-left {
      display: flex;
      align-items: center;
      height: 100%;
      width: 50%;
    }
    .tactic-li-right {
      display: flex;
      align-items: center;
      height: 100%;
      width: 50%;
    }
    .role-tactic-label {
      width: 100%;
      height: 100%;
    }
    .tactic-item-content {
      height: 100%;
      align-items: start;
      padding-left: 15px;
    }
    .tactic-item-right {
      width: 120px;
      height: 100%;
      align-items: start;
    }
  }
}
</style>
