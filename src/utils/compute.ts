/*
* @Date: 2023-06-26 22:23:16
* @Author: 枫
 * @LastEditors: 枫
* @description: 计算 code
 * @LastEditTime: 2023-06-29 19:40:24
*/

import { ISecret } from "#/secret";
import { totp } from '../package/otplib-browser';

/**
 * 根据 ISecret 计算 Code
 * @param {ISecret} secret 密钥对象
 * @returns
 */
export function compute(secret: ISecret) {
  return totp.generate(secret.secret)
}
