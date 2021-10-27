/*
 * @Author: lanck.xie
 * @Date: 2020-09-21 10:34:18
 * @Last Modified by: lanck.xie
 * @Last Modified time: 2021-06-13 18:09:15
 * token相关
 */

import { STORE_TOKEN, STORE_TEMP_TOKEN } from "./store";

export default {
  /** 临时会话token. */
  setTempToken,
  getTempToken,
  clearTempToken,

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


function setTempToken(tmpToken: string) {
  const temStore = $UIStorage.namespace(STORE_TEMP_TOKEN.name);
  temStore.set(STORE_TEMP_TOKEN.key, JSON.stringify({
    tmpToken,
    now: Date.now(),
  }));
}

function getTempToken(): string {
  const temStore = $UIStorage.namespace(STORE_TEMP_TOKEN.name);
  let value:any = temStore.get(STORE_TEMP_TOKEN.key);
  if (value) {
    try {
      value = JSON.parse(value);
    } catch (e) {
      clearTempToken();
      return null;
    }
    if (value.now + 30 * 60 * 1000 < Date.now()) {
      clearTempToken();
      return null;
    }
    return value.tmpToken;
  }
}

function clearTempToken() {
  const temStore = $UIStorage.namespace(STORE_TEMP_TOKEN.name);
  temStore.clear();
}