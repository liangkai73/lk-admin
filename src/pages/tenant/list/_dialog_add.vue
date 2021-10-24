<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lanck
* Date: 2020-12-07 14:18
* Desc: 服务配置
*/
 -->

<template>
  <ui-dialog title="创建新租户" pageStyle="width:600px;max-width:90vw;">

    <div class="flex_r_s">
      <div style="width: 20%"></div>
      <div style="width: 15%">用户名</div>
      <ui-input maxlength="32" required placeholder="必填; 仅支持数字和英文组合" v-model="valueUsername" :pattern="regex.alphaOrDigit" />
    </div>
    <div class="flex_r_s">
      <div style="width: 20%"></div>
      <div style="width: 15%">电话</div>
      <ui-input required placeholder="必填" v-model="valueTelephone" />
    </div>
    <div class="flex_r_s">
      <div style="width: 20%"></div>
      <div style="width: 15%">电子邮件</div>
      <ui-input maxlength="50" type="email" v-model="valueEmail" />
    </div>
    <div class="flex_r_s">
      <div style="width: 20%"></div>
      <div style="width: 15%">登录密码</div>
      <ui-input type="password" required placeholder="必填" v-model="valuePassword" :validator="_validatorPassword" @blur="_blurPassword(valuePassword)" />
    </div>
    <div class="flex_r_s">
      <div style="width: 20%"></div>
      <div style="width: 15%">密码验证</div>
      <ui-input type="password" required placeholder="必填" v-model="valuePassword2" :validator="_validatorPassword" @blur="_blurPassword(valuePassword2)" />
    </div>
    
    <!-- 底部按钮, 最多支持3个按钮 -->
    <div slot="foot">
      <ui-button @click="hide">取消</ui-button>
      <ui-button primary @click="handleSave">创建</ui-button>
    </div>
  </ui-dialog>
</template>

<script lang="ts">
  import api from "@/api";
  import * as ui from '@bpui/ui';
  import { regex } from '@/libs/regex';

  import {
    Component,
    Vue,
    Prop,
    Mixins,
  } from "vue-property-decorator";

  @Component({
    components: {
    },
  })
  export default class extends Mixins(ui.UIDialogMixin) {

    regex = regex;

    //#region 
    valueUsername: string = null;
    valueTelephone: string = null;
    valueEmail: string = null;
    valuePassword: string = null;
    valuePassword2: string = null;
    //#endregion

    //#region lifecycle hook.
    constructor() {
      super();
    }
    mounted() {}

    created() {
    }

    beforeDestroy() {}
    //#endregion

    /**
    * @desc: 保存编辑按钮.
    */
    handleSave() {
      if ($Febs.string.isEmpty(this.valueUsername)
      || $Febs.string.isEmpty(this.valuePassword)
      || $Febs.string.isEmpty(this.valuePassword2)
      || this.valuePassword != this.valuePassword2) {
        $UIAlert('信息不完整或错误');
        return;
      }

      if (this.valueUsername.length < 5) {
        $UIAlert('用户名的长度必须为 5~32 之间');
        return;
      }

      api.login.register({
        username: this.valueUsername,
        telephone: this.valueTelephone,
        email: this.valueEmail,
        password: this.valuePassword,
        checkCode: '123456',
      }).then(res=>{
        if (res.userId && res.userId.length > 0) {
          $UIAlert('创建成功');
          (this as any).hide();
        }
        else {
          $UIAlert('创建失败');  
        }
      })
    }

    /**
    * @desc: 验证密码
    */
    _validatorPassword(text:string, callback:(isValid:boolean)=>void) {
      if (text.length < 8) {
        callback(false);
        return;
      }

      let isValid = this.valuePassword == this.valuePassword2 
        || !this.valuePassword || !this.valuePassword2
        || this.valuePassword.length == 0 || this.valuePassword2.length == 0;
      callback(isValid);
    }

    _blurPassword(text:string) {
      if (text && text.length < 8) {
        $UIToast('密码长度小于8');
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>>
