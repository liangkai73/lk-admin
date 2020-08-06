/*
 * @Author: lanck.xie
 * @Date: 2021-06-12 19:56:09
 * @Last Modified by: lanck.xie
 * @Last Modified time: 2021-06-13 18:02:22
 * @Desc 本地存储 - userifno  account
 */
import user from "../user";
import { STORE_USERINFO } from "./index";

export default {
  store_userInfo,
  _setUserInfo,
  _getUserInfo,
};

async function store_userInfo() {
  if (window.location.pathname == "/costOptimization/report/index2") {
    console.log("get1");
    return true;
  }
  const userinfo = _getUserInfo();
  const $timer = (userinfo as any).$timer || 0;
  const nowTime = new Date().getTime();
  const utc = nowTime - $timer;

  if (utc / (60 * 1000) >= 5) {
    await user.getUserInfoNow().then((res: any) => {
      res.$timer = new Date().getTime();
      _setUserInfo(res);
    });
  }
  return _getUserInfo();
}

function _setUserInfo(obj: object) {
  if (window.location.pathname == "/costOptimization/report/index2") {
    console.log("get2");
    return true;
  }
  const temStore = $UIStorage.namespace(STORE_USERINFO.name);
  temStore.set(STORE_USERINFO.key, obj as any);
  return temStore;
}

function _getUserInfo() {
  if (window.location.pathname == "/costOptimization/report/index2") {
    console.log("get3");
    return true;
  }
  const temStore = $UIStorage.namespace(STORE_USERINFO.name);
  const userinfo = temStore.get(STORE_USERINFO.key);
  return userinfo || "";
}
