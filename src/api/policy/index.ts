/*
 * @Author: lanck.xie
 * @Date: 2020-09-14 15:55:55
 * @Last Modified by: lanck.xie
 * @Last Modified time: 2021-04-13 11:37:18
 */
// / <reference path="./index.d.ts" />

import api from "@/api/config-api";

// 获取策略信息/策略列表
function getPolicyList(params: any) {
  return $UINetwork.get(api.policy.getPolicyList, params);
}
// 获取单个权限
function getPolicy(id: number | string) {
  return $UINetwork.get(api.policy.getPolicy(id), null);
}

// 新建策略
function postPolicy(params: any) {
  return $UINetwork.post(api.policy.postPolicy, params);
}

// 删除策略
function deletePolicy(arr: any[]) {
  const str = arr.join();
  const params = {
    codes: str,
  };

  return $UINetwork.delete(api.policy.deletePolicy, params);
}

export default {
  getPolicy,
  getPolicyList,
  postPolicy,
  deletePolicy,
};
