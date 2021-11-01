/*
 * @Author: lanck.xie
 * @Date: 2021-06-08 16:25:37
 * @Last Modified by: lanck.xie
 * @Last Modified time: 2021-06-08 16:31:38
 * @Desc productCenter模块 通用参数配置
 */

// 应用状态 + 图标 + 颜色
export const APP_STATUS = {
  Running: { color: "#19aaf5", icon: "Running", name: "运行中" },
  Recovery: { color: "#966bc9", icon: "Recovery", name: "冷启状态" },
  Initial: { color: "#67c23a", icon: "Initial", name: "初始化" },
  Stopped: { color: "#e6a23c", icon: "Stopped", name: "停止" },
  Failed: { color: "#f56c6c", icon: "Failed", name: "启动失败" },
  Deleting: { color: "#f56c6c", icon: "Deleting", name: "删除中" },
  Deleted: { color: "#909399", icon: "Deleted", name: "已删除" },
  Updating: { color: "#67c23a", icon: "Updating", name: "升级中" },
  default: { color: "#19aaf5", icon: "Running", name: "运行中" },
};
