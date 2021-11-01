

/**
* Copyright (c) 2017 Copyright originforest All Rights Reserved.
* Author: huangxinping
* Date: 2020-09-16 15:29
* Desc: 监听图表父级div变动，重置图表
*/

import ResizeListener from "element-resize-detector";
export default {
  mounted() {
    this.initListener()
  },
  // 进入页面触发
  activated() {
    this.initListener()
  },
  beforeDestroy() {
    this.destroyListener()
  },
  deactivated() {
    this.destroyListener()
  },
  methods: {
    initListener() {
      const instance = ResizeListener({
        strategy: 'scroll',
        callOnAdd: true
      });
      instance.listenTo(this.$el, () => {
        const { chart } = this
        if (!chart) return;
        this.resize();
      });
    },
    handleWindowResize() {
      this.debounce(() => {
        this.resize()
      }, 100)
    },
    resize() {
      const { chart } = this;
      chart && chart.resize();
    },
    destroyListener() {
      window.removeEventListener('resize', this.handleWindowResize)
    },
    debounce(func, wait, immediate) {
      let timeout, args, context, timestamp, result
      const later = function () {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp
        // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
        if (last < wait && last > 0) {
          timeout = setTimeout(later, wait - last)
        } else {
          timeout = null
          // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
          if (!immediate) {
            result = func.apply(context, args)
            if (!timeout) context = args = null;
          }
        }
      }
    },
  }
}
