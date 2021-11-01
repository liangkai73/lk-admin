/*
 * @Author: lanck.xie
 * @Date: 2020-09-14 14:50:18
 * @Last Modified by: lanck.xie
 * @Last Modified time: 2021-06-13 18:09:00
 * desc:api for cam/user & cam/userGroup
 */

import api from "@/api/config-api";
import { ApiPageRequest, ApiPageResponse } from "../base";
import user from "../user";

/**
 * @desc: 租户状态.
 */
enum TenantStatus {
  审批拒绝 = 4,
  待验证邮箱 = 3,
  待审批 = 2,
  启用 = 1,
  禁用 = 0,
  删除 = -1,
}

export default {
  TenantStatus,
  listTenant,
  updateTenant,
  addTenant,
};

// 获取租户列表
function listTenant(
  params: ApiPageRequest & {
    userId?: string;
    userName?: string; // 用户名
    telephone?: string;
    email?: string;
    status?: TenantStatus[];
  }
): Promise<
  ApiPageResponse<{
    userId: string;
    userName: string;
    telephone: string;
    email: string;
    companyName: string;
    companyEmail: string;
    contactName: string;
    contactPhone: string;
    industry: string; // 行业
    business: string; // 业务
    status: string;
    createBy: string;
    createTime: string;
  }>
> {
  return $UINetwork.get(api.platformUser.list, params);
}

// 更新租户信息
function updateTenant(
  userId: string,
  params: {
    companyName: string;
    companyEmail: string;
    contactName: string;
    contactPhone: string;
    industry: string; // 行业
    business: string; // 业务
    status: TenantStatus;
  }
): Promise<
  {
    userId: string;
    userName: string;
    telephone: string;
    email: string;
    companyName: string;
    companyEmail: string;
    contactName: string;
    contactPhone: string;
    industry: string; // 行业
    business: string; // 业务
    status: string;
    createBy: string;
    createTime: string;
  }
  > {
  const p = {
    userId: userId,
    companyName: params.companyName,
    companyEmail: params.companyEmail,
    contactName: params.contactName,
    contactPhone: params.contactPhone,
    industry: params.industry,
    business: params.business,
    status: params.status,
  };
  return $UINetwork.put(api.platformUser.update + '/' + userId, p);
}


// 添加租户信息
function addTenant(
  params: {
    userName: string;
    telephone?: string;
    email?: string;
    password: string;
  }
): Promise<boolean> {
  const p = {
    userName: params.userName,
    telephone: params.telephone,
    email: params.email,
    password: params.password,
  };
  return $UINetwork.post(api.platformUser.add, p);
}
