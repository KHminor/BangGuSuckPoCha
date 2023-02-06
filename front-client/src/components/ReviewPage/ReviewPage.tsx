import axios from "axios";
import { useState, useEffect } from "react";
import { useAppDispatch } from "src/store/hooks";
import { changeAlarmApiDataState } from "src/store/store";
import Navbar from "../Common/Navbar";
import styles from "../Main/Main.module.css";
import './ReviewPage.css'
function ReviewPage():JSX.Element {
  const dispatch = useAppDispatch()
  const username = localStorage.getItem('Username')
  const [reviewAfter,setReviewAfter] = useState([])
  const [reviewBefore,setReviewBefore] = useState([])
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
    <div
      className={`grid w-screen min-w-[75rem] h-screen ${styles.hideScroll}`}
      style={{
        backgroundColor: "rgb(25, 25, 25)",
        gridTemplateRows: "11rem 1fr",
        overflow: "scroll",
      }}
    >
      <Navbar />
      <ReviewComponent reviewAfter={reviewAfter} setReviewAfter={setReviewAfter} reviewBefore={reviewBefore} setReviewBefore={setReviewBefore}/>

    </div>
  )
}
export default ReviewPage

function ReviewComponent({reviewAfter,setReviewAfter,reviewBefore,setReviewBefore }:any):JSX.Element {
  return (
    <div className="max-h-[55rem] borer-2 border-pink-300 grid" style={{gridTemplateColumns: '1.3fr 3fr 1.3fr'}}>
      {/* 빈칸 */}
      <div className="border-2 border-red-300"></div>
      {/* 했는지 안했는지에 대한 체크 */}
      <div className="grid border-2 border-green-300 text-white  " style={{gridTemplateRows: '0.3fr 3fr 0.3fr'}}>
        <div className="flex justify-start items-center">
          <div className="h-full w-[12rem] text-xl cursor-pointer"><span className="flex justify-center items-end h-full" onClick={()=> {
            console.log('리뷰 된거: ', reviewAfter);
            console.log('리뷰 안된거: ', reviewBefore);
            
          }}>리뷰 목록</span></div>
          <div className="h-full w-[12rem] text-xl cursor-pointer"><span className="flex justify-center items-end h-full">리뷰 완료</span></div>
        </div>
        {/* 리뷰 목록 */}
        <div className="flex flex-col w-full max-h-[37.5rem] overflow-scroll hideScroll">
          <ReviewLayout reviewAfter={reviewAfter} reviewBefore={reviewBefore}/>
          <ReviewLayout reviewAfter={reviewAfter} reviewBefore={reviewBefore}/>
          <ReviewLayout reviewAfter={reviewAfter} reviewBefore={reviewBefore}/>
          <ReviewLayout reviewAfter={reviewAfter} reviewBefore={reviewBefore}/>
          <ReviewLayout reviewAfter={reviewAfter} reviewBefore={reviewBefore}/>
          <ReviewLayout reviewAfter={reviewAfter} reviewBefore={reviewBefore}/>

        </div>
        <div className="border-2 border-orange-300"></div>
      </div>
      {/* 빈칸 */}
      <div className="border-2 border-blue-300"></div>
    </div>
  )
}


function ReviewLayout({reviewAfter, reviewBefore}:any):JSX.Element {

  return (
    <div className="flex justify-start items-center min-h-[9.375rem] h-[9.375rem] my-[0.75rem] border-2 mb-[0.1rem] border-red-400">
      hi
    </div>
  )
}