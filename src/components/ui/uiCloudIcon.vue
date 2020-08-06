<!--
/**
* Copyright (c) 2021 Copyright of All Rights Reserved.
* Author: lanck
* Date: 2021-07-28 16:09
* Desc:  云商图标
*/
 -->
<style lang="scss" scoped>
  .cloud-icon {
    padding-right: 5px;
    font-size: 18px;
  }
</style>
<template>
  <ui-icon :name="relObj.name" class="cloud-icon" :style="{ color: relObj.color }">
  </ui-icon>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
    Prop,
  } from "vue-property-decorator";

  @Component({
    components: {},
  })
  export default class extends Vue {

    //
    // Prop
    @Prop({
      type: String,
      default: "ALIYUN"
    }) type: string;

    //
    // data.
    // @Provide() demo:number = 1;
    allCloud = {
      ALIYUN: {
        name: "ALIYUN",
        color: "#ff6300"
      },
      HUAWEI: {
        name: "huaweiyun",
        color: "#e50012"
      },
      TENCENT: {
        name: "TENCENT",
        color: "#00A4FF"
      },
      AWS: {
        name: "AWS",
        color: "#fc9d2c"
      },
      Azure: {
        name: "Azure",
        color: "#1baaf5"
      },
    };

    //
    // computed.
    get relObj() {
      return this.allCloud[this.type];
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

    mounted() {}
  }
</script>
