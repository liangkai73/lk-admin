<!--
/**
* Copyright (c) 2020 Copyright Originforest All Rights Reserved.
* Author: lanck
* Date: 2020-12-23 14:44
* Desc: 管理员权限
*/
 -->

<template>
  <content-view
    :gutter="false"
    class="user-group-content"
    :title="$i18n('ram.userGroup.index.用户组')"
  >
    <ui-card style="padding: 0">
      <div class="user-group-im flex_r_s">
        <!-- left部分 -->
        <div class="user-group-im-left">
          <ui-input
            class="bp-input-search im-left-input"
            suffix-icon="search"
            v-model="filterStr"
          ></ui-input>
          <div class="flex_r_s left-top">
            <ui-button primary @click="handleAddGroup">
{{ $i18n('ram.userGroup.index.新建用户组') }}
            </ui-button>
            <span
              @click="changeListModle('readonly')"
              class="cur_P"
              v-show="listMenueModle == 'edit'"
              >{{ $i18n('ram.userGroup.index.完成') }}</span
            >
          </div>
          <ul class="left-group mt10">
            <li
              :key="item.roleId"
              class="flex_r_s user-group-im-left-item"
              :class="[
                {
                  activ_li: activeNum == item.roleId,
                },
              ]"
              v-for="item in groupList"
              v-show="filterResource(item)"
              @click="choseGroup(item)"
            >
              <span>{{ item.roleName }}</span>
              <span class="flex1"></span>
            </li>
          </ul>
        </div>
        <!-- right部分 -->
        <div class="user-group-im-right flex1">
          <div class="right_top">
            <div class="flex_r_s">
              <h3 class="im-gruopName font18">{{ groupInfo.roleName }}</h3>
              <span class="flex1"></span>
              <!-- <ui-dropdown trigger="click">
                <ui-icon name="more" class="cur_P font24"></ui-icon>
                <ui-dropdown-menu slot="dropdown">
                  <ui-dropdown-item @click.native="handlePutGroup(groupInfo)"
                    >编辑基本信息</ui-dropdown-item
                  >
                  <ui-dropdown-item @click.native="deleteGroup(groupInfo)"
                    >删除</ui-dropdown-item
                  >
                </ui-dropdown-menu>
              </ui-dropdown> -->
              <ui-button
                @click="handlePutGroup(groupInfo)"
              >
{{ $i18n('ram.userGroup.index.编辑') }}
              </ui-button>
              <ui-button warning plain
                @click="deleteGroup(groupInfo)"
              >
{{ $i18n('ram.userGroup.index.删除') }}
              </ui-button>
            </div>

            <ui-row style="color: rgba(0, 0, 0, 0.45)" class="mt20">
              <ui-col :span="12">{{ $i18n('ram.userGroup.index.备注') }}</ui-col>
              <ui-col :span="12">{{ $i18n('ram.userGroup.index.创建时间') }}</ui-col>
            </ui-row>
            <ui-row class="mt5">
              <ui-col :span="12"> {{ groupInfo.description || "-" }} </ui-col>
              <ui-col :span="12">
                {{ groupInfo.createTime | getDateStr }}</ui-col
              >
            </ui-row>
          </div>
          <!-- tabs -->
          <uiTabs
            :data="tabsData"
            v-model="tabsValue"
            @handleClick="changeView"
            :type="'card'"
          ></uiTabs>
          <!-- tabs - page1 -->

          <div v-if="tabsValue == '1'" class="right-buttom-list">
            <ui-button primary
              class="mt20"
              style="margin: 20px 0 20px 20px"
              @click="handleAddUser"
            >
{{ $i18n('ram.userGroup.index.添加用户') }}
            </ui-button>
            <!-- table list -->
            <div class="right-user-list">
              <ui-table>
                <ui-thead>
                  <ui-tr>
                    <ui-th width="5%" align="left">
                      <!-- <ui-checkbox></ui-checkbox> -->
                    </ui-th>
                    <ui-th width="20%" align="left" style="min-width: 300px">{{ $i18n('ram.userGroup.index.成员') }}</ui-th>
                    <ui-th width="40%" align="left">{{ $i18n('ram.userGroup.index.备注') }}</ui-th>
                    <ui-th width="20%" align="left">{{ $i18n('ram.userGroup.index.加入时间') }}</ui-th>
                    <ui-th width="10%" align="left">{{ $i18n('ram.userGroup.index.操作') }}</ui-th>
                  </ui-tr>
                </ui-thead>
                <ui-tbody>
                  <ui-tr :key="index" v-for="(item, index) in groupUsers">
                    <ui-td>
                      <!-- <ui-checkbox v-model="item.checked"></ui-checkbox> -->
                    </ui-td>
                    <ui-td>
                      <div class="userItem-head-box flex_r_s">
                        <div class="userItem-head-img"></div>
                        <span>{{ item.username }}</span>
                      </div>
                    </ui-td>
                    <ui-td>
                      <span>{{ item.remark }}</span>
                    </ui-td>
                    <ui-td>
                      <span>{{ item.createTime | getDateStr }}</span>
                    </ui-td>
                    <ui-td>
                      <ui-button warning plain
                        @click="removeUser(item.userId)"
                      >
  {{ $i18n('ram.userGroup.index.删除') }}
                      </ui-button>
                    </ui-td>
                  </ui-tr>
                </ui-tbody>
              </ui-table>
            </div>
          </div>

          <!-- tabs - page2-->
          <div v-show="tabsValue == '2'">
            <ui-button primary
              style="margin: 20px 0 20px 20px"
              @click="handleAddLimit"
            >
{{ $i18n('ram.userGroup.index.添加权限') }}
            </ui-button>
            <!-- table list -->
            <div class="right-user-list">
              <ui-table>
                <ui-thead>
                  <ui-tr>
                    <ui-th width="5%" align="left">
                      <!-- <ui-checkbox></ui-checkbox> -->
                    </ui-th>
                    <ui-th width="20%" align="left" style="min-width: 300px">{{ $i18n('ram.userGroup.index.权限名称') }}</ui-th>
                    <ui-th width="40%" align="left">{{ $i18n('ram.userGroup.index.备注') }}</ui-th>
                    <ui-th width="20%" align="left">{{ $i18n('ram.userGroup.index.授权时间') }}</ui-th>
                    <ui-th width="10%" align="left">{{ $i18n('ram.userGroup.index.操作') }}</ui-th>
                  </ui-tr>
                </ui-thead>
                <ui-tbody>
                  <ui-tr :key="index" v-for="(item, index) in permissionList">
                    <ui-td>
                      <!-- <ui-checkbox></ui-checkbox> -->
                    </ui-td>
                    <ui-td>
                      <span>{{ item.code }}</span>
                    </ui-td>
                    <ui-td>
                      <span>{{ item.description }}</span>
                    </ui-td>
                    <ui-td>
                      <span>{{ item.createTime | getDateStr }}</span>
                    </ui-td>
                    <ui-td>
                      <ui-button warning plain
                        @click="removePermission(item.policyId)"
                      >
  {{ $i18n('ram.userGroup.index.删除') }}
                      </ui-button>
                    </ui-td>
                  </ui-tr>
                </ui-tbody>
              </ui-table>
            </div>
          </div>
        </div>
      </div>
    </ui-card>
    <!-- dialog 创建用户组 -->
    <ui-dialog
      class="dialog-box"
      :visible.sync="triggerObj.addGroup"
      :title="groupDialogType == 'post' ? $i18n('ram.userGroup.index.创建用户组') : $i18n('ram.userGroup.index.修改用户组')"
    >
      <div class="dialog-inner flex_c_s">
        <div class="line1" style="margin: 0"></div>
        <ui-row class="inner-item mt10" style="margin-top: 80px">
          <ui-col :span="24">
            <p>{{ $i18n('ram.userGroup.index.用户组名称') }}</p>
            <ui-input
              class="mt10 inner-input"
              :placeholder="$i18n('ram.userGroup.index.请输入用户组名称')"
              v-model="addGroupParams.roleName"
            ></ui-input>
          </ui-col>
        </ui-row>
        <ui-row class="inner-item mt20">
          <ui-col :span="24">
            <p>{{ $i18n('ram.userGroup.index.备注') }}</p>
            <ui-input
              class="mt10 inner-input"
              rows="5"
              type="textarea"
              v-model="addGroupParams.description"
            ></ui-input>
          </ui-col>
        </ui-row>
        <span class="flex1"></span>

        <div class="inner-footer flex_r_s">
          <span class="flex1"></span>
          <ui-button
            style="margin-right: 10px"
            @click="handleDlogClose('addGroup')"
          >
{{ $i18n('ram.userGroup.index.取消') }}
          </ui-button>
          <ui-button primary
            v-if="groupDialogType == 'post'"
            @click="handleSureAdd"
          >
{{ $i18n('ram.userGroup.index.确定') }}
          </ui-button>
          <ui-button primary v-else @click="handleSurePut">
{{ $i18n('ram.userGroup.index.确定') }}
          </ui-button>
        </div>
      </div>
    </ui-dialog>
    <!-- 添加人员侧边弹窗 -->
    <siderViewUser
      v-model="triggerObj.addUser"
      :roleId="activeNum"
      :checkedList="groupUsers"
      @updateGroupUsers="updateGroupUsers"
    ></siderViewUser>
    <!-- 添加权限侧边弹窗 -->
    <siderViewLimit
      v-model="triggerObj.addLimit"
      :roleId="activeNum"
      :checkedList="permissionList"
      @updatePermission="updatePermission"
    ></siderViewLimit>
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
import uiPagination from "@/components/ui/uiPagination.vue";
import uiTabs from "@/components/ui/uiTabs.vue";
import api from "@/api";
// 业务组件
import siderViewUser from "./components/sideViewUsers.vue";
import siderViewLimit from "./components/sideViewLImit.vue";

@Component({
  components: {
    contentView,
    uiPagination,
    uiTabs,
    siderViewUser,
    siderViewLimit,
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
  tabsValue = 1;
  tabsData = [
    { title: $i18n('ram.userGroup.index.组成员管理'), value: 1 },
    { title: $i18n('ram.userGroup.index.权限管理'), value: 2 },
  ];

  listMenueModle = "readonly";

  triggerObj: any = {
    addGroup: false, // dialog
    addUser: false, // siderView
    addLimit: false, // siderView
  };

  groupDialogType: "post" | "put" = "post"; // dialog状态
  activeNum = "0";
  groupsParams: any = {
    roleName: "",
    roleCode: "",
    pageNo: "1",
    pageSize: "999",
    pageTotal: "1",
  };
  addGroupParams: any = {
    roleName: "",
    roleCode: "",
    description: "",
  };
  groupList = [];
  filterStr = ""; // 组名过滤字段

  groupInfo = {};

  groupUsers = []; // 组员列表

  permissionList = []; // 权限列表
  //
  // Prop
  // @Prop({ type: number }) demo: number;

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
  changeView(e: any) {
    if (e.value == 1) {
      this._getGroup_Users(this.activeNum);
    }
    if (e.value == 2) {
      this._getGroup_permission(this.activeNum);
    }
  }
  // 修改左侧列表模式 edit / readonly
  changeListModle(str: string) {
    this.listMenueModle = str;
  }
  handleChoseCp() {
    // this.changeDialog(true);
  }
  handleDlogClose(key: any) {
    this.changeDialog(key, false);
  }
  // 确认新增
  handleSureAdd() {
    api.user.addUserGroup(this.addGroupParams).then((result: any) => {
      $UIToast({ type: "success", content: $i18n('ram.userGroup.index.创建成功！') });
      this.changeDialog("addGroup", false);
      this._getGroupList();
    });
  }
  // 确认修改
  handleSurePut() {
    api.user
      .putGroupInfo(this.addGroupParams.roleId, this.addGroupParams)
      .then((result: any) => {
        $UIToast({ type: "success", content: $i18n('ram.userGroup.index.修改成功') });
        this.changeDialog("addGroup", false);
        this._getGroupList().then((result: any) => {
          this.activeNum = this.addGroupParams.roleId;
          this._getGroupInfo(this.activeNum);
          this._getGroup_Users(this.activeNum);
        });
      });
  }
  changeDialog(key: string, bl: boolean) {
    this.triggerObj[key] = bl;
  }
  // 过滤group
  filterResource(obj: any) {
    if (obj.roleName.indexOf(this.filterStr) >= 0) {
      return true;
    }
    return false;
  }
  // 选择分组
  choseGroup(item: any) {
    this.activeNum = item.roleId;
    this._getGroupInfo(item.roleId);
    this._getGroup_Users(item.roleId);
  }
  // 创建新的分组
  handleAddGroup() {
    this.changeDialog("addGroup", true);
    this.addGroupParams = {
      roleName: "",
      roleCode: "",
      description: "",
    };
    this.groupDialogType = "post";
  }
  // 修改用户组信息
  handlePutGroup(item: any) {
    this.changeDialog("addGroup", true);
    this.addGroupParams = Object.assign(this.addGroupParams, item);
    this.groupDialogType = "put";
  }
  //  添加用户
  handleAddUser() {
    this.changeDialog("addUser", true);
  }
  //  添加权限
  handleAddLimit() {
    this.changeDialog("addLimit", true);
  }
  // 获取角色列表
  _getGroupList() {
    let params = this.groupsParams;
    return api.user.getUserGroupList(params).then((result: any) => {
      this.groupList = result.content;
      return result;
    });
  }
  // 获取分组详情
  _getGroupInfo(id: any) {
    api.user.getGroupInfo(id).then((result: any) => {
      this.groupInfo = result;
    });
  }
  // 删除分组
  deleteGroup(item: any) {
    this.$UIConfirm({
      content: $i18n('ram.userGroup.index.是否删除用户组？'),
      title: $i18n('ram.userGroup.index.警告'),
    })
      .then(() => {
        this.$UIConfirmHide();

        let temArr = [item.roleId];
        api.user.removeUserGroup(temArr).then((result: any) => {
          $UIToast({ type: "success", content: $i18n('ram.userGroup.index.删除成功！') });
          this._getGroupList().then((result: any) => {
            this.activeNum = (this.groupList[0] as any).roleId;
            this._getGroupInfo(this.activeNum);
            this._getGroup_Users(this.activeNum);
          });
        });
      })
      .catch(() => {});
  }
  // 删除群成员
  removeUser(id: any) {
    this.$UIConfirm({
      content: $i18n('ram.userGroup.index.是否删除？'),
      title: $i18n('ram.userGroup.index.子用户'),
    })
      .then(() => {
        this.$UIConfirmHide();

        let params = {
          userIds: [id],
        };
        api.user
          .removeGroup_users(this.activeNum, params)
          .then((result: any) => {
            $UIToast({ type: "success", content: $i18n('ram.userGroup.index.删除成功！') });
            this._getGroup_Users(this.activeNum);
          });
      })
      .catch(() => {});
  }
  // 删除权限
  removePermission(id: any) {
    this.$UIConfirm({
      content: $i18n('ram.userGroup.index.是否删除？'),
      title: $i18n('ram.userGroup.index.权限'),
    })
      .then(() => {
        this.$UIConfirmHide();

        let params = {
          policyCodes: [id],
        };
        api.user
          .removeGroup_permissions(this.activeNum, params)
          .then((result: any) => {
            $UIToast({ type: "success", content: $i18n('ram.userGroup.index.删除成功！') });
            this._getGroup_permission(this.activeNum);
          });
      })
      .catch(() => {});
  }
  // 获取组成员
  _getGroup_Users(id: any) {
    api.user.getGroup_users(id).then((result: any) => {
      this.groupUsers = result;
      this.groupUsers.forEach((node) => {
        this.$set(node, "checked", false);
      });
    });
  }
  // 更新状态 uerslist
  updateGroupUsers(res) {
    this._getGroup_Users(this.activeNum);
  }
  // 更新策略状态
  updatePermission() {
    this._getGroup_permission(this.activeNum);
  }
  // 获取用户组权限列表
  _getGroup_permission(id: any) {
    api.user.getGroup_permissions(id).then((result: any) => {
      this.permissionList = result;
    });
  }

  init() {
    this._getGroupList().then((result: any) => {
      this.activeNum = (this.groupList[0] as any).roleId;
      this._getGroupInfo(this.activeNum);
      this._getGroup_Users(this.activeNum);
    });
  }
  created() {
    this.init();
  }
  mounted() {}
}
</script>
<style lang="scss">

@import '~@bpui/ui/var';

.user-group-content {
  height: calc(100vh - 50px);
  width: 100%;
  overflow-y: auto;

  .user-group-warn-color {
    @include ui-theme-font-color("warn");
  }

  .user-group-im {
    width: 100%;
    height: 750px;
  }
  .user-group-im-left {
    width: 240px;
    height: 100%;
    background: #fff;
    // border-right: 1px solid #e3e3e3;
    @include ui-theme-border-right("border");
    padding-top: 15px;

    .user-group-im-left-item {
      @include ui-theme-border-bottom("border");
      &:hover {
        @include ui-theme-border-bottom("border");
      }
      &.activ_li {
        @include ui-theme-border-bottom("border");
      }
    }

    .im-left-input {
      margin: 15px 15px 0 15px;
    }
    .left-top {
      margin: 15px 15px 0 15px;
    }
    .left-group {
      width: 100%;
      list-style: none;
      li {
        padding: 0 15px;
        height: 40px;
        line-height: 40px;
        transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
        // cursor: pointer;
        &:hover {
          background: #f1f1f1;
          cursor: pointer;
        }
      }
      .activ_li {
        background: #f5f5f5;
      }
    }
  }
  .user-group-im-right {
    height: 100%;
    overflow: hidden;
    .right_top {
      width: 100%;
      padding: 20px;
      button {
        height: 32px;
      }
    }
    .right-user-list {
      height: 510px;
      overflow-y: auto;
      // border-top: 1px solid #e5e6ec;
    }
    .faas-table-group {
      width: 100%;
      margin: 0;
      th {
        text-align: left;
      }
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
    .inner-item {
      p {
        padding-left: 3px;
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }
}
</style>
