/*
 * @Date: 2023-06-20 21:08:20
 * @Author: 枫
 * @LastEditors: 枫
 * @description: secret types
 * @LastEditTime: 2023-06-27 20:32:57
 */
export interface ISecret {
  otpType: string;
  label: string;
  secret: string;
  issuer?: string;
  digits?: number;
  algorithm?: string;
  period?: number;
  [x?: string];
}
