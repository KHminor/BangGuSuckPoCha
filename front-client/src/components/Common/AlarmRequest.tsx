import axios from "axios"
import { useEffect, useState } from "react"
import styles from './Common.module.css'

function AlarmRequest():JSX.Element {

  return (
    <div className="grid w-full " style={{gridTemplateRows: '4fr 0.2fr' }}>
        <div className={`flex justify-center items-start my-2 overflow-scroll ${styles.hideScroll}`}>
          <RequestListComponent from_nickname={'남규짱짱맨'}/>
        </div>
        <div></div>
    </div>
  )
}
export default AlarmRequest


function RequestListComponent({from_nickname}:any):JSX.Element {
  return (
    <div className="grid h-[4rem] w-full border-2  border-white" style={{gridTemplateRows: '1fr 0.8fr'}}>
      <div className="flex justify-start items-center h-full w-[95%] ml-[5%] text-lg">{from_nickname}</div>
      <div className="grid" style={{gridTemplateColumns: '3fr 1fr'}}>
        <div className="flex justify-start items-center h-full w-[92%] ml-[8%] text-xs">님에게 친구 요청이 왔습니다</div>
        <div className="grid" style={{gridTemplateColumns: '1fr 1fr'}}>
          <div className="flex justify-center items-center">
            <img className="flex justify-center items-center h-[60%]" src={require('../../assets/roomIcon/check.png')} alt="" />
          </div>
          <div className="flex justify-center items-center">
            <img className="flex justify-center items-center h-[60%]" src={require('../../assets/roomIcon/cancel.png')} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}