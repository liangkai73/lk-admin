/*

 * @Author: lanck.xie
 * @Date: 2020-09-14 14:03:32
 * @Last Modified by: lanck.xie
 * @Last Modified time: 2021-10-09 14:56:12
 */
export default {
  token: "/api/v1/services/ephemeralSessionId",
  // login
  login: {
    postLogin: "/user-service/api/v1/users/login", // 登录主账号
    postRegister: "/user-service/api/v1/users/register", // 注册
    postLogout: "/user-service/api/v1/users/logout" // 登出
  },
  // user模块
  user: {
    // ---- jiefengapi
    getUserInfoNow: "/user-service/api/v1/users/current", // 获取当前用户信息
    PutUserInfoNow: "/user-service/api/v1/platform/users", // 修改租户资料（企业）

    getRequestCode: "/user-service/api/v1/users/requestCode", // 获取手机验证码
    postVerifyCode: "/user-service/api/v1/users/verifyCode", // 校验验证码
    getVerifyCode: "/user-service/api/v1/users/requestCodeImage", // 获得图形验证码.

    postResetPwd: "/user-service/api/v1/users/resetPwd", // 重置密码
    getUserList: "/user-service/api/v1/users", // 获取用户列表
    getUserInfo: (id: string | number) => `/user-service/api/v1/users/${id}`, // 获取用户信息
    postUser: "/user-service/api/v1/users", // 添加用户
    deleteUser: "/user-service/api/v1/users", // 批量删除用户
    putUserInfo: (id: string | number) => `/user-service/api/v1/users/${id}`, // 修改用户信息
    getUserPermission: (id: string | number) => `/user-service/api/v1/users/${id}/permissions`, // 获取用户权限列表
    getUserRoles: (id: string | number) => `/user-service/api/v1/users/${id}/roles`, // 获取用户所有的组
    postUserRoles: (id: string | number) => `/user-service/api/v1/users/${id}/roles`, // 添加用户所有的组
    deleteUserRoles: (id: string | number) => `/user-service/api/v1/users/${id}/roles`, // 移除用户所有的组

    getUserGroup: "/user-service/api/v1/roles", //  获取用户组/角色列表
    postUserGroup: "/user-service/api/v1/roles", //  添加用户组/角色
    deleteUserGroup: "/user-service/api/v1/roles", //  删除yonhuz/角色
    getGroupInfo: (id: string | number) => `/user-service/api/v1/roles/${id}`, // 获取用户组信息
    putGroupInfo: (id: string | number) => `/user-service/api/v1/roles/${id}`, // 修改用户组信息
    deleteGroup: (id: string | number) => `/user-service/api/v1/roles/${id}`, // 删除用户组
    getGroup_Users: (id: string | number) => `/user-service/api/v1/roles/${id}/users`, // 获取用户组列表
    postGroup_Users: (id: string | number) => `/user-service/api/v1/roles/${id}/users`, // 添加用户组中的用户
    deleteGroup_Users: (id: string | number) => `/user-service/api/v1/roles/${id}/users`, // 移除用户组中的用户
    getGroup_permissions: (id: string | number) => `/user-service/api/v1/roles/${id}/permissions`, // 获取用户组的权限策略列表
    postGroup_permissions: (id: string | number) => `/user-service/api/v1/roles/${id}/permissions`, // 添加用户组权限策略
    deleteGroup_permissions: (id: string | number) =>
      `/user-service/api/v1/roles/${id}/permissions`, // 移除用户组权限策略
    postNetStore: "/user-service/api/v1/users/uiLayout", // 保存用户界面布局
    getNetStore: "/user-service/api/v1/users/uiLayout" // 获取用户界面布局
  },
  // 策略
  policy: {
    getPolicyList: `/user-service/api/v1/policies`, // 查询策略列表,
    postPolicy: "/user-service/api/v1/policies", // 新增策略,
    getPolicy: (id: string | number) => `/user-service/api/v1/policies/id/${id}`, // 查询策略,
    putPolicy: (code: string | number) => `/user-service/api/v1/policies/code/${code}`, // 修改策略,
    deletePolicy: `/user-service/api/v1/policies` // 删除策略,
  },
  // 应用管理
  app: {
    postApp: `/app-mgt/api/v1/apps`, // 新建APP
    getAppList: `/app-mgt/api/v1/apps`, // 查询APP列表

    getApp: (id: string | number) => `/app-mgt/api/v1/apps/${id}`, // 查询APP详情
    putApp: (id: string | number) => `/app-mgt/api/v1/apps/${id}`, // 修改APP
    removeApp: (id: string | number) => `/app-mgt/api/v1/apps/${id}`, // 删除APP

    getAppVersion: `/app-mgt/app/version`, // 查询版本
    getCatalog: `/app-mgt/app/catalog/`, // c分组
    postCatalog: `/app-mgt/app/catalog/`, // 创建分组
    getRuntimeList: `/app-mgt/runtime/list`, // 获取语言环境列表
    getClusterList: `/app-mgt/sem/cluster/list`, // 获取服务器列表
    getClusterRepoList: `/app-mgt/sem/cluster/repo/list`, // 获取镜像仓库列表
    getSemItemspec: `/app-mgt/sem/itemspec`, // 查询 CPU-容器
    getEventList: `/app-mgt/sem/event`, // 查询 事情列表
    getAppCount: `/app-mgt/app/stat/available/counter`,

    eventDisplays: `/eb-service/api/v1/events/displays`, // 事件列表
    getEventsTypes: `/eb-service/api/v1/events/types`, // 事件列表
    getEventsServices: `/eb-service/api/v1/events/services` // 事件列表
  },
  // 角色 废弃
  role: {
    postRamRole: "/user-service/api/ram/role", // 新增角色
    getRamRole: "/user-service/api/ram/role", // 查询角色
    putRamRole: (id: string | number) => `/user-service/api/ram/role/${id}`, // 修改策略,
    deleteRamRole: (id: string | number) => `/user-service/api/ram/role/${id}` // 删除策略,
  },
  // 文件
  file: {
    getFileDownload: (id: string | number) => `/file-service/api/v1/file/${id}`, // 下载文件
    getFileInfo: (id: string | number) => `/file-service/api/v1/file/info/${id}` // 获取文件信息
  },
  // 群组 废弃
  group: {
    postRamGroup: "/user-service/api/ram/group", // 新增群组
    getRamGroup: "/user-service/api/ram/group", // 新增群组
    putRamGroup: (id?: string | number) => `/user-service/api/ram/group/${id}`, // 修改策略,
    deleteRamGroup: (id?: string | number) => `/user-service/api/ram/group/${id}`, // 删除策略,
    postAddToGroup: "/user-service/api/ram/group/addToGroup" // 添加用户到群组
  },
  // func函数管理 废弃
  scf: {
    getFunc: "/func-mgt/func", // 获取函数列表
    postFunc: "/func-mgt/func", // 新增函数
    getFuncDetail: (funcid?: string | number) => `/func-mgt/func/${funcid}`, // 获取函数详情
    postFuncFile: "/func-mgt/func/code/file", // 上传函数代码文件
    postFunEnv: "/func-mgt/func/env", // 设置函数环境变量
    getFunRuntime: "/func-mgt/func/runtime", // 获取运行列表
    postFunToken: "/func-mgt/func/token", // 创建token秘钥
    getFunToken: "/func-mgt/func/token", //  获取秘钥列表
    getDeployment: (funcid?: string | number) => `/func-mgt/log/${funcid}`, // 获取函数详情
    postDeploymentFunc: "/func-mgt/deployment/func", // 部署函数
    getInvocations: (funcid?: string | number) => `/func-mgt/v1/${funcid}/invocations`, // 函数调用
    PostInvocations: (funcid?: string | number) => `/func-mgt/v1/${funcid}/invocations`, // 函数调用
    getHistoryCode: (funcid?: string | number) => `/func-mgt/func/code` // 查询历史函数代码版本
  },

  // 应用状态模块
  ars: {
    cpu: "/ae-mnt/api/v1/ars/cpu", // 获取CPU
    app_cpu: "/ae-mnt/api/v1/ars/app_cpu", // 获取应用CPU
    mem: "/ae-mnt/api/v1/ars/mem", // 获取内存
    app_mem: "/ae-mnt/api/v1/ars/app_mem", // 获取应用内存
    conn: "/ae-mnt/api/v1/ars/conn", // 获取连接数
    app_conn: "/ae-mnt/api/v1/ars/app_conn", // 获取应用连接数
    getAppLog: `/ae-mnt/api/v1/ars/app_log` // 获取应用运行日志
  },

  cmp: {
    // 基础
    base: {
      list: "/ce-service/base/list", // 列出所有云商
      region: "/ce-service/base/region", // 查询产品可用区(分页)
      regionByProduct: (productCode?: string | number) => `/ce-service/base/${productCode}/region` // 查询产品可用区
    },

    // 账户
    acct: {
      getAcct: "/ce-service/cmp/acct", // 获取账户信息
      postAcct: "/ce-service/cmp/acct", // 导入账号信息
      updateAcct: "/ce-service/cmp/acct/update", // 导入账号信息
      listAcct: "/ce-service/cmp/acct/list" // 列出托管的账户
    },
    // 费用
    expenses: {
      nbr: "/cfm-service/acct/nbr", // 收支明细
      acct: "/cfm-service/acct", // 获取所有账户信息
      getBucket: "/cfm-service/acct/bucket", // 获取桶列表
      openBill: "/cfm-service/acct/subscribe/", // 开通账单
      ak: "/cfm-service/acct/ak?spAcctId=", // 修改密钥
      myreporter: "/cfm-service/acct/bill/myreporter", // 费用分析报告表格
      getMyreporterDetail: "/cfm-service/acct/bill/myreporter/detail", // 获取费用分析详情

      budget: "/cfm-service/expense/budget", // 费用预算表格
      budgetDetail: "/cfm-service/expense/budget/detail", // 费用预算表格

      //  首页概览
      consume: "/cfm-service/expense/bill/cloudConsumptionSum", // 获取云商消费统计
      trend: "/cfm-service/expense/bill/consumptionTrendSum", // 获取消费趋势
      billByMonth: "/cfm-service/expense/bill/monthlySum", // 获取月度账单汇总
      billMonth: "/cfm-service/expense/bill/month", // 获取月账单
      billDetail: "/cfm-service/expense/bill/detail", // 获取账单明细
      billByGroup: "/cfm-service/expense/bill/paymentAmountSum", // 获取账单分组汇总数据
      noticBill: "/cfm-service/acct/notify/bill/subscribe?spAcctId=", // 通知账单订阅 ，只发请求不用管响应
      userorder: "/cfm-service/acct/userorder", // 近期消费订单查询
      cloudOwnerId: "/cfm-service/acct/list/qry", // cloudOwnerId
      pricetype: "/cfm-service/dim/pricetype", // 付费方式
      dimPro: "/cfm-service/dim/product", // 月账单中需要的产品
      getAllAcct2: "/cfm-service/acct", // 获取所有云商账号

      // 产品优化
      getAllacct: "/cfm-service/acct/list/qry", // 获取所有云商账号
      getEcsList: "/cfm-service/acct/resource/ecs" // 获取ecs列表
    },
    // 成本优化 base & deep
    cost: {
      getCloudScores: "/cfm-service/cost/optimization/cloudScores", // 获取成本优化云商预评分
      getComputeScore: "/cfm-service/cost/optimization/computeScore", // 计算成本优化预评分
      getStrategies: "/cfm-service/cost/optimization/strategies", // 获取优化策略集合
      postSubmitTask: "/cfm-service/cost/optimization/submitTask", // 提交优化策略任务
      getReports: "/cfm-service/cost/optimization/report", // 获取优化策略报告列表
      getReport: id => `/cfm-service/cost/optimization/report/${id}`, // 获取优化策略报告
      getReportStatus: id => `/cfm-service/cost/optimization/report/${id}/status`, // 获取优化策略报告状态
      postCancelReport: id => `/cfm-service/cost/optimization/report/${id}/cancel`, // 取消正在执行的优化
      deleteReport: id => `/cfm-service/cost/optimization/report/${id}`, // 删除指定的优化策略报告
      postReportcb: id => `/cfm-service/cost/optimization/report/${id}/file_callback`, // 优化报告文件生成回调
      getReportDetail: id => `/cfm-service/cost/optimization/report/${id}/detail`, // 获取优化策略报告详情
      getReportNode: id => `/cfm-service/cost/optimization/reportNode/${id}` // 获取优化策略报告节点结果
    },
    // 比价
    constOp: {
      getRegin: "/service-cloud-meta/api/region/list", // 获取地域
      getZone: "/service-cloud-meta/api/zone/list", // 获取可用区
      getArchitecture: "/service-cloud-meta/api/architecture/list", // 获取架构
      getCustomizefamily: "/service-cloud-meta/api/customizefamily/list", // 获取分类
      getInstances: "/service-cloud-meta/api/available/instances", // 获取实例列表
      getSystemdisk: "/service-cloud-meta/api/available/system_disk", // 获取系统盘列表
      getDatadisk: "/service-cloud-meta/api/available/data_disk", // 获取数据盘列表
      getInstancePrice: "/service-cloud-meta/api/price/instance", // 实例询价
      getDatadiskPrice: "/service-cloud-meta/api/price/data_disk", // 数据盘询价
      getBandwidth: "/service-cloud-meta/api/price/bandwidth", // 获取带宽询价
      getRecommendInstance: "/service-cloud-meta/api/recommend/instance", // 获取推荐实例
      // 成本优化- 基础
      getBaseGrade: "/cfm-service/cost/optimization/cloudScores", // 获取分数列表
      getBaseGradeComputed: "/cfm-service/cost/optimization/computeScore", // 计算分数
      // 优化概览

      getCostByCloud: "/cfm-service/expense/bill/monthly/cost/stat" // 根据云商查询费用汇总 /
    },
    // 集群
    cluster: {
      cluster: "/ce-service/cmp/cluster", // 根据应用场景创建用户集群
      createNew: "/ce-service/cmp/cluster/mgt", // 新建集群
      opsStat: "/ce-service/cmp/cluster/ops/stat", // 查询集群状态统计
      opsEvent: "/ce-service/cmp/cluster/ops/event", // 查询集群事件
      clustersMgt: "/ce-service/cmp/cluster/mgt", // 获取集群信息
      mgtNode: "/ce-service/cmp/cluster/node", // 查询集群节点列表
      pvc: "/ce-service/cmp/cluster/storage/pvc", // 查询集群pvc列表
      storageclass: "/ce-service/cmp/cluster/storage/storageclass", // 查询集群pvc列表
      deleteNode: "/ce-service/cmp/cluster/node/remove", // 移除节点
      podList: "/ce-service/cmp/cluster/ops/pod", // 查询容器组
      mgtScaleout: "/ce-service/cmp/cluster/mgt/scaleout", // 查询容器组
      calcPrice: "/ce-service/cmp/ecs/instanceTypes/price",
      list: "/ce-service/cmp/cluster/list", // 查询云商集群信息
      mgtEvents: "/ce-service/cmp/cluster/mgt/events", // 查询云商集群事件
      mgtLog: "/ce-service/cmp/cluster/mgt/logs", // 查询云商集群日志
      instInfo: "/ce-service/cmp/cluster/mgt/inst/info", // 查询用户集群实例信息  添加节点页的预填数据
      sync: "/ce-service/cmp/cluster/mgt/sync", // 同步
      plugin: "/ce-service/cmp/cluster/plugin", // 同步
      template: "/ce-service/cmp/cluster/template", // 查询集群模板
      vpcRegion: "/ce-service/cmp/vpc/region/list", // 查询vpc可用区域
      insTypesList: "/ce-service/cmp/ecs/instanceTypes/list", // 查询ecs实例规格  即节点规格
      keyPair: "/ce-service/cmp/ecs/keypair/list", // 查询密钥对
      newkeyPair: "/ce-service/cmp/ecs/keypair", // 创建密钥对
      vpcList: "/ce-service/cmp/vpc/list", // 查询可用的vpc列表
      platform: {
        clusters: "/ce-service/cmp/cluster/platform/clusters", // 查询平台维护的集群信息
        userClusters: "/ce-service/cmp/cluster/mgt/list", // 查询用户集群列表
        clusters_info: "/ce-service/cmp/cluster/platform/clusters/info", // 查询云商集群信息
        clusters_kubeconfig: "/ce-service/cmp/cluster/platform/clusters/kubeconfig", // 查询集群信息kubeconfig
        clusters_logs: "/ce-service/cmp/cluster/platform/clusters/logs" // 查询云商集群日志
      }
    },

    // 场景
    scene: {
      list: "/ce-service/cmp/scene/list" // 场景列表
    },

    // 镜像
    acr: {
      instance: "/ce-service/cmp/acr/instance", // 获取镜像实例
      instance_list: "/ce-service/cmp/acr/instance/list", // 获取镜像实例列表
      repo: "/ce-service/cmp/acr/repo", // 仓库操作
      repos_list: "/ce-service/cmp/acr/repos/list" // 获取镜像实例仓库列表
    },

    // dns
    dns: {
      addRR: "/ce-service/cmp/dns/rr", // 添加RR记录
      delRR: "/ce-service/cmp/dns/rr", // 删除RR记录
      listDns: "/ce-service/cmp/dns/list", // 查询用户DNS
      listRR: "/ce-service/cmp/dns/rr/list", // 查询用户DNS
      sync: "/ce-service/cmp/dns/sync" // 同步
    }
  },

  // 通知管理
  notification: {
    message: {
      list: "/notification-service/api/message/list", // 获取消息列表
      delete: "/notification-service/api/message/delete", // 删除消息
      get: "/notification-service/api/message/getByID", // 获取消息
      update: "/notification-service/api/message/update", // 获取消息
      total: "/notification-service/api/message/total" // 获取消息
    },
    mail_tmp: {
      add: "/notification-service/api/mailtmp/add", // 添加模版
      list: "/notification-service/api/mailtmp/list", // 获取模版列表
      delete: "/notification-service/api/mailtmp/delete", // 删除模版
      get: "/notification-service/api/mailtmp/get", // 获取模版
      update: "/notification-service/api/mailtmp/update" // 获取模版
    },

    message_tmp: {
      add: "/notification-service/api/messagetmp/add", // 添加模版
      addUid: "/notification-service/api/messagetmp/addUid", // 添加模版
      list: "/notification-service/api/messagetmp/list", // 获取模版列表
      delete: "/notification-service/api/messagetmp/delete", // 删除模版
      get: "/notification-service/api/messagetmp/get", // 获取模版
      update: "/notification-service/api/messagetmp/update" // 获取模版
    },

    sms_tmp: {
      add: "/notification-service/api/smstmp/add", // 添加模版
      list: "/notification-service/api/smstmp/list", // 获取模版列表
      delete: "/notification-service/api/smstmp/delete", // 删除模版
      get: "/notification-service/api/smstmp/query", // 获取模版
      update: "/notification-service/api/smstmp/modify", // 获取模版
      updateType: "/notification-service/api/smstmp/modifyType" // 获取模版
    }
  },

  // platform user模块
  platformUser: {
    list: "/user-service/api/manage/platform/user", // 获取租户列表
    update: "/user-service/api/manage/platform/user", // 更新租户
    add: "/user-service/api/manage/platform/user", // 新增租户
    acceptRegister: "/user-service/api/manage/platform/user/acceptRegister", // 接收租户注册
    rejectRegister: "/user-service/api/manage/platform/user/rejectRegister" // 拒绝租户注册
  }
};
