/*
 * @Author: lanck.xie
 * @Date: 2022-03-28 15:07:56
 * @Last Modified by: lanck.xie
 * @Last Modified time: 2022-04-11 15:45:01
 */

import api from "@/api/config-api";
import config from "@/api/config";

// 溯源防伪编码信息
function getTrace(code: any) {
  return $UINetwork.get(api.act.getTrace(code), {});
}
// 获取批次列表
function getBatchList(params: any) {
  return $UINetwork.get(api.act.getBatchList, params);
}
// 添加批次信息
function PostBatchList(params) {
  return $UINetwork.post(api.act.PostBatchList, params);
}
// 获取批次信息
function getBatchById(id: any) {
  return $UINetwork.get(api.act.getBatchById(id), {});
}
// 修改批次信息
function putBatchById(id: any, params) {
  return $UINetwork.put(api.act.putBatchById(id), params);
}
// 删除批次信息
function deleteBatchById(id: any) {
  return $UINetwork.delete(api.act.deleteBatchById(id), {});
}
// 获取批次中编码列表
function getBatchCode(params: any) {
  return $UINetwork.get(api.act.getBatchCode, params);
}
// 添加批次阶段信息
function postBatchStage(params) {
  return $UINetwork.post(api.act.postBatchStage, params);
}
// 删除批次阶段信息
function deleteBatchStage(id: any) {
  return $UINetwork.delete(api.act.deleteBatchStage(id), {});
}

export default {
  getTrace,
  getBatchList,
  PostBatchList,
  getBatchById,
  getBatchCode,
  postBatchStage,
  deleteBatchStage,
  putBatchById,
  deleteBatchById
};
