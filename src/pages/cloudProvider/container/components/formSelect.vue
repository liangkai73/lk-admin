<template>
  <div>
    <ui-select
      :disabled="disabled"
      :empty-text='noDataText'
      :placeholder="placeholderTxt"
      @blur="judgeMust"
      :clearable="clearable"
      @change="noticChange"
      style="width:100%;margin:0"
      v-if="showIcon"
      v-model="insideValue">
      <ui-select-option
        :key="i"
        :value="item[paintVal]"
        :disabled="item.disabled"
        v-for="(item,i) in propList">
        <span>
          <ui-icon :type="item[cloudTypeIcon||paintVal]" width="12px" />
          {{$i18n(item[paintLabel])}}
        </span>
      </ui-select-option>
    </ui-select>
    <ui-select-el
      v-else
      class="baseSelect"
      :class="{hasVal:insideValue.toString()}"
      popper-class="downFrame"
      :placeholder="placeholderTxt"
      @change="noticChange"
      @blur="judgeMust"
      :filterable="filterable"
      :collapse-tags="collapseTags"
      :clearable="clearable"
      :disabled="disabled"
      :no-data-text='noDataText'
      :multiple-limit="multipleLimit"
      :multiple="multiple"
      v-model="insideValue">
      <template v-if="paintLabel">
        <ui-option
          :key="i"
          :value="item[paintVal]"
          :label="$i18n(item[paintLabel])"
          v-for="(item,i) in propList">
          {{$i18n(item[paintLabel])}}
        </ui-option>
      </template>
      <template v-else>
        <ui-option
          :key="item"
          :label="item"
          :value="item"
          v-for="item in propList"></ui-option>
      </template>
    </ui-select-el>
    <div class="requiredTip"
      v-show="requiredTipShow && judgeEmpty">{{placeholderTxt}}{{ $i18n('cloudProvider.container.components.formSelect.必填') }}</div>
  </div>
</template>
<script>
import uiIcon from "@/components/ui/uiCloudIcon.vue";

export default {
  components: {
    uiIcon
  },
  data (vm) {
    return {
      insideValue: vm.defaultValue,
      requiredTipShow: false
    }
  },
  model: {
    prop: 'outsideVal',
    event: 'return-back'
  },
  computed: {
    judgeEmpty () {
      let val = this.multiple ? this.insideValue[0] : this.insideValue
      return this.beMust && !val
    },
    /* datasource () { // 无slot的bpui ui-select 的datasource
      return this.propList.map(item => {
        if (this.paintLabel) {
          return { label: item[this.paintLabel], value: item[this.paintVal] }
        } else {
          return { label: item, value: item }
        }
      })
    } */
  },
  props: {
    maxlength: {
      default: Infinity,
      type: Number
    },
    multipleLimit: {
      default: 0,
      type: Number
    },
    showIcon: {
      default: false,
      type: Boolean
    },
    cloudTypeIcon: {
      default: '',
      type: String
    },
    multiple: {
      default: false,
      type: Boolean
    },
    collapseTags: {
      default: true,
      type: Boolean
    },
    filterable: {
      default: false,
      type: Boolean
    },
    clearable: {
      default: false,
      type: Boolean
    },
    beMust: {
      default: false,
      type: Boolean
    },
    disabled: {
      default: false,
      type: Boolean
    },
    placeholderTxt: {
      default: '',
    },
    noDataText: {
      default: $i18n('cloudProvider.container.components.formSelect.无数据'),
    },
    outsideVal: {
      default: '',
    },
    defaultValue: {
      default: '',
    },
    propList: {
      default () {
        return []
      },
      type: Array
    },
    paintLabel: {
      default: '',
      type: String
    },
    paintVal: {
      default: '',
      type: String
    },
  },
  methods: {
    noticChange (val) {
      this.$emit('return-back', val)
      this.$emit('change', val);
    },
    judgeMust () {
      this.requiredTipShow = true
      return this.requiredTipShow && this.judgeEmpty
    }
  },
  watch: {
    defaultValue: {
      immediate: true,
      handler (val) {
        this.insideValue = val
        val && this.noticChange(val)
      }
    },
    outsideVal: {
      handler (val) {
        this.insideValue = val
        // if (val === '') this.insideValue = val
        // if (this.multiple && val.length === 0) this.insideValue = val
      }
    },

  },
}
</script>
<style lang="scss" scoped>
.downFrame {
  .el-select-dropdown__item {
    font-size: 12px;
    color: #000;
  }
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background-color: #eee;
  }
}
html[data-theme="light"] .bp-select{
  /deep/ .bp-select__arrowDown {
    color: #000;
  }
  &.bp-select__selected{
    border-color: #0077ff;
  }
 /deep/ .bp-select__main .bp-select__mainContain .bp-select__mainContain_placeholder{
    color: #6d6d6d;
  }
}
.baseSelect {
  width: 100% !important;
  height: 32px;
  /* &.hasVal {
    /deep/ .el-input__inner,
    /deep/ .bp-input__inner {
      background-color: rgba(52, 199, 89, 0.2);
      border-color: #34c759;
    }
  } */
  /deep/ .el-tag.el-tag--info {
    color: #000;
  }
  /deep/ .is-disabled {
    .el-select__caret.el-input__icon {
      color: #c0c4cc;
    }
  }
  /deep/ .el-input.is-focus {
    .el-input__inner {
      background-color: #fff;
    }
  }
  /deep/ .el-input__inner,
  /deep/ .bp-input__inner {
    height: 32px !important;
    background-color: #dededf;
    font-size: 12px;
    color: #000;
    box-sizing: border-box;
    border-radius: 0;
    &:hover {
      border-color: #0077ff;
    }
    &::-webkit-input-placeholder {
      color: #6d6d6d;
    }
    &::-moz-input-placeholder {
      color: #6d6d6d;
    }
    &::-ms-input-placeholder {
      color: #6d6d6d;
    }
  }
  /deep/ .el-select__caret.el-input__icon{
    line-height: 32px;
    color: #000;
  }
  margin: 0;
  background-color: #dededf;
}
.requiredTip {
  color: #ff3b30;
  margin-top: 8px;
}
</style>
<style lang="scss">
.downFrame.el-select-dropdown {
  border: 0;
  border-radius: 0;
}
</style>
