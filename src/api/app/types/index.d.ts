import 'febs-browser';

export namespace App {
  interface appParams {
    name: string; // 名称
    description: string; // 应用描述
    deploy: true; //  是否立即部署
    version: string; // 应用版本
    catalogId: string; // 服务组ID
    runtimeId: string; // 应用运行时ID
    codeFileId: string; // 上传的代码包ID
    codeRepoId: string; // 镜像仓库ID
    serverInfoId: string; // 部署服务器ID
    replicas: number; // 副本数量
    appDomain?: string; // 应用域名
    appPort: number; // 应用端口
    domains:any[] ; // 域名
    envs: any[]; // 环境变量集合
    hosts: any[]; // Host配置集合
    storages: any[]; // 存储配置集合
    limitCpu: string; // CPU上限
    limitMem: string; // 内存上限
    healthCheck?: {
      beatPeriod: 0;
      initialDelaySeconds: 0;
      proto: string;
      specHttpPort: 0;
      specHttpMethod: string;
      specHttpPath: string;
      specHttpHeaders: any[];
    }; //
  }

  //   interface ramUserArr<ramUserItem> {
  //     [_: number]: ramUserItem;
  //   }
  //   interface ramUserItem {
  //     email: string;
  //     note: string;
  //     telephone: string;
  //     userName: string;
  //   }
  // interface appParams {
  //   actionType: "AppCreate" | "AppUpdate"; //新增，默认
  //   catalogId: string; //应用分组，通过/app/catalog接口创建
  //   codeFileId: string; //代码文件ID，上传后返回
  //   codeHash: string | "";
  //   codeRepoId: string; //镜像仓库ID ，通过/app/repo/list 查询列表选择一个仓库
  //   cspUserId: ""; //不需要填写
  //   deploy: true; //是否立即部署，目前仅支持立即
  //   description: string; //应用描述
  //   hostResolves: [
  //     //host 映射
  //     {
  //       host: string;
  //       ip: string;
  //     }
  //   ];
  //   name: string; //应用名称
  //   packageType: "image"; //默认
  //   profile: {
  //     //环境变量 ，非必填
  //     env: any;
  //   };
  //   replicas: number | 1; //默认副本数量 1
  //   runtimeId: string; //运行时ID，通过接口/runtime/list 获取
  //   serverInfoId: string; //服务器ID，通过接口/sem/cluster/list
  //   version: string; //版本号，每次更新必须是大于现有的app版本号
  //   deploymentInfo: any;
  //   _uploadType: number; // 上传方式
  // }
  // interface appGroupParams {
  //   icon?: string;
  //   name: string;
  //   parentId?: string;
  //   sort?: number;
  // }
  // interface getApplist {
  //   appId?: string;
  //   catalogId?: string;
  //   catalogName?: string;
  //   name?: string;
  //   namespace?: string;
  //   pageNum: number;
  //   pageSize: number;
  //   runtimeId?: string;
  //   status?: string;
  //   version?: string;
  //   versionId?: string;
  // }
}
