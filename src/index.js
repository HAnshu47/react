import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
// 导入store 模块
import { Provider } from 'react-redux'
import store from './store'

const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
  <App />
  </Provider>
)
