import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeAlarmApiDataState, changeAlarmClickState } from "../../store/store";
import styles from './Common.module.css'
import './StarReview.css'

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
    } else if (alarmClickState === 2) {
      setApiDataList(alarmApiData.map((e:any)=> {
        return (
          <ReviewListComponent to_nickname={e.to_nickname}/>
        )
      }))
    }
  },[alarmApiData])

  return (
    <div className="grid w-full h-full" style={{gridTemplateRows: '4fr 0.2fr' }}>
        <div className={`flex flex-col justify-start items-center overflow-scroll max-h-[25.6rem] my-[0.8rem] ${styles.hideScroll}`}>
          {
            apiDataList
          }
        </div>
        <div></div>
    </div>
  )
}
export default AlarmRequest

// 요청리스트
function RequestListComponent({from_nickname,sentence,invite_id,pocha_id,f_request_id}:any):JSX.Element {
  const dispatch = useAppDispatch()
  // username (현재는 내꺼)
  const username = `1zjK_Yrq6klkIxBWj8bj1WJkV5ng-7jhrRGvlIJXawI`
  const alarmClickState = useAppSelector((state:any)=> {return state.alarmClickState})
  console.log('포차번호',pocha_id, '초대번호',invite_id );
  
  return (
    <div className={`grid h-[4rem] w-full `} style={{gridTemplateRows: '1fr 0.8fr', border: 'solid 2px blue'}}>
      <div className="flex justify-start items-center h-full w-[95%] ml-[5%] text-lg">{from_nickname}</div>
      <div className="grid" style={{gridTemplateColumns: '3fr 1fr'}}>
        <div className="flex justify-start items-center h-full w-[92%] ml-[8%] text-xs">님에게 {sentence} 왔습니다</div>
        <div className="grid" style={{gridTemplateColumns: '1fr 1fr'}}>
          <div className="flex justify-center items-center">
            <img className="flex justify-center items-center h-[60%]" src={require('../../assets/roomIcon/check.png')} alt="" 
            onClick={()=> {
              // 승인했을때
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
          {/* 거절했을때 */}
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

// 리뷰리스트
function ReviewListComponent({to_nickname}:any):JSX.Element {
  return (
    <div className="grid h-[4rem] w-full" style={{gridTemplateColumns: '0.25fr 1fr', border: 'solid 2px red'}}>
      {/* 유저 이모지 */}
      <div className="flex justify-center items-start">
        <img className="w-[2rem] h-[2rem]" src={require('../../assets/myPage/sunglassEmoji.png')} alt="" />
      </div>
      {/* 별점 및 평가하기 */}
      <div className="grid" style={{gridTemplateRows: '1fr 1fr'}}>
        <div className="flex justify-start items-center text-base">{to_nickname}</div>
        <StarReview />
      </div>
    </div>
  )
}

// 별점 평가
function StarReview():JSX.Element {
  const [starState,setStarState] = useState()
  const star = useRef<any>(null)
  
  return (
    <div className="flex justify-start items-center">
      <div className={`grid `} style={{gridTemplateColumns: '3fr 1fr 1.5fr'}}>
        <span className="star">
          ★★★★★
          <span ref={star}>★★★★★</span>
          <input type="range" value="1" step="1" min="0" max="10" onInput={()=> {
            document.querySelector(`.star span`)
          }} />
        </span>
        <div></div>
        <div className="flex justify-center items-center cursor-pointer w-full h-ful">
          <input className="text-xs cursor-pointer" type="submit" value={'평가하기'} onClick={(e)=> {
            e.preventDefault()
            console.log('제출해따!',starState);
            
          }}/>
        </div>
      </div>
    </div>
  )
}

