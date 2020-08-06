<!--
/**
* Copyright (c) 2020 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2020-12-24 14:49
* Desc: 
*/
 -->

<template>
  <content-view
    :gutter="false"
    class="warn-list-content"
    :title="$i18n('notification.task.index.任务事件')"
  >
    <div slot="titleRight">
      <div class="flex_r_s">
        <!-- <ui-select-el
          placeholder="事件类型"
          v-model="type_choose"
          style="width: 200px"
          @change="onChange"
           :clearable="true"
        >
          <ui-option
            :key="index"
            :label="item.title"
            :value="item.key"
            v-for="(item, index) in list_types"
          ></ui-option>
        </ui-select-el> -->

        <div style="width: 100px" class="flex_c_c">{{ $i18n('notification.task.index.事件类型') }}</div>

        <div style="width: 200px">
          <form-select
            v-model="type_choose"
            :placeholder-txt="$i18n('notification.task.index.事件类型')"
            paint-label="title"
            paint-val="key"
            :clearable="true"
            :prop-list="list_types"
          ></form-select>
        </div>

         <div style="width: 100px" class="flex_c_c">{{ $i18n('notification.task.index.事件来源') }}</div>

        <div style="width: 200px">
          <form-select
            v-model="service_choose"
            :placeholder-txt="$i18n('notification.task.index.事件来源服务')"
            paint-label="title"
            paint-val="key"
            :clearable="true"
            :prop-list="list_services"
          ></form-select>
        </div>

        <!-- <ui-select-el
          placeholder="事件来源服务"
          v-model="service_choose"
          style="width: 200px"
          @change="onChange"
        >
          <ui-option
            :key="index"
            :label="item.title"
            :value="item.key"
            v-for="(item, index) in list_services"
          ></ui-option>
        </ui-select-el> -->

        <!-- <ui-select-el
          placeholder="请选择"
          v-model="type_choose"
          style="width: 200px"
        >
          <ui-option
            :key="index"
            :label="item.name"
            :value="item.type"
            v-for="(item, index) in list_types"
          ></ui-option>
        </ui-select-el>

         <ui-select-el
          placeholder="请选择"
          v-model="type_choose"
          style="width: 200px"
        >
          <ui-option
            :key="index"
            :label="item.name"
            :value="item.type"
            v-for="(item, index) in list_types"
          ></ui-option>
        </ui-select-el>

         <ui-select-el
          placeholder="请选择"
          v-model="type_choose"
          style="width: 200px"
        >
          <ui-option
            :key="index"
            :label="item.name"
            :value="item.type"
            v-for="(item, index) in list_types"
          ></ui-option>
        </ui-select-el>

        <bp-input
          class="bp-input-search"
          placeholder="搜索"
          v-model="filterStr"
          suffix-icon="search"
        ></bp-input>

        <span style="margin-left: 10px">
          <bp-icon name="refresh" width="22px"></bp-icon>
        </span> -->
      </div>
    </div>

    <div>
      <!-- table -->
      <ui-table>
        <ui-thead>
          <ui-tr>
            <ui-th width="20%">ID</ui-th>
            <ui-th width="20%">{{ $i18n('notification.task.index.事件源') }}</ui-th>
            <ui-th width="20%">{{ $i18n('notification.task.index.用户') }}</ui-th>
            <ui-th width="20%">{{ $i18n('notification.task.index.内容') }}</ui-th>
            <ui-th width="20%">{{ $i18n('notification.task.index.时间') }}</ui-th>
          </ui-tr>
        </ui-thead>
        <ui-tbody>
          <ui-tr
            :key="index"
            v-for="(item, index) in list_events"
            @click="linkTo(item)"
            class="cur_P"
          >
            <ui-td>
              <div>
                <!-- <bp-icon
                  v-if="item.relaInstType == 'App'"
                  name="App"
                  style="font-size: 20px; color: #ffcc00"
                ></bp-icon>
                <bp-icon
                  v-if="item.relaInstType == 'Cluster'"
                  name="Cluster"
                  style="font-size: 20px; color: green"
                ></bp-icon>
                <bp-icon
                  v-if="!item.relaInstType || item.relaInstType.length == 0"
                  name="help"
                  style="font-size: 20px; color: #1baaf5"
                ></bp-icon> -->
                <span >{{ item.id }}</span>
              </div>
            </ui-td>
            <ui-td>
              <span>{{ $i18n(item.sourceTitle) }}</span>
              <!-- <span>{{ getMsg(item.eventClass, item.eventType) }}</span> -->
            </ui-td>
            <ui-td>
              <span>{{ (item.faasTenant && item.faasTenantTitle) ? item.faasTenantTitle : "-" }}</span>
            </ui-td>
            <ui-td>
              <span>{{ item.displayContent }}</span>
            </ui-td>
            <ui-td>
              <span>{{ item.time }}</span>
            </ui-td>
          </ui-tr>
        </ui-tbody>
      </ui-table>
      <uiPagination
        :pageSize.sync="pageDta.pageSize"
        :total="pageDta.total"
        @current-change="querList"
        style="padding: 15px 10px"
        v-model="pageDta.pageNum"
      ></uiPagination>
    </div>

    <sideViewDetail ref="sideview"></sideViewDetail>
  </content-view>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  // Prop,
  Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";
import contentView from "@/components/layout/contentView.vue";
import uiPagination from "@/components/ui/uiPagination.vue";
import formSelect from "@/components/formSelect.vue";

import api from "@/api";
import filter from "@/filters";

import sideViewDetail from "../components/sideViewDetail.vue";

@Component({
  components: {
    contentView,
    uiPagination,
    sideViewDetail,
    formSelect,
  },
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

  list_types = [];
  type_choose = "";

  list_services = [];
  service_choose = "";

  //
  // lifecycle hook.
  pageDta = {
    pageNum: 1,
    pageSize: 10,
    pages: 1,
    total: 1,
  };

  list_events = [] as any;

  @Watch("type_choose", { deep: true })
  fun1(val: string, oldVal: string) {
    this.onChange();
  }

  @Watch("service_choose", { deep: true })
  fun2(val: string, oldVal: string) {
    this.onChange();
  }

  constructor() {
    super();
  }

  created() {
    this.querList(null);
  }

  querList(e: any) {
    let params = {
      pageNo: this.pageDta.pageNum,
      pageSize: this.pageDta.pageSize,
      classify: "JOB",
    } as any;

    if (this.type_choose && this.type_choose.length > 0) {
      params.type = this.type_choose;
    }

    if (this.service_choose && this.service_choose.length > 0) {
      params.source = this.service_choose;
    }

    api.event.event
      .displays(params)
      .then((data: any) => {
        this.pageDta.total = data.pageTotal * data.pageSize;

        for (let i = 0; i < data.content.length; i++) {
          data.content[i].time = filter.getDateStr(
            new Date(data.content[i].time),
            2
          );
        }

        this.list_events = data.content;
      })
      .catch((err: any) => {
        throw err;
      });

    // api.app
    //   .getEventList(params)
    //   .then((data: any) => {
    //     this.pageDta.total = data.total;

    //     for (let i = 0; i < data.list.length; i++) {
    //       data.list[i].eventDt = filter.getDateStr(
    //         new Date(data.list[i].eventDt),
    //         2
    //       );
    //     }

    //     this.list_events = data.list;
    //   })
    //   .catch((err: any) => {
    //     throw err;
    //   });
  }
  onChange() {
    this.pageDta = {
      pageNum: 1,
      pageSize: 10,
      pages: 1,
      total: 1,
    };

    this.querList(null);
  }

  linkTo(item: any) {
    (this.$refs.sideview as any).show(item);
  }

  mounted() {
    api.event.event
      .getEventsTypes({ classify: "JOB" })
      .then((data: any) => {
        this.list_types = data;
      })
      .catch((err: any) => {
        throw err;
      });

    api.event.event
      .getEventsServices({ classify: "JOB" })
      .then((data: any) => {
        this.list_services = data;
      })
      .catch((err: any) => {
        throw err;
      });
  }
}
</script>
<style lang="scss" scoped>

</style>
