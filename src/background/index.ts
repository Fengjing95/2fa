/*
 * @Date: 2023-06-18 09:16:21
 * @Author: 枫
 * @LastEditors: 枫
 * @description: description
 * @LastEditTime: 2023-06-29 18:40:33
 */

import { ISecret } from "#/secret";
import { otpAuthReg } from "@/constant/regexp";
import { MessageType } from "@/constant/message";
import { compute, extract } from "@/utils";
import {v4 as uuidV4} from 'uuid'

enum StorageKey {
  SECRET = '2fa_token_storage_secrets'
}

enum ContextMenuKey {
  ADD_SECRET = '2fa_token_context_add_secret',
  INSERT_SECRET = '2fa_token_context_insert_secret'
}

/**
 * 更新徽标数量
 */
async function updateBadge() {
  const { [StorageKey.SECRET]: secrets} = await chrome.storage.sync.get([StorageKey.SECRET]);
  chrome.action.setBadgeText({text: secrets.length.toString()});
}

/**
 * 添加令牌
 * @param secret 密钥对象
 * @returns
 */
async function addSecret(secret: ISecret) {
  secret.id = uuidV4();
  const { [StorageKey.SECRET]: secrets = [] } = await chrome.storage.sync.get([StorageKey.SECRET]);
  const items = (
    {
      [StorageKey.SECRET]: secrets.concat(secret)
    }
  );
  await chrome.storage.sync.set(items);
  updateBadge();
  addChildrenMenus(secret);
}

// message 事件处理
chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  switch (message.type) {
    // 获取所有的密钥
    case MessageType.FETCH_SECRETS: {
      chrome.storage.sync.get([StorageKey.SECRET])
        .then(({ [StorageKey.SECRET]: secrets = [] }) => (
          {
            success: true, secrets
          }
        ))
        .then(sendResponse)
      break;
    }

    // 添加新的密钥
    case MessageType.ADD_SECRET: {
      addSecret(message.secret)
        .then(() => ({ success: true }))
        .catch(() => ({ success: false }))
        .then(sendResponse)
      break;
    }

    default:
      break;
  }

  return true
})

/**
 * 添加contextMenus子菜单
 * @param secret 密钥
 */
function addChildrenMenus(secret: ISecret) {
  chrome.contextMenus.create({
    id: secret.id,
    title: `${secret.issuer}:${secret.label}`,
    contexts: ['editable'],
    parentId: ContextMenuKey.INSERT_SECRET
  })
}

// 外层菜单
chrome.contextMenus.create({
  id: ContextMenuKey.ADD_SECRET,
  title: '添加令牌',
  contexts: ['selection'],
})

chrome.contextMenus.create({
  id: ContextMenuKey.INSERT_SECRET,
  title: '填入 code',
  contexts: ['editable'],
})

// 遍历生成菜单
chrome.storage.sync.get([StorageKey.SECRET])
  .then(({ [StorageKey.SECRET]: secrets = [] }) => (
    secrets.forEach(addChildrenMenus)
  ))

// 菜单事件处理
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  switch (info.menuItemId) {
    case ContextMenuKey.ADD_SECRET: {
      const value = info.selectionText as string
      if (otpAuthReg.test(value)) {
        const secret = extract(value)
        addSecret(secret)
      } else {
        console.log('不是OTPAuth格式')
      }
      break;
    }

    default: {
      const parent = info.parentMenuItemId as string;
      if (parent === ContextMenuKey.INSERT_SECRET) {
        if (!tab) return;

        const { [StorageKey.SECRET]: secrets} = await chrome.storage.sync.get([StorageKey.SECRET])
        const id = info.menuItemId as string;
        const targetSecret = secrets.find((secret: ISecret) => secret.id === id)
        // TODO 计算
        const token = compute(targetSecret)
        chrome.tabs.sendMessage(tab.id as number, {
          action: MessageType.INSERT_TEXT,
          text: token,
        });
      }
      break;
    }
  }
})

updateBadge()
