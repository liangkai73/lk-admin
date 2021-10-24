/*
 * @Author: lanck.xie
 * @Date: 2020-09-14 14:50:18
 * @Last Modified by: lanck.xie
 * @Last Modified time: 2021-06-13 18:09:00
 * desc:api for cam/user & cam/userGroup
 */

import api from "@/api/config-api";

export default {
  getRamUser,
  postRamUser,
  putRamUser,
  deleteRamUser,
  addToGroup,
  getUserInfoNow,
  PutUserInfoNow,
  editUserInfo,
  getRequestCode,
  getVerifyCode,
  postResetPwd,
  postVerifyCode,
  getUserInfo,
  getUserList,
  postUser,
  deleteUser,
  getUserGroupList,
  addUserGroup,
  removeUserGroup,
  getUserRoles,
  postUserRoles,
  deleteUserRoles,
  //  用户组-------
  getGroupInfo,
  putGroupInfo,
  removeGroup,
  getGroup_users,
  postGroup_users,
  removeGroup_users,
  getGroup_permissions,
  postGroup_permissions,
  removeGroup_permissions,
};
// 查询ram用户
function getRamUser(limitParams?: Ram.limit) {
  const Params = limitParams || {};
  // return $UINetwork.get(api.user.getRamUser, Params);
}

// 新增ram用户
function postRamUser(arr: Ram.ramUserItem[]) {
  // return $UINetwork.post(api.user.postRamUser, arr);
}
// 修改ram用户信息
function putRamUser(userId: number | string, params: Ram.ramUserItem) {
  // return $UINetwork.put(api.user.putRamUser(userId), params);
}

// 批量删除

function deleteRamUser(arr: any[]) {
  const params = {
    userIdArray: arr,
  };
  // return $UINetwork.delete(api.user.deleteRamUser, params);
}

// 添加到群组

function addToGroup(params: any) {
  // return $UINetwork.post(api.user.postAddToGroup, params);
}

// 获取当前用户信息
async function getUserInfoNow() {
  return $UINetwork
    .get(api.user.getUserInfoNow, {}, { noLoading: true })
    .then((result: any) => {
      return Promise.resolve(result);
    })
    .catch((err: any) => {
      return Promise.reject(err);
    });
}
// 修改租户资料(企业)
function PutUserInfoNow(params: any) {
  return $UINetwork.put(api.user.PutUserInfoNow, params);
}

// 修改用户信息

function editUserInfo(userId: any, params: any) {
  return $UINetwork.put(api.user.putUserInfo(userId), params);
}

// 获取当前用户权限 废弃 合并到userinfo

// function getUserAccount(id: string) {
//   let child1: any = {
//     overview: { allow: "*", disable: "warn,setting" },
//     // consoleSiderbar: { allow: "overview,app", disable: "*" },
//     // consoleSiderbar: { allow: "overview,warn", disable: "*" },
//   };
//   return $UINetwork.get(api.user.getUserPermission(id), {});
// }

// 获取手机验证码
function getRequestCode(params: {
  sendType: 'EMAIL' | 'PHONE',
  sendScene: 'REGISTER_CN' | 'REGISTER_EN' | 'RESET_PWD_CN' | 'RESET_PWD_EN',
  target: string,
  code: string, // 图形验证码.
}) {
  return $UINetwork.get(api.user.getRequestCode, {
    sendType: params.sendType,
    sendScene: params.sendScene,
    target: params.target,
    code: params.code,
  });
}

// 获取图形验证码
function getVerifyCode() {
  return $UINetwork.get(api.user.getVerifyCode, {});
}

interface verifyCode {
  username?: string;
  checkCode: string;
}
// 校验验证码
function postVerifyCode(params: verifyCode) {
  return $UINetwork.post(api.user.postVerifyCode, params);
}

interface resetPwParams {
  password: string;
  checkCode: string;
}
// 重置密码
function postResetPwd(params: resetPwParams) {
  return $UINetwork.post(api.user.postResetPwd, params);
}

// 获取用户列表
function getUserList(params: any) {
  return $UINetwork.get(api.user.getUserList, params);
}
// 获取用户信息
function getUserInfo(id: number | string) {
  return $UINetwork.get(api.user.getUserInfo(id), {});
}
// 添加用户
function postUser(params: any) {
  return $UINetwork.post(api.user.postUser, params);
}
// 批量删除用户
function deleteUser(arr: any[]) {
  const str = arr.join();
  const params = {
    ids: str,
  };

  return $UINetwork.delete(api.user.deleteUser, params);
}

interface groupParams {
  roleName?: string;
  roleCode?: string;
  description?: string;
}
// 获取用户组/角色 列表
function getUserGroupList(params?: groupParams) {
  return $UINetwork.get(api.user.getUserGroup, params || {});
}
// 添加户组/角色 列表
function addUserGroup(params: any) {
  return $UINetwork.post(api.user.postUserGroup, params);
}
// 删除用户组/角色 列表
function removeUserGroup(arr: any[]) {
  const str = arr.join();
  const params = {
    ids: str,
  };
  return $UINetwork.delete(api.user.deleteUserGroup, params);
}

// 获取用户组信息
function getGroupInfo(id: number | string) {
  return $UINetwork.get(api.user.getGroupInfo(id), {});
}
// 修改用户组信息
function putGroupInfo(id: number | string, params: object) {
  return $UINetwork.put(api.user.putGroupInfo(id), params);
}
// 删除用户组
function removeGroup(id: number | string) {
  return $UINetwork.delete(api.user.deleteGroup(id), {});
}

// 获取用户组用户列表
function getGroup_users(id: number | string) {
  return $UINetwork.get(api.user.getGroup_Users(id), {});
}
// 添加用户组用户
function postGroup_users(id: number | string, params: any[]) {
  return $UINetwork.post(api.user.postGroup_Users(id), params);
}
// 删除用户组用户
function removeGroup_users(id: number | string, params: any) {
  return $UINetwork.delete(api.user.deleteGroup_Users(id), params);
}
// 获取角色的权限策略列表
function getGroup_permissions(id: number | string) {
  return $UINetwork.get(api.user.getGroup_permissions(id), {});
}
// 添加角色的权限策略列表
function postGroup_permissions(id: number | string, params: any) {
  return $UINetwork.post(api.user.postGroup_permissions(id), params);
}
// 删除角色的权限策略列表
function removeGroup_permissions(id: number | string, params: any) {
  return $UINetwork.delete(api.user.deleteGroup_permissions(id), params);
}
// 获取用户所有的组
function getUserRoles(id: number | string) {
  return $UINetwork.get(api.user.getUserRoles(id), {});
}
// 添加用户所有的组
function postUserRoles(id: number | string, params) {
  return $UINetwork.post(api.user.getUserRoles(id), params);
}
// 获取用户所有的组
function deleteUserRoles(id: number | string, params) {
  return $UINetwork.delete(api.user.getUserRoles(id), params);
}
