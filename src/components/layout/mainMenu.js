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
    title: $i18n("layouts.components.drawer.系统设置"),
    path: "/system/mail",
    icon: "faas"
  },
  {
    title: $i18n("layouts.components.drawer.租户管理"),
    path: "/tenant/apply",
    icon: "feiyong",
    account: "expenses"
  },
  {
    title: $i18n('layouts.console.siderbar.容器服务'),
    path: "/cloudProvider/container",

    icon: "rongqifuwu",
  },
  {
    title: $i18n('layouts.console.siderbar.应用管理'),
    path: "/productCenter",
    icon: "faas",
  },
  {
    title: $i18n('layouts.console.siderbar.数据统计'),
    path: "/stats/list",
    icon: "rongqifuwu",
  },
];
