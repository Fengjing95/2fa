/*
 * @Date: 2023-06-29 18:43:37
 * @Author: 枫
 * @LastEditors: 枫
 * @description: 公共
 * @LastEditTime: 2023-06-29 18:54:42
 */

import { defaultSecret } from "@/constant/defaultSecret";

/**
 * 毫秒转为秒
 *
 * @param {number} ms 毫秒时间戳
 * @returns 秒时间戳
 */
export function transformMS2Sec(ms: number) {
  return Number(String(ms).slice(0, -3));
}

/**
 * 获取有效时间
 * @returns 有效时间
 */
export function getEffectiveTime() {
  const base = defaultSecret.period
  return base - (transformMS2Sec(Date.now()) % base)
}

