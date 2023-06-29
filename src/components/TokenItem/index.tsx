/*
 * @Date: 2023-06-23 21:52:01
 * @Author: 枫
 * @LastEditors: 枫
 * @description: 令牌渲染项
 * @LastEditTime: 2023-06-29 19:28:18
 */

import { ISecret } from '#/secret'
import { compute } from '@/utils';
import React, { useEffect, useState } from 'react'

interface IProps {
  secret: ISecret; // 令牌信息
  time: number; // 有效时间
}

export default function TokenItem(props: IProps) {
  const { secret, time } = props;
  const [token, setToken] = useState('');

  useEffect(() => {
    // 有效期刷新时 或者 第一次加载时计算
    if (time === 30 || !token) {
      const token = compute(secret)
      setToken(token)
    }
  }, [time])


  return (
    <div>{token} { time}</div>
  )
}

