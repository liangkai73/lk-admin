<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lanck
* Date: 2020-12-07 14:18
* Desc: 服务配置
*/
 -->

<template>
  <content-view :gutter="false"
                class="flex1"
                :title="$i18n('layouts.tenant.租户列表')">

    <div class="flex_r_s"
         slot="titleRight">
      <ui-button primary
                 @click="handleAdd">{{$i18n('新增')}}</ui-button>
    </div>

    <dialogAdd v-model="visibleDialogAdd" />

    <div>
      <ui-table>
        <ui-thead>
          <ui-tr>
            <ui-th width="250px">id</ui-th>
            <ui-th width="200px">Company</ui-th>
            <ui-th width="160px">Email</ui-th>
            <ui-th width="80px">Country/Area</ui-th>
            <ui-th>Telephone</ui-th>
            <ui-th width="120px">Status</ui-th>
            <ui-th width="140px">Create DateTime</ui-th>
            <ui-th width="60px"></ui-th>
          </ui-tr>
        </ui-thead>
        <template v-if="list_templates.length > 0">
          <ui-tr :key="item.userId"
                 v-for="item in list_templates">
            <ui-td class="f12">
              {{ item.userId }}
            </ui-td>
            <ui-td style="white-space: break-spaces;">
              {{ item.companyName }}
            </ui-td>
            <ui-td>
              {{ item.email }}
            </ui-td>
            <ui-td>
              {{ item.countryId | filterContries}}
            </ui-td>
            <ui-td>
              {{ item.telephone }}
            </ui-td>
            <ui-td class="f12">
              <code v-if="item.status">{{ item.status }}</code>
            </ui-td>
            <ui-td class="f12">
              {{ item.createTime }}
            </ui-td>
            <ui-td>
              <ui-button small
                         @click.stop="handleView(item)">{{$i18n('查看')}}</ui-button>
              <!-- <ui-button small warning plain @click.stop="handleDel(item)">删除</ui-button> -->
            </ui-td>
          </ui-tr>
        </template>
      </ui-table>
      <template v-if="list_templates.length > 0">
        <uiPagination :pageSize.sync="limit"
                      :total="total"
                      @current-change="getList"
                      style="padding: 15px 10px"
                      v-model="page"></uiPagination>
      </template>
      <ui-no-records v-show="list_templates.length == 0" />
    </div>
  </content-view>
</template>

<script lang="ts">
import api from '@/api';

import contentView from '@/components/layout/contentView.vue';
import uiPagination from '@/components/ui/uiPagination.vue';
import dialogAdd from './_dialog_add.vue';

import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    contentView,
    uiPagination,
    dialogAdd
  }
})
export default class extends Vue {
  visibleDialogAdd = false;
  search = '';
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
          api.platformUser.TenantStatus.删除
        ]
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
    let url = '/tenant/info?id=' + item.userId;
    this.$navbar.push({
      path: url
    });
  }
}
</script>

<style scoped lang="scss">
@import '../commonStyle';
</style>
