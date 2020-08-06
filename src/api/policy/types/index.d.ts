
// 策略query对象
interface resourceQuery {
  "expression": string,
  "objId"?: string | number,
  "objType"?: string,
  "resourceDesc": string,
  "resourceId"?: string | number, //use in put
  "resourceName": string

}