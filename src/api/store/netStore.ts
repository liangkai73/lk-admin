/*
 * @Author: lanck.xie
 * @Date: 2021-09-15 17:56:19
 * @Last Modified by: lanck.xie
 * @Last Modified time: 2022-04-09 14:32:55
 * @Desc 服务器store存取
 */
import api from "@/api/config-api";

const KEYARR = ["guideStatus"];

const allObj = {
  guideStatus: {
    account: false,
    store: false,
    expense: false,
    info: false,
    addUser: false,
  },
};

function getNetStore(key) {
  // postNetStore('guideStatus',allObj.guideStatus)
  return
  if (KEYARR.includes(key)) {
    return $UINetwork
      .get(api.user.getNetStore, { module_key: key })
      .then((result) => {
        if (!result) {
          result = allObj[key];
        } else {
          result = JSON.parse(result);
        }
        // result = allObj[key];
        return Promise.resolve(result);
      });
  } else {
    console.error("请输入合法的netStore_key");
  }
}

function postNetStore(key, value) {
  if (KEYARR.includes(key)) {
    // allObj[key] = value;
    return $UINetwork
      .post(api.user.postNetStore + "?module_key=" + key, value, {
        contentType: "textPlain",
      })
      .then((result) => {
        // console.log(result);
      });
  }
  return Promise.reject(false);
}

export { getNetStore, postNetStore };
