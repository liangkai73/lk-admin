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
    title="站内信模版"
  >
    <div class="flex_r_s" slot="titleRight">
      <div class="flex1"></div>
      <ui-button primary @click="handleAdd">
        新增
      </ui-button>
    </div>
    <div>
      <ui-table>
        <ui-thead>
          <ui-tr>
            <ui-th width="30%">id</ui-th>
            <ui-th>Tag
                <ui-icon name="ui-warning" width="16px">
                  <ui-popover trigger="hover">
                    <span>系统使用tag标识发送对应的场景通知</span>
                  </ui-popover>
                </ui-icon>
            </ui-th>
            <ui-th width="30%">标题</ui-th>
            <ui-th width="40%">模版</ui-th>
            <ui-th width="30%">操作</ui-th>
          </ui-tr>
        </ui-thead>
        <ui-tbody>
          <template v-if="list_templates.length > 0">
            <ui-tr :key="item.id" v-for="item in list_templates">
              <ui-td class="f12">
                <span>{{ item.id }}</span>
              </ui-td>
              <ui-td>
                <code>{{ item.type }}</code>
              </ui-td>
              <ui-td>
                <span>{{ item.subject }}</span>
              </ui-td>
              <ui-td>
                <span>{{ item.template }}</span>
              </ui-td>
              <ui-td>
                <ui-button small @click.stop="handleEdit(item)">修改</ui-button>
                <ui-button small warning plain @click.stop="handleDel(item)">删除</ui-button>
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
    api.notification.message_tmp
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
      content: "确认要删除?", 
      title: "邮件模版管理"
    })
      .then((e) => {
        api.notification.message_tmp
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
