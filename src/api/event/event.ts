"use strict";

/**
 * Copyright (c) 2018 Copyright of All Rights Reserved.
 * Author: cli
 * Date: 2018-07-27 16:02
 * Desc:
 */


import api from "@/api/config-api";

export default {
  displays,
  getEventsTypes,
  getEventsServices,
};

function displays(params) {
  return $UINetwork
    .get(api.app.eventDisplays, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function getEventsTypes(params) {
  return $UINetwork
    .get(api.app.getEventsTypes, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}


function getEventsServices(params) {
  return $UINetwork
    .get(api.app.getEventsServices, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}