'use strict';

/**
* Copyright (c) 2021 Originforest Co.,Ltd. All Rights Reserved.
* Author: brian.li
* Date: 2021-10-20 21:04
* Desc: 
*/

/**
* @desc: 请求的分页信息.
*/
export interface ApiPageRequest {
  /** 从1开始 */
  pageNum?: number;
  /** 默认20 */
  pageSize?: number;
}

/**
* @desc: 分页信息.
*/
export interface ApiPageResponse<T> {
  /** 总条数 */
  total: number;
  /** 每页条数 */
  pageSize: number;
  /** 当前页 */
  pageNum: number;
  /** 总页数 */
  pages: number;

  /** 结果列表 */
  list: [T];
}