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
    class="flex1 cl-message"
    title="站内信模块"
  >
    <div class="flex_r_s" slot="titleRight">
      <!-- <div style="color: red">"%%%***" 为可替代文字</div> -->
      <!-- <ui-button primary @click="handleSaveTest">
        保存测试
      </ui-button> -->
      <div class="flex1"></div>
      <ui-button primary @click="handleSave">保存</ui-button>
    </div>

    <div>
      <ui-input prefix-label="Title" placeholder="模版标题" v-model="tmp_subject"></ui-input>
    </div>
    <div>
      <ui-input prefix-label="Tag" placeholder="tag" v-model="tmp_type"></ui-input>
    </div>

    <div class="flex_l_t region" style="width: 100%">
      <div style="width: 100%" class="card">
        <div id="editor_menu"></div>
        <div id="editor" class="edit"></div>
      </div>
      <div class="flex1"></div>
      <!-- <div class="card" style="width: 45%; height: 100%">
        <div class="content">
          <div v-html="tmp_content"></div>
        </div>
      </div> -->
    </div>
  </content-view>
</template>

<script lang="ts">
import api from "@/api";
import contentView from "@/components/layout/contentView.vue";

import {
  Component,
  Vue,
  // Prop,
  // Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";
import Editor from "wangeditor";

@Component({
  components: { contentView },
})
export default class extends Vue {
  //
  // data.
  // @Provide() demo:number = 1;
  tmp = {} as any;
  editor: any = null;

  tmp_content = "";
  tmp_subject = "";
  tmp_type = "";

  //
  // lifecycle hook.
  constructor() {
    super();
  }
  mounted() {
    this.editor = new Editor("#editor_menu", "#editor");
    this.editor.create();

    let edit_placeholder = document.querySelector(".placeholder") as any;

    edit_placeholder.innerHTML =
      "变量格式: ${password}<br/>示例: 您好，您的密码已经重置为${password}，请及时登录并修改密码";

    if (this.tmp.id) {
      this.editor.txt.html(this.tmp.template);
    }

    let self = this;

    this.editor.config.onchange = function (newHtml: any) {
      self.tmp_content = newHtml;
    };
  }

  created() {
    let query = this.$route.query as any;

    if (query.id && query.id.length > 0) this.getInfo(query.id);
  }

  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy();
    this.editor = null;
  }

  getInfo(id: string) {
    api.notification.message_tmp
      .get(id)
      .then((data: any) => {
        console.log(data);
        this.tmp = data;

        this.tmp_subject = data.subject;
        this.tmp_content = data.template;
        this.tmp_type = data.type;

        if (this.editor) {
          this.editor.txt.html(this.tmp_content);
        }
      })
      .catch((err: any) => {});
  }

  handleSaveTest() {
    api.notification.message_tmp
      .addUid()
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

  handleSave() {
    if (this.tmp_subject.length == 0) {
      $UIToast({
        type: "error",
        content: "请填写模版标题",
      });
      return;
    }

    if (this.tmp.id) {
      api.notification.message_tmp
        .update(this.tmp.id, this.tmp_subject, this.tmp_content, this.tmp_type)
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
      api.notification.message_tmp
        .add(this.tmp_subject, this.tmp_content, this.tmp_type)
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
.cl-message {
  .region {
    height: calc(100vh - 60px - 60px - 60px);

    .card {
      border-radius: 4px;
      border: 1px solid #ebeef5;
      background-color: #fff;
      overflow: hidden;
      color: #303133;
      transition: 0.3s;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    .edit {
      height: calc(100vh - 60px - 60px - 60px - 80px);
    }

    .content {
      overflow: auto;
      height: 100%;
      background-color: rgba($color: #ffffff, $alpha: 1);
      padding: 10px;
    }
  }
}
</style>>
