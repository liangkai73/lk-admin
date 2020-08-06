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
  region,
  regionByProduct,
};

function list() {
  return $UINetwork
    .get(api.cmp.base.list, null)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function region(params: any) {
  return $UINetwork
    .get(api.cmp.base.region, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function regionByProduct(params: any) {
  return $UINetwork
    .get(api.cmp.base.regionByProduct(params.productCode), null)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}