import axios from "axios";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeMenuState, changeAlarmClickState, changeAlarmApiDataState } from "../../store/store";
import AlarmRequest from "./AlarmRequest";

function NavbarAlarm(): JSX.Element {

  let dispatch = useAppDispatch();

  // username (현재는 내꺼)
  const username = localStorage.getItem('Username')

  const alarmIcon = useRef<any>(null);
  // 알람 클릭 상태
  const alarmClickCheck: any = useAppSelector((state: any) => {
    return state.alarmClickCheck;
  });
  // 메뉴 클릭 상태
  const checkMenuState: any = useAppSelector((state: any) => {
    return state.menuClickCheck;
  });

  // 알람 클릭시 조건 분기
  useEffect(()=> {
    if ((alarmClickCheck) && (checkMenuState)) {
      dispatch(changeMenuState())
      alarmIcon.current.classList.remove("hidden");
    } else if (alarmClickCheck) {
      alarmIcon.current.classList.remove("hidden");
    } else if (!(alarmClickCheck)) {
      alarmIcon.current.classList.add("hidden");
    }
  }, [alarmClickCheck])
  
  return (
    <div ref={alarmIcon} className={`absolute w-[16rem] `} style={{ right: "3rem", top: "11.5rem", height: "35.2rem"}}>
      <div className="grid h-full w-full rounded-3xl bg-black text-white" style={{gridTemplateRows: '0.5fr 0.5fr 5fr' }}>
        <div className="grid" style={{gridTemplateColumns: '2fr 1fr 1fr 1fr'}}>
          <div></div>
          <div className="flex justify-center items-center">알람</div>
          <div></div>
          {/* 새로고침 */}
          <div className="flex justify-center items-center">
            <img className="h-[40%]" src={require('../../assets/NavIcon/reset.png')} alt="" />
          </div>
        </div>
        {/* 요청 */}
        <div className="grid" style={{gridTemplateColumns: '1fr 1fr 1fr'}}>
          <div className="flex justify-center items-center cursor-pointer" onClick={()=> {
            axios({
              method:'get',
              url: `https://i8e201.p.ssafy.io/api/user/friend/request/${username}`
            })
            .then((r)=> {
              // 요청 보낸 유저Id에 따른 중복제거 후 데이터 보내기
              const checkFrom_id:number[] = []
              const setData:(number|string)[] = []
              const data:(number|string)[] = r.data.data
              data.forEach((e:any)=> {
                if (checkFrom_id.includes(e.from_id)!== true) {
                  checkFrom_id.push(e.from_id)
                  setData.push(e)
                }
              })
              dispatch(changeAlarmClickState(0))
              dispatch(changeAlarmApiDataState(setData))
            })
            
          }}>요청</div>
          {/* 초대 */}
          <div className="flex justify-center items-center cursor-pointer" onClick={()=> {
            axios({
              method:'get',
              url: `https://i8e201.p.ssafy.io/api/pocha/invite/${username}`
            })
            .then((r)=> {
              // 포차Id에 따른 중복제거 후 데이터 보내기
              const checkpochaId:number[] = []
              const setData:(number|string)[] = []
              const data:(number|string)[] = r.data.data
              data.forEach((e:any)=> {
                if (checkpochaId.includes(e.pochaId)!== true) {
                  checkpochaId.push(e.pochaId)
                  setData.push(e)
                }
              })
              dispatch(changeAlarmClickState(1))
              dispatch(changeAlarmApiDataState(setData))
            })
          }}>초대</div>
          {/* review_at이 null 값인 리뷰 목록을 보이도록 하기 */}
          <div className="flex justify-center items-center cursor-pointer" onClick={()=> {
            axios({
              method: 'get',
              url: `https://i8e201.p.ssafy.io/api/user/review/${username}`
            })
            .then((r:any)=> {
              const allReviewList:any = r.data.data.filter((e:any)=> {                
                return typeof e.review_at !== "string" 
              })
              dispatch(changeAlarmClickState(2))
              dispatch(changeAlarmApiDataState(allReviewList))
            })
          }}>리뷰</div>
        </div>
        <AlarmRequest />
        <div></div>
      </div>
      
    </div>
  );
}
export default NavbarAlarm;
