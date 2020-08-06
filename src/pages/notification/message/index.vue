<!--
/**
* Copyright (c) 2020 Copyright originforest All Rights Reserved.
* Author: lcs
* Date: 2020-12-07 14:18
* Desc: 服务配置
*/
 -->

<template>
  <content-view
    :gutter="false"
    class="flex1 cl-message"
    :title="$i18n('notification.message.消息通知')">
    <div slot="titleRight">
      <div class="flex_r_s">
        <div style="width: 100px" class="flex_c_c">{{ $i18n('notification.message.账号') }}</div>
        <div style="width: 200px">
          <form-select
            :placeholder-txt="$i18n('notification.message.账号')"
            paint-label="title"
            paint-val="key"
            :clearable="true"
            :prop-list="[]"></form-select>
        </div>
      </div>
    </div>

    <ui-table>
      <ui-thead>
        <ui-tr>
          <ui-th>
            {{$i18n('notification.message.标题')}}
          </ui-th>
          <ui-th>
            {{$i18n('notification.message.账号')}}
          </ui-th>
          <ui-th>
            {{$i18n('notification.message.创建时间')}}
          </ui-th>
          <ui-th>
            {{$i18n('notification.message.操作')}}
          </ui-th>
        </ui-tr>
      </ui-thead>
      <ui-tbody>
        <ui-tr v-for="(item, index) in list_messages" :key="index" @click="showSideview(item)">
          <ui-td>
            <div class="hasRedpoint">
              <i v-if="item.status !== 'read'"></i>
              <span>{{item.subject}}</span>
            </div>
          </ui-td>
          <ui-td>
            {{item.t_id}}
          </ui-td>
          <ui-td>
            {{ item.created_at | filterTime }}
          </ui-td>
          <ui-td>
            <button class="btnTxt">{{ $i18n('notification.message.详情') }}</button>
            <!-- <button class="btnTxt">编辑</button> -->
            <button class="btnTxt" @click="showDialog">{{ $i18n('notification.message.删除') }}</button>
          </ui-td>
        </ui-tr>
      </ui-tbody>
    </ui-table>


    <div class="tableFooter">
      <uiPagination
        :pageSize.sync="pageSize"
        :total="total"
        @current-change="getList"
        style="padding: 15px 10px"
        v-model="page"></uiPagination>
    </div>
    <messageDetail ref="sideview3"></messageDetail>
    <ui-dialog class="dialog-box" :visible.sync="dialogShow" :title="$i18n('notification.message.提示')">
      <div class="commonDialog">
        <h5>{{ $i18n('notification.message.确定要删除吗？') }}</h5>
        <div class="btn2">
          <button class="bp-btn faas-btn-black subBtn2" @click="dialogShow=false">{{ $i18n('notification.message.取消') }}</button>
          <button class="bp-btn faas-btn-primary subBtn1" @click="deleteNode">{{ $i18n('notification.message.确定') }}</button>
        </div>
      </div>
    </ui-dialog>
  </content-view>
</template>

<script lang="ts">
import api from "@/api";

import uiPagination from "@/components/ui/uiPagination.vue";
import contentView from "@/components/layout/contentView.vue";

import { Component, Vue } from "vue-property-decorator";
import formSelect from "@/components/formSelect.vue";
import filter from "@/filters";

import messageDetail from "./messageDetail.vue";

@Component({
  components: { uiPagination, formSelect, messageDetail, contentView },
  name: "notificMessage",
  filters: {
    filterTime(val: Date) {
      return filter.getDateStr(new Date(val), 2);
    }
  },
})
export default class extends Vue {
  search = "";
  page = 1;
  limit = 10;
  total = 0;
  dialogShow: boolean = false

  index_choose = 0;
  item_choose = null as any;
  pageSize: number = 10;
  list_messages = [] as any;

  time_update = null as any;
  is_refush = true;


  constructor() {
    super();
  }

  created() {
    let self = this;
    this.getTotal()
    /*  this.time_update = setInterval(() => {
       self.getTotal();
     }, 2000); */
  }

  mounted() { }

  beforeDestroy() {
    clearInterval(this.time_update)
  }

  beforeRouteEnter(to: any, from: any, next: any) {
    // 如果没有配置顶部按钮或isBounce,则beforeRouteEnter不用写
    next((vm: any) => {
      // 滚动到原来的列表位置,恢复顶部按钮和isBounce的配置
      vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter();
    });
  }
  showSideview(item: any) {
    this.handleChoose(item);
    (this.$refs.sideview3 as any).show(item);
  }
  beforeRouteLeave(to: any, from: any, next: any) {
    // 如果没有配置顶部按钮或isBounce,则beforeRouteLeave不用写
    // 记录列表滚动的位置,隐藏顶部按钮和isBounce的配置
    let s = this.$refs.mescroll as any;
    if (s) s.beforeRouteLeave();
    next();
  }

  deleteNode(): void { 
    this.dialogShow = false
  }
  showDialog(e): void {
    e.stopPropagation()
    this.dialogShow = true
  }
  //  page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
  getList(page: any, mescroll: any) {
    api.notification.message
      .list(this.search, page.num - 1, page.size)
      .then((data: any) => {
        this.total = data.total;

        if (this.is_refush) {
          this.list_messages = [];
          this.is_refush = false;
        }
        this.list_messages = data.list
        if (this.list_messages.length > 0) {
          this.handleChoose(this.list_messages[0]);
        }
      }).catch((err: any) => {
      });
  }

  getTotal() {
    api.notification.message
      .total([], '')
      .then((data: any) => {
        if (this.total < data.total) {
          this.total = data.total;
          this.is_refush = true;
        }
      })
      .catch((err: any) => { });
  }

  handleChoose(item: any) {
    this.item_choose = item;
    if (this.item_choose.status != "read") {
      api.notification.message
        .update(this.item_choose.receiver_id, "read")
        .then((data: any) => {
          this.item_choose.status = "read";
        })
        .catch((err: any) => { });
    }
  }

  removeHTMLTag(content: string) {
    let str = content;
    str = str.replace(/<\/?[^>]*>/g, ""); // 去除HTML tag
    str = str.replace(/[ | ]*\n/g, "\n"); // 去除行尾空白
    str = str.replace(/\n[\s| | ]*\r/g, "\n"); // 去除多余空行
    str = str.replace(/ /gi, ""); // 去掉
    return str;
  }

  getDateStr(date: any) {
    let time;
    if (date instanceof Date) {
      time = date;
    } else {
      if (!date || isNaN(date * 1)) {
        return date;
      }
      time = new Date(date * 1);
    }
    let Y = time.getFullYear().toString();
    let M = (time.getMonth() * 1 + 1).toString();
    let D = time.getDate().toString();
    let H = time.getHours().toString();
    let Mi = time.getMinutes().toString();
    let S = time.getSeconds().toString();
    let dateStr = "";
    if (M.length == 1) {
      M = "0" + M;
    }
    if (D.length == 1) {
      D = "0" + D;
    }
    if (H.length == 1) {
      H = "0" + H;
    }
    if (Mi.length == 1) {
      Mi = "0" + Mi;
    }
    if (S.length == 1) {
      S = "0" + S;
    }

    let now_date = new Date();

    if (
      now_date.getFullYear().toString() == Y &&
      (now_date.getMonth() * 1 + 1).toString() == M &&
      now_date.getDate().toString() == D
    ) {
      dateStr = $i18n('notification.message.今天');
    } else {
      if (now_date.getFullYear().toString() != Y) {
        dateStr += Y + "-";
      }

      dateStr += M + "-" + D;
    }

    return dateStr;
  }
}
</script>

<style lang="scss" scoped>
.cl-message {
  .mescroll {
    height: calc(100vh - 160px);
  }
}
.hasRedpoint {
  position: relative;
  i {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #ff3b30;
    position: absolute;
    left: -9px;
    top: 5px;
  }
}
/deep/ .tableColume {
  cursor: pointer;
}
.dialog-box {
  /deep/ .bp-dialog__close {
    font-weight: normal;
    color: #333;
    height: 15px;
    right: 15px;
    width: 15px;
  }
  /deep/ .bp-dialog__main {
    padding-top: 0;
  }
  /deep/ .bp-dialog__title {
    font-size: 16px;
  }
  .commonDialog {
    width: 526px;
    height: 180px;
    border-top: solid 1px rgba(0, 0, 0, 0.1);
    h5 {
      margin: 50px 0;
      font-size: 14px;
      color: #333;
    }
    .btn2 {
      text-align: right;
      margin-top: 80px;
      .subBtn1 {
        padding: 6px 16px;
      }
      .subBtn2 {
        color: #333;
        height: 32px;
        border-color: #8791a6;
      }
    }
  }
}
</style>
