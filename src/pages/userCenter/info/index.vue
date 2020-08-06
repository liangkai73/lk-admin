<!--
/**
* Copyright (c) 2020 Copyright Originforest All Rights Reserved.
* Author: lanck
* Date: 2020-12-23 14:45
* Desc: 账号设置
*/
 -->

<template>
  <content-view
    :gutter="false"
    class="faas-content userCenter-content flex1"
    :title="$i18n('userCenter.info.index.账号设置')"
  >
    <ui-card style="margin: 0">
      <!-- <div class="faas-text-row mt20">
        <span class="form-label">{{ $i18n('userCenter.info.index.头像设置') }}</span>
        <div class="form-input">
          <img class="form-input-middle" />
          <ui-image-uploader :serverUrl="uploadServerUrl" />
          <upload @uploadSuccess="uploadSuccess">

            <ui-button info :disabled="viewType == 1">
{{ $i18n('userCenter.info.index.上传图片') }}
            </ui-button>
          </upload>
        </div>
      </div> -->
      <!-- 业务信息 -->
      <!-- <div class="line1"></div> -->
      <!-- <div class="faas-text-row mt20">
        <span class="form-label">{{ $i18n('userCenter.info.index.业务信息') }}</span>
        <div class="form-input">
          <div class="flex_r_s">
            <span class="form-input-middle">{{ $i18n('userCenter.info.index.应用行业') }}</span>
            <ui-input
              v-model="userInfo.industry"
              :disabled="viewType == 1"
              :placeholder="$i18n('userCenter.info.index.请选择')"
              class="userCenter-input"
            ></ui-input>
          </div>
          <div class="flex_r_s mt10">
            <span class="form-input-middle">{{ $i18n('userCenter.info.index.主营业务') }}</span>
            <ui-input
              v-model="userInfo.business"
              :disabled="viewType == 1"
              :placeholder="$i18n('userCenter.info.index.填写您的主营业务或产品名称')"
              class="userCenter-input"
            ></ui-input>
          </div>
        </div>
      </div>
      <div class="line1"></div> -->
      <!-- 资料设置 -->
      <!-- <div class="faas-text-row mt20">
        <span class="form-label">{{ $i18n('userCenter.info.index.资料设置') }}</span>
        <div class="form-input">
          <div class="flex_r_s">
            <span class="form-input-middle">{{ $i18n('userCenter.info.index.企业名称') }}</span>
            <ui-input
              v-model="userInfo.companyName"
              :disabled="viewType == 1"
              :placeholder="$i18n('userCenter.info.index.填写您的企业名称')"
              class="userCenter-input"
            ></ui-input>
          </div>
          <div class="flex_r_s mt10">
            <span class="form-input-middle">{{ $i18n('userCenter.info.index.企业邮箱') }}</span>
            <ui-input
              v-model="userInfo.companyEmail"
              :disabled="viewType == 1"
              :placeholder="$i18n('userCenter.info.index.填写您的公司邮箱')"
              class="userCenter-input"
              type="email"
            ></ui-input>
          </div>
          <div class="flex_r_s mt10">
            <span class="form-input-middle">{{ $i18n('userCenter.info.index.联系人姓名') }}</span>
            <ui-input
              v-model="userInfo.contactName"
              :disabled="viewType == 1"
              :placeholder="$i18n('userCenter.info.index.填写联系人姓名')"
              class="userCenter-input"
            ></ui-input>
          </div>
          <div class="flex_r_s mt10">
            <span class="form-input-middle">{{ $i18n('userCenter.info.index.联系人手机') }}</span>
            <ui-input
              v-model="userInfo.contactPhone"
              :disabled="viewType == 1"
              :placeholder="$i18n('userCenter.info.index.填写联系人手机号码')"
              class="userCenter-input"
              type="tel"
            ></ui-input>
          </div>
        </div>
      </div> -->
      <div class="line1"></div>
      <div class="mt20">
        <button primary disabled
          id="guide-user-btn-1"
          v-show="viewType == 1"
          @click="handBtn('change')"
        >
{{ $i18n('userCenter.info.index.修改资料') }}
        </button>
        <button primary
          v-show="viewType == 2"
          @click="handBtn('save')"
        >
{{ $i18n('userCenter.info.index.保存') }}
        </button>
        <button info
          v-show="viewType == 2"
          @click="handBtn('cancel')"
        >
{{ $i18n('userCenter.info.index.取消') }}
        </button>
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
} from "vue-property-decorator";
import contentView from "@/components/layout/contentView.vue";
import api from "@/api";
import * as ui from '@bpui/ui';
import * as netStore from "@/api/store/netStore";

@Component({
  components: {
    contentView,
    // 'ui-image-uploader': ui.UIImageUploader,
  },
})
export default class extends Vue {
  uploadServerUrl: string = null;

  viewType: 1 | 2 = 1; // 页面类型
  industry = [
    {
      value: $i18n('userCenter.info.index.选项1'),
      label: $i18n('userCenter.info.index.餐饮'),
    },
    {
      value: $i18n('userCenter.info.index.选项2'),
      label: "IT",
    },
    {
      value: $i18n('userCenter.info.index.选项3'),
      label: $i18n('userCenter.info.index.金融'),
    },
    {
      value: $i18n('userCenter.info.index.选项4'),
      label: $i18n('userCenter.info.index.医疗'),
    },
    {
      value: $i18n('userCenter.info.index.选项5'),
      label: $i18n('userCenter.info.index.服务'),
    },
  ];
  industry_val = "";

  userInfo = {
    imageId: "",
    industry: "",
    business: "",
    companyName: "",
    companyEmail: "",
    contactName: "",
    contactPhone: "",
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

  // 获取当前用户信息
  _getUserInfo() {
    api.user.getUserInfoNow().then((result: any) => {
      this.userInfo = Object.assign(this.userInfo, result);
    });
  }
  // 修改用户信息（企业）
  _postUserInfo(): Promise<any> {
    return api.user.PutUserInfoNow(this.userInfo).then((result: any) => {
      return Promise.resolve(result);
    });
  }
  // 上传头像成功cb
  uploadSuccess() {
    console.log("success");
  }

  handBtn(action: "change" | "save" | "cancel") {
    if (action == "change") {
      this.viewType = 2;
    } else if (action == "save") {
      this._postUserInfo().then((result: any) => {
        $UIToast({ type: "success", content: $i18n('userCenter.info.index.修改成功') });
        this.viewType = 1;
        this._getUserInfo();
        // 成功后修改引导状态
        netStore.getNetStore("guideStatus").then((result) => {
          result.info = true;
          netStore.postNetStore("guideStatus", result);
        });
      });
    } else if (action == "cancel") {
      this._getUserInfo();
      this.viewType = 1;
    }
  }
  created() {
    this._getUserInfo();
  }
  mounted() {}
}
</script>

<style lang="scss">
.userCenter-content.faas-content {
  height: calc(100vh - 50px);
  overflow-y: auto;
  .faas-text-row {
    .form-label {
      width: 150px;
      line-height: 32px;
    }
    .form-input-middle {
      display: inline-block;
      width: 150px;
    }
  }
  .userCenter-input {
    width: 800px;
    height: 32px;
    background-color: rgba(0, 0, 0, 0.1);
    .el-input__inner {
      background-color: #f1f1f1;
      // color: #000;
    }
  }
}
</style>
