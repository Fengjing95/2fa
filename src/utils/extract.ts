/*
 * @Date: 2023-06-24 10:16:23
 * @Author: 枫
 * @LastEditors: 枫
 * @description: 从otpAuth路径解析数据
 * @LastEditTime: 2023-06-28 21:18:01
 */

import { ISecret } from "#/secret";
import { otpAuthReg } from "@/constant/regexp";

/**
 * 提取OTPAuth为ISecret对象
 * @param {string} value  otpAuth 路径文本
 * @returns
 */
export function extract(value: string) {
  const [_, otpType, label, query] = value.match(otpAuthReg) as RegExpMatchArray;
  const search = new URLSearchParams(query)
  const secret = {
    otpType,
    label
  } as ISecret;
  search.forEach((value, key) => {
    secret[key] = value
  })

  return secret
}
