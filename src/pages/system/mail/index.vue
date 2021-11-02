<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lanck
* Date: 2020-12-07 14:18
* Desc: 服务配置
*/
 -->

<template>
  <content-view
    :gutter="false"
    class="flex1"
    :title="$i18n('layouts.system.siderbar.邮件模板管理')"
  >
    <div class="flex_r_s" slot="titleRight">
      <ui-button primary @click="handleAdd">
        {{$i18n('新增')}}
      </ui-button>
    </div>

    <uiLayoutComment>
      <span style="white-space: nowrap;"><ui-icon name="ui-warning"/>目前系统内置的tag: </span>
      <span class="f-italic t-underline ml10" style="white-space: nowrap;">
        EMAIL_忘记密码_CN
        <ui-popover trigger="hover">
          <span>
            <p>中文语言状态下用户忘记密码时发送的邮件;</p>
            <p>邮件参数: <code>code</code></p>
          </span>
        </ui-popover>
      </span>
      <span class="f-italic t-underline ml10" style="white-space: nowrap;">
        EMAIL_忘记密码_EN
        <ui-popover trigger="hover">
          <span>
            <p>英文语言状态下用户忘记密码时发送的邮件</p>
            <p>邮件参数: <code>code</code></p>
          </span>
        </ui-popover>
      </span>
      <span class="f-italic t-underline ml10" style="white-space: nowrap;">
        EMAIL_注册账号_CN
        <ui-popover trigger="hover">
          <span>
            <p>中文语言状态下用户注册账号时发送的邮件</p>
            <p>邮件参数: <code>code</code>, <code>username</code>, <code>email</code>, <code>emailEncode</code></p>
          </span>
        </ui-popover>
      </span>
      <span class="f-italic t-underline ml10" style="white-space: nowrap;">
        EMAIL_注册账号_EN
        <ui-popover trigger="hover">
          <span>
            <p>英文语言状态下用户注册账号时发送的邮件</p>
            <p>邮件参数: <code>code</code>, <code>username</code>, <code>email</code>, <code>emailEncode</code></p>
          </span>
        </ui-popover>
      </span>
      <span class="f-italic t-underline ml10" style="white-space: nowrap;">
        EMAIL_拒绝注册申请_CN
        <ui-popover trigger="hover">
          <span>
            <p>中文语言状态下对用户拒绝注册申请时发送的邮件</p>
            <p>邮件参数: <code>username</code>, <code>reason</code></p>
          </span>
        </ui-popover>
      </span>
      <span class="f-italic t-underline ml10" style="white-space: nowrap;">
        EMAIL_拒绝注册申请_EN
        <ui-popover trigger="hover">
          <span>
            <p>英文语言状态下对用户拒绝注册申请时发送的邮件</p>
            <p>邮件参数: <code>username</code>, <code>reason</code></p>
          </span>
        </ui-popover>
      </span>
      <span class="f-italic t-underline ml10" style="white-space: nowrap;">
        EMAIL_注册成功_CN
        <ui-popover trigger="hover">
          <span>
            <p>中文语言状态下管理员审核通过用户注册时发送的邮件</p>
            <p>邮件参数: <code>username</code>, <code>email</code>, <code>password</code></p>
          </span>
        </ui-popover>
      </span>
      <span class="f-italic t-underline ml10" style="white-space: nowrap;">
        EMAIL_注册成功_EN
        <ui-popover trigger="hover">
          <span>
            <p>英文语言状态下管理员审核通过用户注册时发送的邮件</p>
            <p>邮件参数: <code>username</code>, <code>email</code>, <code>password</code></p>
          </span>
        </ui-popover>
      </span>
    </uiLayoutComment>

    <div>
      <ui-table>
        <ui-thead>
          <ui-tr>
            <ui-th width="25%">id</ui-th>
            <ui-th width="20%">Tag
              <ui-icon name="ui-warning" width="16px">
                <ui-popover trigger="hover">
                  <span>系统使用tag标识发送对应的场景通知</span>
                </ui-popover>
              </ui-icon>
            </ui-th>
            <ui-th width="20%">Name</ui-th>
            <ui-th width="30%">Content</ui-th>
            <ui-th width="20%"></ui-th>
          </ui-tr>
        </ui-thead>
        <ui-tbody>
          <template v-if="list_templates.length > 0">
            <ui-tr :key="item.id" v-for="item in list_templates">
              <ui-td class="f12">
                {{ item.id }}
              </ui-td>
              <ui-td class="f12">
                <code v-if="item.type">{{ item.type }}</code>
              </ui-td>
              <ui-td>
                {{ item.subject }}
              </ui-td>
              <ui-td>
                {{ item.template }}
              </ui-td>
              <ui-td>
                <ui-button small @click="handleEdit(item)">修改</ui-button>
                <ui-button small warning plain @click="handleDel(item)">删除</ui-button>
              </ui-td>
            </ui-tr>
          </template>
        </ui-tbody>
      </ui-table>
      <template v-if="list_templates.length > 0">
        <uiPagination
          :pageSize.sync="limit"
          :total="total"
          @current-change="getList"
          style="padding: 15px 10px"
          v-model="page"
        ></uiPagination>
      </template>
      <ui-no-records v-show="list_templates.length == 0" />
    </div>
  </content-view>
</template>

<script lang="ts">
import api from "@/api";

import contentView from "@/components/layout/contentView.vue";
import uiPagination from "@/components/ui/uiPagination.vue";

import { Component, Vue } from "vue-property-decorator";

@Component({
  components: { contentView, uiPagination },
})
export default class extends Vue {
  search = "";
  page = 1;
  limit = 10;
  total = 0;

  list_templates = [];

  constructor() {
    super();
  }

  created() {
    this.getList();
  }

  mounted() {}

  getList() {
    api.notification.mail
      .list(this.search, this.page - 1, this.limit)
      .then((data: any) => {
        console.log(data);
        this.total = data.total;
        this.list_templates = data.list;
      })
      .catch((err: any) => {});
  }

  handleAdd() {
    let url = "./template";
    this.$navbar.push({
      path: url,
    });
  }

  handleEdit(item: any) {
    let url = "./template?id=" + item.id;
    this.$navbar.push({
      path: url,
    });
  }

  handleDel(item: any) {
    $UIConfirm({
      title: "邮件模版管理",
      content: "确认要删除?",
    }).then((e) => {
        api.notification.mail
          .del(item.id)
          .then((data: any) => {
            this.getList();

            $UIToast({
              type: "success",
              content: "删除成功",
            });
          })
          .catch((err: any) => {
            $UIToast({
              type: "error",
              content: "删除失败，请重试",
            });
          });
        this.$UIConfirmHide();
      })
      .catch(() => {});
  }
}
</script>

<style lang="scss" scoped>

@import '~@/pages/system/commonStyle';
</style>>
