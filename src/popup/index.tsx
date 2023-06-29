/*
 * @Date: 2023-06-18 09:16:21
 * @Author: 枫
 * @LastEditors: 枫
 * @description: popup APP
 * @LastEditTime: 2023-06-28 21:29:58
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Popup'
import './index.css'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
