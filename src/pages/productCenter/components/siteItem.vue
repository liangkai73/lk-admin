<!--
/**
* Copyright (c) 2021 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2021-03-31 17:50
* Desc: 站点item
*/
 -->
 <style lang='scss'>
.site-item {
  $width: 270px;
  margin: 20px 20px 0 0;
  width: $width;
  max-width: 308px;
  height: 308px;
  background-color: #ffffff;
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  cursor: pointer;
  transform: translateY(0px);
  box-shadow: 0px 1px 4px 0px rgba(121, 139, 149, 0.44);
  &:hover {
    // transform: translateY(-20px);
    transform: translateY(-20px);
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.5);
  }
  .site-item-status {
    width: 100%;
    height: 3px;
    background: transparent;
  }
  .site-item-head {
    padding: 15px;
    height: 50px;
    width: 100%;
    i {
      font-size: 24px;
    }
  }
  .site-item-body {
    width: 100%;
    padding: 0 15px;
  }
  .item-title-copy {
    padding: 0 5px;
    color: #1baaf5;
    cursor: pointer;
  }
  .site-item-foot {
    width: 100%;
    height: 100px;
    padding: 15px;
    padding-bottom: 25px;
    background: #f8f8f8;
  }
}
</style>

<template>
  <div class="site-item flex_c_c">
    <div class="site-item-status" :style="bgColor"></div>
    <div class="site-item-head flex_r_s">
      <bp-icon name="checked" :style="fontColor"></bp-icon>
      <span style="padding-left: 20px">{{ data.name }}</span>
      <span class="flex1"></span>
      <slot name="headRight"></slot>
    </div>
    <div class="site-item-body flex1">
      <ui-row class="">
        <ui-col :span="10" style="color: #999">{{ $i18n('productCenter.components.siteItem.状态') }}</ui-col>
        <ui-col :span="14" :style="fontColor">{{
          filterStatus(data.status)
        }}</ui-col>
      </ui-row>
      <ui-row class="">
        <ui-col :span="10" style="color: #999">{{ $i18n('productCenter.components.siteItem.所属分组') }}</ui-col>
        <ui-col :span="14">{{ data.catalogName }}</ui-col>
      </ui-row>
      <ui-row class="">
        <ui-col :span="10" style="color: #999">{{ $i18n('productCenter.components.siteItem.运行语言环境') }}</ui-col>
        <ui-col :span="14">{{ data.runtime }}</ui-col>
      </ui-row>
      <ui-row class="">
        <ui-col :span="10" style="color: #999">{{ $i18n('productCenter.components.siteItem.外部访问地址') }}</ui-col>
        <ui-col :span="10" class="bp-ellipsis"> {{ data.endpoint }}</ui-col>
        <ui-col :span="4">
          <span class="item-title-copy" @click.stop="copyStr(data.endpoint)">
{{ $i18n('productCenter.components.siteItem.复制') }}
          </span>
        </ui-col>
      </ui-row>
      <ui-row class="">
        <ui-col :span="10" style="color: #999">{{ $i18n('productCenter.components.siteItem.创建时间') }}</ui-col>
        <ui-col :span="14" class="font12">{{
          new Date(data.createDt).getTime() | getDateStr(2)
        }}</ui-col>
      </ui-row>
      <ui-row class="">
        <ui-col :span="10" style="color: #999">{{ $i18n('productCenter.components.siteItem.修改时间') }}</ui-col>
        <ui-col :span="14" class="font12">{{
          new Date(data.statusDt).getTime() | getDateStr(2)
        }}</ui-col>
      </ui-row>
    </div>
    <div class="site-item-foot flex_c_s">
      <ui-row>
        <ui-col :span="8" style="text-align: center">
          <span class="font24">5</span>
          <span>S</span>
        </ui-col>
        <ui-col :span="8" style="text-align: center">
          <span class="font24">{{ data.limitCpu }}</span>
          <span>G</span>
        </ui-col>
        <ui-col :span="8" style="text-align: center">
          <span class="font24">{{ data.limitMem }}</span>
          <span>G</span>
        </ui-col>
      </ui-row>
      <div class="flex1"></div>
      <div class="flex_r_s" style="color: #999; font-size: 12px">
        <ui-row>
          <ui-col :span="8" style="text-align: center">
            <span>{{ $i18n('productCenter.components.siteItem.执行超时时间') }}</span>
          </ui-col>
          <ui-col :span="8" style="text-align: center">
            <!-- <span>用户并发数</span> -->
            <span>CPU</span>
          </ui-col>
          <ui-col :span="8" style="text-align: center">
            <span>{{ $i18n('productCenter.components.siteItem.内存') }}</span>
          </ui-col>
        </ui-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  // Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";


@Component({
  components: {},
})
export default class extends Vue {
  //
  // event.
  // @Emit()
  // demoEvent(type: string) { }

  //
  // state.
  // @State(state=>state.demo) demo:DEMO_TYPE;

  //
  // Prop
  @Prop({ type: Object }) data!: any;

  //
  // data.
  // @Provide() demo:number = 1;

  // computed.
  get statusColor() {
    let colorObj: any = {
      Running: "#0ACD7F",
      Recovery: "#1baaf5",
      Initial: "#0ACD7F",
      Stopped: "#FFCC00",
      Failed: "#FFCC00",
      Deleting: "FF3B30",
      Deleted: "#FF3B30",
      Updating: "#0ACD7F", // 升级中
      default: "#ffcc00",
    };
    let colorKey = this.data.status;
    return colorObj[colorKey] || colorObj["default"];
  }

  //  背景颜色 -关联状态
  get bgColor() {
    let style = {
      background: this.statusColor,
    };
    return style;
  }
  // 字体颜色 - 关联状态
  get fontColor() {
    let style = {
      color: this.statusColor,
    };
    return style;
  }

  //
  // watch.
  // @Watch('child')
  // onChildChanged(val: string, oldVal: string) { }
  filterStatus(str: string) {
    let stuatsObj: any = {
      Initial: $i18n('productCenter.components.siteItem.初始化'),
      Running: $i18n('productCenter.components.siteItem.运行中'),
      Failed: $i18n('productCenter.components.siteItem.启动失败'),
      Updating: $i18n('productCenter.components.siteItem.升级中'),
      Stopped: $i18n('productCenter.components.siteItem.失败'),
      Deleting: $i18n('productCenter.components.siteItem.删除中'),
      Deleted: $i18n('productCenter.components.siteItem.已删除'),
      Recovery: $i18n('productCenter.components.siteItem.冷启状态'),
    };
    return stuatsObj[str];
  }

  copyStr(s: string) {
    var domUrl = document.createElement("input");
    domUrl.value = s;
    domUrl.id = "creatDom";
    document.body.appendChild(domUrl);
    domUrl.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    let creatDom: any = document.getElementById("creatDom");
    creatDom.parentNode.removeChild(creatDom);
    $UIToast({
      type: "success",
      content: $i18n('productCenter.components.siteItem.复制成功，可粘贴'),
    });
  }

  //
  // lifecycle hook.
  constructor() {
    super();
  }

  mounted() {}
}
</script>
