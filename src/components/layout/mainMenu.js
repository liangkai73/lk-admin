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

  // {
  //   title: $i18n("layouts.components.drawer.租户管理"),
  //   path: "/tenant/apply",
  //   icon: "feiyong",
  //   account: "expenses"
  // },

  {
    title: $i18n("layouts.components.drawer.系统设置"),
    path: "/system/mail",
    icon: "faas"
  },

  // {
  //   title: $i18n("租户中心"),
  //   path: "/tenant/list",
  //   icon: "costOptimization",
  //   account: "expenses"
  // },
  // {
  //   title: $i18n("站内信/通知"),
  //   path: "/notification/message",
  //   icon: "feiyong",
  // },

  {
    title: $i18n("防伪编码查询"),
    path: "/query",
    icon: "feiyong"
  },
  {
    title: $i18n('防伪批次管理'),
    path: "/batch/list",
    icon: "rongqifuwu",
  },
];
