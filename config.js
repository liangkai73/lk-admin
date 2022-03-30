"use strict";

/**
 * Copyright (c) 2017 Copyright of All Rights Reserved.
 * Author: lipengxiang
 * Date: 2019-06-14 17:18
 * Desc:
 */

exports.Host = "0.0.0.0";
exports.Port = 8083;

exports.Proxy = {
  "/quantum-service/": {
    target: 'http://39.103.181.81:13303',
    changeOrigin: true,
    pathRewrite: {
      '^/quantum-service/': '/'
    }
  }
};
