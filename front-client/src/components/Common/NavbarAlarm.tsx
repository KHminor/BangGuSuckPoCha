import axios from "axios";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeMenuState, changeAlarmClickState, changeAlarmApiDataState } from "../../store/store";
import AlarmRequest from "./AlarmRequest";

function NavbarAlarm(): JSX.Element {
  
  let dispatch = useAppDispatch();

  // username (현재는 내꺼)
  const username = `1zjK_Yrq6klkIxBWj8bj1WJkV5ng-7jhrRGvlIJXawI`

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
              dispatch(changeAlarmClickState(0))
              dispatch(changeAlarmApiDataState(r.data.data))
            })
            
          }}>요청</div>
          <div className="flex justify-center items-center cursor-pointer" onClick={()=> {
            axios({
              method:'get',
              url: `https://i8e201.p.ssafy.io/api/pocha/invite/${username}`
            })
            .then((r)=> {
              dispatch(changeAlarmClickState(1))
              dispatch(changeAlarmApiDataState(r.data.data))
            })
          }}>초대</div>
          <div className="flex justify-center items-center cursor-pointer" onClick={()=> {
            dispatch(changeAlarmClickState(2))
          }}>리뷰</div>
        </div>
        <AlarmRequest />
        <div></div>
      </div>
      
    </div>
  );
}
export default NavbarAlarm;
