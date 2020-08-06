'use strict';

/**
* Copyright (c) 2021 Originforest Co.,Ltd. All Rights Reserved.
* Author: brian.li
* Date: 2021-10-19 22:01
* Desc: 
*/


function install() {
  if ((install as any).installed) {
    return;
  }
  (install as any).installed = true;

  onSidebar();
}
install();


function onSidebar() {
  $UIKeyboard.on('ctrl+enter,⌘+enter', () => {
    $sys_navbar.triggerSideBar();
  });
}