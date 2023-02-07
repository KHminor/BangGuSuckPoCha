import axios from "axios";
import { FaStar } from 'react-icons/fa'
import styles from './Common.module.css'
import { useState } from "react";
import { changeAlarmApiDataState } from "../../store/store";
import { useAppDispatch } from "../../store/hooks";
import { toast } from "react-toastify";

// 리뷰 평가
function StarReview({to_nickname, reviewId, toUsername}:any):JSX.Element {
  const dispatch = useAppDispatch()
  const [starState,setStarState] = useState()
  // username (현재는 내꺼)
  const username = localStorage.getItem('Username')
  const [rating, setRating] = useState(null) as any
  return (
    
    <div className="flex justify-start items-center">
      <div className={`grid `} style={{gridTemplateColumns: '3fr 1fr 1.5fr'}}>
        <StarRating  setStarState={setStarState} rating={rating} setRating={setRating}/>
        <div></div>
        <div className="flex justify-center items-center cursor-pointer w-full h-ful">
          <input className={`text-xs cursor-pointer ${styles.createBtn}`} type="submit" value={'평가하기'} onClick={(e)=> {
            console.log('평가점수: ', starState)
            setRating(null)
            axios({
              method: 'put',
              url: 'https://i8e201.p.ssafy.io/api/user/review',
              data: {
                "reviewId" : reviewId,
                "reviewScore" : starState,
                "toUsername" : toUsername
              }
            })
            .then((r)=> {
              toast.success(`${to_nickname}님을 평가 완료하였습니다`);
              axios({
                method: 'get',
                url: `https://i8e201.p.ssafy.io/api/user/review/${username}`
              })
              .then((r:any)=> {
                const allReviewList:any = r.data.data.filter((e:any)=> {                
                  return typeof e.review_at !== "string" 
                })
                dispatch(changeAlarmApiDataState(allReviewList))
              })
            })
            
          }}/>
        </div>
      </div>
    </div>
  )
}

export default StarReview


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
            <FaStar className="star" color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'} size={15}
              onMouseEnter={()=> {setHover(ratingValue)}}
              onMouseLeave={()=> {setHover(null)}}
            />
          </label>
        )
      })}
    </div>
  )
}
