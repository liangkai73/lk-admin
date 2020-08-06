import localStore from "@/api/store/userInfo";
export const account = {
  inserted: async function(el: any, bind: any, vnode: any, oldNode: any) {
    // 聚焦元素
    // console.log(el);
    // console.log(bind);
    // console.log(vnode);
    // console.log(oldNode);
    const userInfo: any = await localStore.store_userInfo();
    const accountObj = userInfo.uiPermissions;
    // let accountObj = api.user.getUserAccount(userId);
    // let accountObj = localStore.accountObj();

    for (const key in accountObj) {
      // 确定权限模块
      if (bind.value.modle == key) {
        if (accountObj[key].allow == "*") {
          const arr = accountObj[key].deny;
          const disName = bind.value.name;
          if (arr.includes(disName)) {
            el.style.display = "none";
          }
        } else {
          const arr = accountObj[key].allow;
          const allowName = bind.value.name;
          if (!arr.includes(allowName)) {
            el.style.display = "none";
          }
        }
        //
      }
    }
  },
};
