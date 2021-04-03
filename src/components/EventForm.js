import React, { useState, useContext } from 'react'

import {
  DELETE_ALL_EVENTS, 
  CREATE_EVENT,
  ADD_OPERATION_LOG,
  DELETE_ALL_OPERATION_LOGS
} from '../actions'

import AppContext from '../contexts/AppContext'
import { timeCurrentIso8601} from '../utils.js'

const EventForm = () => {
    const {state, dispatch} = useContext(AppContext)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    //状態繊維をさせたいタイミングでdispatch(司令役)にactionのtypeを渡す形で呼び出す。
    //switch文の中で判別して実行してくれる
    const deleteAllEvents = e => {
      e.preventDefault()
      const result = window.confirm('全てのイベントを本当に削除してもよろしいですか？')
      if(result){
        dispatch({ type:DELETE_ALL_EVENTS })
        dispatch({
          type:ADD_OPERATION_LOG,
          description:'全てのイベントを削除しました',
          operatedAt: timeCurrentIso8601()
        })
      }
    }
    const addEvent = e => {
      //画面全体をリロードする挙動をpreventできる
      e.preventDefault()
      dispatch({
        type: CREATE_EVENT,
        title,
        body
      })

      dispatch({
        type: ADD_OPERATION_LOG,
        description: 'イベントを作成しました。',
        operatedAt: timeCurrentIso8601()
      })

      setTitle('')
      setBody('')
    }
    const deleteAllOperationLogs = e => {
      e.preventDefault()
      const result = window.confirm('全てのログを本当に削除しても良いですか？')
      if(result){
        dispatch({
          type: DELETE_ALL_OPERATION_LOGS
        })
      }
    }
    //コンポーネントのボタンの活性化を管理する変数
    const unCreatable = title === '' || body === ''
    return (
        <React.Fragment>
            <h4>イベント作成フォーム</h4>
            <form>
                <div className='form-group'>
                <label htmlFor='formEventTitle'>タイトル</label>
                <input className='form-control' id='formEventTitle' value={title} onChange={e => setTitle(e.target.value)}/>
                </div>
                <div className='form-group'>
                <label htmlFor='formEventBody'>ボディー</label>
                <textarea className='form-control' id='formEventBody' value={body} onChange={e => setBody(e.target.value)}/>
                </div>
                <button className='btn btn-primary' onClick={addEvent} disabled={unCreatable}>イベントを作成する</button>
                <button className='btn btn-danger' onClick={deleteAllEvents} disabled={state.events.length === 0}>全てのイベントを削除する</button>
                <button className='btn btn-danger' onClick={deleteAllOperationLogs} disabled={state.operationLogs.length === 0}>全ての操作ログを削除する</button>
            </form>
        </React.Fragment>
    )
}

export default EventForm