"use strict";

/**
 * Copyright (c) 2021 Originforest Co.,Ltd. All Rights Reserved.
 * Author: brian.li
 * Date: 2021-11-01 13:06
 * Desc:
 */

export default [

  {
    title: $i18n("layouts.components.drawer.首页"),
    path: "/console/overview",
    icon: "home",
    account: "overview"
  },
  {
    title: $i18n('用户中心'),
    path: "/ram/user",
    icon: "rongqifuwu",
  },

  {
    title: $i18n("layouts.components.drawer.租户管理"),
    path: "/tenant/apply",
    icon: "feiyong",
    account: "expenses"
  },

  {
    title: $i18n("layouts.components.drawer.系统设置"),
    path: "/system/mail",
    icon: "faas"
  },
  {
    title: $i18n('订单管理'),
    path: "/order/list",
    icon: "faas",
  },
  {
    title: $i18n('优惠券管理'),
    path: "/coupon/list",
    icon: "faas",
  },
  {
    title: $i18n('独立站模板管理'),
    path: "/template/list",
    icon: "rongqifuwu",
  },
  {
    title: $i18n('数据分析管理'),
    path: "/stats/list",
    icon: "rongqifuwu",
  },
];
