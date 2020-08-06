"use strict";

/**
 * Copyright (c) 2018 Copyright of All Rights Reserved.
 * Author: cli
 * Date: 2018-07-27 16:02
 * Desc:
 */

import api from "@/api/config-api";

export default {
  current_cpu,
  last_cpu,
  app_cpu,
  cpu,

  current_mem,
  last_mem,
  app_mem,
  mem,

  conn,
  app_conn,
  last_conn,

  getAppLog,
};

function current_cpu(options?: any) {
  const current_time = new Date().getTime();
  const interval = 60 * 1000;
  const endTime = current_time - interval;
  return $UINetwork
    .get(
      api.ars.cpu,
      {
        interval: "1m",
        startTime: endTime,
        endTime: current_time,
      },
      options
    )
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

// 过去60分钟CPU
function last_cpu() {
  const current_time = new Date().getTime();
  const interval = 60 * 60 * 1000;
  const endTime = current_time - interval;

  return $UINetwork
    .get(
      api.ars.cpu,
      {
        interval: "5m",
        startTime: endTime,
        endTime: current_time,
      },
      { noLoading: true }
    )
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function app_cpu(apps: any) {
  const current_time = new Date().getTime();
  const interval = 60 * 1000;
  const endTime = current_time - interval;

  return $UINetwork
    .get(api.ars.app_cpu, {
      apps: apps,
      interval: "1m",
      startTime: endTime,
      endTime: current_time,
    })
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function cpu(params: any, options?: any) {
  return $UINetwork
    .get(api.ars.cpu, params, options)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function current_mem(options?: any) {
  const current_time = new Date().getTime();
  const interval = 60 * 1000;
  const endTime = current_time - interval;

  return $UINetwork
    .get(
      api.ars.mem,
      {
        interval: "1m",
        startTime: endTime,
        endTime: current_time,
      },
      options
    )
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

// 过去60分钟内存
function last_mem() {
  const current_time = new Date().getTime();
  const interval = 60 * 60 * 1000;
  const endTime = current_time - interval;

  return $UINetwork
    .get(
      api.ars.mem,
      {
        interval: "5m",
        startTime: endTime,
        endTime: current_time,
      },
      { noLoading: true }
    )
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function app_mem(apps: any) {
  const current_time = new Date().getTime();
  const interval = 60 * 1000;
  const endTime = current_time - interval;

  return $UINetwork
    .get(api.ars.app_mem, {
      apps: apps,
      interval: "1m",
      startTime: endTime,
      endTime: current_time,
    })
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function mem(params: any) {
  return $UINetwork
    .get(api.ars.mem, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

// 过去60分钟内存
function last_conn(options?: any) {
  const current_time = new Date().getTime();
  const interval = 60 * 60 * 1000;
  const endTime = current_time - interval;

  return $UINetwork
    .get(
      api.ars.conn,
      {
        interval: "5m",
        startTime: endTime,
        endTime: current_time,
      },
      options
    )
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function app_conn(apps: any) {
  const current_time = new Date().getTime();
  const interval = 60 * 1000;
  const endTime = current_time - interval;

  return $UINetwork
    .get(api.ars.app_conn, {
      apps: apps,
      interval: "1m",
      startTime: endTime,
      endTime: current_time,
    })
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function conn(params: any) {
  return $UINetwork
    .get(api.ars.conn, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function getAppLog(params) {
  return $UINetwork.get(api.ars.getAppLog, params);
}
