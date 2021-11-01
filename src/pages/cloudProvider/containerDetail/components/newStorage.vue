<template>
  <div class="popWrap">
    <ul class="formUl">
      <li>
        <h5>{{ $i18n('cloudProvider.containerDetail.components.newStorage.名称') }}</h5>
        <form-input :be-must="true" :placeholder-txt="$i18n('cloudProvider.containerDetail.components.newStorage.请输入名称')"></form-input>
      </li>
      <li>
        <h5>{{ $i18n('cloudProvider.containerDetail.components.newStorage.存储类型') }}</h5>
        <form-select :be-must="false" :placeholder-txt="$i18n('cloudProvider.containerDetail.components.newStorage.请选择类型')"></form-select>
      </li>
    </ul>
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
  // Emit,
} from "vue-property-decorator";
@Component({
  name: 'newStorage',
  components: {
    formInput, formSelect
  },
})
export default class extends Vue {
}
</script>

<style scoped lang="scss">
.popWrap {
  min-width: 500px;
  .formUl {
    padding: 0 8px;
    li {
      width: 500px;
      margin-bottom: 24px;
      h5 {
        font-size: 14px;
        
        font-weight: 400;
        color: #8c8c8c;
        margin-bottom: 12px;
        line-height: 14px;
        text-align-last: left;
      }
    }
  }
}
</style>
