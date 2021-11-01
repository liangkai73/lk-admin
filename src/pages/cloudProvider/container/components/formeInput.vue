<template>
  <div>
    <bp-input v-model="insideValue" :placeholder="placeholderTxt" :type="inputType"
      :min="min"
      :max="max"
      :suffix-label="suffixLabel"
      :prefix-label="prefixLabel"
      class="baseInput" @change="noticChange" :maxlength="maxlength"></bp-input>
    <div class="requiredTip"
      v-show="requiredTipShow && judgeEmpty">{{placeholderTxt}}{{ $i18n('cloudProvider.container.components.formeInput.必填') }}</div>
  </div>
</template>
<script>
import bpui from "bpui.js";

export default {
  components: {
    bpInput: bpui.bpInput
  },
  data () {
    return {
      insideValue: '',
      requiredTipShow: false
    }
  },
  model: {
    prop: 'noUse',
    event: 'return-back'
  },
  props: {
    maxlength: {
      default: Infinity,
      type: Number
    },
    max: {
      default: Infinity,
      type: Number
    },
    placeholderTxt: {
      default: '',
      type: String
    },
    suffixLabel: {
      default: '',
      type: String
    },
    prefixLabel: {
      default: '',
      type: String
    },
    min: {
      default: 0,
      type: Number
    },
    beMust: {
      default: false,
      type: Boolean
    },
    inputType: {
      default: 'text',
      type: String
    },
    defaultValue: {
      default: '',
    }
  },
  methods: {
    noticChange () {
      this.$emit('return-back', this.insideValue)
    },
    judgeMust () {
      this.requiredTipShow = true
      return this.requiredTipShow && this.judgeEmpty
    }
  },
  computed: {
    judgeEmpty () {
      let val = this.multiple ? this.insideValue[0] : this.insideValue
      return this.beMust && !val
    }
  },
  watch: {
    defaultValue: {
      immediate: true,
      handler (val) {
        this.insideValue = val
        this.noticChange()
      }
    }
  },
  mounted () {
    this.noticChange()
  },
}
</script>
<style lang="scss" scoped>
.baseInput {
  width: 100% !important;
  &.bp-input__focus {
    background-color: #fff;
    border: solid 1px #0077ff;

    /deep/ .bp-input__inner {
      background-color: #fff;
    }
  }
  /deep/ .el-input__inner,
  /deep/ .bp-input__inner {
    background-color: #dededf;
    border: 0;
    height: 30px;
    font-size: 12px;
    color: #000;
    &::-webkit-input-placeholder {
      color: #6d6d6d;
    }
    &::-moz-input-placeholder {
      color: #6d6d6d;
    }
    &::-ms-input-placeholder {
      color: #6d6d6d;
    }
    width: 100%;
    box-sizing: border-box;
  }
  height: 32px;
  border: 0;
  margin: 0;
  background-color: #dededf;
}
.requiredTip {
  color: #ff3b30;
  margin-top: 8px;
}
</style>
