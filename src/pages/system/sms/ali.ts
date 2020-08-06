/*
 * @Description: In User Settings Edit
 * @Author: cli
 */

export default {
  getStatus,
  getListStatus,
  getType,
  getListTypes,
};

const list_status = { "0": "审核中", "1": "审核通过", "2": "审核失败", "10": "不存在或被拉黑" } as any;
const list_types = { 0: "验证码", 1: "短信通知", 2: "推广短信", 3: "国际/港澳台消息" } as any;

function getStatus(status: number | string): string {
  return list_status[status];
}

function getListStatus() {
  return list_status;
}

function getType(type: number | string): string {
  return list_types[type];
}


function getListTypes() {
  return list_types;
}