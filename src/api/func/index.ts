/*
 * @Author: lanck.xie 
 * @Date: 2020-10-27 11:19:06 
 * @Last Modified by: lanck.xie
 * @Last Modified time: 2020-11-11 18:56:55
 * 函数模块
 */
import api from '@/api/config-api';

export default {
  getFunList,
  postFun,
  getRuntimeList,
  getFunDeatil,
  getDeployment,
  postDeploymentFunc,
  postInvocations,
  postAddToken,
  getFunToken,
  getHistoryCode
};

// 获取函数列表
function getFunList() {
  return $UINetwork.get(api.scf.getFunc, {});
}

// 新增函数
function postFun(params: createFun) {
  return $UINetwork.post(api.scf.postFunc, params);
}

// 获取运行列表
function getRuntimeList() {
  return $UINetwork.get(api.scf.getFunRuntime, {});
}

// 获取函数详情
function getFunDeatil(id: string) {
  return $UINetwork.get(api.scf.getFuncDetail(id), {});
}
// 获取函数日志

function getDeployment(id: string) {
  return $UINetwork.get(api.scf.getDeployment(id), { line: 20 });
}
// 部署管理
function postDeploymentFunc(params: any) {
  return $UINetwork.post(api.scf.postDeploymentFunc, params);
}
// 函数调用
function postInvocations(id: any, params: any) {
  return $UINetwork.post(api.scf.PostInvocations(id), params);
}
// token创建
function postAddToken(params: any) {
  return $UINetwork.post(api.scf.postFunToken, params, { contentType: 'formData' });
}

// 获取token list
function getFunToken() {
  return $UINetwork.get(api.scf.getFunToken, {});
}

// 获取历史函数代码
function getHistoryCode(id: any) {
  const params = {
    functionId: id
  };
  return $UINetwork.get(api.scf.getHistoryCode(id), params);
}