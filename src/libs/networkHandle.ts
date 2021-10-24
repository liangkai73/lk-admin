'use strict';

/**
* Copyright (c) 2021 Originforest Co.,Ltd. All Rights Reserved.
* Author: brian.li
* Date: 2021-10-11 10:58
* Desc: 
*/

import bpui from '@bpui/dialog';
import token from '@/api/_token';
import api from "@/api/config-api";


export default class NetworkHandler implements ui.network.INetworkHandler {
  /**
   * @desc 获取网络请求的站点地址;
   * 
   * 如果请求的url不是http/https开头, 将使用此站点地址作为前缀.
   */
  get requestHost(): string {
    return process.env.VUE_APP_URL;
  }

  /**
   * @desc 默认的请求选项.
   */
  get defaultRequestOption(): ui.network.FetchOptionBase {
    const accessToken = token._getToken();
    const headers: any = {
      "Content-Type": "application/json",
      "X-HTTP-AUTHENTICATE": "1",
      // "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, x-http-authenticate",
    };
    if (accessToken && accessToken.accessToken) {
      headers['Authorization'] = `Bearer ${accessToken.accessToken}`;
    }
    return {
      timeout: 20 * 1000,
      credentials: 'include',
      mode: 'cors',
      headers
    }
  }
  
  /**
   * @desc 接收到服务器反馈消息后, 先进行一次原始数据的处理并将处理后的结果返回.
   */
  onRawHandler(serverData: Response, url: string): void {
    switch (serverData.status) {
      case 404:
        $UIToast({ type: "error", content: $i18n('服务暂时不可用') });
        throw new Error('status: ' + serverData.status + "; url: " + url);
        break;
    }
  }
  
  /**
   * @desc: 处理api错误.
   * @param data: 服务器返回的消息.
   * @param err_msg: 使用err_msg来代替服务器的错误消息.
   * @return: 如果正确将返回data, 否则返回null.
   */
  onErrorHandler(data: any, url: string): any {
    
    // common
    switch (data.err_code) {
      case 401: {
        if (url == api.user.getUserInfoNow) {
          window.location.href = '/login';
        }
        else {
          $UIToast("无权限");
        }
        return;
      }
      case 404: {
        $UIToast("找不到资源");
        throw new Error('404');
      }
      case 500: {
        const prefix = 'com.netflix.client.ClientException: Load balancer does not have available server for client: ';
        if (data.err_msg) {
          if (data.err_msg.indexOf(prefix) == 0) {
            $UIToast({ type: "error", content: $i18n('服务暂时不可用') + ': ' + data.err_msg.substr(prefix.length) });
            throw data;
          }
          else if (data.err_msg.indexOf('failed: connect timed out executing') >= 0) {
            $UIToast({ type: "error", content: $i18n('服务暂时不可用') });
            throw data;
          }
        }
      }
        
    }

    if (data.desc) {
      $UIToast({ content: data.desc });
    }

    // debugger;
    // token faile
    if (data.err && data.err != "OK") {
      if (
        data.err_msg == "Token已失效" ||
        data.err_msg == "Token校验失败" ||
        data.err_msg == "Token格式错误"
      ) {
        throw data;
      } else {
        $UIToast({ type: "error", content: $i18n(data.err_msg || data.err_subcode) });
      }

      throw data;
    }
    if (data.err_code >= 200 && data.err_code < 300) {
      return data.data;
    }

    return data.data || data;
  }

  /**
   * 显示loading.
   * @param loadingDom 要显示loading的dom.
   * @param delay      延迟多久显示
   */
  onShowLoading(loadingDom?: any, delay?: number): void {
    if (!loadingDom) {
      $UILoading({
        delay,
      })
    }
    else {
      bpui.apiWidget.showLoadingTarget(loadingDom, {
        delay,
      });
    }
  }

  /**
   * 隐藏loading.
   * @param loadingDom 正在显示loading的dom.
   */
  onHideLoading(loadingDom?: any): void {
    if (!loadingDom) {
      $UILoadingHide();
    }
    else {
      bpui.apiWidget.hideLoadingTarget(loadingDom);
    }
  }
}