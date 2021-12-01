<!--
/**
* Copyright (c) 2020 Copyright of All Rights Reserved.
* Author: cli
* Date: 2020-12-07 14:18
* Desc: 消息提示
*/
 -->

<template>
  <div class="cl-message-tips"
       @click="linkTo('/notification/message')"
       :title="$i18n('notification.messagetips.消息中心')">
    <!-- <div class="tips" :class="total > 0 ? '' : 'no-tips'"></div> -->
    <ui-icon name="message2"
             width="24px"
             height="21px"
             style="color:#fff"
             class="cur_P"
             :class="[
        {
          tips: total > 0,
        },
      ]">
    </ui-icon>
  </div>
</template>

<script lang="ts">
import api from '@/api';

import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class extends Vue {
  time_update = null as any;
  total = 0;
  show_new = true;

  constructor() {
    super();
  }

  created() {
    let self = this;
    self.getTotal();

    this.time_update = this.$timer.setInterval(() => {
      self.getTotal();
    }, 60_000);
  }

  mounted() {}

  beforeDestroy() {}

  getTotal() {
    // 开发环境下屏蔽轮询
    if (process.env.VUE_APP_POLLING == 'false') {
      return;
    }
    api.notification.message
      .total(['no_read', 'receive'], '')
      .then((data: any) => {
        // if (this.total < data.total) {
        this.total = parseInt(data.total);
        // }
      })
      .catch((err: any) => {});
  }

  linkTo(url: string, params: any) {
    this.$navbar.push({
      path: url,
      query: params
    });
  }

  handleList() {
    this.$navbar.push({
      path: '../../pages/notification/message'
    });
  }
}
</script>

<style lang="scss" scoped>
.cl-message-tips {
  cursor: pointer;

  .tips {
    position: relative;
    &:after {
      display: inline-block;
      content: '';
      width: 6px;
      height: 6px;
      position: absolute;
      top: 0px;
      right: -3px;
      border-radius: 50%;
      background-color: red;
    }
  }
}
</style>>
