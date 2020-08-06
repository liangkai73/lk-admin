<!--
/**
* Copyright (c) 2020 Copyright of All Rights Reserved.
* Author: lanck
* Date: 2020-08-19 14:02
* Desc: console siderbar-menu
*/
 -->

<template>
  <ul class="sider-muen-ul mt10">
    <li :class="[index == activeMune ? 'is-extends' : '']" :key="index"
      v-for="(item, index) in menuList" @mouseenter="togolActiveI(index)"
      @mouseleave="togolActiveI(NaN)" v-account="{ modle: 'consoleSiderbar', name: item.account }">
      <!-- menu item -->
      <div :class="[
          {
            'active-menu':
              activePatch == item.path ||
              (item.activePath && item.activePath.includes(activePatch)),
          },
        ]" @click="handleMenu(index, item)" class="sider-muen-item flex_r_c">
        <ui-icon v-if="item.icon.length > 0" width="16px" height="16px"
          style="line-height: 16px; margin-right: 5px" class="sider-muen-icon"
          :name="(index == hoverMune||activePatch == item.path)?item.icon+2:item.icon"></ui-icon>
        <span>{{ item.title }}</span>
        <span class="flex1"></span>
        <span v-show="item.childMenu">
          <ui-icon :class="[index == activeMune ? 'muen-icon-extends' : '']" class="muen-icon"
            name="left"></ui-icon>
        </span>
      </div>
      <!-- menus-child -->
      <ul :style="{height:activeMune == index ? item.childMenu.length * 38 + 'px' : '0px'}"
        class="child-muens" v-if="item.childMenu">
        <li :class="[
            {
              'active-menu':
                activePatch == node.path ||
                (node.activePath && node.activePath.includes(activePatch)),
            },
          ]" :key="cindex" @click="handleChildMenu(index, node)" class="sider-muen-item flex_r_s"
          v-for="(node, cindex) in item.childMenu">
          <span class="dian"></span>
          <span>{{ node.title }}</span>
        </li>
      </ul>
    </li>
    <!-- <div class="trigger-box flex_r_c" @click="changeSiderbarStatus">
      <ui-icon
        :class="[!siderStatus.show ? 'trigger-extends' : '']"
        name="left"></ui-icon>
    </div> -->
  </ul>
</template>

<script lang="ts">
  import {
    Component,
    Mixins,
    Prop,
    Watch,
  } from "vue-property-decorator";
  import siderBarMixin from "@/components/layout/siderbarMixin";
  import api from "@/api";

  @Component({
    components: {},
    name: "golobalSidebar",
  })
  export default class extends Mixins(siderBarMixin) {
    //
    // event.
    // @Emit()
    // demoEvent(type: string) { }

    //
    // state.
    // @State(state=>state.demo) demo:DEMO_TYPE;
    @Prop({
      type: Array,
      default: null
    })
    menuList!: any[];

    @Prop({
      type: String
    })
    moudleName!: string;

    activeMune: number = NaN;
    hoverMune: number = NaN;
    activePatch: string = "";

    siderStatus: any = {
      show: true,
    };
    //
    // Prop
    // @Prop({ type: number }) demo: number;

    //
    // data.
    // @Provide() demo:number = 1;

    //
    // computed.
    // get calc() { return xxxx; }

    //
    // watch.
    @Watch("$route.path")
    onChildChanged(val: string, oldVal: string) {
      this.activePatch = val;
    }

    //
    // lifecycle hook.
    constructor() {
      super();
    }
    created() {
      this.init();
      (this.$root as any).$changeSiderBar = (isShow) => {
        this.changeSiderbarStatus(isShow);
      };
    }
    mounted() {
      this.$root.$on("trigger-sidebar", this.changeSiderbarStatus);
    }
    beforeDestroy() {
      this.$root.$off("trigger-sidebar");
    }
    // 初始siderbar
    init() {
      // let obj = api.layout.getSiderbarStatus(this.moudleName);

      this.activePatch = this.$route.path;
      let arr = [];
      for (let i = 0; i < this.menuList.length; i++) {
        let obj = this.menuList[i];
        let obj2 = {
          activePath: [],
          index: i,
        };
        if (obj.activePath && obj.activePath instanceof Array) {
          obj2.activePath = [...obj2.activePath, ...obj.activePath];
        }
        if (obj.childMenu) {
          obj.childMenu.forEach((node: any) => {
            obj2.activePath = [...obj2.activePath, node.path];
            if (node.activePath && node.activePath instanceof Array) {
              obj2.activePath = [...obj2.activePath, ...node.activePath];
            }
          });
        } else {
          obj2.activePath = [...obj2.activePath, obj.path];
        }
        arr.push(obj2);
      }

      arr.forEach((obj) => {
        let a = obj.activePath.findIndex((path) => {
          return path == this.activePatch;
        });
        if (
          obj.activePath.findIndex((path) => {
            return path == this.activePatch;
          }) >= 0
        ) {
          this.activeMune = obj.index;
        }
      });
    }
    togolActiveI(i) {
      this.hoverMune = i;
    }
    // 修改activemune状态
    handleMenu(index: any, item: any) {

      if (index === this.activeMune) {
        if (item.childMenu) {
          this.activeMune = NaN;
        }
      } else {
        this.activeMune = index;
      }
      // 过滤没有path的路径
      if (item.path) {
        this.activePatch = item.path;
        // this.setsibarStatus(index, this.activePatch);
        this.$navbar.push({
          path: item.path,
        });
      }
    }
    // 修改activemune-child状态
    handleChildMenu(index: number, item: any) {
      this.activePatch = item.path;
      // this.setsibarStatus(index, this.activePatch);
      this.$navbar.push({
        path: item.path,
      });
    }
    // setstatus - store2
    setsibarStatus(index: number, path: string) {
      api.layout.setSiderbarStatus(this.moudleName, {
        index,
        activePath: path,
      });
    }
    changeSiderbarStatus(isShow ? : boolean) {
      if (isShow === false || isShow === true) {
        this.siderStatus.show = isShow;
      } else {
        this.siderStatus.show = !this.siderStatus.show;
      }
      if (!this.siderStatus.show) {
        this.$parent.$el.classList.add("siderBar-extends");
      } else {
        this.$parent.$el.classList.remove("siderBar-extends");
      }
    }
  }
</script>

<style>
  .siderbar-container {
    user-select: none;
    border-right: 1px solid #e6e8eb;
    align-self: flex-start;
  }
</style>

<style lang="scss">

  @import '~@bpui/ui/var';

  $menuHeight: 38px;

  @mixin chooseStyle {
    content: "";
    height: $menuHeight;
    width: 3px;
    background: #004d93;
    position: absolute;
    top: 0;
    left: 0;
  }

  .siderBar-extends {
    margin-left: -200px !important;
  }

  .siderbar-container {
    min-width: 200px;
    width: 200px;
    height: calc(100vh - 50px);
    transition: all 0.2s ease-in-out !important;
    -moz-transition: all 0.2s ease-in-out !important;
    -webkit-transition: all 0.2s ease-in-out !important;
    -o-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    
    padding: 16px 0 32px 0;
    color: #202020;
    font-size: 13px;
    // @include background_color("bg_color4");
    background: #fff;
    border-right: solid 1px #E6E8EB;

    .siderbar-collapse {
      background: #ebebeb;
    }

    h2 {
      font-size: 16px;
      line-height: 22px;
      letter-spacing: 0px;
      padding-left: 15px;
      font-weight: 500;
    }
  }

  .sider-muen-ul {
    user-select: none;
    height: 100%;
    list-style: none;
    font-size: 12px;
    position: relative;

    // z-index: 9;
    .trigger-box {
      width: 15px;
      height: 50px;
      position: absolute;
      right: -15px;
      top: 50%;
      background: #e1e1e1;
      margin-top: -80px;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      cursor: pointer;
      transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

      &:hover {
        background: #d1d1d1;
      }
    }

    .trigger-extends {
      transform: rotate(180deg);
    }

    li.sider-muen-item {
      padding-left: 35px;
    }

    .sider-muen-item {
      height: $menuHeight;
      line-height: 1;
      padding: 0 15px;
      overflow: hidden;
      list-style: none;

      &:hover {
        // @include background_color("hover1");
        background: #d2e6f5;
        cursor: pointer;
        position: relative;
        color: #004d93;

        &:before {
          @include chooseStyle;
        }
      }

      .muen-icon {
        display: inline-block;
        transition: 0.5s all cubic-bezier(0.075, 0.82, 0.165, 1);
        transform: rotate(-90deg);
      }

      .muen-icon-extends {
        transform: rotate(90deg);
      }
    }

    .sider-muen-icon {
      font-size: 24px;
      padding-right: 10px;
    }

    .active-menu {
      // @include background_color("hover1");
      background: #d2e6f5;
      color: #004d93;
      position: relative;
      @include ui-border-top(#eee);
      @include ui-border-bottom(#eee);

      &:before {
        @include chooseStyle;
      }

      .dian {
        background: #004d93;
      }
    }

    .child-muens {
      overflow-y: hidden;
      list-style: inside;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .dian {
      display: inline-block;
      height: 4px;
      width: 4px;
      border-radius: 50%;
      background: #000;
      margin-right: 10px;
    }
  }
</style>
