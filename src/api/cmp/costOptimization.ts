
import api from "@/api/config-api";

// 获取所有云商账号

function getAllacct() {
  return $UINetwork
    .get(api.cmp.expenses.getAllacct, {})
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}

interface ecsParams {
  spAcctId: string;
  regionId: string;
}

// 获取ecs列表
function getEcsList(params: ecsParams) {
  return $UINetwork
    .get(api.cmp.expenses.getEcsList, params)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}
// 获取地域
function getRegin(params: any) {
  return $UINetwork
    .post(api.cmp.constOp.getRegin, params)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}
// 获取可用区
function getZone(params: any) {
  return $UINetwork
    .post(api.cmp.constOp.getZone, params)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}
// 获取架构
function getArchitecture(params: any) {
  return $UINetwork
    .post(api.cmp.constOp.getArchitecture, params)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}
// 获取分类
function getCustomizefamily(params: any) {
  return $UINetwork
    .post(api.cmp.constOp.getCustomizefamily, params)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}
// 获取实例列表
function getInstances(params: any) {
  return $UINetwork
    .post(api.cmp.constOp.getInstances, params)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}
// 获取系统盘列表
function getSystemdisk(params: any) {
  return $UINetwork
    .post(api.cmp.constOp.getSystemdisk, params)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}
// 获取数据盘列表
function getDatadisk(params: any) {
  return $UINetwork
    .post(api.cmp.constOp.getDatadisk, params)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}
// 获取实例询价
function getInstancePrice(params: any) {
  return $UINetwork
    .post(api.cmp.constOp.getInstancePrice, params)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}
// 获取数据盘询价
function getDatadiskPrice(params: any) {
  return $UINetwork
    .post(api.cmp.constOp.getDatadiskPrice, params)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}
// 获取带框询价
function getBandwidth(params: any) {
  return $UINetwork
    .post(api.cmp.constOp.getBandwidth, params)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}
// 获取推荐实例
function getRecommendInstance(params: any) {
  return $UINetwork
    .post(api.cmp.constOp.getRecommendInstance, params)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}

// 成本优化- 分数列表
function getBaseGrade() {
  return $UINetwork
    .get(api.cmp.constOp.getBaseGrade, {})
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}

// 计算分数
function getBaseGradeComputed(cloudType) {
  return $UINetwork
    .get(api.cmp.constOp.getBaseGradeComputed, { cloudType })
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}

interface costParams {
  cloudType: string;
  billStart: string;
  billEnd: string;
}

function getCostByCloud(params: costParams) {
  return $UINetwork
    .get(api.cmp.constOp.getCostByCloud, params)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}

export default {
  getAllacct,
  getEcsList,
  getRegin,
  getZone,
  getArchitecture,
  getCustomizefamily,
  getInstances,
  getSystemdisk,
  getDatadisk,
  getInstancePrice,
  getDatadiskPrice,
  getBandwidth,
  getRecommendInstance,
  getBaseGrade,
  getBaseGradeComputed,
  getCostByCloud,
};
