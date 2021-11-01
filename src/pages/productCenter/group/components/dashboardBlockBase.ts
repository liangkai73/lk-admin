'use strict';


/**
* Copyright (c) 2021 Copyright originforest All Rights Reserved.
* Author: brian.li
* Date: 2021-04-17 14:14
* Desc: 
*/
import { Component, Prop, Provide, Vue } from "vue-property-decorator";
import * as febs from 'febs';

/**
 * 格子占用宽度类型.
 */
export enum DashboardBlockSizeType {
  /** 单格 */
  size1 = 1,
  /** 双格 */
  size2 = 2,
  /** 4格 */
  size4 = 4,
}


@Component
export class DashboardBlockMixins extends Vue {

  /**
   * 标题
   */
  @Provide() title: string = '';

  /**
   * 宽度
   */
  @Provide() sizeType: DashboardBlockSizeType = DashboardBlockSizeType.size1;

  /**
   * herf跳转链接.
   */
  @Provide() href: string = '#';

  /**
   * 获得宽度css类型
   */
  get blockSizeTypeCssClass(): string {
    if (this.sizeType == 1) return 'dashboard-block-size1';
    else if (this.sizeType == 2) return 'dashboard-block-size2';
    else return 'dashboard-block-size4';
  }

  /**
   * 点击block跳转.
   */
  protected onClickBlock() {
    if (!febs.string.isEmpty(this.href) && this.href != '#') {
      window.location.href = this.href;
    }
  }
}
