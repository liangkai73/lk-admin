<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lanck
* Date: 2020-12-07 14:18
* Desc: 服务配置
*/
 -->

<template>
  <content-view :gutter="false" :title="$i18n('layouts.tenant.租户列表')">
    <div>
      <div class="tools-raw flex_r_s">
        <span style="padding-right: 10px; font-size: 14px">过滤条件:</span>
        <ui-select-el
          class="bp-select"
          v-model="listParams.limit"
          placeholder="选择条件"
        >
          <ui-option
            v-for="item in limitOptuions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </ui-option>
        </ui-select-el>
      </div>
      <ui-table class="mt10">
        <ui-thead>
          <ui-tr>
            <ui-th width="250px">id</ui-th>
            <ui-th width="200px">所属公司</ui-th>
            <ui-th width="140px">账号名</ui-th>
            <ui-th width="140px">地区/国家 </ui-th>
            <ui-th width="140px">最后登录时间</ui-th>
            <ui-th>登录IP</ui-th>
            <ui-th width="60px"></ui-th>
          </ui-tr>
        </ui-thead>
        <template v-if="list_templates.length > 0">
          <ui-tr :key="item.userId" v-for="item in list_templates">
            <ui-td class="f12">
              {{ item.userId }}
            </ui-td>
            <ui-td style="white-space: break-spaces">
              {{ item.companyName }}
            </ui-td>
            <ui-td>
              {{ item.userName }}
            </ui-td>
            <ui-td>
              {{ item.countryId | filterContries }}
            </ui-td>

            <ui-td class="f12">
              {{ item.createTime }}
            </ui-td>
            <ui-td> 192.168.1.1 </ui-td>
            <ui-td>
              <ui-button small @click.stop="handleView(item)">{{
                $i18n("查看")
              }}</ui-button>
              <!-- <ui-button small warning plain @click.stop="handleDel(item)">删除</ui-button> -->
            </ui-td>
          </ui-tr>
        </template>
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
  components: {
    contentView,
    uiPagination,
  },
})
export default class extends Vue {
  visibleDialogAdd = false;
  search = "";
  page = 1;
  limit = 10;
  total = 0;

  list_templates = [];

  limitOptuions = [
    {
      value: "选项1",
      label: "7天未登录",
    },
    {
      value: "选项2",
      label: "14天未登录",
    },
  ];

  listParams = {
    limit: "",
  };

  constructor() {
    super();
  }

  created() {
    this.getList();
  }

  mounted() {}

  getList() {
    api.platformUser
      .listTenant({
        pageNum: this.page,
        pageSize: this.limit,
        userId: this.search,
        userName: this.search,
        email: this.search,
        telephone: this.search,
        status: [
          api.platformUser.TenantStatus.启用,
          api.platformUser.TenantStatus.禁用,
          api.platformUser.TenantStatus.删除,
        ],
      })
      .then((data: any) => {
        this.total = data.total;
        this.list_templates = data.list;
      })
      .catch((err: any) => {});
  }

  /**
   * @desc: 新增
   */
  handleAdd() {
    this.visibleDialogAdd = true;
  }

  /**
   * @desc: 查看
   */
  handleView(item: any) {
    let url = "/stats/list/detail?id=" + item.userId;
    this.$navbar.push({
      path: url,
    });
  }
}
</script>

<style scoped lang="scss">
@import "../commonStyle";
</style>
