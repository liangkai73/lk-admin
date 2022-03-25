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
                :showBack="true"
                class="flex1 content-view-tenant-info"
                :title="$i18n('layouts.tenant.租户信息')">
    <div class="flex_r_s"
         slot="titleRight">
      <ui-button primary
                 @click="handleSave">{{isEdit?$i18n('保存'):$i18n('编辑')}}</ui-button>
    </div>

    <div class="flex_r_s">
      <div style="width: 20%"></div>
      <div style="width: 15%">租户id</div>
      <span>{{id}}</span>
    </div>

    <div class="flex_r_s mt10">
      <div style="width: 20%"></div>
      <div style="width: 15%">创建时间</div>
      <span>{{item.createTime}}</span>
    </div>

    <div class="flex_r_s mt10">
      <div style="width: 20%"></div>
      <div style="width: 15%">最后登录时间</div>
      <span>{{item.createTime}}</span>
    </div>

    <div class="flex_r_s mt10">
      <div style="width: 20%"></div>
      <div style="width: 15%">状态</div>
      <div style="width: 50%">
        <ui-radio-group :disabled="!isEdit || id=='1'"
                        v-model="item.status"
                        @change="handleStatusChange">
          <ui-radio :value="v.value"
                    v-for="(v, key) in list_status"
                    :key="key">{{v.label}}
          </ui-radio>
        </ui-radio-group>
      </div>
    </div>

    <div class="line1" />

    <div class="flex_r_s mt10">
      <div style="width: 20%"></div>
      <div style="width: 15%">账号名</div>
      <div style="width: 50%">
        <span>{{item.userName}}</span>
      </div>
    </div>
    <div class="flex_r_s mt10">
      <div style="width: 20%"></div>
      <div style="width: 15%">账号Email</div>
      <div style="width: 50%">
        <span>{{item.email}}</span>
      </div>
    </div>
    <div class="flex_r_s mt10">
      <div style="width: 20%"></div>
      <div style="width: 15%">账号Tel</div>
      <div style="width: 50%">
        <span>{{item.telephone}}</span>
      </div>
    </div>

    <div class="line1" />

    <div class="flex_r_s mt10">
      <div style="width: 20%"></div>
      <div style="width: 15%">国家/地区</div>
      <div style="width: 50%">
        <ui-select v-model="item.countryId"
                   style="width:100%;margin:0"
                   :datasource="contriesArr"></ui-select>
      </div>
    </div>
    <div class="flex_r_s mt10">
      <div style="width: 20%"></div>
      <div style="width: 15%">公司名称</div>
      <div style="width: 50%">
        <ui-input :readonly="!isEdit"
                  v-model="item.companyName"></ui-input>
      </div>
    </div>
    <div class="flex_r_s mt10">
      <div style="width: 20%"></div>
      <div style="width: 15%">公司邮箱</div>
      <div style="width: 50%">
        <ui-input type="email"
                  :readonly="!isEdit"
                  v-model="item.companyEmail"></ui-input>
      </div>
    </div>
    <div class="flex_r_s mt10">
      <div style="width: 20%"></div>
      <div style="width: 15%">联系人</div>
      <div style="width: 50%">
        <ui-input :readonly="!isEdit"
                  v-model="item.contactName"></ui-input>
      </div>
    </div>
    <div class="flex_r_s mt10">
      <div style="width: 20%"></div>
      <div style="width: 15%">联系方式</div>
      <div style="width: 50%">
        <ui-input :readonly="!isEdit"
                  v-model="item.contactPhone"></ui-input>
      </div>
    </div>
    <div class="flex_r_s mt10">
      <div style="width: 20%"></div>
      <div style="width: 15%">行业</div>
      <div style="width: 50%">
        <ui-input :readonly="!isEdit"
                  v-model="item.industry"></ui-input>
      </div>
    </div>
    <div class="flex_r_s mt10">
      <div style="width: 20%"></div>
      <div style="width: 15%">主营业务</div>
      <div style="width: 50%">
        <ui-input type="textarea"
                  :readonly="!isEdit"
                  v-model="item.business"></ui-input>
      </div>
    </div>

  </content-view>
</template>

<script lang="ts">
import api from '@/api';
import contentView from '@/components/layout/contentView.vue';
import contries from '@/filters/contries.js';
import {
  Component,
  Vue
  // Prop,
  // Watch,
  // Provide,
  // Emit,
} from 'vue-property-decorator';

@Component({
  components: {
    contentView
  }
})
export default class extends Vue {
  // #region 数据
  api = api;
  isEdit: boolean = false;
  id: string;
  oldStatus: number = null; // 原状态.
  item: any = {};
  rejectReason: string = null;
  list_status = [
    // {
    //   label: '审批拒绝',
    //   value: api.platformUser.TenantStatus.审批拒绝
    // },
    // {
    //   label: '待审批',
    //   value: api.platformUser.TenantStatus.待审批
    // },
    {
      label: '启用',
      value: api.platformUser.TenantStatus.启用
    },
    {
      label: '禁用',
      value: api.platformUser.TenantStatus.禁用
    },
    {
      label: '删除',
      value: api.platformUser.TenantStatus.删除
    }
  ];
  // #endregion
  get contriesArr() {
    let lang = $UILibs.lang.includes('en') ? 'en' : 'zhcn';
    return contries.map((item: any) => {
      item.label = item[lang];
      return item;
    });
  }
  //
  // lifecycle hook.
  constructor() {
    super();
  }
  mounted() {}

  created() {
    let query = this.$route.query;
    this.id = query.id;

    if (query.id && query.id.length > 0) this.getInfo(query.id);
  }

  beforeDestroy() {}

  /**
   * @desc: 获取信息
   */
  getInfo(id: string) {
    api.platformUser
      .listTenant({
        pageSize: 1,
        userId: id
      })
      .then(data => {
        this.item = data.list[0];
        if (this.item) {
          this.item.status = api.platformUser.TenantStatus[this.item.status];
          this.oldStatus = this.item.status;
        }
      })
      .catch((err: any) => {});
  }

  /**
   * @desc: 保存编辑按钮.
   */
  handleSave() {
    if (!this.isEdit) {
      this.isEdit = true;
    } else {
      api.platformUser
        .updateTenant(this.id, this.item)
        .then(() => {
          $UIAlert('修改成功');
          this.isEdit = false;
        })
        .catch(e => {
          $UIAlert('修改失败');
        });
    }
  }

  /**
   * @desc 状态选择改变
   */
  handleStatusChange() {
    // if (this.item.status !== this.oldStatus) {
    //   if (this.item.status == api.platformUser.TenantStatus.审批拒绝) {
    //   }
    // } // if.
  }
}
</script>

<style lang="scss" scoped>
.content-view-tenant-info {
  /deep/ .content-body-inner {
    padding: 20px;
    background: #fff;
  }
}
</style>>
