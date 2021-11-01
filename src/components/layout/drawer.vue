<template>
  <div class="drawer">
    <div :class="maskClass" @click="closeByMask"></div>
    <div :class="mainClass" :style="mainStyle" class="main">
      <!-- <div class="drawer-head">
        <span>{{ title }}</span>
        <span class="close-btn" v-show="closable" @click="closeByButton"
          >X</span
        >
      </div>-->
      <div class="drawer-body">
        <div
          class="item flex_r_s"
          :class="[
            {
              active_item: item.path == activePatch,
            },
          ]"
          v-for="(item, index) in list_menu"
          @mouseenter="togolActiveI(index)"
          @mouseleave="togolActiveI(NaN)"
          :key="index"
          @click="linkTo(item.path)"
          v-account="{ modle: 'consoleSiderbar', name: item.account }">
          <ui-icon :name="(index == activeMune||activePatch == item.path)?item.icon+2:item.icon"></ui-icon>
          <span>{{ item.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import mainMenu from './mainMenu';

export default {
  props: {
    // // 是否打开
    // display: {
    //   type: Boolean,
    // },

    // 标题
    title: {
      type: String,
      default: $i18n('layouts.components.drawer.标题')
    },

    // 是否显示关闭按钮
    closable: {
      type: Boolean,
      default: true
    },

    // 是否显示遮罩
    mask: {
      type: Boolean,
      default: true
    },

    // 是否点击遮罩关闭
    maskClosable: {
      type: Boolean,
      default: true
    },

    // 宽度
    width: {
      type: String,
      default: "200px"
    },

    // 是否在父级元素中打开
    inner: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      display: false,
      activeMune: NaN,
      list_menu: mainMenu,
      activePatch: ""
    };
  },

  computed: {
    maskClass: function () {
      return {
        "mask-show": this.mask && this.display,
        "mask-hide": !(this.mask && this.display),
        inner: this.inner
      };
    },
    mainClass: function () {
      return {
        "main-show": this.display,
        "main-hide": !this.display,
        inner: this.inner
      };
    },
    mainStyle: function () {
      return {
        width: this.width,
        left: this.display ? "0" : `-${this.width}`,
        borderLeft: this.mask ? "none" : "1px solid #eee"
      };
    }
  },
  created () {
    this.activePatch = this.$route.path;
    // this.list_menu.forEach((node) => {
    //   let path = node.link;
    //   if(path ==)
    // });
  },
  mounted () {
    if (this.inner) {
      let box = this.$el.parentNode;
      box.style.position = "relative";
    }

    this.$root.$on("left-menu", this.onLeftMenu);
    this.$root.$VnodeMenue = this;
  },
  methods: {
    onLeftMenu () {
      this.display = !this.display;
    },

    closeByMask () {
      this.maskClosable && this.$emit("update:display", false);
      this.display = false;
    },
    togolActiveI (i) {
      this.activeMune = i;
    },
    closeByButton () {
      this.display = false;
      this.$emit("update:display", false);
    },
    linkTo (url) {
      this.$navbar.push({
        path: url
      });
    }
  },
  watch: {
    display (a, b) {
      this.$root.$emit("changeMenu", a);
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin chooseStyle {
  content: "";
  height: 40px;
  width: 3px;
  background: #004d93;
  position: absolute;
  top: 0;
  left: 0;
}
.drawer {
  /* 遮罩 */
  z-index: 1002;
  position: relative;
  .mask-show {
    position: fixed;
    top: 50px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 1;
    transition: opacity 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  .mask-hide {
    opacity: 0;
    transition: opacity 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  /* 滑块 */
  .main {
    position: fixed;
    z-index: 10;
    top: 50px;
    left: 0;
    height: 100%;
    background: #ededed;
    transition: all 0.5s;
  }
  .main-show {
    opacity: 1;
  }
  .main-hide {
    opacity: 0;
  }

  /* 某个元素内部显示 */
  .inner {
    position: absolute;
  }

  /* 其他样式 */
  .drawer-head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    line-height: 45px;
    padding: 0 15px;
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px solid #eee;
    .close-btn {
      display: inline-block;
      cursor: pointer;
      height: 100%;
      padding-left: 20px;
    }
  }
  .drawer-body {
    font-size: 12px;
    margin-top: 50px;
  }

  .item {
    padding: 15px;
    height: 40px;
    cursor: pointer;
    i {
      font-size: 18px;
    }
    span {
      padding-left: 10px;
    }
    &:hover {
      background-color: #d2e6f5;
      color: #004d93;
      position: relative;
      &:before {
        @include chooseStyle;
      }
    }
  }
  .active_item {
    color: #004d93;
    background-color: #d2e6f5;
    position: relative;
    &:before {
      @include chooseStyle;
    }
  }
}
</style>
