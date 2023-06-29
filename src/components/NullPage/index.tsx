/*
 * @Date: 2023-06-22 15:07:12
 * @Author: 枫
 * @LastEditors: 枫
 * @description: 空页面
 * @LastEditTime: 2023-06-22 15:47:05
 */
import React from 'react'
import { Empty, Button } from 'antd'
import styles from './index.module.less'

interface IProps {
  create: () => void;
}

export default function NullPage(props: IProps) {
  const { create } = props;

  return (
    <div className={styles.nullPage}>
      <Empty
        imageStyle={{ height: 60 }}
        description="还没有添加令牌"
      >
        <Button type="primary" onClick={create}>添加</Button>
      </Empty>
    </div>
  )
}

