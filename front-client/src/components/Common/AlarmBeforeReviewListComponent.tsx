import axios from "axios";
import { FaStar } from 'react-icons/fa'
import styles from './Common.module.css'
import { useEffect, useState } from "react";

// 리뷰 리스트
function AlarmBeforeReviewListComponent({to_nickname, reviewId, toUsername}:any):JSX.Element {
  return (
    <div className={`grid h-[4rem] w-full ${styles.shortBorder}`} style={{gridTemplateColumns: '0.25fr 1fr'}}>
      {/* 유저 이모지 */}
      <div className="flex justify-center items-start">
        <img className="w-[2rem] h-[2rem]" src={require('../../assets/myPage/sunglassEmoji.png')} alt="" />
      </div>
      {/* 별점 및 평가하기 */}
      <div className="grid" style={{gridTemplateRows: '1fr 1fr'}}>
        <div className="flex justify-start items-center text-base">{to_nickname}</div>
        <StarReview to_nickname={to_nickname} reviewId={reviewId} toUsername={toUsername}/>
      </div>
    </div>
  )
}
// 리뷰 평가
function StarReview({to_nickname, reviewId, toUsername}:any):JSX.Element {
  const [starState,setStarState] = useState()
  console.log(to_nickname, reviewId, toUsername,starState);
  
  return (
    <div className="flex justify-start items-center">
      <div className={`grid `} style={{gridTemplateColumns: '3fr 1fr 1.5fr'}}>
        <StarRating to_nickname={to_nickname} setStarState={setStarState}/>
        <div></div>
        <div className="flex justify-center items-center cursor-pointer w-full h-ful">
          <input className="text-xs cursor-pointer" type="submit" value={'평가하기'} onClick={(e)=> {
            e.preventDefault()
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
              console.log(r.data);
              console.log('현재 변경된 score: ', starState);
            })
            
          }}/>
        </div>
      </div>
    </div>
  )
}

// 별점 기능
function StarRating({to_nickname, setStarState}:any):JSX.Element {
  const [rating, setRating] = useState(null) as any
  const [hover, setHover] = useState(null) as any
  setStarState(rating)
  useEffect(()=> {
    console.log(`${to_nickname}의 별점은 현재: `,rating);
    
  },[rating])
  return (
    <div className="flex">
      {[...Array(5)].map((star, idx)=> {
        const ratingValue = idx + 1
        return (
          <label>
            <input type="radio" name="rating" value={ratingValue} 
            onClick={()=> {setRating(ratingValue)}}
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


export default AlarmBeforeReviewListComponent
