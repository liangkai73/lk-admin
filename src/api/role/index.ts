/*
 * @Author: lanck.xie 
 * @Date: 2020-10-10 14:59:20 
 * @Last Modified by: lanck.xie
 * @Last Modified time: 2020-10-10 15:13:15
 */


import api from '@/api/config-api';
import config from '@/api/config';

export default {
  getRole,
  putRole,
  postRole,
  deleteRole,
};

// 查询角色列表
function getRole(limitParams?: any) {
  const params = limitParams || {};
  return $UINetwork.get(api.role.getRamRole, params);
}

function putRole() { }

// 新增角色列表
function postRole(params: roleItem) {
  return $UINetwork.post(api.role.postRamRole, params);
}
function deleteRole(roleId: any) {
  return $UINetwork.delete(api.role.deleteRamRole(roleId), {});
}