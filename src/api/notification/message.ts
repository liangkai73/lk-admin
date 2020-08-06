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
  del,
  get,
  update,
  total,
};

function list(search: string, page: Number, limit: Number) {
  return $UINetwork
    .post(api.notification.message.list, {
      search: search,
      page: page,
      limit: limit,
    })
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function del(id: string) {
  return $UINetwork
    .post(api.notification.message.delete, { id: id })
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function get(id: string) {
  return $UINetwork
    .post(api.notification.message.get, { id: id })
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function update(id: string, status: string) {
  return $UINetwork
    .post(api.notification.message.update, { id: id, status: status })
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function total(status: string[], search: string) {
  return $UINetwork
    .post(api.notification.message.total, { status: status, search: search }, { noLoading: true})
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
