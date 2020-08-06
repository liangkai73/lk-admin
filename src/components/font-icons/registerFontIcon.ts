// from '@/styles/base/font_fass/demo.css'
const ICONS = [
  {
    name: "xfqk", // 消费情况
    className: "icon-xiaofeiqingkuang",
  },
  {
    name: "zhfb", // 账号分布
    className: "icon-zhanghaofenbuqingkuang",
  },
  {
    name: "zjqk", // 资金情况
    className: "icon-zijinqingkuang",
  },
  {
    name: "gailan", // 概览
    className: "icon-gailan",
  },
  {
    name: "openEye", // 开眼
    className: "icon-yulan-xianshi",
  },
  {
    name: "closeEye", // 闭眼
    className: "icon-yulan-yincang",
  },
  {
    name: "message", // 消息1
    className: "icon-ic_email",
  },
  {
    name: "message1", // 消息2
    className: "icon-xiaoxi1",
  },
  {
    name: "resource", // 策略
    className: "icon-cl",
  },
  {
    name: "link", // 链接 link
    className: "icon-link",
  },
  {
    name: "key", // 秘钥
    className: "icon-fw",
  },
  {
    name: "lh", // 联合账号
    className: "icon-lh",
  },
  {
    name: "home", // 首页
    className: "icon-shouye11",
  },
  {
    name: "home2", // 首页
    className: "icon-shouye-full",
  },
  {
    name: "role", // 角色
    className: "icon-js",
  },
  {
    name: "sf", // 身份提供商
    className: "icon-sf",
  },
  {
    name: "search", // 查询
    className: "icon-search",
  },
  {
    name: "about", // 关于
    className: "icon-gy",
  },
  {
    name: "userGroup", // 用户组
    className: "icon-yhz",
  },
  {
    name: "set", // 设置
    className: "icon-setting",
  },
  {
    name: "user", // 用户
    className: "icon-yh",
  },
  {
    name: "edit", // 编辑
    className: "icon-bianji1",
  },
  {
    name: "dark", // 切换显示-暗黑
    className: "icon-qiehuanxianshi-anhei",
  },
  {
    name: "link1", // link1
    className: "icon-link1",
  },
  {
    name: "close2", // 关闭2
    className: "icon-guanbi2",
  },
  {
    name: "close3", // 关闭3
    className: "icon-guanbi3",
  },
  {
    name: "close1", // 关闭1
    className: "icon-guanbi1",
  },
  {
    name: "alert", // alert
    className: "icon-Alert",
  },
  {
    name: "clusterTem", // alert
    className: "icon-ACKzhuanyou",
  },
  {
    name: "checked", // checked
    className: "icon-yixuanze",
  },
  {
    name: "checked2", // checked2
    className: "icon-xuanze-021",
  },
  {
    name: "time", // time
    className: "icon-time",
  },
  {
    name: "info", // info
    className: "icon-info",
  },
  {
    name: "info2", // info
    className: "icon-info_filled",
  },
  {
    name: "fuzhi", // 复制
    className: "icon-fuzhi",
  },
  {
    name: "dcd", //
    className: "icon-dcdnquanzhanjiasu",
  },
  {
    name: "slb", //
    className: "icon-slbfuzaijunhengSLB",
  },
  {
    name: "rds", //
    className: "icon-rds",
  },
  {
    name: "AWS", //
    className: "icon-aws",
  },
  {
    name: "oss", //
    className: "icon-ossduixiangcunchu",
  },
  {
    name: "ddos", //
    className: "icon-ddosDDoSfanghu",
  },
  {
    name: "ecs", //
    className: "icon-ecsyunfuwuqiECS",
  },
  {
    name: "refresh", // refresh
    className: "icon-shuaxin",
  },
  {
    name: "left", // left
    className: "icon-fangxiang_zuo",
  },
  {
    name: "down", // down
    className: "icon-zhankai",
  },
  {
    name: "up", // up
    className: "icon-guanbi",
  },
  {
    name: "right", // right
    className: "icon-fangxiang_you",
  },
  {
    name: "mune", // mune
    className: "icon-caidan",
  },
  {
    name: "back", // back
    className: "icon-fanhui",
  },
  {
    name: "serverless", //     name: 'serverless',  // back
    className: "icon-banner_Serverless",
  },
  {
    name: "func", //    快速函数
    className: "icon-banner_kuaisuhanshu",
  },
  {
    name: "saveMoney", //    节省费用
    className: "icon-banner_jieshengfeiyong",
  },
  {
    name: "serverless2", //    serverless2
    className: "icon-home_Serverless",
  },
  {
    name: "config", //    config
    className: "icon-home_kuaisupeizhi",
  },
  {
    name: "arrange", //    arrange部署
    className: "icon-home_kuaisubushu",
  },
  {
    name: "warning", //    预警
    className: "icon-home_yujinggongneng",
  },
  {
    name: "show", //    可视
    className: "icon-home_keshihuaxianshi",
  },
  {
    name: "formation", //    结构
    className: "icon-home_tuopujiegou",
  },
  {
    name: "logo", //    logo
    className: "icon-logo",
  },
  {
    name: "logoNew", //    logo
    className: "icon-logo1",
  },
  {
    name: "more", //   更多
    className: "icon-ziyuan",
  },
  {
    name: "phone1", //   更多
    className: "icon-PhoneHomeLock",
  },
  {
    name: "unlock", //   更多
    className: "icon-Unlock",
  },
  {
    name: "filter", //   筛选
    className: "icon-shaixuan",
  },
  {
    name: "refresh", //   筛选
    className: "icon-icon-test12",
  },
  {
    name: "console-alert", // 严重.
    className: "icon-yanzhong",
  },
  {
    name: "console-suspect", // 可疑
    className: "icon-icon-test5",
  },
  {
    name: "console-warning", // 警告
    className: "icon-icon-test8",
  },

  {
    name: "ALIYUN", //   阿里云
    className: "icon-aliyun1",
  },
  {
    name: "delete", //   删除
    className: "icon-shanchu",
  },

  {
    name: "huaweicloud", //   华为云
    className: "icon-huawei",
  },

  {
    name: "HUAWEI", //   华为云
    className: "icon-huaweiyun",
  },
  {
    name: "huaweiyun", //   华为云
    className: "icon-huaweiyun",
  },
  {
    name: "TENGXUNYUN", //   腾讯云
    className: "icon-tengxunyun1",
  },
  {
    name: "TENCENT", //   腾讯云
    className: "icon-tengxunyun1",
  },

  {
    name: "tencentcloud", //   筛选
    className: "icon-tengxunyun",
  },

  {
    name: "Azure", //   筛选
    className: "icon-Azure",
  },

  {
    name: "copy", //   复制
    className: "icon-copy",
  },

  {
    name: "internet", //   筛选
    className: " icon-internet-full",
  },
  {
    name: "list", //   列表显示
    className: "icon-liebiaoxianshi",
  },
  {
    name: "bulk", //   图标显示
    className: "icon-tubiaoxianshi",
  },
  {
    name: "upload1", //   上传
    className: "icon-shangchuan1",
  },

  {
    name: "yanzhong", //   上传
    className: "icon-yanzhong",
  },

  {
    name: "warn", //   上传
    className: "icon-icon-test8",
  },

  {
    name: "help", //   问号
    className: "icon-icon-test5",
  },

  {
    name: "App", //   logo-new
    className: "icon-MAXBUILD-LOGO",
  },

  {
    name: "Cluster", //   上传
    className: "icon-jiqun1",
  },
  {
    name: "apps", //   应用
    className: "icon-yingyong1",
  },
  {
    name: "cloudProvider", //   云商管理
    className: "icon-yunshangguanli",
  },
  {
    name: "public", //   公告板
    className: "icon-gonggaoban",
  },
  {
    name: "app-manage", //   应用管理
    className: "icon-yingyongguanli",
  },
  {
    name: "user-manage", //   用户管理
    className: "icon-yonghuguanli",
  },
  {
    name: "warning2", //   预警消息
    className: "icon-yujingxiaoxi",
  },
  {
    name: "fun-computed", //   函数计算
    className: "icon-hanshujisuan",
  },
  {
    name: "Initial", //   初始化
    className: "icon-chushihua",
  },

  {
    name: "Running", //   运行中
    className: "icon-icon-test2",
  },

  {
    name: "Failed", //   启动失败
    className: "icon-info_filled",
  },
  {
    name: "Deleted", //   已珊瑚
    className: "icon-icon-test10",
  },
  {
    name: "Updating", //   升级中
    className: "icon-shengjizhong",
  },
  {
    name: "Stopped", //   停止
    className: "icon-tingzhi",
  },
  {
    name: "Recovery", //   冷启状态
    className: "icon-lengqizhuangtai",
  },
  {
    name: "init", //   初始化
    className: "icon-chushihua",
  },
  {
    name: "Deleting", //   删除中
    className: "icon-shanchuzhong",
  },
  {
    name: "jiazai", //   加载中
    className: "icon-jiazai",
  },
  {
    name: "message2", //   消息2
    className: "icon-xiaoxi",
  },
  {
    name: "loginOut", //   消息2
    className: "icon-tuichu1",
  },
  {
    name: "RAM", //   内存
    className: "icon-neicun",
  },
  {
    name: "timeOut", //   执行超时时间
    className: "icon-zhihangchaoshishijian",
  },
  {
    name: "CPU", //   CPU
    className: "icon-CPU",
  },
  {
    name: "add", //   增加
    className: "icon-zengjia",
  },
  {
    name: "remove", //   CPU
    className: "icon-jianshao",
  },
  {
    name: "quzuoce", //   去左侧
    className: "icon-quzuoce",
  },
  {
    name: "quyouce", //   去右侧
    className: "icon-quyouce",
  },
  {
    name: "copyLink", //   复制链接
    className: "icon-fuzhilianjie",
  },
  {
    name: "costOptimization", //   成本优化
    className: "icon-chengbenyouhua",
  },
  {
    name: "costOptimization2", //   成本优化
    className: "icon-chengbenyouhua-full",
  },
  {
    name: "taskEvent", //   任务事件
    className: "icon-renwushijian",
  },
  {
    name: "doEvent", //   操作事件
    className: "icon-caozuoshijian",
  },
  {
    name: "costjia", //   添加
    className: "icon-tianjia-xi",
  },
  {
    name: "save", //   保存
    className: "icon-baocun",
  },
  {
    name: "toUp", //   上涨
    className: "icon-up",
  },
  {
    name: "toDown", //   下降
    className: "icon-down",
  },
  {
    name: "toast", //   提示
    className: "icon-tishi",
  },
  {
    name: "devOps", //
    className: "icon-DevOps",
  },
  {
    name: "devOps2", //
    className: "icon-DevOps-full",
  },
  {
    name: "feiyong", //
    className: "icon-feiyongzhongxin",
  },
  {
    name: "feiyong2", //
    className: "icon-feiyongzhongxin-full",
  },
  {
    name: "yunanquan", //
    className: "icon-yunanquan",
  },
  {
    name: "yunanquan2", //
    className: "icon-yunanquan-full",
  },
  {
    name: "zhinengyunwei", //
    className: "icon-zhinengyunwei",
  },
  {
    name: "zhinengyunwei2", //
    className: "icon-zhinengyunwei-full",
  },
  {
    name: "faas", //
    className: "icon-FaaS",
  },
  {
    name: "faas2", //
    className: "icon-FaaS-full",
  },
  {
    name: "rongqifuwu", //
    className: "icon-rongqifuwu",
  },
  {
    name: "rongqifuwu2", //
    className: "icon-rongqifuwu-full",
  },
  {
    name: "performance", // 性能优化
    className: "icon-xingnengyouhua",
  },
  {
    name: "performance2", // 性能优化
    className: "icon-xingnengyouhua-full",
  },
  {
    name: "rocket", //
    className: "icon-huojian",
  },
  {
    name: "help2", // 问号样式2
    className: "icon-bangzhu",
  },
];

// register.
ICONS.forEach((icon) => {
  $UILibs.icons.registerFontIcon(icon.name, icon.className, "iconfont");
});
