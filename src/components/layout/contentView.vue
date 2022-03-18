<!--
/**
* Copyright (c) 2020 Copyright of All Rights Reserved.
* Author: lanck
* Date: 2020-08-19 14:18
* Desc:  cosole-content 容器组件
*/
 -->
<style lang="scss">
.content-title {
  height: 50px;
  width: 100%;
  // margin-left: 1px;
  // margin-bottom: 16px;
  // align-items: flex-end;
  // @include background_color('bg_color2');
  background: #fff;
  padding: 0 20px;
  // box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);

  .content-back-icon {
    width: 36px;
    height: 36px;
    background: #dcdcdc;
    text-align: center;
    line-height: 36px;
    margin-right: 20px;
    cursor: pointer;
    border-radius: 2px;

    i {
      line-height: 22px;
      font-size: 16px;
    }
  }

  h2 {
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 22px;
    letter-spacing: 2px;
  }
}

.content-title-root {
  &:hover {
    cursor: pointer;
    color: #0077ff;
  }
}

.content-body {
  margin: 0px 20px 0 20px;
  padding: 20px 10px 20px 20px;
  // padding-top: 0px;
  background: #fff;
  height: auto;
  transition: all 0.2s ease-in-out !important;
  -moz-transition: all 0.2s ease-in-out !important;
  -webkit-transition: all 0.2s ease-in-out !important;
  -o-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  &:after {
    content: "";
    clear: both;
  }
}

.content-body-noGutter {
  padding: 20px 10px 20px 20px;
  // padding-top: 0px;
  height: auto;
  // max-width: 1500px;
  background: #fff;
  margin-left: auto;
  margin-right: auto;
  transition: all 0.2s ease-in-out !important;
  -moz-transition: all 0.2s ease-in-out !important;
  -webkit-transition: all 0.2s ease-in-out !important;
  -o-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  &:after {
    content: "";
    clear: both;
  }
}

.fadeInAnimate {
  position: relative;
  animation: fadeup 1s ease forwards;
}

.content-body-inner {
  // max-width: 1360px;
  margin: 0 auto;
}

@keyframes fadeup {
  0% {
    // transform: translateY(40px);
    top: 40px;
    opacity: 0;
  }

  100% {
    // transform: translateY(0);
    top: 0px;
    opacity: 1;
  }
}
</style>

<template>
  <div>
    <div class="content-title flex_r_s" v-if="!noTitleBar">
      <div
        class="content-back-icon"
        v-show="showBack"
        @click="linkTo(blackPath)"
      >
        <ui-icon name="left"></ui-icon>
      </div>
      <template v-if="isBreadcrumb">
        <h2 class="content-title-root" @click="linkTo(title.root.path)">
          {{ title.root.title }}
        </h2>
        <h2>/</h2>
        <span>{{ title.branch.title }}</span>
      </template>
      <template v-else>
        <h2 class="uselect-none">{{ title }}</h2>
      </template>

      <slot name="titleLeft"></slot>
      <span class="flex1"></span>
      <slot name="titleRight"></slot>
    </div>
    <div :class="[gutter ? 'content-body' : 'content-body-noGutter']">
      <div
        class="content-body-inner"
        :class="[
          {
            fadeInAnimate: fadeInshow,
          },
        ]"
      >
        <slot></slot>
      </div>
    </div>
    <slot name="suffix"></slot>
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
interface titleOptions {
  root: {
    title: string;
    path?: string | "";
  };
  branch: {
    title: string;
  };
}
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
  @Prop({
    type: [String, Object],
    default: "",
  })
  title: string | titleOptions | undefined;
  @Prop({
    type: Boolean,
    default: true,
  })
  gutter: boolean | undefined;
  @Prop({
    type: Boolean,
    default: false,
  })
  showBack: boolean | undefined;
  @Prop({
    type: Boolean,
    default: false,
  })
  noTitleBar: boolean | undefined;
  @Prop({
    default: "",
  })
  blackPath: string;
  // @Prop({ type: String, default: '' }) backPath?: string | '';
  //
  // data.
  // @Provide() demo:number = 1;
  fadeInshow = true;

  //
  // computed.
  get isBreadcrumb() {
    return this.title instanceof Object;
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
  linkTo(url: string) {
    if (url.length > 0) {
      this.$navbar.push({
        path: url,
      });
    } else {
      this.$bpLibs.router.back();
    }
  }

  mounted() {
    this.$timer.setTimeout(() => {
      this.fadeInshow = false;
    }, 1000);
  }
}
</script>
