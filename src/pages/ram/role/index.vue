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
    class="config-manage-content"
    :title="$i18n('ram.role.index.管理员权限')"
  >
    <ui-card style="padding:0">
      <div class="manage-im flex_r_s">
        <!-- left部分 -->
        <div class="manage-im-left">
          <div class="flex_r_s left-top">
            <ui-button primary>{{ $i18n('ram.role.index.创建分组') }}</ui-button>
            <span class="flex1"></span>
            <span>{{ $i18n('ram.role.index.编辑') }}</span>
          </div>
          <ul class="left-group">
            <li
              :key="item"
              class="flex_r_s"
              v-for="(item,index) in 4"
            >
              <span>{{ $i18n('ram.role.index.全部分组') }}{{index}}</span>
              <span class="flex1"></span>
              <span>{{ $i18n('ram.role.index.（2）') }}</span>
            </li>
          </ul>
        </div>
        <!-- right部分 -->
        <div class="manage-im-right flex1">
          <div class="flex_r_s right_top">
            <span>{{ $i18n('ram.role.index.显示') }}</span>
            <span style="margin-left:20px">{{ $i18n('ram.role.index.所有成品') }}</span>
            <span class="flex1"></span>
            <ui-input style="height:32px"></ui-input>
            <ui-button primary>{{ $i18n('ram.role.index.添加成员') }}</ui-button>
          </div>
          <div class="right-user-list">
            <table class="faas-table-group warn-list mt20">
              <thead>
                <tr>
                  <th width="5%">
                    <ui-checkbox></ui-checkbox>
                  </th>
                  <th width="25%">{{ $i18n('ram.role.index.成员') }}</th>
                  <th width="20%">{{ $i18n('ram.role.index.权限') }}</th>
                  <th width="15%">{{ $i18n('ram.role.index.角色') }}</th>
                  <th width="20%">{{ $i18n('ram.role.index.上次修改') }}</th>
                  <th width="15%">{{ $i18n('ram.role.index.操作') }}</th>
                </tr>
              </thead>
              <tr
                :key="index"
                v-for="(item ,index) in 10"
              >
                <th>
                  <ui-checkbox></ui-checkbox>
                </th>
                <th>
                  <span>Howard</span>
                </th>
                <th>
                  <span>{{ $i18n('ram.role.index.超级管理员') }}</span>
                </th>
                <th>
                  <span>IT</span>
                </th>
                <th>
                  <span>{{ $i18n('ram.role.index.2020年12月03日') }}</span>
                </th>
                <th>
                  <ui-button>{{ $i18n('ram.role.index.修改') }}</ui-button>
                  <ui-button>{{ $i18n('ram.role.index.删除') }}</ui-button>
                </th>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </ui-card>
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
} from 'vue-property-decorator';
import contentView from '@/components/layout/contentView.vue';
import bpui from 'bpui.js';
import uiPagination from '@/components/ui/uiPagination.vue';

@Component({
  components: { contentView, uiPagination, bpInput: bpui.bpInput, bpCheckbox: bpui.bpCheckbox },
})
export default class extends Vue {
  //
  // event.
  // @Emit()
  // demoEvent(type: string) { }

  //
  // state.
  // @State(state=>state.demo) demo:DEMO_TYPE;

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

  mounted() {}
}
</script>
<style lang="scss" scoped>
.config-manage-content {
  height: calc(100vh - 50px);
  width: 100%;
  overflow-y: auto;
  .manage-im {
    width: 100%;
    height: 650px;
  }
  .manage-im-left {
    width: 280px;
    height: 100%;
    background: #fff;
    border-right: 1px solid #e3e3e3;
    .left-top {
      padding: 15px;
    }
    .left-group {
      width: 100%;
      list-style: none;
      li {
        height: 40px;
        line-height: 40px;
        padding: 0 15px;
        transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
        cursor: pointer;
        &:hover {
          background: #f1f1f1;
        }
      }
      .activ_li {
        background: #f5f5f5;
      }
    }
  }
  .manage-im-right {
    height: 100%;
    .right_top {
      width: 100%;
      height: 50px;
      padding: 0 15px;
      background: #ccc;
      button {
        height: 32px;
      }
    }
    .right-user-list {
      height: calc(100% - 50px);
      overflow-y: auto;
    }
  }
}
</style>