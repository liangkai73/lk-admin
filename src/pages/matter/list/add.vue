<!--
/**
* Copyright (c) 2022 Copyright bp All Rights Reserved.
* Author: lanck
* Date: 2022-03-29 16:07
* Desc: 添加批次信息
*/
 -->

<template>
  <contentView
    :title="'添加' + modeName"
  >
    <div class="dialog-inner flex_c_s">
      <div class="line1" style="margin: 0"></div>
      <ui-row class="inner-item mt10">
        <ui-col :span="24">
          <p class="input_require flex_r_s">
            <span>{{ modeName }}名称</span>
            <span class="flex1"></span>
          </p>
          <p class="mt10"></p>
          <bp-input
            class="inner-input"
            placeholder="请输入批次名称"
            v-model="batchParams.batchName"
          ></bp-input>
        </ui-col>
      </ui-row>
      <ui-row class="inner-item mt10">
        <ui-col :span="24">
          <p class="input_require flex_r_s">
            <span>产品名称</span>
            <span class="flex1"></span>
          </p>
          <p class="mt10"></p>
          <bp-input
            class="inner-input"
            placeholder="请输入批次名称"
            v-model="batchParams.prdName"
          ></bp-input>
        </ui-col>
      </ui-row>
      <ui-row class="inner-item mt10">
        <ui-col :span="24">
          <p class="flex_r_s">
            <span>产品品牌</span>
            <span class="flex1"></span>
          </p>
          <p class="mt10"></p>
          <bp-input
            class="inner-input"
            placeholder="请输入批次名称"
            v-model="batchParams.prdBrand"
          ></bp-input>
        </ui-col>
      </ui-row>
      <ui-row class="inner-item mt10">
        <ui-col :span="24">
          <p class="flex_r_s">
            <span>产品生产日期</span>
            <span class="flex1"></span>
          </p>
          <p class="mt10"></p>
          <bp-input
            class="inner-input"
            placeholder="请输入产品生产日期"
            v-model="batchParams.prdDate"
          ></bp-input>
        </ui-col>
      </ui-row>
      <ui-row class="inner-item mt10">
        <ui-col :span="24">
          <p class="flex_r_s">
            <span>产品生产厂商</span>
            <span class="flex1"></span>
          </p>
          <p class="mt10"></p>
          <bp-input
            class="inner-input"
            placeholder="请输入批次名称"
            v-model="batchParams.prdFactory"
          ></bp-input>
        </ui-col>
      </ui-row>
      <ui-row class="inner-item mt10">
        <ui-col :span="24">
          <p class="input_require flex_r_s">
            <span>防伪编码</span>
            <span class="flex1"></span>
            <bp-icon name="add" @click="addCodeArr" class="add-icon"></bp-icon>
          </p>
          <div
            class="flex_r_s"
            v-for="(item, index) in batchParams.codeArr"
            :key="index"
          >
            <bp-input
              class="inner-input mt10 flex1"
              :value="item"
              @blur="
                (e) => {
                  setCode(e, index);
                }
              "
              placeholder="请输入防伪编码"
            ></bp-input>
            <bp-icon
              name="remove"
              style="color: red"
              class="pl5 cur_P"
              @click="removeCode(index)"
            ></bp-icon>
          </div>
        </ui-col>
      </ui-row>
      <ui-row class="inner-item mt10">
        <ui-col :span="24">
          <p class="flex_r_s">
            <span>产品拓展信息:</span>
            <span class="flex1"></span>
            <bp-icon
              name="add"
              @click="addPrdExtraArr"
              class="add-icon"
            ></bp-icon>
          </p>
          <p class="mt10"></p>
          <div
            v-for="(item, index) in batchParams.prdExtra"
            :key="index"
            class="inner-input mt10 flex_r_s"
            style="padding-left: 20px"
          >
            <div class="flex1">
              <p>拓展名称：</p>
              <bp-input v-model="item.name"></bp-input>
              <p>拓展内容：</p>
              <bp-input v-model="item.val"></bp-input>
            </div>
            <bp-icon
              name="remove"
              style="color: red"
              class="pl5 cur_P"
              @click="removeExtra(index)"
            ></bp-icon>
          </div>
        </ui-col>
      </ui-row>

      <span class="flex1"></span>
      <div class="inner-footer flex_r_s mt10">
        <span class="flex1"></span>
        <button
          class="bp-btn faas-btn-primary"
          v-show="type == 'add'"
          @click="handleSure"
          style="width: 100px"
          :disabled="addIsdisabled"
        >
          确定
        </button>
        <button
          v-show="type == 'edit'"
          class="bp-btn faas-btn-primary"
          @click="handleSureEdit"
          style="width: 100px"
        >
          确定修改
        </button>
      </div>
      <p style="margin-bottom: 30px"></p>
    </div>
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

@Component({
  components: {
    contentView,
    bpInput: bpui.bpInput,
    uiPagination,
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
  modeName = '供应商'
  type = "add";

  //
  // Prop
  // @Prop({ type: number }) demo: number;

  //
  // data.
  // @Provide() demo:number = 1;
  batchId = "";
  batchParams = {
    batchName: "", // 批次名称
    codeArr: [""], //
    prdBrand: "", // 产品品牌
    prdDate: "", // 产品生产日期
    prdFactory: "", //  产品生产商
    prdName: "", // 产品名称
    prdExtra: [],
  };

  //
  // computed.
  get addIsdisabled() {
    // return true;
    return (
      this.batchParams.batchName.length == 0 ||
      this.batchParams.prdName.length == 0 ||
      this.batchParams.codeArr[0].length == 0
    );
  }

  //
  // watch.
  // @Watch('child')
  // onChildChanged(val: string, oldVal: string) { }

  //
  // lifecycle hook.
  constructor() {
    super();
  }
  addCodeArr() {
    this.batchParams.codeArr.push("");
  }
  addPrdExtraArr() {
    let obj = {
      name: "",
      val: "",
    };
    this.batchParams.prdExtra.push(obj);
  }
  setCode(e, index) {
    this.$set(this.batchParams.codeArr, index, e.target.value);
    // this.batchParams.codeArr[index] = e.target.value;
  }
  created() {
    const { type, id } = this.$route.query;
    this.batchId = id;
    this.type = type || "add";
    type == "edit" && id && this._initEdit(id);
  }
  removeCode(index: number) {
    console.log(index);
    this.batchParams.codeArr.splice(index, 1);
  }
  removeExtra(index: number) {
    console.log(index);
    this.batchParams.prdExtra.splice(index, 1);
  }
  mounted() {}
  _initEdit(id: string) {
    api.act.getBatchById(id).then((res) => {
      console.log(res);
      this.batchParams.batchName = res.batchName;
      this.batchParams.codeArr = res.codeArr;
      this.batchParams.prdBrand = res.prdBrand;
      this.batchParams.prdDate = res.prdDate;
      this.batchParams.prdExtra = res.prdExtraArr;
      this.batchParams.prdFactory = res.prdFactory;
      this.batchParams.prdName = res.prdName;
      console.log(this.batchParams);
    });
  }
  handleSure() {
    api.act.PostBatchList(this.batchParams).then((res) => {
      $UIToast({
        type: "success",
        content: "添加批次成功！",
      });
    });
  }
  handleSureEdit() {
    api.act.putBatchById(this.batchId, this.batchParams).then((res) => {
      $UIToast({
        type: "success",
        content: "修改批次成功！",
      });
    });
  }
}
</script>
<style lang="scss" scoped>
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
    color: #1baaf5;
  }
}
</style>
