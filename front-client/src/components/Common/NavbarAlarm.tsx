import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeMenuState } from "../../store/store";

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
    <div
      ref={alarmIcon}
      className={`grid absolute w-[16rem] bg-white rounded-3xl hidden `}
      style={{ right: "3rem", top: "11.5rem", height: "22rem", gridTemplateRows: '0.8fr 1fr 4fr 0.2fr' }}
    >
      <div className="border-2 border-red-300">1</div>
      <div className="border-2 border-green-300">2</div>
      <div className="border-2 border-blue-300">3</div>
      <div className="border-2 border-yellow-300">4</div>
    </div>
  );
}
export default NavbarAlarm;
