/*
 * @Author: lanck.xie
 * @Date: 2020-08-26 14:43:10
 * @Last Modified by: lanck.xie
 * @Last Modified time: 2022-03-28 15:12:09
 */

import layout from "./layout";
import login from "./login";
import user from "./user";
import role from "./role";
import notification from "./notification";
import event from "./event";
import app from "./app";
import cmp from "./cmp";
import ars from "./ars";
import policy from "./policy";
import platformUser from "./platformUser";
import act from "./act";

export default {
  layout, // APP layout相关
  login, // 登录
  user, // 用户
  role, // 角色
  notification, // 通知
  event, // 事件
  app, // 应用管理.
  ars,
  cmp,
  policy,
  platformUser, // 租户相关
  act // 效验模块
};
