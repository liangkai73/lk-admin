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
};

function add(item: {
  templateType: number,
  templateName: string,
  templateContent: string,
  remark: string,
}) {
  return $UINetwork
    .post(api.notification.sms_tmp.add, item)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function list(search: string, page: Number, limit: Number) {
  return $UINetwork
    .post(api.notification.sms_tmp.list, { search: search, page: page, limit: limit })
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function del(id: string, templateCode: string) {
  return $UINetwork
    .post(api.notification.sms_tmp.delete, { id: id, templateCode: templateCode })
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function get(id: string) {
  return $UINetwork
    .post(api.notification.sms_tmp.get, { id: id })
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function update(item: {
  id: string
  templateCode: string,
  templateType: number,
  templateName: string,
  templateContent: string,
  remark: string,
}) {
  return $UINetwork
    .post(api.notification.sms_tmp.update, item)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}