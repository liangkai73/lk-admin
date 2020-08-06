import 'febs-browser';
import './vue';

export { }

declare global {
  // navbar.
  const $sys_navbar: {
    triggerSideBar: () => void,
    hideSideBar: () => void,
  }
}