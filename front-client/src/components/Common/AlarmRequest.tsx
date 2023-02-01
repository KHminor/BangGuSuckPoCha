import axios from "axios"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeAlarmApiDataState, changeAlarmClickState } from "../../store/store";
import styles from './Common.module.css'

function AlarmRequest():JSX.Element {
  const alarmApiData = useAppSelector((state:any)=> {return state.alarmApiData})
  const alarmClickState = useAppSelector((state:any)=> {return state.alarmClickState})
  const [apiDataList, setApiDataList] = useState([])
  


  useEffect(()=> {
    if (alarmClickState === 0) {
      // 유저의 친구 요청 목록데이터를 담은 컴포넌트
      setApiDataList(alarmApiData.map((e:any)=> {
        return (
          <RequestListComponent from_nickname={e.from_nickname} f_request_id={e.f_request_id} sentence='친구 요청이'/>
        )
      }))
    } else if (alarmClickState === 1) {
      // 유저의 포차 초대 목록데이터를 담은 컴포넌트
      setApiDataList(alarmApiData.map((e:any)=> {
        return (
          <RequestListComponent from_nickname={e.fromNickname} invite_id={e.inviteId} pocha_id={e.pochaId} sentence='포차 초대가'/>
        )
      }))
    }
  },[alarmApiData])

  return (
    <div className="grid w-full h-full" style={{gridTemplateRows: '4fr 0.2fr' }}>
        <div className={`flex flex-col justify-start items-center overflow-scroll max-h-[25.6rem] my-2 ${styles.hideScroll}`}>
          {
            apiDataList
          }
        </div>
        <div></div>
    </div>
  )
}
export default AlarmRequest


function RequestListComponent({from_nickname,sentence,invite_id,pocha_id,f_request_id}:any):JSX.Element {
  const dispatch = useAppDispatch()
  // username (현재는 내꺼)
  const username = `1zjK_Yrq6klkIxBWj8bj1WJkV5ng-7jhrRGvlIJXawI`
  const alarmClickState = useAppSelector((state:any)=> {return state.alarmClickState})
  console.log('포차번호',pocha_id, '초대번호',invite_id );
  
  return (
    <div className="grid h-[4rem] w-full " style={{gridTemplateRows: '1fr 0.8fr'}}>
      <div className="flex justify-start items-center h-full w-[95%] ml-[5%] text-lg">{from_nickname}</div>
      <div className="grid" style={{gridTemplateColumns: '3fr 1fr'}}>
        <div className="flex justify-start items-center h-full w-[92%] ml-[8%] text-xs">님에게 {sentence} 왔습니다</div>
        <div className="grid" style={{gridTemplateColumns: '1fr 1fr'}}>
          <div className="flex justify-center items-center">
            <img className="flex justify-center items-center h-[60%]" src={require('../../assets/roomIcon/check.png')} alt="" 
            onClick={()=> {
              if (alarmClickState === 0) {
                
                  axios({
                    method: 'post',
                    url: `https://i8e201.p.ssafy.io/api/user/friend/accept/${f_request_id}`
                  })
                  .then(()=> {
                    axios({
                      method:'get',
                      url: `https://i8e201.p.ssafy.io/api/user/friend/request/${username}`
                    })
                    .then((r)=> {
                      dispatch(changeAlarmApiDataState(r.data.data))
                    })
                  })
                  
              } else if (alarmClickState === 1) {
                axios({
                  method: 'post',
                  url: `https://i8e201.p.ssafy.io/api/pocha/invite/accept/${invite_id}/${pocha_id}`
                })
                .then((r)=> {
                  console.log('초대 승인해따', r);
                  // 승인한 방으로 navigate() 사용하여 보내줄거니깐 목록 재랜더링 안시킴
                })
              }
            }}/>
          </div>
          <div className="flex justify-center items-center">
            <img className="flex justify-center items-center h-[60%]" src={require('../../assets/roomIcon/cancel.png')} alt="" 
            onClick={()=> {
              if (alarmClickState === 0) {
                axios({
                  method: 'delete',
                  url: `https://i8e201.p.ssafy.io/api/user/friend/refuse/${f_request_id}`
                })
                .then(()=> {
                  axios({
                    method:'get',
                    url: `https://i8e201.p.ssafy.io/api/user/friend/request/${username}`
                  })
                  .then((r)=> {
                    dispatch(changeAlarmApiDataState(r.data.data))
                  })
                })
              } else if (alarmClickState === 1) {
                axios({
                  method: 'delete',
                  url: `https://i8e201.p.ssafy.io/api/pocha/invite/refuse/${invite_id}`
                })
                .then((r)=> {
                  axios({
                    method:'get',
                    url: `https://i8e201.p.ssafy.io/api/pocha/invite/${username}`
                  })
                  .then((r)=> {
                    dispatch(changeAlarmClickState(1))
                    dispatch(changeAlarmApiDataState(r.data.data))
                  })
                })
              }
            }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}