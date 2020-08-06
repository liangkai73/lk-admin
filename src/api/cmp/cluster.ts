"use strict";

/**
 * Copyright (c) 2018 Copyright of All Rights Reserved.
 * Author: cli
 * Date: 2018-07-27 16:02
 * Desc:
 */


import api from "@/api/config-api";

export default {
  cluster,
  list,
  clusters,
  info,
  kubeconfig,
  logs,
  sync,
  template,
  vpcRegion,
  vpcList,
  insTypesList,
  keyPair,
  newkeyPair,
  createNew,
  deleteCluster,
  calcPrice,
  opsStat,
  opsEvent,
  clustersMgt,
  deleteNode,
  mgtNode,
  pvc,
  storageclass,
  podList,
  instInfo,
  mgtScaleout,
  mgtEvents,
  mgtLog,
  plugin,
};

function cluster(params: any) {
  return $UINetwork
    .post(api.cmp.cluster.cluster, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function template(params?: any) {
  return $UINetwork
    .get(api.cmp.cluster.template, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function plugin(params?: any) {
  return $UINetwork
    .post(api.cmp.cluster.plugin, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function instInfo(id: string, params?: any) {
  return $UINetwork
    .post(api.cmp.cluster.instInfo + `?clusterId=${id}`, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function opsStat(params?: any) {
  return $UINetwork
    .get(api.cmp.cluster.opsStat, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function opsEvent(params?: any) {
  return $UINetwork
    .get(api.cmp.cluster.opsEvent, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function clustersMgt(params?: any) {
  return $UINetwork
    .get(api.cmp.cluster.clustersMgt, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function mgtNode(params?: any) {
  return $UINetwork
    .get(api.cmp.cluster.mgtNode, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function pvc(params?: any) {
  return $UINetwork
    .get(api.cmp.cluster.pvc, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function storageclass(params?: any) {
  return $UINetwork
    .get(api.cmp.cluster.storageclass, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function deleteNode(params?: any) {
  return $UINetwork
    .post(api.cmp.cluster.deleteNode, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function mgtEvents(params?: any) {
  return $UINetwork
    .post(api.cmp.cluster.mgtEvents, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function mgtLog(params?: any) {
  return $UINetwork
    .get(api.cmp.cluster.mgtLog, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function podList(params?: any) {
  return $UINetwork
    .get(api.cmp.cluster.podList, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function vpcRegion(params?: any) {
  return $UINetwork
    .post(api.cmp.cluster.vpcRegion, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function insTypesList(params?: any) {
  return $UINetwork
    .post(api.cmp.cluster.insTypesList, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function keyPair(params?: any) {
  return $UINetwork
    .post(api.cmp.cluster.keyPair, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function mgtScaleout(params?: any) {
  return $UINetwork
    .post(api.cmp.cluster.mgtScaleout, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function newkeyPair(params?: any) {
  return $UINetwork
    .post(api.cmp.cluster.newkeyPair, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function createNew(params?: any) {
  return $UINetwork
    .post(api.cmp.cluster.createNew, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function deleteCluster(params?: any) {
  return $UINetwork
    .delete(api.cmp.cluster.createNew, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function calcPrice(params?: any) {
  return $UINetwork
    .post(api.cmp.cluster.calcPrice, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function vpcList(productCode: string, params?: any) {
  return $UINetwork
    .post(api.cmp.cluster.vpcList + `?productCode=${productCode}`, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function list() {
  return $UINetwork
    .post(api.cmp.cluster.list, null)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function clusters(option?: any) {
  return $UINetwork
    .post(api.cmp.cluster.platform.userClusters, null, option)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function info() {
  return $UINetwork
    .post(api.cmp.cluster.platform.clusters_info, null)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function kubeconfig() {
  return $UINetwork
    .post(api.cmp.cluster.platform.clusters_kubeconfig, null)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function logs() {
  return $UINetwork
    .post(api.cmp.cluster.platform.clusters_logs, null)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

function sync() {
  return $UINetwork
    .get(api.cmp.cluster.sync, null)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
