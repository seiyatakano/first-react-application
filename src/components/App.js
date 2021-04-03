import React, { useEffect, useReducer }from 'react'
// jqueryに依存しているため、単体のimportだとエラーが生じる
// import 'bootstrap'
//bootstrapテクノロジーのcss部分のみを抜き出したモジュールを取り入れる。
import 'bootstrap/dist/css/bootstrap.min.css'

import EventForm from './EventForm'
import Events from './Events'
import OperationLogs from './OperationLogs'
import reducer from '../reducers'

import AppContext from '../contexts/AppContext'

const APP_KEY = 'appWithRedux'

function App() {
  const appState = localStorage.getItem(APP_KEY)
  const initialState = appState ? JSON.parse(appState) : {
    events: [],
    operationLogs: []
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    //localstrageには、文字列のみが保存できるので、json.stringifyを使用してstateの各情報を文字列にする
    localStorage.setItem(APP_KEY, JSON.stringify(state))
  }, [state])
  return (
    <AppContext.Provider value={{state, dispatch}}>
      <div className='container-fluid'>
        <EventForm />
        <Events />
        <OperationLogs />
      </div>
    </AppContext.Provider>
  )
}
export default App
//子コンポーネントにはpropsという機能を通じて、共通のインスタンスを変更・保持している。
//バケツリレーをやっている感じ->俗に言うPropDrilling問題と呼ばれる
//データの共有をpropsインターフェースだけに頼ると、大規模な開発が難しくなる。
//reduxのproviderを使用すれば、解決
//reduxの導入が面倒
//ただデータを共有したいだけなのに、ルーティン的に行わなければいけない操作が多い。
//useContextを使用すれば、より簡単な方法で解決することが可能になる。

