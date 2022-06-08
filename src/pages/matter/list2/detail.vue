<!--
/**
* Copyright (c) 2022 Copyright bp All Rights Reserved.
* Author: lanck
* Date: 2022-03-29 16:07
* Desc: 添加批次信息
*/
 -->

<template>
  <contentView :title="'批次信息详情'" :gutter="false">
    <ui-row>
      <ui-col span="8">
        <div class="flex_r_s mt10">
          <div style="width: 150px; color: #666">批次名称:</div>
          <span>{{ batchData.batchName }}</span>
        </div>
      </ui-col>
      <ui-col span="8">
        <div class="flex_r_s mt10">
          <div style="width: 150px; color: #666">产品名称:</div>
          <span>{{ batchData.prdName }}</span>
        </div>
      </ui-col>
      <ui-col span="8">
        <div class="flex_r_s mt10">
          <div style="width: 150px; color: #666">创建时间:</div>
          <span>{{ batchData.createTime }}</span>
        </div>
      </ui-col>
    </ui-row>
    <ui-row class="mt20">
      <ui-col span="8">
        <div class="flex_r_s mt10">
          <div style="width: 150px; color: #666">产品品牌:</div>
          <span>{{ batchData.prdBrand }}</span>
        </div>
      </ui-col>
      <ui-col span="8">
        <div class="flex_r_s mt10">
          <div style="width: 150px; color: #666">生产日期:</div>
          <span>{{ batchData.prdDate }}</span>
        </div>
      </ui-col>
      <ui-col span="8">
        <div class="flex_r_s mt10">
          <div style="width: 150px; color: #666">批次id:</div>
          <span>{{ batchData.id }}</span>
        </div>
      </ui-col>
    </ui-row>
    <!-- tabs -->

    <uiTabs
      style="margin-top: 40px"
      :data="tabsData"
      v-model="tabsValue"
      @handleClick="changeView"
      :type="'card'"
    ></uiTabs>
    <!-- page1 -->
    <template v-if="batchCodelist.length > 0 && tabsValue == 1">
      <p class="mt20"></p>
      <div
        class="flex_r_s batchItem"
        v-for="(item, index) in batchCodelist"
        :key="index"
      >
        <span style="padding-right: 50px">{{ index + 1 }}:</span>
        <span>{{ item }}</span>
      </div>

      <uiPagination
        :pageSize.sync="codePageParams.size"
        :total="codePageParams.total"
        @current-change="getCodeList"
        style="padding: 15px 10px"
        v-model="codePageParams.page"
      ></uiPagination>
    </template>
    <!-- page2 -->
    <template v-if="tabsValue == 2">
      <p class="mt20">
        <button
          class="bp-btn faas-btn-primary"
          style="width: 150px"
          @click="showStageDialog"
        >
          添加批次阶段信息
        </button>
      </p>
      <div class="stage-inner mt20">
        <div
          class="stage-item mt10"
          v-for="(item, index) in stageArr"
          :key="item.stageId"
        >
          <div class="flex_r_s">
            <div style="width: 300px" class="flex_r_s">
              <h3 style="font-size: 14px">{{ index + 1 }}:</h3>
              <h3 style="padding: 0 20px; font-size: 14px">
                {{ item.stageName }}
              </h3>
              <span>({{ item.stageDate }}) </span>
              <span class="flex1"></span>
            </div>
            <p class="stage-item-content flex1">{{ item.stageContent }}</p>
          </div>
        </div>
      </div>
    </template>
    <!-- page3 -->
    <template v-if="tabsValue == 3">
      <ui-row class="mt20">
        <p
          class="mt10 flex_r_s"
          v-for="(item, index) in batchData.prdExtraArr"
          :key="index"
        >
          <span style="width: 200px; color: #666">{{ item.name }}</span>
          <span>{{ item.val }}</span>
        </p>
      </ui-row>
    </template>
    <!-- dialog 创建用户组 -->
    <ui-dialog
      class="dialog-box"
      :title="'添加批次阶段信息'"
      v-model="stageDialog"
    >
      <div class="dialog-inner flex_c_s">
        <div class="line1" style="margin: 0"></div>
        <ui-row class="inner-item mt10" style="margin-top: 80px">
          <ui-col :span="24">
            <p class="input_require">阶段名称:</p>
            <ui-input
              class="mt10 inner-input"
              placeholder="请输出阶段名称"
              v-model="stageParams.stageName"
            ></ui-input>
          </ui-col>
        </ui-row>
        <ui-row class="inner-item mt10">
          <ui-col :span="24">
            <p class="input_require">阶段时间:</p>
            <ui-input
              class="mt10 inner-input"
              placeholder="请输入阶段时间"
              v-model="stageParams.stageDate"
            ></ui-input>
          </ui-col>
        </ui-row>
        <ui-row class="inner-item mt20">
          <ui-col :span="24">
            <p class="input_require">阶段内容:</p>
            <ui-input
              class="mt10 inner-input"
              rows="5"
              type="textarea"
              placeholder="请输出阶段内容"
              v-model="stageParams.stageContent"
            ></ui-input>
          </ui-col>
        </ui-row>
        <span class="flex1"></span>

        <div class="inner-footer flex_r_s">
          <span class="flex1"></span>
          <ui-button style="margin-right: 10px" @click="handleDlogClose">
            取消
          </ui-button>
          <ui-button primary @click="handleSureAdd"> 确定 </ui-button>
        </div>
      </div>
    </ui-dialog>
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
import contentView from "@/components/layout/contentView.vue";
import bpui from "bpui.js";
import uiDialog from "@/components/ui/uiDialogView.vue";
import uiTabs from "@/components/ui/uiTabs.vue";

@Component({
  components: {
    contentView,
    bpInput: bpui.bpInput,
    uiPagination,
    uiTabs,
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
  batchId = "";
  batchData = {};
  stageArr = [];
  tabsValue = 2;
  tabsData = [
    { title: "批次编码列表", value: 1 },
    { title: "批次阶段信息", value: 2 },
    { title: "产品拓展信息", value: 3 },
  ];

  batchCodelist = []; // 批次中编码列表
  codePageParams = {
    size: 10,
    page: 1,
    total: 10,
  };
  stageParams = {
    batchId: "", // 批次id
    stageContent: "", // 阶段内容
    stageDate: "", // 阶段时间
    stageName: "", // 名称
  };
  stageDialog = false;
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
  created() {
    this.batchId = this.$route.query.id;
    this.stageParams.batchId = this.$route.query.id;
    this.getBatchInfo();
    this._getBatchCodeList();
  }
  mounted() {}
  changeView(e: any) {
    if (e.value == 1) {
      this._getBatchCodeList();
    }
    if (e.value == 2) {
      // this._getGroup_permission(this.activeNum);
    }
  }
  getBatchInfo() {
    api.act.getBatchById(this.batchId).then((res) => {
      this.batchData = res;
      this.stageArr = res.prdStageArr || [];
    });
  }
  getCodeList(e) {
    this.codePageParams.page = e;
    this._getBatchCodeList();
  }
  _getBatchCodeList() {
    let params = {
      batchId: this.batchId,
      page: this.codePageParams.page,
      size: this.codePageParams.size,
    };
    api.act.getBatchCode(params).then((res) => {
      this.batchCodelist = res.records || [];
      this.codePageParams.total = res.total;
    });
  }
  // 取消添加弹窗
  handleDlogClose() {
    this.stageDialog = false;
  }
  // 确定添加弹窗
  handleSureAdd() {
    this._postStageInfo().then((res) => {
      this.getBatchInfo();
      this.stageDialog = false;
    });
  }
  // 添加阶段信息
  _postStageInfo() {
    let params = this.stageParams;
    return api.act
      .postBatchStage(params)
      .then((result) => {
        console.log(result);
        console.log(result.status);
        if (result.status == 400) {
          $UIToast({ type: "error", content: `添加失败!${result.message}。` });
        } else {
          $UIToast({ type: "success", content: "添加成功!" });
        }

        return Promise.resolve(result);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }
  // 删除阶段信息handle
  removeStage(id) {
    $UIConfirm({
      content: "确认删除这条阶段信息？",
    })
      .then((res) => {
        this._deleteStage(id).then((result) => {
          this.getBatchInfo();
          $UIConfirmHide();
        });
      })
      .catch((err) => {
        $UIConfirmHide();
      });
  }
  // 删除阶段信息fun
  _deleteStage(id) {
    return api.act
      .deleteBatchStage(id)
      .then((result) => {
        $UIToast({ type: "success", content: "删除成功！" });
        return Promise.resolve(true);
      })
      .catch((err) => {
        return Promise.resolve(true);
      });
  }

  showStageDialog() {
    this.stageParams.stageContent = "";
    this.stageParams.stageDate = "";
    this.stageParams.stageName = "";
    this.stageDialog = true;
  }
  _;
}
</script>
<style lang="scss" scoped>
.batchItem {
  padding: 5px 10px;
  font-size: 16px;
}
.dialog-box {
  .bp-dialog__main {
    padding-top: 0px;
  }
}

.dialog-inner {
  width: 500px;
  height: 500px;
  text-align: left;
  justify-content: start;
  .inner-title {
    width: 100%;
  }
  // .inner-item {
  //   p {
  //     padding-left: 3px;
  //     color: rgba(0, 0, 0, 0.45);
  //   }
  // }
  .input_require {
    &:before {
      content: "*";
      color: red;
      display: inline-block;
      padding-right: 3px;
      font-size: 16px;
      position: relative;
      top: 3px;
    }
  }
  .add-icon {
    cursor: pointer;
    padding-right: 5px;
    color: #1baaf5;
  }
}
.stage-item {
  border: 1px solid #dadce0;
  padding: 15px 30px;
}
</style>
