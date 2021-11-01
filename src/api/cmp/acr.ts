"use strict";

/**
 * Copyright (c) 2018 Copyright originforest All Rights Reserved.
 * Author: cli
 * Date: 2018-07-27 16:02
 * Desc:
 */



import api from "@/api/config-api";

export default {
 instance,
  list,
  getRepo,
  updateRepo,
  addRepo,
  delRepo,
  list_repos,
};

function instance() {
  return $UINetwork
    .post(api.cmp.acr.instance, null)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function list() {
  return $UINetwork
    .post(api.cmp.acr.instance_list, null)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function getRepo(params: any) {
  return $UINetwork
    .get(api.cmp.acr.repo, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function updateRepo(params: any) {
  return $UINetwork
    .put(api.cmp.acr.repo, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function addRepo(params: any) {
  return $UINetwork
    .post(api.cmp.acr.repo, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function delRepo(params: any) {
  return $UINetwork
    .delete(api.cmp.acr.repo, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function list_repos() {
  return $UINetwork
    .post(api.cmp.acr.repos_list, null)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}