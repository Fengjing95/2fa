/*
 * @Date: 2023-06-23 20:19:23
 * @Author: 枫
 * @LastEditors: 枫
 * @description: 正则表达式
 * @LastEditTime: 2023-06-27 20:35:29
 */

// OTPAuth 校验格式 (暂不支持hotp)
export const otpAuthReg = /^otpauth:\/\/(totp)\/([^:]+:[^?]+)\??([^?]*)$/
