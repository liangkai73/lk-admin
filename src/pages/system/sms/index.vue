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
                class="flex1 cl-sms-tmp"
                :title="$i18n('layouts.system.siderbar.短信模板管理')">
    <!-- <button @click="handleAdd">新增模版</button> -->

    <div class="flex_r_s"
         slot="titleRight">
      <ui-button primary
                 @click="handleAdd">
        {{$i18n('新增')}}
      </ui-button>
    </div>

    <uiLayoutComment>
      <span style="white-space: nowrap;">
        <ui-icon name="ui-warning" />目前系统内置的tag:
      </span>
      <span class="f-italic t-underline ml10"
            style="white-space: nowrap;">
        SMS_忘记密码_CN
        <ui-popover trigger="hover">
          <span>
            <p>中文语言状态下用户忘记密码时发送的短信</p>
            <p>参数: <code>code</code></p>
          </span>
        </ui-popover>
      </span>
      <span class="f-italic t-underline ml10"
            style="white-space: nowrap;">
        SMS_忘记密码_EN
        <ui-popover trigger="hover">
          <span>
            <p>英文语言状态下用户忘记密码时发送的短信</p>
            <p>参数: <code>code</code></p>
          </span>
        </ui-popover>
      </span>
      <span class="f-italic t-underline ml10"
            style="white-space: nowrap;">
        SMS_注册账号_CN
        <ui-popover trigger="hover">
          <span>
            <p>中文语言状态下用户注册账号时发送的短信</p>
            <p>参数: <code>code</code></p>
          </span>
        </ui-popover>
      </span>
      <span class="f-italic t-underline ml10"
            style="white-space: nowrap;">
        SMS_注册账号_EN
        <ui-popover trigger="hover">
          <span>
            <p>英文语言状态下用户注册账号时发送的短信</p>
            <p>参数: <code>code</code></p>
          </span>
        </ui-popover>
      </span>
      <span class="f-italic t-underline ml10"
            style="white-space: nowrap;">
        SMS_设置手机号_CN
        <ui-popover trigger="hover">
          <span>
            <p>中文语言状态下用户重设手机号时发送的短信</p>
            <p>参数: <code>code</code></p>
          </span>
        </ui-popover>
      </span>
      <span class="f-italic t-underline ml10"
            style="white-space: nowrap;">
        SMS_设置手机号_EN
        <ui-popover trigger="hover">
          <span>
            <p>英文语言状态下用户重设手机号时发送的短信</p>
            <p>参数: <code>code</code></p>
          </span>
        </ui-popover>
      </span>
    </uiLayoutComment>

    <div>
      <ui-table>
        <ui-thead>
          <ui-tr>
            <ui-th width="140px">
              <span>Code</span>
            </ui-th>
            <ui-th width="100px">
              Tag
              <ui-icon name="ui-warning"
                       width="16px">
                <ui-popover trigger="hover">
                  <span>系统使用tag标识发送对应的场景通知</span>
                </ui-popover>
              </ui-icon>
            </ui-th>
            <ui-th width="80px">
              <span>Type</span>
            </ui-th>
            <ui-th width="100px">
              <span>Name</span>
            </ui-th>
            <ui-th width="150px">
              <span>Content</span>
            </ui-th>
            <ui-th width="100px">
              <span>Status</span>
            </ui-th>
            <ui-th width="160px">
              <span></span>
            </ui-th>
          </ui-tr>
        </ui-thead>
        <ui-tbody>
          <template v-if="list_templates.length > 0">
            <ui-tr :key="item.id"
                   v-for="(item, index) in list_templates">
              <ui-td>
                <span>{{ item.templateCode }}</span>
              </ui-td>
              <ui-td class="f12">
                <code v-for="(type,index) in item.typeList"
                      style="margin-right:2px"
                      :key="index">{{ type }}</code>
              </ui-td>
              <ui-td>
                <span>{{ getType(item.templateType) }}</span>
              </ui-td>
              <ui-td>
                <span>{{ item.templateName }}</span>
              </ui-td>
              <ui-td>
                <span>{{ item.templateContent }}</span>
              </ui-td>
              <ui-td>
                <span>{{ getStatus(item.templateStatus) }}</span>
              </ui-td>
              <ui-td>
                <ui-button small
                           @click.stop="handleEditTag(item)">
                  {{$i18n('编辑')}} Tag
                </ui-button>
                <ui-button small
                           @click.stop="handleEdit(item)">
                  {{$i18n('编辑')}}
                </ui-button>
                <ui-button v-if="index > 0"
                           small
                           warning
                           plain
                           @click.stop="handleDel(item)">{{$i18n('删除')}}</ui-button>
              </ui-td>
            </ui-tr>
          </template>
        </ui-tbody>
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

    <ui-dialog title="修改Tag"
               :visible.sync="visibleTagDialog">
      <ui-input maxlength="30"
                v-model="editTag"></ui-input>
      <!-- 底部按钮, 最多支持3个按钮 -->
      <div slot="foot">
        <ui-button @click="visibleTagDialog=false">取消</ui-button>
        <ui-button primary
                   @click="handleSaveTag">修改</ui-button>
      </div>
    </ui-dialog>

  </content-view>
</template>

<script lang="ts">
import api from '@/api';

import contentView from '@/components/layout/contentView.vue';
import uiPagination from '@/components/ui/uiPagination.vue';

import { Component, Vue } from 'vue-property-decorator';

import ali from './ali';
import _tmpConfig from '@/router/_tmpConfig';

@Component({
  components: { contentView, uiPagination }
})
export default class extends Vue {
  search = '';
  page = 1;
  limit = 10;
  total = 0;
  visibleTagDialog = false;
  editTagItem = null;
  editTag = null;

  list_templates = [];

  constructor() {
    super();
  }

  created() {
    this.getList();
  }

  mounted() {}

  getStatus(status: number | string) {
    return ali.getStatus(status);
  }

  getType(type: number | string) {
    return ali.getType(type);
  }

  getList() {
    api.notification.sms_tmp
      .list(this.search, this.page - 1, this.limit)
      .then((data: any) => {
        this.total = data.total;
        this.list_templates = data.list;
        for (let i = 0; i < this.list_templates.length; i++) {
          let temp = this.list_templates[i];
          if ($Febs.string.isEmpty(temp.type)) {
            temp.typeList = [];
          } else {
            temp.typeList = temp.type
              .substr(0, temp.type.length - 1)
              .split(',');
          }
        }
      })
      .catch((err: any) => {});
  }

  handleAdd() {
    let url = './template';
    this.$navbar.push({
      path: url
    });
  }

  handleEditTag(item: any) {
    this.editTagItem = item;
    this.editTag = item.type;
    this.visibleTagDialog = true;
  }

  handleSaveTag() {
    this.editTag = $Febs.string.replace(this.editTag, ' ', '');
    api.notification.sms_tmp
      .updateTag({ id: this.editTagItem.id, type: this.editTag })
      .then(res => {
        this.$set(this.editTagItem, 'type', this.editTag);
        this.visibleTagDialog = false;
      })
      .catch(e => {
        $UIAlert('修改失败');
      });
  }

  handleEdit(item: any) {
    let url = './template?id=' + item.id;
    this.$navbar.push({
      path: url
    });
  }

  handleDel(item: any) {
    $UIConfirm({
      content: '确认要删除?',
      title: '邮件模版管理'
    })
      .then(e => {
        api.notification.sms_tmp
          .del(item.id, item.templateCode)
          .then((data: any) => {
            this.getList();

            $UIToast({
              type: 'success',
              content: '删除成功'
            });
          })
          .catch((err: any) => {
            $UIToast({
              type: 'error',
              content: '删除失败，请重试'
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
