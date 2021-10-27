
function loadMessages(ctx) {
  return ctx
    .keys()
    .map((key) => ctx(key).default)
    .reduce((total, item) => (Object.assign(total, item)), {});
}
const ZHCN: any = loadMessages(require.context("./zh_cn", false, /[a-z0-9-_]+\.js$/i));
const EN: any = loadMessages(require.context("./en", false, /[a-z0-9-_]+\.js$/i));

export const messages = {
  'zh-cn': {
    '_lang': '简体中文',
    ...ZHCN,
  },
  'en': {
    '_lang': 'English',
    ...EN,
  },
}

$UILibs.setI18nMessage({
  defaultLocale: 'en',
  messages
})
