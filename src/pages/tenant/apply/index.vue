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
                :title="$i18n('layouts.tenant.新申请')">

    <div class="flex_r_s"
         slot="titleRight">
    </div>

    <div>
      <ui-table>
        <ui-thead>
          <ui-tr>
            <ui-th width="250px">id</ui-th>
            <ui-th width="200px">Company</ui-th>
            <ui-th width="140px">Email</ui-th>
            <ui-th width="140px">Country/Area</ui-th>
            <ui-th>Contact Tel</ui-th>
            <ui-th width="140px">Contact People</ui-th>
            <ui-th width="120px">Status</ui-th>
            <ui-th width="140px">Create DateTime</ui-th>
            <ui-th width="150px"></ui-th>
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
            <ui-td class="f12">
              {{ item.email }}
            </ui-td>
            <ui-td>
              {{ item.countryId | filterContries}}
            </ui-td>
            <ui-td>
              {{ item.contactPhone }}
            </ui-td>
            <ui-td>
              {{ item.contactName }}
            </ui-td>
            <ui-td class="f12">
              <code v-if="item.status">{{ item.status }}</code>
            </ui-td>
            <ui-td class="f12">
              {{ item.createTime }}
            </ui-td>
            <ui-td>
              <ui-button plain
                         warning
                         small
                         @click.stop="handleRejectDialog(item)">{{$i18n('拒绝注册')}}</ui-button>
              <ui-button small
                         @click.stop="handleAcceptDialog(item)">{{$i18n('通过注册')}}</ui-button>
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

    <!-- 拒绝 -->
    <ui-dialog title="拒绝用户申请"
               :visible.sync="visibleReject">
      <p class="mb10 flex_r_s">拒绝通过 ({{rejectItem?rejectItem.companyName:''}}) 注册申请</p>
      <ui-input type="textarea"
                maxlength="1000"
                rows="5"
                placeholder="拒绝理由将通过邮件发送给用户"
                v-model="rejectReason"></ui-input>
      <div slot="foot">
        <ui-button primary
                   @click="handleReject(rejectItem)">Ok</ui-button>
      </div>
    </ui-dialog>

  </content-view>
</template>

<script lang="ts">
import api from '@/api';

import contentView from '@/components/layout/contentView.vue';
import uiPagination from '@/components/ui/uiPagination.vue';

import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    contentView,
    uiPagination
  }
})
export default class extends Vue {
  visibleReject = false;
  rejectReason = null;
  rejectItem = null;
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
        status: [api.platformUser.TenantStatus.待审批]
      })
      .then((data: any) => {
        this.total = data.total;
        this.list_templates = data.list;
      })
      .catch((err: any) => {});
  }

  /**
   * @desc 拒绝通过
   */
  handleReject(item: any) {
    if ($Febs.string.isEmpty(this.rejectReason)) {
      $UIToast('拒绝理由不能空');
      return;
    }

    $UIConfirm('确认发送拒绝通知给用户?').then(() => {
      $UIConfirmHide();
      api.platformUser
        .rejectRegister({
          userId: item.userId,
          reason: this.rejectReason
        })
        .then(() => {
          $UIAlert('已发送拒绝邮件给用户');
          this.visibleReject = false;
          this.getList();
        });
    });
  }

  /**
   * @desc 拒绝通过
   */
  handleRejectDialog(item: any) {
    this.rejectItem = item;
    this.visibleReject = true;
  }

  /**
   * @desc: 查看
   */
  handleAcceptDialog(item: any) {
    $UIConfirm('确认通过用户注册? 将会发送注册激活邮件给用户').then(() => {
      $UIConfirmHide();
      api.platformUser
        .acceptRegister({
          userId: item.userId
        })
        .then(() => {
          $UIAlert('已发送激活邮件给用户');
          this.getList();
        });
    });
  }
}
</script>

<style scoped lang="scss">
@import '../commonStyle';
</style>
