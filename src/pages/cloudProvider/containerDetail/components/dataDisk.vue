<template>
  <div class="wrapLi">
    <div class="redStar2 itemName">{{ $i18n('cloudProvider.containerDetail.components.dataDisk.数据盘') }}</div>
    <div>
      <div class="inputContainer" v-for="(item, i) in diskArr" :key="item.guid">
        <div style="width:300px;margin-right:3px">
          <form-select v-model="item.category"
            paint-label="key"
            paint-val="val"
            :clearable="true"
            :prop-list="propList"></form-select>
        </div>
        <div style="width:200px">
          <form-input v-model="item.size"
            input-type="int"
            suffix-label="G"
            :placeholder-txt="$i18n('cloudProvider.containerDetail.components.dataDisk.磁盘大小')"></form-input>
        </div>
        <button class="bp-btn" @click="deleteItem(i)" v-if="i>0">{{ $i18n('cloudProvider.containerDetail.components.dataDisk.删除') }}</button>
        <button class="bp-btn" v-else @click="addItem">{{ $i18n('cloudProvider.containerDetail.components.dataDisk.添加') }}</button>
      </div>
    </div>
  </div>
</template>
<script>
import formInput from "../../container/components/formeInput.vue"
import formSelect from "../../container/components/formSelect.vue"
export default {
  components: {
    formInput,
    formSelect,
  },
  model: {
    prop: 'outsideVal',
    event: 'return-back'
  },
  data () {
    return {
      diskArr: [
        { category: '', size: '', guid: 'xxx1' }
      ],
    }
  },
  props: ['propList', 'outsideVal'],
  methods: {
    addItem () {
      let guid = this.guid()
      this.diskArr.push({ category: '', size: '', guid })
    },
    deleteItem (i) {
      this.diskArr.splice(i, 1)
    },
    guid () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      })
    }
  },
  watch: {
    diskArr: {
      deep: true,
      handler (val) {
        let arr = []
        val.forEach(item => {
          let {category, size} = item
          arr.push({category, size})
        })
        this.$emit('return-back', arr)
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.wrapLi {
  display: flex;
  width: 100% !important;
  position: relative;
  margin-bottom: 16px;
  justify-content: flex-start;
  .bp-btn2 { // 原先 第一行的添加， 位置很靠右
    position: absolute;
    left: 781px;
    top: 0;
  }
  .redStar2 {
    padding-left: 11px;
  }
  .itemName {
    width: 105px;
    line-height: 32px;
    display: block;
    flex-shrink: 0;
    color: #8c8c8c;
    margin-right: 105px;
  }
  .inputContainer {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 10px;

    .smallSetect {
      margin: 0;
      width: 300px;
    }
  }
}
</style>
