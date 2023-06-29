/*
 * @Date: 2023-06-18 09:16:21
 * @Author: 枫
 * @LastEditors: 枫
 * @description: description
 * @LastEditTime: 2023-06-28 22:27:20
 */
import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  name: '2FA Token',
  description: '一款在浏览器中运行的虚拟令牌扩展程序，可以跟随 chrome 账号进行同步。',
  version: '0.0.0',
  manifest_version: 3,
  icons: {
    '16': 'img/logo-16.png',
    '48': 'img/logo-48.png',
    '128': 'img/logo-128.png',
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/logo-48.png',
  },
  // options_page: 'options.html',
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['src/content/index.ts'],
    },
  ],
  web_accessible_resources: [
    {
      resources: [
        'img/logo-16.png',
        'img/logo-48.png',
        'img/logo-128.png',
      ],
      matches: [],
    },
  ],
  permissions: ['storage', 'contextMenus'],
})
