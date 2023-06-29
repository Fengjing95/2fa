/*
 * @Date: 2023-06-28 22:20:15
 * @Author: 枫
 * @LastEditors: 枫
 * @description: 内容脚本
 * @LastEditTime: 2023-06-29 08:19:26
 */

import { MessageType } from "@/constant/message";

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === MessageType.INSERT_TEXT) {
    // 获取可编辑区域的元素（例如文本框、textarea等）
    const inputElement = document.activeElement as HTMLInputElement;
    inputElement.focus()
    // 在光标位置插入文本
    if (inputElement) {
      inputElement.value += message.text;
    }
  }
});
