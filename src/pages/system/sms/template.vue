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
    class="flex1 cl-sms-tmp"
    title="短信模块"
  >
    <div class="flex_r_s" slot="titleRight">
      <!-- <div style="color: red">"%%%***" 为可替代文字</div> -->
      <ui-button primary @click="handleSave">{{$i18n('保存')}}</ui-button>
    </div>

    <div class="flex_r_s">
      <div style="width: 20%"></div>
      <div style="width: 10%">模版类型</div>
      <ui-radio-group v-model="templateType">
        <ui-radio :value="key" v-for="(value, key) in list_types" :key="key">{{
          value
        }}</ui-radio>
      </ui-radio-group>
    </div>

    <div class="flex_r_s mt20">
      <div style="width: 20%"></div>
      <div style="width: 10%">tag</div>
      <div style="width: 50%">
        <ui-input placeholder="请输入tag 不超过30个字符" v-model="templateTag"></ui-input>
      </div>
    </div>

    <div class="flex_r_s mt20">
      <div style="width: 20%"></div>
      <div style="width: 10%">模版名称</div>
      <div style="width: 50%">
        <ui-input placeholder="请输入名称 不超过30个字符" v-model="templateName"></ui-input>
      </div>
    </div>

    <div class="flex_r_s mt20">
      <div style="width: 20%"></div>
      <div style="width: 10%">模版内容</div>
      <div style="width: 50%">
        <ui-input
          placeholder="变量格式：${name}；
 示例：尊敬的${name}，您的快递已在飞奔的路上，将在今天${time}送达您的手里，请留意查收。"
          v-model="templateContent"
          type="textarea"
          :rows="5"
        ></ui-input>
      </div>
    </div>

    <div class="flex_r_s mt20">
      <div style="width: 30%"></div>
      <div style="width: 50%; color: rgba(0, 0, 0, 0.5)">
        短信字数含"签名+模版内容+变量内容”，短信70个字数含以内，按1条短信计费；超出70个字为长短信，按照67个字数记为1条短信费用。
      </div>
      <div style="width: 20%"></div>
    </div>

    <div class="flex_r_s mt20">
      <div style="width: 20%"></div>
      <div style="width: 10%">申请说明</div>
      <div style="width: 50%">
        <ui-input
          placeholder="请提供您已上线业务的对应链接（必填）、使用场景说明
对应链接：如官网、应用市场下载页等，内网环境链接可提交测试账号及密码。
使用场景：如场景、事例等详细说明"
          v-model="remark"
          type="textarea"
          :rows="5"
        ></ui-input>
      </div>
    </div>
  </content-view>
</template>

<script lang="ts">
import api from "@/api";
import contentView from "@/components/layout/contentView.vue";

import ali from "./ali";

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
  //
  // data.
  // @Provide() demo:number = 1;
  tmp = {} as any;

  templateStatus = -1;
  templateType = 0;
  templateTag = "";
  templateName = "";
  templateContent = "";
  remark = "";

  list_status = [] as any;
  list_types = [] as any;

  //
  // lifecycle hook.
  constructor() {
    super();
  }
  mounted() {}

  created() {
    let query = this.$route.query as any;

    if (query.id && query.id.length > 0) this.getInfo(query.id);

    this.list_status = ali.getListStatus();
    this.list_types = ali.getListTypes();
  }

  beforeDestroy() {}

  getInfo(id: string) {
    api.notification.sms_tmp
      .get(id)
      .then((data: any) => {
        this.tmp = data;

        this.templateType = this.tmp.templateType;
        this.templateName = this.tmp.templateName;
        this.templateTag = this.tmp.type;
        this.templateStatus = this.tmp.templateStatus;
        this.templateContent = this.tmp.templateContent;
        this.remark = this.tmp.remark;
      })
      .catch((err: any) => {});
  }

  handleSave() {
    if (this.templateStatus != 2 && this.templateStatus != -1) {
      $UIToast('当前状态无法编辑, 如需编辑请重新创建!');
      return;
    }

    if (this.templateName.length == 0) {
      $UIToast({
        type: "error",
        content: "请填写模版名字",
      });
      return;
    }

    if (this.templateContent.length == 0) {
      $UIToast({
        type: "error",
        content: "请填写模版内容",
      });
      return;
    }

    if (this.remark.length == 0) {
      $UIToast({
        type: "error",
        content: "请填写申请说明",
      });
      return;
    }

    if (this.tmp.id) {
      api.notification.sms_tmp
        .update({
          id: this.tmp.id,
          templateCode: this.tmp.templateCode,
          templateType: this.templateType,
          templateName: this.templateName,
          type: this.templateTag,
          templateContent: this.templateContent,
          remark: this.remark,
        })
        .then((data: any) => {
          $UIToast({
            type: "success",
            content: "修改成功",
          });
        })
        .catch((err: any) => {
          $UIToast({
            type: "error",
            content: "修改失败",
          });
        });
    } else {
      api.notification.sms_tmp
        .add({
          templateType: this.templateType,
          templateName: this.templateName,
          templateContent: this.templateContent,
          type: this.templateTag,
          remark: this.remark,
        })
        .then((data: any) => {
          $UIToast({
            type: "success",
            content: "添加成功",
          });
        })
        .catch((err: any) => {
          $UIToast({
            type: "error",
            content: "添加失败",
          });
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.cl-sms-tmp {
  /deep/ .content-body-inner {
    padding: 20px;
    background: #fff;
  }
}
</style>>
