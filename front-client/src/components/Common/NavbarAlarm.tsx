import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeMenuState } from "../../store/store";
import AlarmRequest from "./AlarmRequest";

function NavbarAlarm(): JSX.Element {
  let dispatch = useAppDispatch();
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
          <div className="flex justify-center items-center ">알람</div>
          <div></div>
          {/* 새로고침 */}
          <div className="flex justify-center items-center">
            <img className="h-[40%]" src={require('../../assets/NavIcon/reset.png')} alt="" />
          </div>
        </div>
        {/* 요청 */}
        <div className="grid" style={{gridTemplateColumns: '1fr 1fr 1fr'}}>
          <div className="flex justify-center items-center">요청</div>
          <div className="flex justify-center items-center">초대</div>
          <div className="flex justify-center items-center">리뷰</div>
        </div>
        <AlarmRequest />
        {/* <div>hi</div> */}
      </div>
      
    </div>
  );
}
export default NavbarAlarm;
