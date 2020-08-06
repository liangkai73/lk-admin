/*
 * @Author: lanck.xie
 * @Date: 2020-09-21 10:34:18
 * @Last Modified by: lanck.xie
 * @Last Modified time: 2021-06-13 18:09:15
 * token相关
 */

import { STORE_TOKEN } from "./store";

export default {
  _setToken,
  _getToken,
  _clearToken,
};

interface tokenObj {
  accessToken: string;
  // expiresIn: number;
  // outTime: number;
  // refreshToken?: any;
  // tokenType?: any;
}

//  存储token到本地空间
function _setToken(obj: any) {
  const temStore = $UIStorage.namespace(STORE_TOKEN.name);
  // let outTime = new Date().getTime() + (obj.expiresIn * 60 * 1000);
  temStore.set(STORE_TOKEN.key, obj);
  return temStore;
}
function _clearToken() {
  const temStore = $UIStorage.namespace(STORE_TOKEN.name);
  // let outTime = new Date().getTime() + (obj.expiresIn * 60 * 1000);
  temStore.clear();
  return temStore;
}
// 从本地空间获取token

function _getToken(): tokenObj {
  const temStore = $UIStorage.namespace(STORE_TOKEN.name);
  const tokenObj:any = temStore.get(STORE_TOKEN.key);
  return tokenObj ? {accessToken: tokenObj} : { accessToken: '' };
}
