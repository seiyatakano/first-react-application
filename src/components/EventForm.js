import React, { useState } from 'react'

import {DELETE_ALL_EVENTS, CREATE_EVENT} from '../actions'

const EventForm = ({state, dispatch}) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    //状態繊維をさせたいタイミングでdispatch(司令役)にactionのtypeを渡す形で呼び出す。
    //switch文の中で判別して実行してくれる
    const deleteAllEvents = e => {
      e.preventDefault()
      const result = window.confirm('全てのイベントを本当に削除してもよろしいですか？')
      if(result) dispatch({ type:DELETE_ALL_EVENTS })
    }
    const addEvent = e => {
      //画面全体をリロードする挙動をpreventできる
      e.preventDefault()
      console.log({title, body})
      dispatch({
        type: CREATE_EVENT,
        title,
        body
      })
      setTitle('')
      setBody('')
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
                <button className='btn btn-danger' onClick={deleteAllEvents} disabled={state.length === 0}>全てのイベントを削除する</button>
            </form>
        </React.Fragment>
    )
}

export default EventForm