"use strict";

/**
 * Copyright (c) 2018 Copyright of All Rights Reserved.
 * Author: cli
 * Date: 2018-07-27 16:02
 * Desc:
 */


import api from "@/api/config-api";

export default {
  list,
  addRR,
  delRR,
  listRR,
  sync,
};

function list() {
  return $UINetwork
    .post(api.cmp.dns.listDns, null)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function listRR(params: any) {
  return $UINetwork
    .post(api.cmp.dns.listRR, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function addRR(params: any) {
  return $UINetwork
    .post(api.cmp.dns.addRR, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function delRR(params: any) {
  return $UINetwork
    .delete(api.cmp.dns.delRR, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function sync() {
  return $UINetwork
    .get(api.cmp.dns.sync, null)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}