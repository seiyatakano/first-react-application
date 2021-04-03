import React, { useReducer }from 'react'
// jqueryに依存しているため、単体のimportだとエラーが生じる
// import 'bootstrap'
//bootstrapテクノロジーのcss部分のみを抜き出したモジュールを取り入れる。
import 'bootstrap/dist/css/bootstrap.min.css'

import EventForm from './EventForm'
import Events from './Events'
import reducer from '../reducers'

//const [state, dispatch] = useReducer(reducer, initalArg, init)

function App() {
  const [state, dispatch] = useReducer(reducer, [])
  return (
    <React.Fragment>
      <div className='container-fluid'>
        <EventForm state={state} dispatch={dispatch}/>
        <Events state={state} dispatch={dispatch}/>
      </div>
    </React.Fragment>
  )
}
export default App
