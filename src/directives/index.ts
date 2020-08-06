
import Vue from 'vue'
import { account } from "./account";


function install() {
  if ((install as any).installed) {
    return;
  }
  (install as any).installed = true;

  Vue.directive('account', account);
}
install();
