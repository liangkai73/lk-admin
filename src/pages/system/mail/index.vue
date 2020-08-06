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
        新增
      </ui-button>
    </div>

    <div>
      <ui-table>
        <ui-thead>
          <ui-tr>
            <ui-th width="30%">
              <span>id</span>
            </ui-th>
            <ui-th width="30%">
              <span>模板名称</span>
            </ui-th>
            <ui-th width="40%">
              <span>模版</span>
            </ui-th>
            <ui-th width="30%">
              <span>操作</span>
            </ui-th>
          </ui-tr>
        </ui-thead>
        <ui-tbody>
          <template v-if="list_templates.length > 0">
            <ui-tr :key="item.id" v-for="item in list_templates" class="cur_P">
              <ui-td>
                {{ item.id }}
              </ui-td>
              <ui-td @click="handleEdit(item)" style=" cursor: pointer;">
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

</style>>
