/*
 * @Author: lanck.xie
 * @Date: 2021-10-20 15:46:54
 * @Last Modified by: lanck.xie
 * @Last Modified time: 2021-10-25 14:05:21
 * @desc 成本优化  base deep
 */

import api from "@/api/config-api";

export default {
  getCloudScores,
  getComputeScore,
  getStrategies,
  postSubmitTask,
  getReports,
  getReport,
  getReportStatus,
  postReportcb,
  getReportDetail,
  getReportNode,
  deleteReport,
  postCancelReport
};
// 成本优化- 获取成本优化云商预评分
function getCloudScores(type: "BASIC" | "DEEP") {
  const params = {
    optimizationType: type,
  };
  return $UINetwork
    .get(api.cmp.cost.getCloudScores, params)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}

function getComputeScore(cloudType) {
  return $UINetwork
    .get(api.cmp.cost.getComputeScore, { cloudType })
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}

// 获取优化策略集合
interface Strategieparams {
  optimizationType: string;
  cloudTypes: string;
}
function getStrategies(params: Strategieparams) {
  return $UINetwork
    .get(api.cmp.cost.getStrategies, params)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}

// 提交优化策略任务

function postSubmitTask(parmas) {
  return $UINetwork
    .post(api.cmp.cost.postSubmitTask, parmas)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}
// 获取优化策略报告列表

function getReports(params) {
  return $UINetwork
    .get(api.cmp.cost.getReports, params)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}
// 获取优化策略报告
function getReport(id) {
  return $UINetwork
    .get(api.cmp.cost.getReport(id), {})
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}
// 删除报告
function deleteReport(id) {
  return $UINetwork
    .delete(api.cmp.cost.deleteReport(id), {})
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}
// 获取优化策略报告状态
function getReportStatus(id) {
  return $UINetwork
    .get(api.cmp.cost.getReportStatus(id), {})
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}

// 获取优化报告文件生成回调

function postReportcb(id) {
  return $UINetwork
    .post(api.cmp.cost.postReportcb(id), {})
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}

// 获取报告详情
function getReportDetail(id, Headparams = {}) {
  return $UINetwork
    .get(api.cmp.cost.getReportDetail(id), {}, Headparams)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}

// 获取报告节点
function getReportNode(id, HeadParams = {}) {
  return $UINetwork
    .get(api.cmp.cost.getReportNode(id), {}, HeadParams)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}
// 取消正在执行的页面
function postCancelReport(id) {
  return $UINetwork
    .post(api.cmp.cost.postCancelReport(id), {})
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}
