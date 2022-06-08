<!--
/**
* Copyright (c) 2022 Copyright bp All Rights Reserved.
* Author: lanck
* Date: 2022-03-08 14:45
* Desc: 独立站模板列表
*/
 -->

<template>
  <contentView :title="modeName + '管理'">
    <!-- <p>
      <button @click="type = 'app'">网格</button>
      <button @click="type = 'list'">列表</button>
    </p> -->
    <div class="flex_r_s">
      <button
        class="bp-btn faas-btn-primary"
        style="width: 130px"
        @click="linkTo('add')"
      >
        添加{{ modeName }}
      </button>
      <span class="flex1"></span>
      <bp-input
        class="mt10 inner-input"
        style="width: 200px; margin-right: 50px"
        v-model="queryKey"
        placeholder="按关键词查询"
      ></bp-input>
      <button
        class="bp-btn faas-btn-primary"
        style="width: 100px"
        @click="_getBatchList"
      >
        查询
      </button>
    </div>
    <ui-table class="mt10">
      <ui-thead>
        <ui-tr>
          <ui-th width="200px">{{ modeName }}名字</ui-th>
          <ui-th width="200px">产品品牌 </ui-th>
          <ui-th width="200px">生产日期</ui-th>
          <ui-th width="200px">生产厂商</ui-th>
          <ui-th width="200px">产品名称</ui-th>
          <ui-th width="200px">创建时间</ui-th>
          <ui-th width="200px">操作</ui-th>
        </ui-tr>
      </ui-thead>
      <template v-if="batchList.length > 0">
        <ui-tr :key="index" v-for="(item, index) in batchList">
          <ui-td class="f12">
            {{ item.batchName }}
          </ui-td>

          <ui-td>
            {{ item.prdBrand }}
          </ui-td>

          <ui-td>
            {{ item.prdDate }}
          </ui-td>
          <ui-td> {{ item.prdFactory }} </ui-td>
          <ui-td> {{ item.prdName }} </ui-td>
          <ui-td>
            {{ item.createTime }}
          </ui-td>
          <ui-td>
            <ui-button small @click.stop="linkTo('detail', { id: item.id })">{{
              $i18n("查看")
            }}</ui-button>
            <ui-button
              small
              @click.stop="linkTo('edit', { id: item.id, type: 'edit' })"
              >编辑</ui-button
            >
            <ui-button small warning plain @click.stop="handleDel(item.id)"
              >删除</ui-button
            >
          </ui-td>
        </ui-tr>
      </template>
    </ui-table>
    <template v-if="batchList.length > 0">
      <uiPagination
        :pageSize.sync="pageData.size"
        :total="pageData.total"
        @current-change="getList"
        style="padding: 15px 10px"
        v-model="pageData.page"
      ></uiPagination>
    </template>
  </contentView>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  // Prop,
  // Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";
// import { State, Mutation } from "vuex-class";
import api from "@/api";
import uiPagination from "@/components/ui/uiPagination.vue";
import uiDialog from "@/components/ui/uiDialogView.vue";
import contentView from "@/components/layout/contentView.vue";
import bpui from "bpui.js";
@Component({
  components: {
    contentView,
    bpInput: bpui.bpInput,
    uiPagination,
    uiDialog,
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

  modeName = "库存";
  type = "list";

  batchList = [];
  queryKey = ""; // 查询关键词
  pageData = {
    size: 10,
    page: 1,
    total: 20,
  };

  dialogShow = false;

  batchParams = {
    batchName: "", // 批次名称
    codeArr: [], //
    prdBrand: "", // 产品品牌
    prdDate: "", // 产品生产日期
    prdFactory: "", //  产品生产商
    prdName: "", // 产品名称
  };

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
  linkTo(url, params) {
    if (url == "detail") {
      this.$navbar.push({
        path: "detail",
        query: params,
      });
    }
    if (url == "add") {
      this.$navbar.push({
        path: "add",
      });
    }
    if (url == "edit") {
      this.$navbar.push({
        path: "add",
        query: params,
      });
    }
  }
  mounted() {}
  created() {
    this._getBatchList();
  }
  addBatch() {
    this.dialogShow = true;
  }
  getList(e) {
    this.pageData.page = e;
    this._getBatchList();
  }
  _getBatchList() {
    let params = {
      key: this.queryKey,
      page: this.pageData.page,
      size: this.pageData.size,
    };
    api.act
      .getBatchList(params)
      .then((res) => {
        console.log(res);
        this.batchList = res.records || [];
        this.pageData.total = res.total;
      })
      .catch((err) => {});
  }
  handleView() {}
  handleDel(id) {
    $UIConfirm({
      content: "确认删除这条阶段信息？",
    })
      .then((res) => {
        api.act
          .deleteBatchById(id)
          .then((result) => {
            this._getBatchList();
            $UIConfirmHide();
          })
          .catch((err) => {
            $UIConfirmHide();
          });
      })
      .catch((err) => {
        $UIConfirmHide();
      });
  }
  handleDlogClose() {}
  handleSure() {}
}
</script>

<style lang="scss" scoped>
.template-item-list {
  height: 30px;
  // background: #ccc;
  margin-top: 5px;
  transition: 0.5s all cubic-bezier(0.075, 0.82, 0.165, 1);
}
</style>
