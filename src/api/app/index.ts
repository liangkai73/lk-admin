/*
 * @Author: lanck.xie
 * @Date: 2020-09-14 14:50:18
 * @Last Modified by: lanck.xie
 * @Last Modified time: 2021-06-23 10:33:18
 * desc:api for app
 */

import api from "@/api/config-api";
import config from "@/api/config";
import { App } from "./types";
import func from "../func";

// 获取应用列表
function getApplist(params: any) {
  return $UINetwork.get(api.app.getAppList, params);
}

// 获取App详情
function getApp(id: string) {
  return $UINetwork.get(api.app.getApp(id), {});
}
// 添加应用
function postApp(parmas: App.appParams) {
  return $UINetwork.post(api.app.postApp, parmas);
}
// 删除应用
function removeApp(id: any) {
  const params = {
    appId: id,
  };
  return $UINetwork.delete(api.app.removeApp(id), {});
}

// 修改应用
function putApp(id: string, parmas: any) {
  return $UINetwork.put(api.app.putApp(id), parmas);
}
// 获取分组信息
function getCatalog() {
  return $UINetwork.get(api.app.getCatalog, {});
}
// 创建分组信息
function postCatalog(params: any) {
  return $UINetwork.post(api.app.postCatalog, params);
}
// 创建分组信息
function getRuntimeList() {
  return $UINetwork.get(api.app.getRuntimeList, {});
}
// 获取服务器列表
function getClusterList() {
  return $UINetwork.get(api.app.getClusterList, {});
}
//  获取容器信息 CPU-MEM
function getSemItemspec() {
  const params = {
    clzName: "VCPU-MEM",
  };
  return $UINetwork.get(api.app.getSemItemspec, params);
}

// 获取事件列表
function getEventList(params: any, options?:any) {
  return $UINetwork.post(api.app.getEventList, params, options);
}

function getAppCount() {
  return $UINetwork.get(api.app.getAppCount, null, {noLoading: true});
}

function getClusterRepoList() {
  return $UINetwork.get(api.app.getClusterRepoList, {});
}

// 下载文件
function getFileDownload(id: string) {
  return $UINetwork.get(api.file.getFileDownload(id), {});
}

// 获取文件信息
function getFileInfo(id: string) {
  return $UINetwork.get(api.file.getFileInfo(id), {});
}

export default {
  getApplist,
  getApp,
  postApp,
  putApp,
  getCatalog,
  postCatalog,
  getRuntimeList,
  getClusterList,
  getSemItemspec,
  removeApp,
  getEventList,
  getAppCount,
  getClusterRepoList,
  getFileDownload,
  getFileInfo,
};
