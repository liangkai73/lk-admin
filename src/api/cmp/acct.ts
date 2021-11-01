"use strict";

/**
 * Copyright (c) 2018 Copyright originforest All Rights Reserved.
 * Author: cli
 * Date: 2018-07-27 16:02
 * Desc:
 */


import api from "@/api/config-api";

export default {
  getAcct,
  delAcct,
  postAcct,
  updateAcct,
  listAcct,
  getAllCloud,
};

function getAcct() {
  return $UINetwork
    .get(api.cmp.acct.getAcct, null)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function delAcct(params: any) {
  return $UINetwork
    .delete(api.cmp.acct.getAcct, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function postAcct(params: any) {
  return $UINetwork
    .post(api.cmp.acct.postAcct, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function updateAcct(params: any) {
  return $UINetwork
    .post(api.cmp.acct.updateAcct, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function listAcct(params: any) {
  return $UINetwork
    .get(api.cmp.acct.listAcct, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function getAllCloud() {
  return $UINetwork
    .get(api.cmp.expenses.acct, {})
    .then((res: any) => {
      const arr = [];
     return $UINetwork.get(api.cmp.base.list, {}).then((result) => {
        res.forEach((node) => {
          if (!arr.includes(node)) {
            const item = result.filter((t) => {
              return t.code == node.cloudType;
            })[0];
            arr.push(item);
          }  
        });
        return Promise.resolve(arr);
      });
    })
    .catch((err: any) => {
      throw err;
    });
}
