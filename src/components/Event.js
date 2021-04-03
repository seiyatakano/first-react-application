import React, {useContext} from 'react'
import { 
    DELETE_EVENT,
    ADD_OPERAION_LOG,
    ADD_OPERATION_LOG
} from '../actions'

import AppContext from '../contexts/AppContext'
import { timeCurrentIso8601 } from '../utils'

const Event = ({event}) => {
    const { dispatch } = useContext(AppContext)
    const handleClickDeleteButton = () => {
        const result = window.confirm(`イベント(id=${event.id})を本当に削除してよろしいですか？`)
        if(result){
            dispatch({
                type: DELETE_EVENT, id: event.id, 
            })
            dispatch({
                type: ADD_OPERATION_LOG,
                description: `イベント(id=${event.id})を削除しました`,
                operatedAt: timeCurrentIso8601()
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