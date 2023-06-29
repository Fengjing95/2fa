/*
 * @Date: 2023-06-18 09:16:21
 * @Author: 枫
 * @LastEditors: 枫
 * @description: popup UI
 * @LastEditTime: 2023-06-29 19:40:28
 */
import { useEffect, useState } from 'react'
import styles from './Popup.module.less'
import { ISecret } from '#/secret'
import { MessageType } from '@/constant/message'
import NullPage from '@/components/NullPage'
import { PlusOutlined } from '@ant-design/icons'
import {Button} from 'antd'
import DrawForm from '@/components/DrawForm'
import TokenItem from '@/components/TokenItem'
import { useInterval } from 'ahooks'
import { authenticator } from '@/package/otplib-browser'

function App() {
  const [secrets, setSecrets] = useState<ISecret[]>([]); // 密钥
  const [addVisible, setAddVisible] = useState(false); // 添加令牌弹窗可见性
  const [time, setTime] = useState(0); // 令牌有效时间

  useInterval(
    () => setTime(authenticator.timeRemaining()),
    1000,
    { immediate: true }
  )

  // 获取所有令牌
  async function fetchSecrets() {
    const { success, secrets } = await chrome.runtime.sendMessage({ type: MessageType.FETCH_SECRETS })
    success && setSecrets(secrets)
  }

  // 添加令牌
  async function addSecret(secret: ISecret) {
    const { success } = await chrome.runtime.sendMessage({ type: MessageType.ADD_SECRET, secret });
    success && setSecrets([...secrets, secret])
    return success
  }

  // 打开新增弹窗
  function openAddSecret() {
    setAddVisible(true)
  }

  // 关闭新增弹窗
  function closeAddSecret() {
    setAddVisible(false)
  }

  useEffect(() => {
    // 加载页面时获取所有令牌
    fetchSecrets()
  }, [])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <img className={styles.logo} src="/img/logo-48.png" />
          <div className={styles.title}>2FA Token</div>
        </div>

        <div>
          <Button
            type="text"
            icon={<PlusOutlined style={{ fontSize: '16px' }} rev="1.0.0" />}
            onClick={openAddSecret}
          />
        </div>
      </header>

      <main>
        {
          secrets.length
            ? secrets.map((secret) => (
              <TokenItem key={secret.id} secret={secret} time={time} />
          ))
          : <NullPage create={openAddSecret} />
        }
      </main>

      <DrawForm visible={addVisible} close={closeAddSecret} submit={addSecret} />
    </div>
  )
}

export default App
