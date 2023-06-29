/*
 * @Date: 2023-06-22 19:52:03
 * @Author: 枫
 * @LastEditors: 枫
 * @description: 添加令牌弹窗
 * @LastEditTime: 2023-06-27 20:38:27
 */
import React from 'react'
import { Drawer, Space, Button, Form, Input, message } from 'antd'
import { ISecret } from '#/secret';
import { otpAuthReg } from '@/constant/regexp';
import { extract } from '@/utils';

interface IProps {
  visible: boolean;
  close: () => void;
  submit: (secret: ISecret) => Promise<boolean>;
}

const requiredFields = ['secret', 'label', 'otpType']

export default function DrawForm(props: IProps) {
  const { visible, close, submit } = props;
  const [form] = Form.useForm<{ otpAuth: string }>();

  // 表单提交
  async function onFinish() {
    // 校验并提取表单数据
    try {
      const { otpAuth } = await form.validateFields();
      const secret = extract(otpAuth)
      const res = requiredFields.every((field) => !!secret[field])
      if (!res) {
        message.warning('缺少必要字段')
        return
      }
      const success = await submit(secret)
      if (success)
        close()
    } catch (error) {
      console.log('表单校验失败')
    }
  }

  return (
    <Drawer
      title="添加令牌"
      placement="bottom"
      height="calc(100vh - 45px)"
      open={visible}
      closable={false}
      maskClosable={false}
      extra={
        <Space>
          <Button onClick={close} size="small">取消</Button>
          <Button onClick={onFinish} size="small" type="primary">
            添加
          </Button>
        </Space>
      }
      destroyOnClose
    >
      <Form form={form}>
        <Form.Item
          label="OTPAuth"
          name="otpAuth"
          required
          rules={[
            { required: true, message: '请输入OTPAuth地址' },
            { pattern: otpAuthReg, message: '格式错误' }
          ]}
        >
          <Input.TextArea placeholder="请在此粘贴应用提供的OTPAuth地址" />
        </Form.Item>
      </Form>
    </Drawer>
  )
}

