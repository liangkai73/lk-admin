<template>
  <div class="popWrap">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$i18n('cloudProvider.container.components.importStorage.上传文件')" name="first">
        <ul class="formUl">
          <li>
            <h5>{{ $i18n('cloudProvider.container.components.importStorage.上传文件') }}</h5>
            <div class="formEl">
              <ui-upload @uploadSuccess="uploadSuccess" @getPercentage="getPercentage">
                <div class="flex_r_s" style="width: 400px">
                  <button class="bp-btn faas-btn-primary">{{ $i18n('cloudProvider.container.components.importStorage.选择文件包') }}</button>
                  <span class="flex1"></span>
                  <span v-show="false">{{ percentage }}</span>
                  <span v-show="false" style="color: #0acd7f">{{ $i18n('cloudProvider.container.components.importStorage.上传成功') }}</span>
                </div>
              </ui-upload>
            </div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane :label="$i18n('cloudProvider.container.components.importStorage.粘贴文本')" name="second">
        <bp-input class="copyContent" :rows="8" :placeholder="$i18n('cloudProvider.container.components.importStorage.请粘贴文本')" type="textarea"></bp-input>
      </el-tab-pane>
    </el-tabs>
    <ul class="formUl">
      <li>
        <h5>{{ $i18n('cloudProvider.container.components.importStorage.环境设置') }}</h5>
        <div class="formEl">
          <form-select :be-must="false" :placeholder-txt="$i18n('cloudProvider.container.components.importStorage.请选择类型')"></form-select>
        </div>
      </li>
      <li class="topVertical">
        <h5>{{ $i18n('cloudProvider.container.components.importStorage.代理设置') }}</h5>
        <div class="formEl">
          <div class="setBtn"><span @click="showProxySet">{{ $i18n('cloudProvider.container.components.importStorage.设置') }}</span></div>
          <form-input v-show="showProxy" :be-must="true" placeholder-txt=""></form-input>
        </div>
      </li>
    </ul>
    <div class="btn2">
      <button class="bp-btn faas-btn-primary">{{ $i18n('cloudProvider.container.components.importStorage.添加') }}</button>
      <button class="bp-btn" @click="closePop">{{ $i18n('cloudProvider.container.components.importStorage.取消') }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import formInput from "@/pages/cloudProvider/container/components/formeInput.vue"
import formSelect from "@/pages/cloudProvider/container/components/formSelect.vue"

import {
  Component,
  Vue,
  Prop,
  // Watch,
  // Provide,
  Emit,
} from "vue-property-decorator";
import bpui from "bpui.js";
import uiUpload from "@/components/ui/uiploader.vue";

@Component({
  name: 'importStorage',
  components: {
    formInput, formSelect,
    bpInput: bpui.bpInput,
    uiUpload
  },
})
export default class extends Vue {
  private activeName: string = 'first'
  private percentage: string = ''
  private showProxy: boolean = false
  @Emit('close-pop') closePop(): void { }

  showProxySet(): void {
    this.showProxy = !this.showProxy
  }
  getPercentage() { }
  uploadSuccess() { }
}
</script>

<style scoped lang="scss">
.popWrap {
  min-width: 600px;
  .formEl {
    width: 550px;
    .setBtn {
      text-align: left;
      margin-bottom: 10px;
      span {
        padding-bottom: 2px;
        color: #1baaf5;
        // border-bottom: solid 1px #1baaf5;
        cursor: pointer;
      }
    }
  }
  .formUl {
    padding: 0 8px;
    margin-top: 20px;
    li {
      width: 600px;
      display: flex;
      margin-bottom: 24px;
      align-items: center;
      &.topVertical {
        align-items: start;
      }
      h5 {
        font-size: 14px;
        
        font-weight: 400;
        color: #8c8c8c;
        margin-right: 16px;
        line-height: 14px;
        flex-shrink: 0;
        text-align-last: left;
      }
    }
  }
  .btn2 {
    text-align: left;
    margin-top: 20px;
    padding-left: 20px;
  }
}
</style>
