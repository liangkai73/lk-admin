"use strict";

/**
 * Copyright (c) 2018 Copyright originforest All Rights Reserved.
 * Author: cli
 * Date: 2018-07-27 16:02
 * Desc:
 */



import api from "@/api/config-api";

export default {
 list,

};

function list() {
  return $UINetwork
    .post(api.cmp.scene.list, null)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}