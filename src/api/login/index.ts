/*
 * @Author: lanck.xie
 * @Date: 2020-09-17 16:17:27
 * @Last Modified by: lanck.xie
 * @Last Modified time: 2021-04-22 16:11:53
 * @desc:登陆模块
 */
import api from "@/api/config-api";
import _token from "../_token";
import user from "../user";

function tmpToken() {
  return $UINetwork
    .get(api.login.token, {})
    .then((res: any) => {
      return res;
    })
    .catch((err: any) => {
      throw err;
    });
}

function postLogin(params: login.loginParams) {
  return $UINetwork
    .post(api.login.postLogin, params, { contentType: "formData" })
    .then((res: any) => {
      _token._setToken(res);
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      return Promise.reject(err);
    });
}
function register(params: login.registerParams) {
  return $UINetwork
    .post(api.login.postRegister, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

// 查询登录状态
function isLogin(): Promise<boolean> {
  return user
    .getUserInfoNow()
    .then((result: any) => {
      return Promise.resolve(!!result);
    })
    .catch((err: any) => {
      return Promise.reject(err);
    });
}
// 登出
function postLogout() {
  return $UINetwork
    .post(api.login.postLogout, {})
    .then((res: any) => {
      _token._clearToken();
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

export default {
  tmpToken,
  postLogin,
  register,
  isLogin,
  postLogout,
};
