"use strict";

/**
 * Copyright (c) 2018 Copyright tj All Rights Reserved.
 * Author: cli
 * Date: 2018-07-27 16:02
 * Desc:
 */


import api from "@/api/config-api";

export default {
  add,
  list,
  del,
  get,
  update,
  addUid,
};

function add(subject: string, tmp: string, type: string) {
  return $UINetwork
    .post(api.notification.message_tmp.add, { subject: subject, template: tmp, type: type })
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function addUid() {
  return $UINetwork
    .post(api.notification.message_tmp.addUid, {})
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function list(search: string, page: Number, limit: Number) {
  return $UINetwork
    .post(api.notification.message_tmp.list, { search: search, page: page, limit: limit })
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function del(id: string) {
  return $UINetwork
    .post(api.notification.message_tmp.delete, { id: id })
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function get(id: string) {
  return $UINetwork
    .post(api.notification.message_tmp.get, { id: id })
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function update(id: string, subject: string, tmp: string, type: string) {
  return $UINetwork
    .post(api.notification.message_tmp.update, { id: id, subject: subject, template: tmp, type: type })
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}