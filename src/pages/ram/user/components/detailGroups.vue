<!--
/**
* Copyright (c) 2021 Copyright Originforest All Rights Reserved.
* Author: lanck
* Date: 2021-06-08 15:50
* Desc: 用户详情 -加入的组
*/
 -->
 <style lang='scss' scoped>
.detail-groups {
  margin-top: 10px;
  padding-top: 15px;
  .user-im {
    width: 100%;
    height: 450px;
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
      border-right: none;
      border-left: none;
      box-shadow: none;
      th {
        text-align: left;
      }
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
}
</style>

<template>
  <div class="detail-groups">
    <p style="padding-left: 24px">
      <ui-button primary @click="handleAddGroup">
{{ $i18n('ram.user.components.detailGroups.添加到用户组') }}
      </ui-button>
    </p>

    <div style="padding: 0" class="mt20">
      <div class="user-im flex_r_s">
        <!-- AccessKey list -->
        <div class="user-im-right flex1">
          <div class="right-user-list">
            <ui-table class="faas-table-group warn-list mt20">
              <ui-thead>
                <ui-tr>
                  <ui-th width="5%"></ui-th>
                  <ui-th width="25%">{{ $i18n('ram.user.components.detailGroups.用户组名称') }}</ui-th>
                  <ui-th width="25%">{{ $i18n('ram.user.components.detailGroups.描述') }}</ui-th>
                  <ui-th width="25%">{{ $i18n('ram.user.components.detailGroups.更新时间') }}</ui-th>
                  <ui-th width="25%">{{ $i18n('ram.user.components.detailGroups.创建时间') }}</ui-th>
                  <!-- <th width="10%">操作</th> -->
                </ui-tr>
              </ui-thead>
              <ui-tbody>
                <ui-tr :key="index" v-for="(item, index) in groupList">
                  <ui-td>
                    <ui-checkbox v-model="item.isChecked"></ui-checkbox>
                  </ui-td>
                  <ui-td>
                    <span>{{ item.roleName }}</span>
                  </ui-td>
                  <ui-td>
                    <span>{{ item.description }}</span>
                  </ui-td>
                  <ui-td>
                    <span>{{ item.updateTime | getDateStr(2) }}</span>
                  </ui-td>
                  <ui-td>
                    <span>{{ item.createTime | getDateStr(2) }}</span>
                  </ui-td>
                  <!-- <th style="min-width: 132px">
                    <button>禁用</button>
                    <button>删除</button>
                  </th> -->
                </ui-tr>
              </ui-tbody>
            </ui-table>
          </div>
        </div>
      </div>
      <uiPagination
        :pageSize.sync="groupsParams.pageSize"
        :total="groupsParams.pageTotal"
        @current-change="querList"
        style="padding: 15px 10px"
        v-model="groupsParams.pageNum"
      >
        <!-- <div class="pagination-btns">
          <button class="bp-btn faas-btn-black">禁用</button>
          <button class="bp-btn faas-btn-black">启用</button>
          <button class="bp-btn faas-btn-black">删除</button>
        </div> -->
      </uiPagination>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  // Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";

import bpui from "bpui.js";
import uiPagination from "@/components/ui/uiPagination.vue";
import api from "@/api";

@Component({
  components: {
    bpCheckbox: bpui.bpCheckbox,
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
  groupsParams: any = {
    roleName: "",
    roleCode: "",
    pageNo: 1,
    pageSize: 10,
    pageTotal: 20,
  };

  groupList = [];
  activeRoleId = [];

  querList(e) {
    this.groupsParams.pageNo = e;
    this._getGroupList();
  }

  //
  // Prop
  @Prop({}) userId: any;

  //
  // data.
  // @Provide() demo:number = 1;

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

  // 获取所有的用户组
  _getGroupList() {
    let params = this.groupsParams;
    return api.user.getUserGroupList(params).then((result: any) => {
      result.content.forEach((element) => {
        element.isChecked = false;
      });
      this.groupList = result.content;
      this.groupsParams.pageNo = result.pageNo * 1;
      this.groupsParams.pageTotal = result.total * 1;
      return result;
    });
  }
  // 获取用户的角色列表

  _getUsersRole() {
    api.user
      .getUserRoles(this.userId)
      .then((result) => {
        let arr = result;
        this.groupList.forEach((item) => {
          arr.forEach((node) => {
            if (node.roleId == item.roleId) {
              item.isChecked = true;
            }
          });
        });
      })
      .catch((err) => {});
  }
  // 添加角色中的用户
  addUserToGroup() {
    let arr = [];
    this.groupList.forEach((node) => {
      if (node.isChecked) {
        arr.push(node.roleCode);
      }
    });
    if (arr.length <= 0) {
      $UIToast({ type: "notification", content: $i18n('ram.user.components.detailGroups.未选择用户组') });
      return;
    }
    api.user
      .postUserRoles(this.userId, arr)
      .then((result) => {
        $UIToast({ type: "success", content: $i18n('ram.user.components.detailGroups.添加成功！') });
      })
      .catch((err) => {});
  }
  handleAddGroup() {
    this.addUserToGroup();
  }

  init() {
    this._getGroupList().then((result) => {
      this._getUsersRole();
    });
  }
  created() {
    this.init();
  }

  mounted() {}
}
</script>
