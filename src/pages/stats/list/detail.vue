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
    :showBack="true"
    class="flex1 content-view-tenant-info"
    :title="'登录详情'"
  >
    <div class="flex_r_s">
      <div style="width: 15%">租户id</div>
      <span>{{ id }}</span>
    </div>

    <div class="flex_r_s mt10">
      <div style="width: 15%">创建时间</div>
      <span>{{ item.createTime }}</span>
    </div>
    <div class="flex_r_s mt10">
      <div style="width: 15%">账号名</div>
      <div style="width: 50%">
        <span>{{ item.userName }}</span>
      </div>
    </div>
    <div class="flex_r_s mt10">
      <div style="width: 15%">账号Email</div>
      <div style="width: 50%">
        <span>{{ item.email }}</span>
      </div>
    </div>
    <div class="flex_r_s mt10">
      <div style="width: 15%">账号Tel</div>
      <div style="width: 50%">
        <span>{{ item.telephone }}</span>
      </div>
    </div>
    <span class="line1 mt20"> </span>
    <ui-table class="mt10">
      <ui-thead>
        <ui-tr>
          <ui-th width="200px">历史登录时间</ui-th>
          <ui-th width="140px">地区/国家 </ui-th>
          <ui-th>登录IP</ui-th>
        </ui-tr>
      </ui-thead>

      <ui-tr :key="item" v-for="item in 6">
        <ui-td class="f12"> 2021.11.21 </ui-td>
        <ui-td> 中国 </ui-td>
        <ui-td> 192.168.1.1 </ui-td>
      </ui-tr>
    </ui-table>
  </content-view>
</template>

<script lang="ts">
import api from "@/api";
import contentView from "@/components/layout/contentView.vue";
import contries from "@/filters/contries.js";
import {
  Component,
  Vue,
  // Prop,
  // Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";

@Component({
  components: {
    contentView,
  },
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
      label: "启用",
      value: api.platformUser.TenantStatus.启用,
    },
    {
      label: "禁用",
      value: api.platformUser.TenantStatus.禁用,
    },
    {
      label: "删除",
      value: api.platformUser.TenantStatus.删除,
    },
  ];
  // #endregion
  get contriesArr() {
    let lang = $UILibs.lang.includes("en") ? "en" : "zhcn";
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
        userId: id,
      })
      .then((data) => {
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
          $UIAlert("修改成功");
          this.isEdit = false;
        })
        .catch((e) => {
          $UIAlert("修改失败");
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
