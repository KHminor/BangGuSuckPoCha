import axios from "axios";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { changeAlarmApiDataState, changeNavAlarmReviewEmojiUserData, showRoomUserProfile } from "src/store/store";
import Navbar from "../Common/Navbar";
import NavUserEmojiClickModal from "../Common/NavUserEmojiClickModal";
import styles from "../Main/Main.module.css";
import './ReviewPage.css'

function ReviewPage():JSX.Element {
  const dispatch = useAppDispatch()
  const username = localStorage.getItem('Username')
  const [reviewAfter, setReviewAfter] = useState([])
  const [reviewBefore, setReviewBefore] = useState([])
  const navAlarmReviewEmojiUserData: any = useAppSelector((state: any) => {
    return state.navAlarmReviewEmojiUserData;
  });
  const RoomUserProfileClickCheck: any = useAppSelector((state: any) => {
    return state.RoomUserProfileClickCheck;
  });
  useEffect(()=> {
    axios({
      method: 'get',
      url: `https://i8e201.p.ssafy.io/api/user/review/${username}`
    })
    .then((r)=>{
      const datas:any[] = r.data.data
      console.log('리뷰목록: ',r.data.data);
      // 리뷰 이전
      const Beforedata:any = datas.filter((data)=> {
        return data.review_at === null
      })
      setReviewBefore(Beforedata)
      // 리뷰 이후
      const Afterdata:any = datas.filter((data)=> {
        return data.review_at !== null
      })
      setReviewAfter(Afterdata)
    })
  },[])


  return (
    <>
      {RoomUserProfileClickCheck ? (
        <NavUserEmojiClickModal userData={navAlarmReviewEmojiUserData} />
      ) : null}
      
      <div
        className={`grid w-screen min-w-[75rem] h-screen ${styles.hideScroll}`}
        style={{
          backgroundColor: "rgb(25, 25, 25)",
          gridTemplateRows: "11.7rem 1fr",
          overflow: "scroll",
        }}
      >
        <div className="grid" style={{gridTemplateRows: '12rem 8rem'}}>
          <div></div>
          <Navbar />
        </div>
        <ReviewComponent reviewAfter={reviewAfter} setReviewAfter={setReviewAfter} reviewBefore={reviewBefore} setReviewBefore={setReviewBefore}/>

      </div>
    </>
  )
}
export default ReviewPage 

function ReviewComponent({reviewAfter,setReviewAfter,reviewBefore,setReviewBefore }:any):JSX.Element {
  let showBefore:any
  let showAfter:any
  const [clickReviewState,setClickReviewState] = useState(false)
  // console.log('리뷰 안한거: ',reviewBefore)
  // console.log('리뷰 한거: ',reviewAfter)
  // 리뷰안한게 있다면
  if (reviewBefore.length !== 0) {
    showBefore = reviewBefore?.map((e:any)=> {
      return (
        <StartReviewComponent clickReviewState={clickReviewState} userData={e} setReviewBefore={setReviewBefore} />
      )
    })
  }

  if (reviewAfter.length !== 0) {
    showAfter = reviewAfter?.map((e:any)=> {
      return (
        <StartReviewComponent clickReviewState={clickReviewState} userData={e} setReviewAfter={setReviewAfter}  />
      )
    })
  }
  // 기본 데이터는 리뷰 목록(false), 리뷰 완료(true)
  
  return (
    <div className="max-h-[55rem] grid" style={{gridTemplateColumns: '1fr 1fr 1fr'}}>
      {/* 빈칸 */}
      <div></div>
      {/* 했는지 안했는지에 대한 체크 */}
      <div className="grid text-white pb-4 " style={{gridTemplateRows: '0.3fr 3fr 0.3fr'}}>
        <div className="flex justify-center items-center">
          <div className="h-full w-[7rem] text-xl cursor-pointer mx-2">
            <span className="flex justify-center items-end h-full nickNameNeon" style={{borderBottom: 'groove 4px green' }} onClick={()=> {setClickReviewState(false)}}>리뷰 목록</span></div>
          <div className="h-full w-[7rem] text-xl cursor-pointer mx-2">
            <span className="flex justify-center items-end h-full nickNameNeon" style={{borderBottom: 'groove 4px green' }} onClick={()=> {setClickReviewState(true)}}>리뷰 완료</span></div>
        </div>
        {/* 리뷰 목록 */}
        <div className="flex flex-col w-full max-h-[37.5rem] overflow-scroll hideScroll py-3">
          {
            clickReviewState === false ? (showBefore === 0? <div className="flex justify-center items-center">리뷰 요청이 아직 없어요🍻</div> : showBefore): (showAfter === 1? <div className="flex justify-center items-center">리뷰 요청이 아직 없어요🍻</div> : showAfter)
          }

        </div>
        <div></div>
      </div>
      {/* 빈칸 */}
      <div></div>
    </div>
  )
}

// 리뷰 평가
function StartReviewComponent({userData, clickReviewState , setReviewBefore, setReviewAfter}:any):JSX.Element {
  const {create_at, review_at, reviewId, review_score, to_comment, to_nickname, to_profile, to_username} = userData
  // console.log('127번임', userData)

  let createReviewat = '0000-00-00'
  let finishReviewat = '0000-00-00'
  if (clickReviewState) {
    createReviewat = create_at.slice(0,10)
    finishReviewat = review_at.slice(0,10)
  } else {
    createReviewat = create_at.slice(0,10)
  }

  const dispatch = useAppDispatch()
  const [starState,setStarState] = useState()
  const username = localStorage.getItem('Username')
  const [rating, setRating] = useState(null) as any
  return (
    <div className="grid w-full min-h-[12rem] mb-1" style={{gridTemplateRows: '0.6fr 2fr '}}>
      <div className="h-full"></div>
      {
        clickReviewState === false? 
        (
          <div className="grid " style={{gridTemplateRows: '2.1fr 0.8fr 0.8fr', border: 'groove 4px white', borderRadius: '1.5rem'}}>
            {/* 이모지, 닉네임, 별점 */}
            <div className="flex justify-center items-center">
              <div className="grid w-[80%] h-full" style={{gridTemplateColumns: '1fr 4fr 2.7fr'}}>
                <div className="flex justify-center items-center mr-0" onClick={()=> {
                  // 클릭한 유저 정보 가져와서 담아주기
                  axios.get(`https://i8e201.p.ssafy.io/api/user/info/${to_username}`).then((r)=> {
                    dispatch(changeNavAlarmReviewEmojiUserData(r.data))
                    dispatch(showRoomUserProfile())         
                  })
                }}>
                  <img className="w-[4rem] h-[4rem] cursor-pointer" src={require('../../assets/myPage/sunglassEmoji.png')} alt="" />
                </div>
                <div className="flex justify-start items-center pl-3 overflow-x-scroll hideScroll nickNameNeon cursor-pointer">
                  {to_nickname}
                </div>
                <div className="flex justify-end items-center">
                  <StarRating  setStarState={setStarState} rating={rating} setRating={setRating}/>
                </div> 
              </div>
            </div>
            <div className="flex justify-start items-start pl-[4.5rem] text-sm"><span>{to_comment}</span></div>
            <div className="grid" style={{gridTemplateColumns: '2fr 3fr 2fr'}}>
              <div className="flex justify-start items-center text-xs pl-[4.5rem]">{createReviewat}</div>
              <div className="flex justify-center items-center w-full h-ful">
                <input className={`text-base cursor-pointer ${styles.createBtn} reviewpage `} type="submit" value={'평가하기'} onClick={(e)=> {
                  setRating(null)
                  axios({
                    method: 'put',
                    url: 'https://i8e201.p.ssafy.io/api/user/review',
                    data: {
                      "reviewId" : reviewId,
                      "reviewScore" : starState,
                      "toUsername" : to_username
                    }
                  })
                  .then(()=> {
                    toast.success(`${to_nickname}님을 평가 완료하였습니다`);
                    axios({
                      method: 'get',
                      url: `https://i8e201.p.ssafy.io/api/user/review/${username}`
                    })
                    .then((r:any)=> {
                      const datas:any[] = r.data.data
                      console.log('리뷰목록: ',r.data.data);
                      // 리뷰 이전
                      const Beforedata:any = datas.filter((data)=> {
                        return data.review_at === null
                      })
                      setReviewBefore(Beforedata)
                      // 리뷰 이후
                      const Afterdata:any = datas.filter((data)=> {
                        return data.review_at !== null
                      })
                      setReviewAfter(Afterdata)
                    })
                  })
                  
                }}/>
              </div> 
              <div></div>
            </div>
          </div>
        ):
        (
          <div className="grid " style={{gridTemplateRows: '2.1fr 0.8fr 0.8fr', border: 'groove 4px white', borderRadius: '30px'}}>
            {/* 이모지, 닉네임, 별점 */}
            <div className="flex justify-center items-center">
              <div className="grid w-[80%] h-full" style={{gridTemplateColumns: '1fr 4fr 2.7fr'}}>
                <div className="flex justify-center items-center mr-0" onClick={()=> {
                  // 클릭한 유저 정보 가져와서 담아주기
                  axios.get(`https://i8e201.p.ssafy.io/api/user/info/${to_username}`).then((r)=> {
                    dispatch(changeNavAlarmReviewEmojiUserData(r.data))
                    dispatch(showRoomUserProfile())         
                  })
                }}>
                  <img className="w-[4rem] h-[4rem]" src={require('../../assets/myPage/sunglassEmoji.png')} alt="" />
                </div>
                <div className="flex justify-start items-center pl-3 overflow-x-scroll hideScroll nickNameNeon cursor-pointer">
                  {to_nickname}
                </div>
                <div className="flex justify-end items-center">
                  <span className="font-semibold text-[3rem]">{review_score}</span>&nbsp; 점
                </div> 
              </div>
            </div>
            <div className="flex justify-start items-center pl-[4.5rem] text-sm"><span>{to_comment}</span></div>
            <div className="grid" style={{gridTemplateColumns: '2fr 3fr 2fr'}}>
              <div className="flex justify-start items-center text-xs pl-[4.5rem]">{createReviewat}</div>
              <div className="flex justify-center items-center w-full h-ful">
                
              </div> 
              <div className="flex justify-end items-center text-xs pr-[4.5rem]">{finishReviewat}</div>
            </div>
          </div>
        )
      }
    </div>
  )
}


// 별점 기능
function StarRating({setStarState,rating, setRating}:any):JSX.Element {
  
  const [hover, setHover] = useState(null) as any
  setStarState(rating)

  return (
    <div className="flex">
      {[...Array(5)].map((star, idx)=> {
        const ratingValue = idx + 1
        return (
          <label>
            <input type="radio" name="rating" value={ratingValue} 
            onClick={()=> {
              setRating(ratingValue)
            }}
            />
            <FaStar className="star" color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'} size={25}
              onMouseEnter={()=> {setHover(ratingValue)}}
              onMouseLeave={()=> {setHover(null)}}
            />
          </label>
        )
      })}
    </div>
  )
}



