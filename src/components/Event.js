import React from 'react'
import { DELETE_EVENT} from '../actions'

const Event = ({event, dispatch}) => {
    const handleClickDeleteButton = () => {
        const result = window.confirm(`イベント(id=${event.id})を本当に削除してよろしいですか？`)
        if(result){
            dispatch({
                type: DELETE_EVENT, id: event.id, 
            })
        }
    }
    return (<tr>
    <td>{event.id}</td>
    <td>{event.title}</td>
    <td>{event.body}</td>
    <td><button type='button' className='btn btn-danger' onClick={handleClickDeleteButton}>削除</button></td>
    </tr>)
}

export default Event

//アクションのタイプは定数がお好き
//actionを一元管理するスキーマがactions