/*
 * @Author: lanck.xie
 * @Date: 2020-08-26 14:29:42
 * @Last Modified by: lanck.xie
 * @Last Modified time: 2020-09-14 16:24:04
 * @项目布局相关 - 静态api
 */

import { STORE_THEME, STORE_SIDERBAR } from '../store';

// 设置项目主题
function setAppTheme(type = 'light'): void {

  const temStore = $UIStorage.namespace(STORE_THEME.name);
  temStore.set(STORE_THEME.key, type);

  document.body.setAttribute('data-theme', type);
}

// 获取当前主题
function getAppTheme(): string {
  const temStore = $UIStorage.namespace(STORE_THEME.name);
  return temStore.get(STORE_THEME.key) || 'light';

}

// 设置当前siderbar状态
interface siderbarStatus {
  index: number,
  activePath: string
}

function setSiderbarStatus(module: any, obj: siderbarStatus) {
  if (STORE_SIDERBAR.module.includes(module)) {
    const temStore = $UIStorage.namespace(STORE_SIDERBAR.name);
    temStore.set(module, obj as any);
  }
  return;
}
// 获取siderbar状态
function getSiderbarStatus(module: any): siderbarStatus {
  if (STORE_SIDERBAR.module.includes(module)) {
    const temStore = $UIStorage.namespace(STORE_SIDERBAR.name);
    return temStore.get(module) as any;
  }
  return {
    index: NaN,
    activePath: ''
  };

}


export default {
  setAppTheme,
  getAppTheme,
  setSiderbarStatus,
  getSiderbarStatus
};
