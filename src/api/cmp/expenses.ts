
import api from "@/api/config-api";

function expensesNbr(params?: any) {
  return $UINetwork
    .post(api.cmp.expenses.nbr, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function openBill(spAcctId: string, params?: any) {
  return $UINetwork
    .post(api.cmp.expenses.openBill + spAcctId, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function ak(spAcctId: string, params?: any) {
  return $UINetwork
    .post(api.cmp.expenses.ak + spAcctId, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function closeBill(spAcctId: string, params?: any) {
  return $UINetwork
    .put(api.cmp.expenses.openBill + spAcctId, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function getAcct(params?: any) {
  return $UINetwork
    .get(api.cmp.expenses.acct, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function getAcctDetail(id) {
  return $UINetwork
    .get(api.cmp.expenses.acct + "/" + id, {})
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function getBucket(params?: any) {
  return $UINetwork
    .get(api.cmp.expenses.getBucket, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

//  获取云商消费统计
interface consumeParam {
  cloudType?: string;
  spAcctId?: string;
  productCataCode?: string;
  billingPeriodStart: string;
  billingPeriodEnd: string;
  groupTypes: any[];
}

function consume(params: consumeParam) {
  return $UINetwork
    .get(api.cmp.expenses.consume, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
// 获取消费趋势
function trend(params: consumeParam) {
  return $UINetwork
    .get(api.cmp.expenses.trend, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
// 获取月度账单汇总
function billByMonth(params: consumeParam) {
  return $UINetwork
    .get(api.cmp.expenses.billByMonth, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
// 获取账单分组汇总数据
function billByGroup(params: consumeParam) {
  return $UINetwork
    .get(api.cmp.expenses.billByGroup, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
// 获取月账单
function billMonth(params: consumeParam) {
  return $UINetwork
    .get(api.cmp.expenses.billMonth, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
// 费用分析 表格
function myReporter(params: any) {
  return $UINetwork
    .get(api.cmp.expenses.myreporter, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function deleteReporter(params: any) {
  return $UINetwork
    .delete(api.cmp.expenses.myreporter, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
// 费用预算表格
function queryBudget(params: any) {
  return $UINetwork
    .get(api.cmp.expenses.budget, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
// 新建费用预算
function newBudget(params: any) {
  return $UINetwork
    .post(api.cmp.expenses.budget, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function deleteBudget(params: any) {
  return $UINetwork
    .delete(api.cmp.expenses.budget, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

// 费用预算详情
function budgetDetail(params: any) {
  return $UINetwork
    .get(api.cmp.expenses.budgetDetail, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}

// 创建费用分析
function createReporter(params: any) {
  return $UINetwork
    .post(api.cmp.expenses.myreporter, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function billDetail(params: consumeParam) {
  return $UINetwork
    .get(api.cmp.expenses.billDetail, params)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function cloudOwnerId(params: any) {
  return $UINetwork
    .get(api.cmp.expenses.cloudOwnerId, params, { noLoading: true })
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function pricetype(params: any) {
  return $UINetwork
    .get(api.cmp.expenses.pricetype, params, { noLoading: true })
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
function dimPro(params: any) {
  return $UINetwork
    .post(api.cmp.expenses.dimPro, params, { noLoading: true })
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      throw err;
    });
}
// 近期消费订单查询
function getuserorder(params) {
  return $UINetwork
    .post(api.cmp.expenses.userorder, params)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}
function sendNotic(id) {
  return $UINetwork
    .post(api.cmp.expenses.noticBill + id, {})
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}
// 获取费用分析详情
function getMyreporterDetail(id) {
  return $UINetwork
    .get(api.cmp.expenses.getMyreporterDetail, { reporterId: id })
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}
// 获取费用分析详情
function getAllacct(params) {
  return $UINetwork
    .get(api.cmp.expenses.getAllAcct2, params || {})
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      throw err;
    });
}
export default {
  expensesNbr,
  getAcct,
  getAcctDetail,
  getBucket,
  openBill,
  closeBill,
  consume,
  trend,
  billByMonth,
  billByGroup,
  billMonth,
  billDetail,
  cloudOwnerId,
  dimPro,
  pricetype,
  getuserorder,
  sendNotic,
  ak,
  myReporter,
  deleteReporter,
  createReporter,
  queryBudget,
  newBudget,
  deleteBudget,
  budgetDetail,
  getMyreporterDetail,
  getAllacct,
};
