import { useEffect, useState } from "react"
import { useAppSelector } from "../../store/hooks";
import styles from './Common.module.css'
import './StarReview.css'
import AlarmBeforeReviewListComponent from "./AlarmBeforeReviewListComponent";
import RequestListComponent from "./AlarmRequestListComponent";
import { useNavigate } from "react-router-dom";

function AlarmRequest():JSX.Element {
  const navigate = useNavigate()
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
      // 유저 리뷰를 하기 위한 컴포넌트
      setApiDataList(alarmApiData.map((e:any)=> {
        return (
          <AlarmBeforeReviewListComponent to_nickname={e.to_nickname} reviewId={e.reviewId} toUsername={e.to_username} to_profile={e.to_profile}
          />
          // <StarRating/>
        )
      }))
    }
  },[alarmApiData])

  return (
    <>
      {
        // 클릭한게 리뷰가 아닐경우
        alarmClickState !== 2 ? 
        (
          <div className="grid w-full h-full" style={{gridTemplateRows: '4fr 0.2fr' }}>
            <div className={`flex flex-col justify-start items-center overflow-scroll max-h-[25.6rem] my-[0.8rem] ${styles.hideScroll}`}>
              {
                apiDataList
              }
            </div>
            <div></div>
          </div>
        ) :
        (
          // 클릭한게 리뷰일 경우
          <div className="grid w-full h-full" style={{gridTemplateRows: '4fr 0.4fr' }}>
            <div className={`flex flex-col justify-start items-center overflow-scroll max-h-[25.6rem] my-[0.8rem] ${styles.hideScroll}`}>
              {
                apiDataList
              }
            </div>
            <div className="flex justify-center items-center text-sm pl-4">
              <span className="cursor-pointer reviewpage inline-block blink" onClick={()=> {
                navigate('/review')
              }}>more</span>
            </div>
          </div>
        )
      }
      
    </>
    
  )
}
export default AlarmRequest



