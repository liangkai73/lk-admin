interface createFun {
  "codeId"?: string,// "代码ID",
  "codePath"?: string, // "代码路径",
  "descn": string, //"函数描述"
  "envVars"?: object,// "环境变量",
  "functionCodeType"?: string,// "函数类型",
  "functionHandler": string,// "函数处理handler",
  "functionId"?: string,// "函数ID",
  "functionName"?: string, // "函数名称",
  "limitConcurrent"?: number, // "并发限制大小",
  "limitCpu"?: number,// "CPU限制大小",
  "limitDisk"?: number, // "磁盘限制大小",
  "limitMemorySize"?: number, // "内存限制大小",
  "limitTimeout"?: number, // "超时时间",
  "revision"?: number, // "函数版本号",
  "runtimeId"?: string,// "函数运行时ID"
}